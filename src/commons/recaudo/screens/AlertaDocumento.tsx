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
import { api } from '../../../api/axios';
import { Title } from '../../../components';
import { BuscadorPersona } from '../../../components/BuscadorPersona';
import { control_success, control_error } from '../../../helpers';
import { RenderDataGrid } from '../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import { BuscadorPersona2 } from '../../../components/BuscadorPersona2';
import { control_warning } from '../../almacen/configuracion/store/thunks/BodegaThunks';


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
export interface lider {
    id_unidad_organizacional: any;
    nombre: string;
    codigo: string;
    cod_tipo_unidad: string;
    cod_agrupacion_documental: string;
    unidad_raiz: boolean;
    item_usado: boolean;
    activo: boolean;
    id_organigrama: number;
    id_nivel_organigrama: number;
    id_unidad_org_padre: number | null;
    id_unidad_org_actual_admin_series: number | null;
}

interface IProps {
    personaSelected: any;
    setpersona: any;
    perfilselet: any;
    setperfilselet: any;
    lideresUnidad: any;
    setLideresUnidad: any;
}
export const AlertaDocumento: React.FC<IProps> = ({ personaSelected, setpersona, perfilselet, setperfilselet, lideresUnidad, setLideresUnidad }) => {

    const initialFormData = {
        id_persona_alertar: "",
        cod_clase_alerta: "",
        id_persona: "",
        perfil_profesional: "",
        lider_unidad: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const [perfil, set_perfil] = useState<SelectItem[]>([]);

    useEffect(() => {
        const fetch_perfil = async (): Promise<void> => {
            try {
                const url = `/listas/perfiles_sistema/`;
                const res_perfil = await api.get(url);
                const alertas_perfil = res_perfil.data.data;
                set_perfil(alertas_perfil);
            } catch (error) {
                console.error(error);
            }
        };
        void fetch_perfil();
    }, []);


    const [lider, set_lider] = useState<lider[]>([]);
    useEffect(() => {
        const fetch_perfil = async (): Promise<void> => {
            try {
                const url = `/transversal/organigrama/unidades/get-list/organigrama-actual/`;
                const res_lider = await api.get(url);
                const alertas_lider = res_lider.data.data;
                set_lider(alertas_lider);
            } catch (error) {
                console.error(error);
            }
        };
        void fetch_perfil();
    }, []);



    const [persona, set_persona] = useState<Persona>();
    const on_result = async (info_persona: Persona): Promise<void> => { set_persona(info_persona); }

    useEffect(() => {
        if(persona?.id_persona){
            handleSinglePerson();
        }
    }, [persona])

    const handleClick = () => {
        const liderSeleccionado = formData.lider_unidad;
        if (!liderSeleccionado) {
            console.log("Seleccione un líder de unidad");
            control_error("Seleccione un líder de unidad");

            return;
        }
        if (lideresUnidad.includes(liderSeleccionado)) {
            console.log("El líder de unidad seleccionado ya fue agregado");
            control_error("El líder de unidad seleccionado ya fue agregado");

            return;
        }
        setLideresUnidad((prevLideres: any) => [...prevLideres, formData.lider_unidad]);
    };


    const handleDeletelider = (liderId: any) => {
        setLideresUnidad(lideresUnidad.filter((id: any) => id !== liderId));
    };

    const rows = lideresUnidad.map((id: any) => ({
        id,
        ...lider.find((l) => l.id_unidad_organizacional === id),
    }));
    const columns = [
        { field: 'nombre', headerName: 'Nombre',   flex: 1, },
        {
            field: 'acciones',
            headerName: 'Acciones',
            sortable: false,
            flex: 1,
            renderCell: (params: { row: { id: any; }; }) => (
                <IconButton
                    color="error"
                    onClick={() => handleDeletelider(params.row.id)}
                >
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];


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

    const handleperfil = () => {
        const perfilSeleccionado = formData.perfil_profesional; // Asegúrate de tener `formData` definido correctamente en tu componente

        if (!perfilSeleccionado) {
            // No hay ningún perfil seleccionado
            console.log("Seleccione un perfil");
            control_error("Seleccione un perfil");
            return;
        }
        if (perfilselet.includes(perfilSeleccionado)) {
            // El perfil ya fue agregado
            console.log("El perfil seleccionado ya fue agregado");
            control_error("El perfil seleccionado ya fue agregado");

            return;
        }

        setperfilselet((prevLideres: any) => [...prevLideres, formData.perfil_profesional]);
    };
    const rowsperfil = perfilselet.map((id: any) => ({
        id,
        ...perfil.find((l) => l.value === id),
    }));

    const handleDelefte = (perfilId: any) => {
        setperfilselet(perfilselet.filter((id: any) => id !== perfilId));
    };
    const columnsperfil = [
        { field: 'label', headerName: 'label',   flex: 1, },
        {
            field: 'acciones',
            headerName: 'Acciones',
            sortable: false,
            flex: 1,
            renderCell: (params: { row: { id: any; }; }) => (
                <IconButton
                    color="error"
                    onClick={() => handleDelefte(params.row.id)}
                >
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];


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


            {/* <Button variant="contained" onClick={handleClicdk}>
                Mi Botón
            </Button> */}

            <Grid container
                item
                // justifyContent="center"
                spacing={2}>


                {/* <Grid item>
                    <Button variant="contained" color="primary" onClick={selt1}>Lider de unidad</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={selt2} >Perfil</Button>
                </Grid> */}
                <Grid item>
                    <Button startIcon={<GroupIcon />} variant="contained" color="primary" onClick={selt3}>Buscador Persona</Button>
                </Grid>
                {opcionSeleccionada === '1' && <>
                    <Grid container
                        item xs={12} sm={12}
                        // justifyContent="center"
                        spacing={2}>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Lider de unidad</InputLabel>
                                <Select value={formData.lider_unidad} label="Lider de unidad" name="lider_unidad" onChange={handleInputChange}>
                                    {lider.map((unidad) => (
                                        <MenuItem key={unidad.id_unidad_organizacional} value={unidad.id_unidad_organizacional}>
                                            {unidad.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item >
                            <Button color='success'
                                variant='contained'
                                startIcon={<SaveIcon />} onClick={handleClick}>
                                guardar
                            </Button>
                        </Grid>
                    </Grid>



                    <RenderDataGrid
                        title='Lideres de unidad '
                        columns={columns ?? []}
                        rows={rows ?? []}
                    />


                </>}

                {opcionSeleccionada === '2' && <>
                    <Grid container
                        item xs={12} sm={12}
                        // justifyContent="center"
                        spacing={2}>

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
                        <Grid item >
                            <Button color='success'
                                variant='contained'
                                startIcon={<SaveIcon />} onClick={handleperfil}>
                                guardar
                            </Button>
                        </Grid>
                    </Grid>

                    <RenderDataGrid
                        title='Lideres de perfil '
                        columns={columnsperfil ?? []}
                        rows={rowsperfil ?? []}
                    />
                </>}

                {opcionSeleccionada === '3' && <>

                    <>
                        <Grid item xs={12}>
                            <BuscadorPersona2
                                onResult={(data) => {
                                    void on_result(data);
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