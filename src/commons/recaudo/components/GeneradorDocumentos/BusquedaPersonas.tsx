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
import { LoadingButton } from '@mui/lab';
import { DataGrid } from '@mui/x-data-grid';
import GroupIcon from '@mui/icons-material/Group';
import { FC, useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
// import { BuscadorPersona } from '../../../../../components/BuscadorPersona';
//  import { Alertas, Persona, Props, SelectItem, lider } from '../../interfaces/types';
import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, } from '@mui/material';
import { api } from '../../../../api/axios';
import { control_error } from '../../../../helpers';
import { control_warning } from '../../../almacen/configuracion/store/thunks/BodegaThunks';
import { BuscadorPersona2 } from '../../../../components/BuscadorPersona2';
import { Title } from '../../../../components';
import { RenderDataGrid } from '../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';


export interface Persona {
    id_persona: any;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    razon_social?: string;
    nombre_comercial?: string;
    numero_documento: string;
};
export interface SelectItem {
    value: string;
    label: string;
}

interface IProps {
    personaSelected: any;
    setpersona: any;
    // perfilselet: any;
    // setperfilselet: any;
    // lideresUnidad: any;
    // setLideresUnidad: any;
}
// export const AlertaDocumento: React.FC<IProps> = ({ personaSelected, setpersona, perfilselet, setperfilselet, lideresUnidad, setLideresUnidad }) => {
export const BusquedaPersonasGenerador: React.FC<IProps> = ({ personaSelected, setpersona }) => {

    useEffect(() => {
        if (!personaSelected) {
            setpersonaa([]);
        }
    }, [personaSelected])

    const [persona, set_persona] = useState<Persona>();
    const on_result = async (info_persona: Persona): Promise<void> => { set_persona(info_persona); }

    useEffect(() => {
        if(persona?.id_persona){
            handleSinglePerson();
        }
    }, [persona])

    const [opcionSeleccionada, setOpcionSeleccionada] = useState('0');

    const selt1 = () => {
        setOpcionSeleccionada("1")
    };
    const selt2 = () => {
        setOpcionSeleccionada("2")
    };

    const selt3 = () => {
        setOpcionSeleccionada("3")
    };

    const [persons, setPersons] = useState<Persona[]>([]);
    const [personaSelecteda, setpersonaa] = useState<
    { id_persona: string, primer_nombre: string, primer_apellido: string, numero_documento: string, razon_social: string, nombre_comercial: string  }[]
    >([]);

    useEffect(() => {
        if (persons.length) {
            handlePersons();
        }
    }, [persons])

    const handleSinglePerson = () => {
        // Verifica si 'persona' está definido y tiene un 'id_persona' no nulo/no indefinido
        if (persona && persona.id_persona) {
            // Verifica si la persona ya está en la lista basado en 'id_persona'
            const yaExiste = personaSelecteda.some(p => p.id_persona === persona.id_persona);

            if (!yaExiste) {
                setpersona((prevLideres: any) => [...prevLideres, persona?.id_persona]);
                setpersonaa(prevLideres => [...prevLideres, {
                    id_persona: persona.id_persona,
                    primer_nombre: persona.primer_nombre,
                    primer_apellido: persona.primer_apellido,
                    numero_documento: persona.numero_documento,
                    razon_social: persona.razon_social || '',
                    nombre_comercial: persona.nombre_comercial || ''
                }]);
            } else{
                control_warning("La persona ya fue agregada");
            }
        } else {
            control_error("No hay ninguna persona seleccionada para agregar.");
        }
    };

    const handlePersons = () => {
        if (persons.length) {
          const newPersons = persons.filter((persona) => {
            return persona && persona.id_persona && !personaSelecteda.some(p => p.id_persona === persona.id_persona);
          });

          if (newPersons.length) {
            setpersona((prevLideres: any) => [...prevLideres, ...newPersons.map(persona => persona.id_persona)]);
            setpersonaa(prevLideres => [...prevLideres, ...newPersons.map(persona => ({
              id_persona: persona.id_persona,
              primer_nombre: persona.primer_nombre,
              primer_apellido: persona.primer_apellido,
              numero_documento: persona.numero_documento,
              razon_social: persona.razon_social || '',
              nombre_comercial: persona.nombre_comercial || ''
            }))]);
          } else {
            control_error("No hay ninguna persona nueva para agregar.");
          }
        } else {
          control_error("No hay ninguna persona seleccionada para agregar.");
        }
      };

    const handleDelete = (idPersona: any) => {
        // Elimina el id_persona de personaSelected
        setpersona(personaSelected.filter((id: any) => id !== idPersona));

        // Elimina la persona de personaa basado en id_persona
        setpersonaa(personaSelecteda.filter((persona: { id_persona: any; }) => persona.id_persona !== idPersona));
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
            valueGetter: (params: any) => `${params.row.primer_nombre || params.row.razon_social || params.row.nombre_comercial || ''} ${params.row.primer_apellido || ''}`,
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            flex :1,
            renderCell: (params: any) => (
                <IconButton
                    color="error"
                    onClick={() => handleDelete(params.row.id_persona)}
                >
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];
    return (

        <Grid container
            spacing={2}
            m={2} p={2}
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
                <Title title="Destinatario documento " />
            </Grid>

            <Grid container
                item
                // justifyContent="center"
                spacing={2}>

                <Grid item>
                    <Button startIcon={<GroupIcon />} variant="contained" color="primary" onClick={selt3}>Buscador Persona</Button>
                </Grid>
                {opcionSeleccionada === '3' && <>

                    <>
                        <Grid item xs={12}>
                            <BuscadorPersona2
                                onResult={(data) => {
                                  on_result(data);
                                }}
                                setPersons={setPersons}
                            />
                        </Grid>
                        {/* <Grid item xs={12} sm={3}>
                            <TextField
                                label="Primer Nombre"
                                variant="outlined"
                                fullWidth
                                size="small"
                                disabled
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={persona?.primer_nombre}
                            />
                        </Grid> */}


                        {/* <Grid item >
                            <Button color='success'
                                variant='contained'
                                startIcon={<SaveIcon />} onClick={handleSinglePerson}>
                                guardar
                            </Button>

                        </Grid> */}

                        <RenderDataGrid
                            title='Personas  '
                            columns={columnss ?? []}
                            rows={personaSelecteda ?? []}
                        />


                        {/* {persona?.id_persona} */}
                    </>

                </>}

            </Grid>



            {/*  */}



            {/* {selected_button === 'perfil' && (
                <><Grid item xs={12}>
                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Perfil</InputLabel>
                            <Select value={formData.perfil_profesional} label="Perfil" name="perfil_profesional" onChange={handleInputChange}>
                                {perfil.map(item => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                </>
            )}


            {selected_button === 'buscador' && (
                <>
                    <Grid item xs={12}>
                        <BuscadorPersona
                            onResult={(data) => {
                                void on_result(data);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Primer Nombre"
                            variant="outlined"
                            fullWidth
                            size="small"
                            disabled
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={persona?.primer_nombre}
                        />
                    </Grid>
                </>
            )}  */}




            <Grid container item justifyContent="flex-end" >
                <Grid item>



                </Grid>
            </Grid>
        </Grid>
    );
};