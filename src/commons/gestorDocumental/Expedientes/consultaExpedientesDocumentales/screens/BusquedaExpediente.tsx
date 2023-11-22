import { Grid, TextField, Box, Button, Stack, InputLabel, FormControl, Select, MenuItem, type SelectChangeEvent } from "@mui/material";
import { Title } from "../../../../../components/Title";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../../hooks";
import { DialogNoticacionesComponent } from "../../../../../components/DialogNotificaciones";
import { obtener_expediente_id_serie, obtener_expediente_simple_id_serie, obtener_trd_actual_retirados } from "../thunks/indexacionExpedientes";
import { obtener_config_expediente, obtener_serie_subserie, obtener_unidades_marcadas } from "../../aperturaExpedientes/thunks/aperturaExpedientes";
import dayjs from "dayjs";
import SearchIcon from '@mui/icons-material/Search';
import BuscarExpediente from "../../indexacionExpedientes/screens/BuscarExpediente";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { VerExpedientes } from "../../ConcesionAccesoExpedientes/screens/VerExpedientes";
import { VerDocumentos } from "../../ConcesionAccesoDocumentos/screens/VerDocumentos";

interface IProps {
    set_expediente: any,
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
    const [año, set_año] = useState<any>("");
    const [tipo_expediente, set_tipo_expediente] = useState<string>("");
    const [abrir_modal_buscar, set_abrir_modal_buscar] = useState<boolean>(false);
    const [abrir_modal_expedientes, set_abrir_modal_expedientes] = useState<boolean>(false);
    const [abrir_modal_documentos, set_abrir_modal_documentos] = useState<boolean>(false);
    const [expediente, set_expediente] = useState<any>(null);
    const [expedientes, set_expedientes] = useState<any>([]);
    // Notificaciones
    const [titulo_notificacion, set_titulo_notificacion] = useState<string>("");
    const [mensaje_notificacion, set_mensaje_notificacion] = useState<string>("");
    const [tipo_notificacion, set_tipo_notificacion] = useState<string>("");
    const [abrir_modal, set_abrir_modal] = useState<boolean>(false);
    const [dialog_notificaciones_is_active, set_dialog_notificaciones_is_active] = useState<boolean>(false);

    const columns: GridColDef[] = [
        {
            field: 'codigo_exp_Agno',
            headerName: 'CÓDIGO',
            sortable: true,
            width: 150,
        },
        {
            field: 'codigo_exp_consec_por_agno',
            headerName: 'TRD',
            sortable: true,
            width: 200,
        },
        {
            field: 'tipologia',
            headerName: 'TITULO',
            width: 200,
        },
        {
            field: 'desde',
            headerName: 'UNIDAD ORGANIZACIONAL',
            width: 200,
        },
        {
            field: 'hasta',
            headerName: 'SERIE',
            width: 200,
        },
        {
            field: 'subserie',
            headerName: 'SUBSERIE',
            width: 200,
        },
        {
            field: 'año',
            headerName: 'AÑO',
            width: 100,
        },
        {
            field: 'persona',
            headerName: 'PERSONA TITULAR',
            width: 200,
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
        if (tdr !== "")
            obtener_unidades_marcadas_fc();
    }, [tdr]);
    useEffect(() => {
        if (seccion !== "")
            obtener_serie_subserie_fc();
    }, [seccion]);

    useEffect(() => {
        // if (serie !== "")
        // obtener_config_expediente_fc();
    }, [serie]);

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
                    lista_con_subseries.push({ id: series, nombre: series.codigo_serie + ' - ' + series.nombre_serie + '/' + series.codigo_subserie + ' - ' + series.nombre_subserie })
                else
                    lista_con_subseries.push({ id: series, nombre: series.codigo_serie + ' - ' + series.nombre_serie })
            });
            set_lt_serie(lista_con_subseries);
        })
    }

    const cambio_tdr: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_serie('');
        set_tipo_expediente('');
        set_seccion('')
        props.set_expediente(null);
        set_tdr(e.target.value);
    }

    const cambio_seccion: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_serie('');
        set_tipo_expediente('');
        props.set_expediente(null);
        set_seccion(e.target.value);
    }

    const cambio_serie: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_tipo_expediente('');
        props.set_expediente(null);
        set_serie(e.target.value);
    }

    const cambio_año: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_año(e.target.value);
    }

    useEffect(() => {
        if (props.limpiar) {
            set_tdr("");
            set_seccion("");
            set_serie("");
            set_lt_seccion([]);
            set_lt_serie([]);
            set_tipo_expediente("");
            set_expediente(null);
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
                                    <FormControl size='small' fullWidth>
                                        <InputLabel>Año</InputLabel>
                                        <Select
                                            label="Año"
                                            value={año}
                                            onChange={cambio_año}
                                        >
                                            {[{ id: 2023, nombre: '2023' }].map((m: any) => (
                                                <MenuItem key={m.id} value={m.id}>
                                                    {m.nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
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
                                    onClick={() => { set_abrir_modal_buscar(true); }}
                                >
                                    Buscar
                                </Button>
                                {abrir_modal_buscar && <BuscarExpediente is_modal_active={abrir_modal_buscar} set_is_modal_active={set_abrir_modal_buscar} set_expediente={set_expediente} serie={serie}></BuscarExpediente>}
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
                            getRowId={(row) => row.orden_en_expediente} />
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
                                    {abrir_modal_expedientes && <VerExpedientes is_modal_active={abrir_modal_expedientes} set_is_modal_active={set_abrir_modal_expedientes}></VerExpedientes>}
                                    <Button
                                        color='primary'
                                        variant='outlined'
                                        startIcon={<VisibilityOutlinedIcon />}
                                        onClick={() => { set_abrir_modal_documentos(true); }}
                                    >
                                        Ver documentos a los que me han dado acceso
                                    </Button>
                                    {abrir_modal_documentos && <VerDocumentos is_modal_active={abrir_modal_documentos} set_is_modal_active={set_abrir_modal_documentos}></VerDocumentos>}
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
                                        onClick={() => { }}
                                    >
                                        Búsqueda avanzada
                                    </Button>
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