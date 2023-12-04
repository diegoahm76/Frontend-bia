import { Grid, TextField, Box, Button, Stack, InputLabel, FormControl, Select, MenuItem, type SelectChangeEvent } from "@mui/material";
import { Title } from "../../../../../components/Title";
import { SetStateAction, useEffect, useState } from "react";
import { useAppDispatch } from "../../../../../hooks";
import { DialogNoticacionesComponent } from "../../../../../components/DialogNotificaciones";
import { buscar_expediente_id, obtener_config_expediente, obtener_serie_subserie, obtener_unidades_marcadas } from "../../aperturaExpedientes/thunks/aperturaExpedientes";
import dayjs, { Dayjs } from "dayjs";
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { VerExpedientes } from "../../ConcesionAcceso/screens/VerExpedientes";
import { VerDocumentos } from "../../ConcesionAcceso/screens/VerDocumentos";
import { obtener_trd_actual_retirados } from "../../indexacionExpedientes/thunks/indexacionExpedientes";
// import { expedientes_por_filtros, obtener_documentos_expediente } from "../thunks/ConsultaExpedientes";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BuscarExpediente from "./BuscarExpediente";
// import { expedientes_por_filtros } from "../thunks/ConsultaExpedientes";

interface IProps {
    set_expediente: any,
    set_documento: any,
    limpiar: boolean
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaExpediente: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [tdr, set_tdr] = useState<any>("");
    const [lt_tdr, set_lt_tdr] = useState<any[]>([]);
    const [lt_seccion, set_lt_seccion] = useState<any>([]);
    const [seccion, set_seccion] = useState<string>("");
    const [lt_serie, set_lt_serie] = useState<any>([]);
    const [serie, set_serie] = useState<any>("");
    const [año, set_año] = useState<any>(null);
    const [abrir_modal_expedientes, set_abrir_modal_expedientes] = useState<boolean>(false);
    const [abrir_modal_documentos, set_abrir_modal_documentos] = useState<boolean>(false);
    const [expediente, set_expediente] = useState<any>(null);
    const [documento, set_documento] = useState<any>(null);
    const [expedientes, set_expedientes] = useState<any>([]);
    // Notificaciones
    const [titulo_notificacion, set_titulo_notificacion] = useState<string>("");
    const [mensaje_notificacion, set_mensaje_notificacion] = useState<string>("");
    const [tipo_notificacion, set_tipo_notificacion] = useState<string>("");
    const [abrir_modal, set_abrir_modal] = useState<boolean>(false);
    const [dialog_notificaciones_is_active, set_dialog_notificaciones_is_active] = useState<boolean>(false);
    const [buscar_expediente_active, set_buscar_expediente_active] = useState<boolean>(false);

    const columns: GridColDef[] = [
        {
            field: 'codigo_exp_und_serie_subserie',
            headerName: 'CÓDIGO',
            sortable: true,
            width: 150,
        },
        {
            field: 'nombre_trd_origen',
            headerName: 'TRD',
            sortable: true,
            width: 200,
        },
        {
            field: 'titulo_expediente',
            headerName: 'TITULO',
            width: 200,
        },
        {
            field: 'nombre_unidad_org',
            headerName: 'UNIDAD ORGANIZACIONAL',
            width: 200,
        },
        {
            field: 'nombre_serie_origen',
            headerName: 'SERIE',
            width: 200,
        },
        {
            field: 'nombre_subserie_origen',
            headerName: 'SUBSERIE',
            width: 200,
            valueGetter: (params) => params.row.nombre_subserie_origen ?? 'N/A',
        },
        {
            field: 'codigo_exp_Agno',
            headerName: 'AÑO',
            width: 100,
        },
        {
            field: 'nombre_persona_titular',
            headerName: 'PERSONA TITULAR',
            width: 200,
            valueGetter: (params) => params.row.nombre_persona_titular ?? 'N/A',
        }
    ];
    const generar_notificación_reporte = (titulo: string, tipo: string, mensaje: string, active: boolean) => {
        set_titulo_notificacion(titulo);
        set_tipo_notificacion(tipo);
        set_mensaje_notificacion(mensaje)
        set_dialog_notificaciones_is_active(active);
        set_abrir_modal(active);
    }

