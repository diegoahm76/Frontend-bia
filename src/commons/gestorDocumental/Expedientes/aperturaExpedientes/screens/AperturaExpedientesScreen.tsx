import { Grid, TextField, Box, Button, Stack, FormHelperText, ToggleButton, FormLabel, InputLabel, FormControl, Select, MenuItem, type SelectChangeEvent, Typography } from "@mui/material";
import { Title } from "../../../../../components/Title";
import { useEffect, useState } from "react";
import { FormularioBuscarPersona } from "./FormularioBuscarPersona";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { obtener_config_expediente, obtener_serie_subserie, obtener_trd_actual, obtener_unidad_organizacional, obtener_unidades_marcadas, obtener_usuario_logueado } from "../thunks/aperturaExpedientes";
import { useAppDispatch } from "../../../../../hooks";
import { useNavigate } from "react-router-dom";
import { obtener_unidades_organizacionales } from "../../../../almacen/tablerosControlAlmacen/thunks/tablerosControlAlmacen";

const class_css = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AperturaExpedientesScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const lt_config_expediente = [{ id: 'S', nombre: 'Simple' }, { id: 'C', nombre: 'Complejo' }];
    const [lt_unidades_org, set_lt_unidades_org] = useState<any[]>([]);
    const [titulo_accion, set_titulo_accion] = useState<string>("Creación de expdientes");
    const [tdr, set_tdr] = useState<any>({});
    const [lt_seccion, set_lt_seccion] = useState<any>([]);
    const [seccion, set_seccion] = useState<string>("");
    const [msj_error_seccion, set_msj_error_seccion] = useState<string>("");
    const [lt_serie, set_lt_serie] = useState<any>([]);
    const [serie, set_serie] = useState<string>("");
    const [msj_error_serie, set_msj_error_serie] = useState<string>("");
    const [tipo_expediente, set_tipo_expediente] = useState<string>("");
    const [msj_error_tipo_expediente, set_msj_error_tipo_expediente] = useState<string>("");
    const [expediente, set_expediente] = useState<any>(null);
    const [usuario, set_usuario] = useState<any>(null);
    const [fecha_creacion, set_fecha_creacion] = useState<Dayjs>(dayjs());
    const [titulo, set_titulo] = useState<string>("");
    const [msj_error_titulo, set_msj_error_titulo] = useState<string>("");
    const [descripcion, set_descripcion] = useState<string>("");
    const [und_organizacional, set_und_organizacional] = useState<string>("");
    const [msj_error_und_organizacional, set_msj_error_und_organizacional] = useState<string>("");

    useEffect(() => {
        obtener_trd_actual_fc();
    }, []);

    useEffect(() => {
        if (seccion !== "")
            obtener_serie_subserie_fc();
    }, [seccion]);

    useEffect(() => {
        if (serie !== "")
            obtener_config_expediente_fc();
    }, [serie]);

    useEffect(() => {
        if (expediente !== null){
            obtener_unidad_organizacional_fc();
            obtener_usuario_logueado_fc();
        }
    }, [expediente]);


    const obtener_trd_actual_fc: () => void = () => {
        dispatch(obtener_trd_actual()).then((response: any) => {
            set_tdr(response.data);
            dispatch(obtener_unidades_marcadas(response.data.id_organigrama)).then((response: any) => {
                set_lt_seccion(response.data);
            })
        })
    }
    const obtener_serie_subserie_fc: () => void = () => {
        dispatch(obtener_serie_subserie(tdr.id_trd, seccion)).then((response: any) => {
            set_lt_serie(response.data);
        })
    }

    const obtener_config_expediente_fc: () => void = () => {
        dispatch(obtener_config_expediente(serie)).then((response: any) => {
            set_tipo_expediente(response.data.cod_tipo_expediente);
            set_expediente(response.data);
        })
    }

    const obtener_unidad_organizacional_fc: () => void = () => {
        dispatch(obtener_unidad_organizacional()).then((response: any) => {
            set_lt_unidades_org(response.data);
        })
    }

    const obtener_usuario_logueado_fc: () => void = () => {
        dispatch(obtener_usuario_logueado()).then((response: any) => {
            set_usuario(response);
            set_und_organizacional(response.id_unidad_organizacional_actual)
        })
    }

    const cambio_seccion: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_serie("");
        set_seccion(e.target.value);
        if (e.target.value !== null && e.target.value !== "")
            set_msj_error_seccion("");
    }

    const cambio_serie: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_serie(e.target.value);
        if (e.target.value !== null && e.target.value !== "")
            set_msj_error_serie("");
    }
    const cambio_tipo_expediente: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_serie(e.target.value);
        if (e.target.value !== null && e.target.value !== "")
            set_msj_error_tipo_expediente("");
    }

    const cambio_und_organizacional: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_und_organizacional(e.target.value);
        if (e.target.value !== null && e.target.value !== "")
            set_msj_error_und_organizacional("");
    }

    const cambio_titulo: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_titulo(e.target.value);
        if (e.target.value !== null && e.target.value !== "")
            set_msj_error_titulo("");
    };

    const cambio_descripcion: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_descripcion(e.target.value);
    };

    return (
        <>
            <Grid
                container
                sx={class_css}
            >
                <Grid item md={12} xs={12}>
                    <Title title="Apertura de expedientes electrónicos documentales" />
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                >
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="TDR - actual"
                                            type={'text'}
                                            size="small"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            fullWidth
                                            value={tdr.nombre ?? ""}
                                        />
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
                                                {m.nombre}
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
                                            <MenuItem key={m.id_catserie_unidadorg} value={m.id_catserie_unidadorg}>
                                                {m.nombre_unidad_organizacional}
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
                                    <Grid item xs={12} sm={6}>
                                        <FormControl size='small' fullWidth>
                                            <InputLabel>Tipo de expedientes</InputLabel>
                                            <Select
                                                label="Tipo de expedientes"
                                                value={tipo_expediente}
                                                onChange={cambio_tipo_expediente}
                                            >
                                                {lt_config_expediente.map((m: any) => (
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
                    </Box>
                </Grid>
            </Grid>
            {expediente !== null && <Grid
                container
                sx={class_css}
            >
                <Grid item md={12} xs={12}>
                    <Title title={titulo_accion} />
                    <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                >
                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            label="Año de creación"
                                            type={'text'}
                                            size="small"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            fullWidth
                                            value={fecha_creacion.format('YYYY')}
                                        />
                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Titulo"
                                    type={'text'}
                                    size="small"
                                    required
                                    InputProps={{
                                        readOnly: false,
                                    }}
                                    onChange={cambio_titulo}
                                    fullWidth
                                    value={titulo}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Descripción"
                                    type={'text'}
                                    size="small"
                                    InputProps={{
                                        readOnly: false,
                                    }}
                                    onChange={cambio_descripcion}
                                    fullWidth
                                    value={descripcion}
                                />
                            </Grid>
                            {expediente.expediente.length != 0 && <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                >
                                    <Grid item xs={12} sm={10}>
                                        <Title title="Persona titular" />
                                        <FormularioBuscarPersona></FormularioBuscarPersona>
                                    </Grid>
                                </Stack>
                            </Grid>}
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                >
                                    <Grid item xs={12} sm={10}>
                                        <Title title="Responsabilidad del expediente" />
                                        <Stack
                                            direction="row"
                                            justifyContent="center"
                                            spacing={2}
                                            sx={{ mt: '10px' }}
                                        >
                                            <Grid item xs={12} sm={6}>
                                                <FormControl required size='small' fullWidth>
                                                    <InputLabel>Unidad organizacional responsable</InputLabel>
                                                    <Select
                                                        label="Unidad organizacional responsable"
                                                        value={und_organizacional}
                                                        onChange={cambio_und_organizacional}
                                                        required
                                                    >
                                                        {lt_unidades_org.map((lt: any) => (
                                                            <MenuItem key={lt.id_unidad_organizacional} value={lt.id_unidad_organizacional}>
                                                                {lt.nombre}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Stack>
                                        <Typography sx={{ fontSize: '18px', fontWeight: '500' }}>Persona responsable</Typography>
                                        <FormularioBuscarPersona></FormularioBuscarPersona>
                                    </Grid>
                                </Stack>
                                <Grid item xs={12} sm={6}>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                    spacing={2}
                                    sx={{ mt: '10px' }}
                                >
                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Fecha creación expediente"
                                                value={fecha_creacion}
                                                onChange={(newValue) => { }}
                                                readOnly={true}
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
                            <Grid item xs={12} sm={6}>
                                <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                    spacing={2}
                                    sx={{ mt: '5px' }}

                                >
                                    <Grid item xs={12} sm={3}>
                                        <Typography sx={{ fontSize: '18px', fontWeight: '500' }}> Ubicación física</Typography>
                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <Stack
                                    direction="row"
                                    justifyContent="flex-start"
                                    spacing={2}
                                >
                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            color='primary'
                                            variant='contained'
                                            onClick={() => { }}
                                        >
                                            Agregar
                                        </Button>
                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                >
                                    <Grid item xs={12} sm={6}>
                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                >
                                    <Grid item xs={12} sm={6}>
                                    </Grid>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>}
        </>
    )
}