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


export interface Persona {
    id_persona: any;
    primer_nombre: any;
    segundo_nombre: any;
    primer_apellido: any;
    segundo_apellido: any;
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


export const AlertaDocumento = (): JSX.Element => {

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




    // const columns = [
    //     {
    //         field: "detalle",
    //         headerName: "Detalle",
    //         width: 200,
    //         flex: 1,
    //         valueGetter: (params: any) => params.row.datos_reordenados.detalle
    //     },
    //     {
    //         field: "destinatario",
    //         headerName: "destinatario",
    //         width: 200,
    //         flex: 1,
    //         valueGetter: (params: any) => params.row.datos_reordenados.destinatario
    //     },
    //     {
    //         field: "nombre",
    //         headerName: "nombre",
    //         width: 200,
    //         flex: 1,
    //         valueGetter: (params: any) => params.row.datos_reordenados.nombre
    //     },


    // ];


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






    const handleClicdk = () => {
        console.log(personaselet);
    };

    const [lideresUnidad, setLideresUnidad] = useState<string[]>([]); // Asumiendo que es un string
    const handleClick = () => {
        setLideresUnidad((prevLideres) => [...prevLideres, formData.lider_unidad]);
    };
    const rows = lideresUnidad.map((id: any) => ({
        id,
        ...lider.find((l) => l.id_unidad_organizacional === id),
    }));
    const columns = [
        // { field: 'id_unidad_organizacional', headerName: 'ID', width: 90 },
        { field: 'nombre', headerName: 'Nombre', width: 200 },
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



    const [perfilselet, setperfilselet] = useState<string[]>([]); // Asumiendo que es un string
    const handleperfil = () => {
        setperfilselet((prevLideres) => [...prevLideres, formData.perfil_profesional]);
    };
    const rowsperfil = perfilselet.map((id: any) => ({
        id,
        ...perfil.find((l) => l.value === id),
    }));
    const columnsperfil = [
        // { field: 'id_unidad_organizacional', headerName: 'ID', width: 90 },
        { field: 'label', headerName: 'label', width: 200 },
    ];



    const [personaseleta, setpersonaa] = useState<{ id_persona: string, primer_nombre: string }[]>([]);
    const [personaselet, setpersona] = useState<string[]>([]);
    const handlpersona = () => {
        setpersona((prevLideres) => [...prevLideres, persona?.id_persona]);
        setpersonaa(prevLideres => [...prevLideres, { id_persona: persona?.id_persona, primer_nombre: persona?.primer_nombre }]);

    };

    const columnss = [
        {
            field: 'primer_nombre',
            headerName: 'Nombre',
            width: 200,
            editable: false,
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


            <Button variant="contained" onClick={handleClicdk}>
                  Mi Botón
            </Button>

            <Grid container
                item
                // justifyContent="center"
                spacing={2}>


                <Grid item>
                    <Button variant="contained" color="primary" onClick={selt1}>Lider de unidad</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={selt2} >Perfil</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={selt3}>  BuscadorPersona</Button>
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


                        <Grid item >
                            <Button color='success'
                                variant='contained'
                                startIcon={<SaveIcon />} onClick={handlpersona}>
                                guardar
                            </Button>

                        </Grid>

                        <RenderDataGrid
                            title='Lideres de personas  '
                            columns={columnss ?? []}
                            rows={personaseleta ?? []}
                        />


                        {persona?.id_persona}
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