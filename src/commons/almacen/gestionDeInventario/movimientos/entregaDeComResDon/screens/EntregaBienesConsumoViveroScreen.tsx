
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../../../hooks";
import { obtener_consecutivo } from "../thunks/EntregaBienes";
import { Alert, Box, Button, FormHelperText, Grid, Stack, TextField, Typography } from "@mui/material";
import { Title } from "../../../../../../components/Title";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from "react-router-dom";
import AnularEntregaComponent from "./AnularEntrega";
import VistaDetalleEntregaBienes from "./VistaDetalleEntregaBienes";
import BuscarEntradasCRDComponent from "./BuscarEntradasCRD";
import { obtener_tipos_entrada } from "../../../../entradaDeAlmacen/thunks/Entradas";
import { control_error } from "../../../../../../helpers";
import BuscarBodegaComponent from "./BuscarBodega";
import BuscarEntregasCRDComponent from "./BuscarEntregasCRD";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EntregaBienesConsumoViveroScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [user_info, set_user_info] = useState<any>({});
    const [entrada, set_entrada] = useState<any>(null);
    const [bodega, set_bodega] = useState<any>(null);
    const [entrega, set_entrega] = useState<any>(null);
    const [tipos_entrada, set_tipos_entrada] = useState<any>([]);
    const [numero_entrega, set_numero_entrega] = useState<number>(0);
    const [fecha_entrega, set_fecha_entrega] = useState<Dayjs>(dayjs());
    const [msj_error_fecha_entrega, set_msj_error_fecha_entrega] = useState<string>("");
    const [numero_documento, set_numero_documento] = useState<string>("");
    const [tipo, set_tipo] = useState<string>("");
    const [buscar_es_is_active, set_buscar_es_is_active] = useState<boolean>(false);
    const [nombre_bodega, set_nombre_bodega] = useState<string>("");
    const [municipio_bodega, set_municipio_bodega] = useState<string>("");
    const [buscar_bp_is_active, set_buscar_bp_is_active] = useState<boolean>(false);
    const [observaciones, set_observaciones] = useState<string>("");
    const [msj_error_observaciones, set_msj_error_observaciones] = useState<string>("");
    const [actualizar_entrega, set_actualizar_entrega] = useState<boolean>(false);
    const [buscar_entrega_is_active, set_buscar_entrega_is_active] = useState<boolean>(false);
    const [anular_entrega_is_active, set_anular_entrega_is_active] = useState<boolean>(false);
    const [detalle_is_active, set_detalle_is_active] = useState<boolean>(false);
    const [fecha_despacho, set_fecha_despacho] = useState<string>("");

    useEffect(() => {
        obtener_usuario();
        obtener_consecutivo_fc();
        void obtener_tipos_entrada_fc();
    }, []);

    useEffect(() => {
        if (entrada !== null) {
            set_numero_documento(entrada.numero_entrada_almacen);
            set_tipo(tipos_entrada.find((te: any) => te.cod_tipo_entrada === entrada.id_tipo_entrada).nombre);
        }
    }, [entrada]);

    useEffect(() => {
        if (bodega !== null) {
            set_nombre_bodega(bodega.nombre);
            set_municipio_bodega(bodega.cod_municipio);
        }
    }, [bodega]);

    useEffect(() => {
        if (entrega !== null) {
            set_fecha_despacho(dayjs(entrega.fecha_despacho).format("DD/MM/YYYY"))
            set_actualizar_entrega(true);
            //  console.log('')(entrega);
        }
    }, [entrega]);

    const obtener_tipos_entrada_fc = async (): Promise<void> => {
        try {
            const { data: { data: response } } = await obtener_tipos_entrada();
            set_tipos_entrada(response ?? []);
        } catch (err) {
            control_error(err);
        }
    };

    const obtener_usuario: () => void = () => {
        const data = sessionStorage.getItem('persist:macarenia_app');
        if (data !== null) {
            const data_json = JSON.parse(data);
            const data_auth = JSON.parse(data_json.auth);
            set_user_info(data_auth.userinfo);
        }
    };

    const obtener_consecutivo_fc: () => void = () => {
        dispatch(obtener_consecutivo()).then((response: { success: boolean, detail: string, data: number }) => {
            set_numero_entrega(response.data);
        });
    };

    const cambio_fecha_entrega = (date: Dayjs | null): void => {
        if (date !== null) {
            set_fecha_entrega(date);
            set_msj_error_fecha_entrega("");
        } else {
            set_msj_error_fecha_entrega("El campo fecha entrega es obligatorio.");
        }
    };

    const cambio_observaciones: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_observaciones(e.target.value);
        if (e.target.value !== null && e.target.value !== "")
            set_msj_error_observaciones("");
    };

    const detalle_entrega = (): void => {
        set_detalle_is_active(true);
    }

    const salir_entrega = (): void => {
        navigate('/home');
    }

    return (
        <>
            {/* <h1>Entrega de bienes de consumo a vivero</h1> */}
            <Grid
                container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Grid item md={12} xs={12}>
                    <Title title="Entrega" />
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Número entrega"
                                    type={'number'}
                                    size="small"
                                    fullWidth
                                    value={numero_entrega}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                >
                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Fecha entrada"
                                                value={fecha_entrega}
                                                onChange={(newValue) => { cambio_fecha_entrega(newValue); }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        size="small"
                                                        {...params}
                                                        error={msj_error_fecha_entrega !== ""}
                                                    />
                                                )}
                                                maxDate={dayjs()}
                                            />
                                        </LocalizationProvider>
                                        {(msj_error_fecha_entrega !== "") && (<FormHelperText error >{msj_error_fecha_entrega}</FormHelperText>)}

                                    </Grid>
                                </Stack>

                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Grid
                container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Grid item md={12} xs={12}>
                    <Title title="Selección de documento especial de entrada" />
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Número"
                                    type={'number'}
                                    size="small"
                                    fullWidth
                                    value={numero_documento}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Tipo"
                                    type={'text'}
                                    size="small"
                                    fullWidth
                                    value={tipo}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                >
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        startIcon={<SearchIcon />}
                                        onClick={() => { set_buscar_es_is_active(true) }}
                                    >
                                        Búsqueda
                                    </Button>
                                </Stack>
                                {buscar_es_is_active && (<BuscarEntradasCRDComponent is_modal_active={buscar_es_is_active} set_is_modal_active={set_buscar_es_is_active} title={"Búsqueda de entradas por compensaciones, resarcimientos y donaciones"}
                                    set_entrada={set_entrada}></BuscarEntradasCRDComponent>)}
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Grid
                container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Grid item md={12} xs={12}>
                    <Title title="Selección de bodega predeterminada" />
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Nombre"
                                    type={'text'}
                                    size="small"
                                    fullWidth
                                    value={nombre_bodega}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Municipio"
                                    type={'text'}
                                    size="small"
                                    fullWidth
                                    value={municipio_bodega}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                >
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        startIcon={<SearchIcon />}
                                        onClick={() => { set_buscar_bp_is_active(true) }}
                                    >
                                        Búsqueda
                                    </Button>
                                </Stack>
                                {buscar_bp_is_active && (<BuscarBodegaComponent is_modal_active={buscar_bp_is_active} set_is_modal_active={set_buscar_bp_is_active} title={"Buscar bodega principal"} set_bodega={set_bodega}></BuscarBodegaComponent>)}
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            {actualizar_entrega && (
                <Alert sx={{ mb: '10px' }} severity="info" action={
                    <Button color="inherit" size="small" onClick={detalle_entrega}>
                        Ver detalle
                    </Button>
                }>
                    <Typography variant="body1" gutterBottom>
                        Items entregados {fecha_despacho}
                    </Typography>
                </Alert>
            )}
            <Grid
                container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Grid item md={12} xs={12}>
                    <Title title="Observaciones generales" />
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    multiline
                                    rows={2}
                                    value={observaciones}
                                    label="Observación"
                                    size="small"
                                    fullWidth
                                    onChange={cambio_observaciones}
                                    error={msj_error_observaciones !== ""} />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                >
                                    <strong>Entrega realizada por</strong>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                >
                                    {user_info.nombre}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
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
                                            startIcon={<SaveIcon />}
                                            onClick={detalle_entrega}
                                        >
                                            {actualizar_entrega ? 'Actualizar selección de bienes' : 'Selección de bienes'}
                                        </Button>
                                        {detalle_is_active && (<VistaDetalleEntregaBienes is_modal_active={detalle_is_active} set_is_modal_active={set_detalle_is_active} formulario_entrega={undefined}></VistaDetalleEntregaBienes>)}
                                        <Button
                                            color='secondary'
                                            variant='contained'
                                            startIcon={<SearchIcon />}
                                            onClick={() => { set_buscar_entrega_is_active(true) }}
                                        >
                                            Consultar entrega
                                        </Button>
                                        {buscar_entrega_is_active && (<BuscarEntregasCRDComponent is_modal_active={buscar_entrega_is_active} set_is_modal_active={set_buscar_entrega_is_active} title={"Búsqueda de entregas"} set_entrega={set_entrega}></BuscarEntregasCRDComponent>)}
                                        <Button
                                            color='error'
                                            variant='contained'
                                            startIcon={<DeleteForeverIcon />}
                                            onClick={() => { set_anular_entrega_is_active(true) }}
                                            disabled={!actualizar_entrega}
                                        >
                                            Anular
                                        </Button>
                                        {anular_entrega_is_active && (<AnularEntregaComponent
                                            is_modal_active={anular_entrega_is_active} set_is_modal_active={set_anular_entrega_is_active} title={"Anulación de entrega"}
                                            user_info={user_info} id_entrega={numero_entrega}></AnularEntregaComponent>)}
                                        <Button
                                            color='error'
                                            variant='contained'
                                            startIcon={<ClearIcon />}
                                            onClick={salir_entrega}
                                        >
                                            Cancelar
                                        </Button>
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

        </>
    );
};