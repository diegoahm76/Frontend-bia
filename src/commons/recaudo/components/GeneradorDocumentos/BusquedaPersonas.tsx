/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
import { FC, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Checkbox, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, } from '@mui/material';
import { control_error } from '../../../../helpers';
import { control_warning } from '../../../almacen/configuracion/store/thunks/BodegaThunks';
import { BuscadorPersona2 } from '../../../../components/BuscadorPersona2';
import { Title } from '../../../../components';
import { RenderDataGrid } from '../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import { AuthSlice } from '../../../auth/interfaces';
import { useSelector } from 'react-redux';


export interface Persona {
    id_persona: any;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    razon_social?: string;
    nombre_comercial?: string;
    numero_documento: string;
    require_firma?: boolean;
};
export interface SelectItem {
    value: string;
    label: string;
}

interface IProps {
    personaSelected: any;
    setPersona: any;
    plantillaSeleccionada: any;
    puedeReenviar: boolean;
}
export const BusquedaPersonasGenerador: React.FC<IProps> = ({ personaSelected, setPersona, plantillaSeleccionada, puedeReenviar }) => {

    const {
        userinfo
      } = useSelector((state: AuthSlice) => state.auth);
    const [persona, set_persona] = useState<Persona>(); //Se usa cuando se elige una sola persona
    const on_result = async (info_persona: Persona): Promise<void> => { set_persona(info_persona); } //Se usa cuando se elige una sola persona

    const [persons, setPersons] = useState<Persona[]>([]); //Se usa cuando se elige varias personas
    const [personaSelecteda, setpersonaa] = useState<any>([]);

    const handlePersons = (input: any) => {
        const personsArray = Array.isArray(input) ? input : [input];

        if (personsArray.length) {
          const newPersons = personsArray.filter((persona) => {
            return persona && persona.id_persona && !personaSelecteda.some((p: any) => p.id_persona === persona.id_persona);
          });

          if (newPersons.length) {
            setpersonaa((prevLideres: any) => [...prevLideres, ...newPersons.map(persona => ({
              id_persona: persona.id_persona,
              primer_nombre: persona.primer_nombre,
              primer_apellido: persona.primer_apellido,
              numero_documento: persona.numero_documento,
              razon_social: persona.razon_social || '',
              nombre_comercial: persona.nombre_comercial || '',
              require_firma: persona.require_firma || false
            }))]);
          } else {
            control_warning("No hay ninguna persona nueva para agregar.");
          }
        } else {
          control_error("No hay ninguna persona seleccionada para agregar.");
        }
    };

    // useEffect(() => {
    //     if (!personaSelected.length) {
    //         setpersonaa([]);
    //     }
    // }, [personaSelected])


    useEffect(() => {
        if(persona?.id_persona){
            handlePersons(persona);
        }
    }, [persona])

    useEffect(() => {
        if (persons.length) {
            handlePersons(persons);
        }
    }, [persons])

    useEffect(() => {
        if(plantillaSeleccionada?.archivos_digitales){
            const yaExiste = personaSelecteda.some((p: any) => p.id_persona === userinfo.id_persona);
            if(!yaExiste){
                setpersonaa((prevLideres: any) => [...prevLideres, {
                    id_persona: userinfo.id_persona,
                    nombre: userinfo.nombre,
                    primer_nombre: '',
                    primer_apellido: '',
                    razon_social: '',
                    nombre_comercial: '',
                    numero_documento: userinfo.numero_documento,
                    require_firma: true
                }]);
            }
        }else{
            setpersonaa([])
            setPersona([])
        }
    }, [plantillaSeleccionada])

    useEffect(() => {
      if(personaSelecteda.length){
        setPersona(personaSelecteda.map((persona: any) => ({ id: persona.id_persona, require_firma: persona.require_firma })));
      }
    }, [personaSelecteda])

    const handleDelete = (idPersona: any) => {
        // Elimina el id_persona de personaSelected
        setPersona(personaSelected.filter((obj: any) => obj.id !== idPersona));

        // Elimina la persona de personaa basado en id_persona
        setpersonaa(personaSelecteda.filter((persona: { id_persona: any; }) => persona.id_persona !== idPersona));
    };

    const handleCheckboxChange = (id_persona: any, isChecked: boolean) => {
      // Crear una copia del estado actual
      const newRows = [...personaSelecteda];

      // Encontrar el índice de la fila que se está actualizando
      const index = newRows.findIndex(row => row.id_persona === id_persona);

      // Actualizar el valor de 'require_firma' para esa fila
      newRows[index].require_firma = isChecked;

      // Actualizar el estado
      setpersonaa(newRows);
  };

    const columnss = [
        {
            field: 'numero_documento',
            headerName: 'Número de Documento',
            flex: 1,
        },
        {
            field: 'primer_nombre',
            headerName: 'Nombre',
            flex: 2,
            editable: false,
            valueGetter: (params: any) => `${params.row.primer_nombre || params.row.razon_social || params.row.nombre_comercial || params.row.nombre || ''} ${params.row.primer_apellido || ''}`,
        },
        {
          field: 'requiere_firma',
          headerName: 'Requiere Firma',
          flex: 1,
          renderCell: (params: any) => (
              <Checkbox
                  checked={params.row.require_firma}
                  onChange={(event) => handleCheckboxChange(params.row.id_persona, event.target.checked)}
              />
          ),
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            flex :1,
            renderCell: (params: any) => (
                params.row.id_persona === userinfo.id_persona ? (
                  <IconButton
                    color="error"
                    disabled
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(params.row.id_persona)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )
              ),
        },
    ];
    return (
        <Grid container
            spacing={2}
            px={2}
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px', m: '10px 0 20px 0',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
            }}
        >
            <Grid item marginTop={-2} xs={12}>
                <Title title="Destinatarios documento " />
            </Grid>

            <Grid container
                item
                marginTop={-2}>
                <Grid item xs={12}>
                    <BuscadorPersona2
                        onResult={(data) => {
                            on_result(data);
                        }}
                        setPersons={setPersons}
                        plantillaSeleccionada={plantillaSeleccionada}
                        puedeReenviar={puedeReenviar}
                    />
                </Grid>
                {personaSelecteda.length > 0 && <RenderDataGrid
                    title='Personas  '
                    columns={columnss ?? []}
                    rows={personaSelecteda ?? []}
                />}
            </Grid>



            {/*  */}
        </Grid>
    );
};