    useEffect(() => {
        obtener_trd_actual_fc();
    }, []);

    useEffect(() => {
        props.set_expediente(expediente);
    }, [expediente]);
    useEffect(() => {
        props.set_documento(documento);
    }, [documento]);

    useEffect(() => {
        if (tdr !== "")
            obtener_unidades_marcadas_fc();
    }, [tdr]);
    
    useEffect(() => {
        if (seccion !== "")
            obtener_serie_subserie_fc();
    }, [seccion]);

    const obtener_trd_actual_fc: () => void = () => {
        dispatch(obtener_trd_actual_retirados()).then((response: any) => {
            set_lt_tdr(response.data);
        })
    }
    const obtener_unidades_marcadas_fc: () => void = () => {
        dispatch(obtener_unidades_marcadas(tdr.id_organigrama)).then((response: any) => {
            set_lt_seccion(response.data);
        })
    }
    const obtener_serie_subserie_fc: () => void = () => {
        dispatch(obtener_serie_subserie(tdr.id_trd, seccion)).then((response: any) => {
            let lista_con_subseries: { id: any; nombre: string; }[] = [];
            response.data.forEach((series: any) => {
                if (series.codigo_subserie !== null)
                    lista_con_subseries.push({ id: series.id_catserie_unidadorg, nombre: series.codigo_serie + ' - ' + series.nombre_serie + '/' + series.codigo_subserie + ' - ' + series.nombre_subserie })
                else
                    lista_con_subseries.push({ id: series.id_catserie_unidadorg, nombre: series.codigo_serie + ' - ' + series.nombre_serie })
            });
            set_lt_serie(lista_con_subseries);
        })
    }
    const expedientes_por_filtros_fc: () => void = () => {
        const año_local =  año !== null ? año.format('YYYY') : '';
        // dispatch(expedientes_por_filtros(tdr?.id_trd ?? '', seccion, serie, año_local)).then((response: any) => {
        //     set_expedientes(response.data);
        // })
    }
    const cambio_tdr: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_serie('');
        set_seccion('');
        set_expediente(null);
        set_tdr(e.target.value);
    }

    const cambio_seccion: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_serie('');
        set_expediente(null);
        set_seccion(e.target.value);
    }

    const cambio_serie: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_expediente(null);
        set_serie(e.target.value);
    }

    const cambio_año = (date: Dayjs | null): void => {
        set_año(date);
    }

    const seleccion_expediente_grid = (seleccion_expediente: any): void => {
        const expediente_local = expedientes.find((e: any) => e.id_expediente_documental === seleccion_expediente[0]);
        if(expediente_local !== undefined){
            dispatch(buscar_expediente_id(expediente_local.id_expediente_documental)).then((response: any) => {
                response.success ? set_expediente(response.data) : set_expediente(null);     
            });
            // dispatch(obtener_documentos_expediente(expediente_local.id_expediente_documental, '', '', '')).then(((response: any) => {
            //     response.data !== null ? props.set_documento(response.data) : props.set_documento(null);
            // }));
        }
    }

    useEffect(() => {
        if (props.limpiar) {
            set_tdr("");
            set_seccion("");
            set_serie("");
            set_lt_seccion([]);
            set_lt_serie([]);
            set_expedientes([]);
            set_expediente(null);
            set_documento(null);
            set_año(null);
        }
    }, [props.limpiar]);


    return (
        <>
            <Grid item md={12} xs={12}>
                <Title title="Búsqueda de expedientes" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Stack
                                direction="row"
                                justifyContent="center"
                            >
                                <Grid item xs={12} sm={6}>
                                    <FormControl size='small' fullWidth>
                                        <InputLabel>TDR - actual</InputLabel>
                                        <Select
                                            label="TDR - actual"
                                            value={tdr ?? ""}
                                            onChange={cambio_tdr}
                                            readOnly={false}
                                        >
                                            {lt_tdr.map((m: any) => (
                                                <MenuItem key={m} value={m}>
                                                    {m.nombre + ' - '}{m.version}{m.fecha_retiro_produccion !== null ? ' - ' + dayjs(m.fecha_retiro_produccion).format('DD/MM/YYYY') : ' - Actual'}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl size='small' fullWidth>
                                <InputLabel>Sección</InputLabel>
                                <Select
                                    label="Sección"
                                    value={seccion}
                                    onChange={cambio_seccion}
                                >
                                    {lt_seccion.map((m: any) => (
                                        <MenuItem key={m.id_unidad_organizacional} value={m.id_unidad_organizacional}>
                                            {m.codigo_unidad_org_actual_admin_series + ' - '}{m.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl size='small' fullWidth>
                                <InputLabel>Serie - subserie</InputLabel>
                                <Select
                                    label="Serie - subserie"
                                    value={serie}
                                    onChange={cambio_serie}
                                >
                                    {lt_serie.map((m: any) => (
                                        <MenuItem key={m.id} value={m.id}>
                                            {m.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Stack
                                direction="row"
                                justifyContent="center"
                            >
                                <Grid item xs={12} sm={3}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Año"
                                         openTo="year"
                                        value={año}
                                        views={['year']}
                                        onChange={(newValue) => { cambio_año(newValue); }}
                                        renderInput={(params) => (
                                            <TextField
                                                fullWidth
                                                size="small"
                                                {...params}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                                </Grid>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Box
                            component="form"
                            sx={{ mt: '20px', mb: '20px' }}
                            noValidate
                            autoComplete="off"
                        >
                            <Stack
                                direction="row"
                                justifyContent="flex-end"
                                spacing={2}
                                sx={{ mt: '20px' }}
                            >
                                <Button
                                    color='primary'
                                    variant='contained'
                                    startIcon={<SearchIcon />}
                                    onClick={() => { expedientes_por_filtros_fc(); }}
                                >
                                    Buscar
                                </Button>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <DataGrid
                            density="compact"
                            autoHeight
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            rows={expedientes}
                            getRowId={(row) => row.id_expediente_documental} 
                            onSelectionModelChange={seleccion_expediente_grid}
                            />
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={9}>
                            <Box
                                component="form"
                                sx={{ mt: '20px', mb: '20px' }}
                                noValidate
                                autoComplete="off"
                            >
                                <Stack
                                    direction="row"
                                    justifyContent="flex-start"
                                    spacing={2}
                                    sx={{ mt: '20px' }}
                                >
                                    <Button
                                        color='primary'
                                        variant='outlined'
                                        startIcon={<VisibilityOutlinedIcon />}
                                        onClick={() => { set_abrir_modal_expedientes(true); }}
                                    >
                                        Ver expedientes a los que me han dado acceso
                                    </Button>
                                    {abrir_modal_expedientes && <VerExpedientes is_modal_active={abrir_modal_expedientes} set_is_modal_active={set_abrir_modal_expedientes} set_expediente={set_expediente} set_documento={set_documento}></VerExpedientes>}
                                    <Button
                                        color='primary'
                                        variant='outlined'
                                        startIcon={<VisibilityOutlinedIcon />}
                                        onClick={() => { set_abrir_modal_documentos(true); }}
                                    >
                                        Ver documentos a los que me han dado acceso
                                    </Button>
                                    {abrir_modal_documentos && <VerDocumentos is_modal_active={abrir_modal_documentos} set_is_modal_active={set_abrir_modal_documentos} set_expediente={set_expediente} set_documento={set_documento}></VerDocumentos>}
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box
                                component="form"
                                sx={{ mt: '20px', mb: '20px' }}
                                noValidate
                                autoComplete="off"
                            >
                                <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                    spacing={2}
                                    sx={{ mt: '20px' }}
                                >
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        startIcon={<SearchIcon />}
                                        onClick={() => { set_buscar_expediente_active(true) }}
                                    >
                                        Búsqueda avanzada
                                    </Button>
                                    {buscar_expediente_active && <BuscarExpediente is_modal_active={buscar_expediente_active} set_is_modal_active={set_buscar_expediente_active} set_expediente={set_expediente} set_documento={set_documento}></BuscarExpediente>}
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            {dialog_notificaciones_is_active && (
                <DialogNoticacionesComponent
                    titulo_notificacion={titulo_notificacion}
                    abrir_modal={abrir_modal}
                    tipo_notificacion={tipo_notificacion}
                    mensaje_notificacion={mensaje_notificacion}
                    abrir_dialog={set_abrir_modal} />
            )}
        </>
    )
}