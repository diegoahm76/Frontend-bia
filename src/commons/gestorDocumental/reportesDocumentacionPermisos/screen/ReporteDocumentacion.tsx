/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/jsx-no-undef */
import { Key, useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Box, Button, Grid, MenuItem, TextField, } from '@mui/material';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { Title } from '../../../../components/Title';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { IObjSubserieSerie, IObjTrd, DatosRespuesta, IReporteDocumentacion, PermisosGenerales, PermisoClasificacion, Exclusiones } from '../interfaces/reporteDocumentacion';
import BuscarTrd from '../components/buscarTrd';
import { get_permisos, get_permisos_generales, get_series_subseries } from '../store/thunks/reporteDocumentacionthunks';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';



// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ReportesDocumentacionScreen = () => {

    const { serie_subserie, permisos_no_propios, permisos_generales } = useAppSelector((state: { reportes_documentacion: IReporteDocumentacion; }) => state.reportes_documentacion);
    const { control: control_trd, getValues: get_values, reset: reset_trd } = useForm<IObjTrd>();
    const { control: control_permisos, getValues: get_values_permisos } = useForm<FieldValues>()
    const { control: control_serie_subserie, } = useForm<IObjSubserieSerie>();
    const { control: control_permisos_generales } = useForm<PermisosGenerales>()

    const [selected_trd, set_selected_trd] = useState<IObjTrd>();
    const [data, set_data] = useState<any[]>([]);
    const [permisos_clasificado_table, set_permisos_clasificado_table] = useState<any>([
        { id: 1, r_consultar: null, r_descargar: null, c_consultar: null, c_descargar: null, p_consultar: null, p_descargar: null, name: "entidad_entera", permiso: "Entidad entera" },
        { id: 2, r_consultar: null, r_descargar: null, c_consultar: null, c_descargar: null, p_consultar: null, p_descargar: null, name: "seccion_actual_respon_serie_doc", permiso: "Sección actual responsable" },
        { id: 3, r_consultar: null, r_descargar: null, c_consultar: null, c_descargar: null, p_consultar: null, p_descargar: null, name: "seccion_raiz_organi_actual", permiso: "Sección raíz" },
        { id: 4, r_consultar: null, r_descargar: null, c_consultar: null, c_descargar: null, p_consultar: null, p_descargar: null, name: "secciones_actuales_mismo_o_sup_nivel_respon", permiso: "Sección de mismo nivel responsable" },
        { id: 5, r_consultar: null, r_descargar: null, c_consultar: null, c_descargar: null, p_consultar: null, p_descargar: null, name: "secciones_actuales_inf_nivel_respon", permiso: "Sección de nivel inferior a responsable" },
        { id: 6, r_consultar: null, r_descargar: null, c_consultar: null, c_descargar: null, p_consultar: null, p_descargar: null, name: "unds_org_sec_respon_mismo_o_sup_nivel_resp_exp", permiso: "Unidad dentro de responsable de mismo nivel a responsable de Exp" },
        { id: 7, r_consultar: null, r_descargar: null, c_consultar: null, c_descargar: null, p_consultar: null, p_descargar: null, name: "unds_org_sec_respon_inf_nivel_resp_exp", permiso: "Unidad dentro de responsable de nivel inferior a responsable de Exp" },
    ]);
    const [selected_serie_subserie, set_selected_serie_subserie] = useState<IObjSubserieSerie>();
    const [selected_unidad_organizacional, set_selected_unidad_organizacional] = useState('');


    const [open_modal, set_open_modal] = useState(false);

    const dispatch = useAppDispatch();

    const handle_buscar = () => {
        set_open_modal(true);
    };
    const handle_close_buscar = () => {
        set_open_modal(false);
    };

    const handle_selected_trd = (trd: IObjTrd) => {
        set_selected_trd(trd);

    };



    useEffect(() => {
        if (selected_trd && typeof selected_trd.id_trd === 'number') {
            //  console.log('')(selected_trd)
            reset_trd(selected_trd);

            if (selected_trd.id_trd) {
                dispatch(get_series_subseries(selected_trd.id_trd));
            }
        }
    }, [selected_trd]);



    useEffect(() => {
        if (selected_serie_subserie && typeof selected_serie_subserie.id_unidad_organizacional === 'number') { void dispatch(get_permisos(selected_serie_subserie.id_unidad_organizacional)) }
    }, [selected_serie_subserie]);

    useEffect(() => {
        //  console.log('')(permisos_no_propios)
    }, [permisos_no_propios]);
    useEffect(() => {
        if (permisos_generales !== null) {
            let permiso_table
            let permiso_table_index
            let table_data = [
                { id: 1, r_consultar: null, r_descargar: null, c_consultar: null, c_descargar: null, p_consultar: null, p_descargar: null, name: "entidad_entera", permiso: "Entidad entera" },
                { id: 2, r_consultar: null, r_descargar: null, c_consultar: null, c_descargar: null, p_consultar: null, p_descargar: null, name: "seccion_actual_respon_serie_doc", permiso: "Sección actual responsable" },
                { id: 3, r_consultar: null, r_descargar: null, c_consultar: null, c_descargar: null, p_consultar: null, p_descargar: null, name: "seccion_raiz_organi_actual", permiso: "Sección raíz" },
                { id: 4, r_consultar: null, r_descargar: null, c_consultar: null, c_descargar: null, p_consultar: null, p_descargar: null, name: "secciones_actuales_mismo_o_sup_nivel_respon", permiso: "Sección de mismo nivel responsable" },
                { id: 5, r_consultar: null, r_descargar: null, c_consultar: null, c_descargar: null, p_consultar: null, p_descargar: null, name: "secciones_actuales_inf_nivel_respon", permiso: "Sección de nivel inferior a responsable" },
                { id: 6, r_consultar: null, r_descargar: null, c_consultar: null, c_descargar: null, p_consultar: null, p_descargar: null, name: "unds_org_sec_respon_mismo_o_sup_nivel_resp_exp", permiso: "Unidad dentro de responsable de mismo nivel a responsable de Exp" },
                { id: 7, r_consultar: null, r_descargar: null, c_consultar: null, c_descargar: null, p_consultar: null, p_descargar: null, name: "unds_org_sec_respon_inf_nivel_resp_exp", permiso: "Unidad dentro de responsable de nivel inferior a responsable de Exp" },
            ]
            permisos_generales.permisos_acceso_clasificacion.forEach(function (clasificacion: any, index) {
                for (let permiso_name in clasificacion) {
                    if (clasificacion.hasOwnProperty(permiso_name)) {
                        const permiso_value = clasificacion[permiso_name]
                        permiso_table = table_data.find((objeto: { name: string; }) => (permiso_name.indexOf(objeto.name) !== -1));
                        permiso_table_index = table_data.findIndex((objeto: { name: string; }) => (permiso_name.indexOf(objeto.name) !== -1));

                        if (permiso_table) {
                            if (clasificacion.cod_clasificacion_exp === "R") {
                                if (permiso_name.indexOf("consulta") !== -1) {
                                    table_data[permiso_table_index] = { ...permiso_table, r_consultar: permiso_value }
                                }
                                if (permiso_name.indexOf("descarga") !== -1) {
                                    table_data[permiso_table_index] = { ...permiso_table, r_descargar: permiso_value }
                                }
                            }
                            if (clasificacion.cod_clasificacion_exp === "C") {
                                if (permiso_name.indexOf("consulta") !== -1) {
                                    table_data[permiso_table_index] = { ...permiso_table, c_consultar: permiso_value }
                                }
                                if (permiso_name.indexOf("descarga") !== -1) {
                                    table_data[permiso_table_index] = { ...permiso_table, c_descargar: permiso_value }
                                }
                            }
                            if (clasificacion.cod_clasificacion_exp === "P") {
                                if (permiso_name.indexOf("consulta") !== -1) {
                                    table_data[permiso_table_index] = { ...permiso_table, p_consultar: permiso_value }
                                }
                                if (permiso_name.indexOf("descarga") !== -1) {
                                    table_data[permiso_table_index] = { ...permiso_table, p_descargar: permiso_value }
                                }
                            }
                        }
                    }
                }
            });
            //  console.log('')(table_data)
            set_data(table_data)
        }
    }, [permisos_generales]);

    useEffect(() => {
        if (selected_trd && typeof selected_trd.id_ccd === 'number' && selected_serie_subserie && typeof selected_serie_subserie.id_unidad_organizacional === 'number') { void dispatch(get_permisos_generales(selected_trd.id_ccd, selected_serie_subserie.id_unidad_organizacional)) }
        //  console.log('')(permisos_generales)
        set_data([]);

    }, [selected_serie_subserie])


    const columns: GridColDef[] = [
        {
            field: 'nombre_und_organizacional_actual',
            headerName: 'Unidad Organizacional',
            width: 180,

        },
        {
            field: 'crear_documentos_exps_no_propios',
            headerName: 'Crear Documento',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <div>
                    {params.value ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="primary" />}
                </div>

            ),
        },
        {
            field: 'borrar_documentos_exps_no_propios',
            headerName: 'Borrar Documento',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <div>
                    {params.value ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="primary" />}
                </div>

            ),
        },
        {
            field: 'anular_documentos_exps_no_propios',
            headerName: 'Anular Documento',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <div>
                    {params.value ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="primary" />}
                </div>

            ),
        },
        {
            field: 'conceder_acceso_documentos_exps_no_propios',
            headerName: 'Conceder Acceso',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <div>
                    {params.value ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="primary" />}
                </div>

            ),
        },
        {
            field: 'crear_expedientes',
            headerName: 'Crear Expediente',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <div>
                    {params.value ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="primary" />}
                </div>

            ),
        },
        {
            field: 'consultar_expedientes_no_propios',
            headerName: 'Consultar Expediente',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <div>
                    {params.value ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="primary" />}
                </div>

            ),
        },
        {
            field: 'descargar_expedientes_no_propios',
            headerName: 'Descargar Expediente',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <div>
                    {params.value ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="primary" />}
                </div>

            ),
        },
        {
            field: 'conceder_acceso_expedientes_no_propios',
            headerName: 'Conceder Acceso Exp',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <div>
                    {params.value ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="primary" />}
                </div>

            ),
        },

    ];

    const columns_denegacion: GridColDef[] = [
        {
            field: 'denegar_borrado_docs',
            headerName: 'Denegar-Borrar',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <div>
                    {params.value ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="primary" />}
                </div>

            ),

        },
        {
            field: 'denegar_anulacion_docs',
            headerName: 'Denegar Anular',
            width: 250,
            sortable: false,
            renderCell: (params) => (
                <div>
                    {params.value ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="primary" />}
                </div>

            ),
        },
        {
            field: 'excluir_und_actual_respon_series_doc_restriccion',
            headerName: 'Exluyente Sección Actual Responsable',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <div>
                    {params.value ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="primary" />}
                </div>

            ),
        },
        {
            field: 'denegar_conceder_acceso_doc_na_resp_series',
            headerName: 'Denegar Conceder Acceso Docs',
            width: 250,
            sortable: false,
            renderCell: (params) => (
                <div>
                    {params.value ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="primary" />}
                </div>

            ),
        },
        {
            field: 'denegar_conceder_acceso_exp_na_resp_series',
            headerName: 'Denegar Conceder Acceso Exp',
            sortable: false,
            width: 230,
            renderCell: (params) => (
                <div>
                    {params.value ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="primary" />}
                </div>

            ),
        },


    ];




    const columns_acceso_clasificacion: GridColDef[] = [
        {
            field: 'permiso',
            headerName: 'Categorias',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),

        },
        {
            field: 'r_consultar',
            headerName: 'Consultar Reservada',
            width: 250,
            sortable: false,
            renderCell: (params) => (
                <div>
                    {params.value ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="primary" />}
                </div>

            ),
        },
        {
            field: 'r_descargar',
            headerName: 'Descargar Reservada',
            width: 250,
            sortable: false,
            renderCell: (params) => (
                <div>
                    {params.value ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="primary" />}
                </div>

            ),
        },
        {
            field: 'c_consultar',
            headerName: 'Consultar Clasificada',
            width: 250,
            sortable: false,
            renderCell: (params) => (
                <div>
                    {params.value ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="primary" />}
                </div>

            ),
        },
        {
            field: 'c_descargar',
            headerName: 'Descargar Clasificada',
            width: 250,
            sortable: false,
            renderCell: (params) => (
                <div>
                    {params.value ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="primary" />}
                </div>

            ),
        },
        {
            field: 'p_consultar',
            headerName: 'Consultar Pública',
            width: 250,
            sortable: false,
            renderCell: (params) => (
                <div>
                    {params.value ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="primary" />}
                </div>

            ),
        },
        {
            field: 'p_descargar',
            headerName: 'Descargar Clasificada',
            width: 250,
            sortable: false,
            renderCell: (params) => (
                <div>
                    {params.value ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="primary" />}
                </div>

            ),
        },



    ];




    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
    const PermisosNoPropiosShow: any = (permiso: any, index: number) => {
        const permiso_index = permiso.permiso

        const rows_denegacion = [
            {
                id: permiso_index.denegacion.id_permisos_und_org_actual_serie_exp_ccd,
                denegar_borrado_docs: permiso_index.denegacion.denegar_borrado_docs,
                denegar_anulacion_docs: permiso_index.denegacion.denegar_anulacion_docs,
                denegar_conceder_acceso_doc_na_resp_series: permiso_index.denegacion.denegar_conceder_acceso_doc_na_resp_series,
                denegar_conceder_acceso_exp_na_resp_series: permiso_index.denegacion.denegar_conceder_acceso_exp_na_resp_series,
                excluir_und_actual_respon_series_doc_restriccion: permiso_index.denegacion.excluir_und_actual_respon_series_doc_restriccion

            },
        ];

        //  console.log('')(permiso_index)
        return (

            <React.Fragment key={index}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} marginTop={2} margin={2}>
                        <Controller
                            name={permiso_index.catalogo.nombre_serie ?? ""}
                            control={control_permisos}
                            rules={{ required: true }}
                            render={({ field: { onChange }, fieldState: { error } }) => (
                                <TextField
                                    margin="dense"
                                    fullWidth
                                    size="small"
                                    label="Nombre de Serie"
                                    variant="outlined"
                                    disabled={false}
                                    value={`${permiso_index.catalogo.nombre_serie} / ${permiso_index.catalogo.nombre_subserie}`}
                                    onChange={(e) => {
                                        onChange(e);
                                    }}
                                    error={!!error}
                                    sx={{
                                        backgroundColor: 'white',
                                    }}
                                />
                            )}

                        />
                    </Grid>
                    <Grid item xs={12} sm={12} margin={2} >

                        <Typography variant="h6" align="center" style={{ fontSize: '1rem' }}>Permisos de Unidades Organizacionales Actuales en Expedientes No Propios</Typography>
                        <Typography variant="h6" align="center" style={{ fontSize: '0.9rem' }}>Por defecto, las unidades tienen todos los permisos sobre sus expedientes propios</Typography>
                    </Grid>
                </Grid>

                <Box sx={{ width: '95%' }}>
                    <>
                        <DataGrid
                            density="compact"
                            autoHeight
                            rows={permiso_index.permisos}
                            columns={columns}
                            pageSize={10}
                            getRowId={(row) => row.id_und_organizacional_actual} rowsPerPageOptions={[10]}
                        />
                    </>
                </Box>
                <Grid item xs={12} sm={12} margin={2} >

                    <Typography variant="h6" align="center" style={{ fontSize: '1rem' }}>Denegación de Permisos de Unidades Organizacionales en Expedientes no Propios</Typography>
                </Grid>

                <Box sx={{ width: '70%' }}>
                    <>

                        <DataGrid
                            density="compact"
                            autoHeight
                            rows={rows_denegacion}
                            columns={columns_denegacion}
                            pageSize={10} rowsPerPageOptions={[10]}
                        />
                    </>
                </Box>



            </React.Fragment>
        )



    }

    // const PermisosGeneralesShow: React.FC<{ permiso: PermisosGenerales; index: number }> = ({ permiso, index }) => {

    //     const nombreSerie = permiso.exclusiones.catalogo.nombre_serie;
    //     return (

    //         <React.Fragment key={index}>

    //             <Grid container spacing={2} justifyContent="center">
    //                 {permiso.exclusiones.map((exclusion, index) => (
    //                     <React.Fragment key={index}>
    //                         <Grid item xs={12} sm={6} marginTop={2} margin={2}>
    //                             {/* Genera un Controller para cada campo */}
    //                             <Controller
    //                                 name={nombreSerie}
    //                                 control={control_permisos}
    //                                 rules={{ required: true }}
    //                                 render={({ field: { onChange }, fieldState: { error } }) => (
    //                                     <TextField
    //                                         margin="dense"
    //                                         fullWidth
    //                                         size="small"
    //                                         label="Nombre de Serie"
    //                                         variant="outlined"
    //                                         disabled={false}
    //                                         value={nombreSerie}
    //                                         onChange={(e) => {
    //                                             onChange(e);
    //                                         }}
    //                                         error={!!error}
    //                                         sx={{
    //                                             backgroundColor: 'white',
    //                                         }}
    //                                     />
    //                                 )}
    //                             />
    //                         </Grid>
    //                         {/* Agrega más Controllers para otros campos de exclusiones */}
    //                     </React.Fragment>
    //                 ))}
    //             </Grid>

    //         </React.Fragment>
    //     )



    // }


    return (

        <Grid
            container
            spacing={2}
            marginTop={2}
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
                alignItems: 'center'

            }}
        >
            <Grid container spacing={2} justifyContent="center" >
                <Title title="REPORTES DE PERMISOS DE DOCUMENTACIÓN" />
                <Grid item xs={12} sm={3.5} marginTop={2}  >

                    <Button
                        variant="contained"
                        onClick={handle_buscar}
                        disabled={false}
                    >
                        BUSCAR TABLA DE RETENCIÓN DOCUMENTAL
                    </Button>

                </Grid>
            </Grid>

            <Grid container spacing={2} justifyContent="center" >
                <Grid item xs={12} sm={3.5} marginTop={2} margin={2} >
                    <Controller
                        name="nombre"
                        control={control_trd}
                        rules={{ required: true }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                size="small"
                                label="Tabla de Retención Documental - Nombre"
                                variant="outlined"
                                disabled={true}
                                value={value}
                                InputLabelProps={{ shrink: true }}
                                onChange={onChange}
                                error={!!error}
                                sx={{
                                    backgroundColor: 'white',
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={3} marginTop={2} margin={2} >
                    <Controller
                        name="version"
                        control={control_trd}
                        rules={{ required: true }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                size="small"
                                label="Versión"
                                variant="outlined"
                                value={value}
                                InputLabelProps={{ shrink: true }}
                                disabled={true}
                                onChange={onChange}
                                error={!!error}
                                sx={{
                                    backgroundColor: 'white',
                                }}
                            />
                        )}
                    />
                </Grid>



            </Grid>

            {open_modal && (
                <Grid item xs={12} marginY={1}>
                    <BuscarTrd
                        control_trd={control_trd}
                        open={open_modal}
                        handle_close_buscar={handle_close_buscar}
                        get_values={get_values}
                        handle_selected_trd={handle_selected_trd}

                    />
                </Grid>
            )}
            <Grid container spacing={2} justifyContent="center" >

                <Grid item xs={12} sm={3.5} marginTop={2} margin={2} >
                    <Controller
                        name="nombre_ccd"
                        control={control_trd}
                        rules={{ required: true }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                size="small"
                                label="Cuadro de Documentación Documental"
                                variant="outlined"
                                disabled={true}
                                value={value}
                                InputLabelProps={{ shrink: true }}
                                onChange={onChange}
                                error={!!error}
                                sx={{
                                    backgroundColor: 'white',
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={3} marginTop={2} margin={2} >
                    <Controller
                        name="version_ccd"
                        control={control_trd}
                        rules={{ required: true }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                size="small"
                                label="Versión"
                                variant="outlined"
                                value={value}
                                InputLabelProps={{ shrink: true }}
                                disabled={true}
                                onChange={onChange}
                                error={!!error}
                                sx={{
                                    backgroundColor: 'white',
                                }}
                            />
                        )}
                    />
                </Grid>


            </Grid>
            <Grid container spacing={2} justifyContent="center" >

                <Grid item xs={12} sm={3.5} marginTop={2} margin={2} >
                    <Controller
                        name="tablas_control_acceso.nombre"
                        control={control_trd}
                        rules={{ required: true }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                size="small"
                                label="Tablas de Control de Acceso"
                                variant="outlined"
                                disabled={true}
                                value={value}
                                InputLabelProps={{ shrink: true }}
                                onChange={onChange}
                                error={!!error}
                                sx={{
                                    backgroundColor: 'white',
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={3} marginTop={2} margin={2} >
                    <Controller
                        name="tablas_control_acceso.version"
                        control={control_trd}
                        rules={{ required: true }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                size="small"
                                label="Versión"
                                variant="outlined"
                                value={value}
                                InputLabelProps={{ shrink: true }}
                                disabled={true}
                                onChange={onChange}
                                error={!!error}
                                sx={{
                                    backgroundColor: 'white',
                                }}
                            />
                        )}
                    />
                </Grid>


            </Grid>

            <Grid container spacing={2} justifyContent="center" >

                <Grid item xs={12} sm={3.5} marginTop={2} margin={2} >
                    <Controller
                        name="nombre_organigrama"
                        control={control_trd}
                        rules={{ required: true }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                size="small"
                                label="Organigrama"
                                variant="outlined"
                                disabled={true}
                                value={value}
                                InputLabelProps={{ shrink: true }}
                                onChange={onChange}
                                error={!!error}
                                sx={{
                                    backgroundColor: 'white',
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={3} marginTop={2} margin={2} >
                    <Controller
                        name="version_organigrama"
                        control={control_trd}
                        rules={{ required: true }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                size="small"
                                label="Versión"
                                variant="outlined"
                                value={value}
                                InputLabelProps={{ shrink: true }}
                                disabled={true}
                                onChange={onChange}
                                error={!!error}
                                sx={{
                                    backgroundColor: 'white',
                                }}
                            />
                        )}
                    />
                </Grid>


            </Grid>

            <Grid container spacing={2} justifyContent="center" >

                <Grid item xs={12} sm={3.5} marginTop={2} margin={2} >
                    <Controller
                        name="id_unidad_organizacional"
                        control={control_serie_subserie}
                        rules={{ required: true }}
                        render={({
                            field: { onChange },
                            fieldState: { error },
                        }) => (
                            <TextField
                                margin="dense"
                                fullWidth
                                select
                                size="small"
                                label="Sección - Subsección"
                                variant="outlined"
                                disabled={false}
                                value={selected_unidad_organizacional}
                                onChange={(selectedOption) => {
                                    // eslint-disable-next-line @typescript-eslint/naming-convention
                                    const selectedValue = selectedOption.target.value;
                                    set_selected_unidad_organizacional(selectedValue); // 


                                    const selected_serie_subserie = serie_subserie.find((option: IObjSubserieSerie) =>
                                        `${option.id_unidad_organizacional} - ${option.nombre}` === selectedValue
                                    );
                                    set_selected_serie_subserie(selected_serie_subserie);

                                    onChange(selectedOption);

                                    //  console.log('')(serie_subserie);
                                    //  console.log('')('selected_serie_subserie:', selected_serie_subserie);
                                }}
                                error={!!error}
                                sx={{
                                    backgroundColor: 'white',
                                }}
                            >
                                {serie_subserie.map((option: IObjSubserieSerie) => (
                                    <MenuItem key={option.id_unidad_organizacional} value={`${option.id_unidad_organizacional} - ${option.nombre}`}>
                                        {`${option.id_unidad_organizacional} - ${option.nombre}`}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                </Grid>

            </Grid>
            <Grid container spacing={2} justifyContent="center" >
                <Grid item xs={12} sm={6} margin={2}>
                    <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%' }}>
                        <small
                            style={{
                                color: 'black',
                                fontSize: '1rem',

                            }}
                        >
                            PERMISOS DE ADMINISTRACIÓN
                        </small>
                    </label>
                </Grid>
            </Grid>
            {
                (permisos_no_propios.length > 0) &&
                (<Grid container spacing={2} justifyContent="center">
                    {permisos_no_propios.map((permiso: DatosRespuesta, index: number) =>
                        <PermisosNoPropiosShow key={index} permiso={permiso}
                            index={index}
                        />

                    )
                    }
                </Grid>)

            }

            <Grid container spacing={2} justifyContent="center" marginTop={2} >
                <hr
                    style={{
                        width: '100%',
                        border: '0.2px solid gray',
                        margin: '10px auto',
                    }}
                />

                <Grid item xs={12} sm={6} margin={2}>
                    <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%' }}>
                        <small
                            style={{
                                color: 'black',
                                fontSize: '1rem',

                            }}
                        >
                            PERMISOS DE CONTROL DE ACCESO POR CLASIFICACIÓN
                        </small>
                    </label>

                </Grid>
            </Grid>
            <Box sx={{ width: '95%' }}>
                <>
                    <DataGrid
                        density="compact"
                        autoHeight
                        rows={data}
                        columns={columns_acceso_clasificacion}
                        pageSize={10}
                        getRowId={(row) => row.id} rowsPerPageOptions={[10]}
                    />
                </>
            </Box>

            {/* {Array.isArray(permisos_generales) && permisos_generales.length > 0 && (
                <Grid container spacing={2} justifyContent="center">
                    {permisos_generales.map((permiso: PermisosGenerales, index: number) => (
                        <PermisosGeneralesShow key={index} permiso={permiso} index={index} />
                    ))}
                </Grid>
            )} */}

        </Grid>


    )




};


// eslint-disable-next-line no-restricted-syntax
export default ReportesDocumentacionScreen;



