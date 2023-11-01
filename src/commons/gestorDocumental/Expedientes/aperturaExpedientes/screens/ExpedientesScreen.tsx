import { Grid, TextField, Box, Button, Stack, FormHelperText, ToggleButton, FormLabel, InputLabel, FormControl, Select, MenuItem, type SelectChangeEvent, Typography, Fab } from "@mui/material";
import { Title } from "../../../../../components/Title";
import { useEffect, useState } from "react";
import { FormularioBuscarPersona } from "./FormularioBuscarPersona";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { obtener_config_expediente, obtener_serie_subserie, obtener_trd_actual, obtener_unidad_organizacional, obtener_unidades_marcadas, obtener_usuario_logueado } from "../thunks/aperturaExpedientes";
import { useAppDispatch } from "../../../../../hooks";
import { useNavigate } from "react-router-dom";
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { AperturaExpedientesScreen } from "./AperturaExpedientesScreen";
import dayOfYear from 'dayjs/plugin/dayOfYear';
dayjs.extend(dayOfYear);
const class_css = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ExpedientesScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const msj_error = "El campo es obligatorio."
    const min_date = dayjs().dayOfYear(1);
    const max_date = dayjs();
    const lt_config_expediente = [{ id: 'S', nombre: 'Simple' }, { id: 'C', nombre: 'Complejo' }];
    const [lt_unidades_org, set_lt_unidades_org] = useState<any[]>([]);
    const [titulo_accion, set_titulo_accion] = useState<string>("Creación de expdientes");
    const [tdr, set_tdr] = useState<any>({});
    const [lt_seccion, set_lt_seccion] = useState<any>([]);
    const [seccion, set_seccion] = useState<string>("");
    const [palabras_clave, set_palabras_clave] = useState<string>("");
    const [lt_palabras_clave, set_lt_palabras_clave] = useState<any>([]);
    const [msj_error_seccion, set_msj_error_seccion] = useState<string>("");
    const [lt_serie, set_lt_serie] = useState<any>([]);
    const [serie, set_serie] = useState<string>("");
    const [msj_error_serie, set_msj_error_serie] = useState<string>("");
    const [tipo_expediente, set_tipo_expediente] = useState<string>("");
    const [msj_error_tipo_expediente, set_msj_error_tipo_expediente] = useState<string>("");
    const [error_fecha_creacion, set_msj_error_fecha_creacion] = useState<boolean>(false);
    const [expediente, set_expediente] = useState<any>(null);
    const [usuario, set_usuario] = useState<any>(null);
    const [fecha_creacion, set_fecha_creacion] = useState<Dayjs>(dayjs());
    const [titulo, set_titulo] = useState<string>("");
    const [msj_error_titulo, set_msj_error_titulo] = useState<string>("");
    const [descripcion, set_descripcion] = useState<string>("");
    const [und_organizacional, set_und_organizacional] = useState<string>("");
    const [msj_error_und_organizacional, set_msj_error_und_organizacional] = useState<string>("");
    const [persona_titular, set_persona_titular] = useState<any>({});
    const [persona_resp, set_persona_resp] = useState<any>({});
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
        if (palabras_clave !== "") {
            set_lt_palabras_clave(palabras_clave.split(',',5));
        }
        else
            set_lt_palabras_clave([]);
    }, [palabras_clave]);

    useEffect(() => {
        if (expediente !== null) {
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

    const cambio_palabras_clave: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        const palabras_clave_before = palabras_clave;
        set_palabras_clave(e.target.value);
        if((palabras_clave_before.match(/\,/g) || []).length > 4){
            
            set_palabras_clave(palabras_clave_before.slice(0, -1))
        }
    };

    const cambio_fecha_creacion = (date: Dayjs | null): void => {
        if (date !== null) {
            set_fecha_creacion(date);
            set_msj_error_fecha_creacion(false);
        } else {
            set_msj_error_fecha_creacion(true);
        }
    };

    return (
        <>
            <Grid
                container
                sx={class_css}
            >
                <AperturaExpedientesScreen set_expediente={set_expediente}></AperturaExpedientesScreen>
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
                                        <Grid item container spacing={3} sx={{ mt: '5px' }}>
                                            <Grid item xs={12} sm={3}>
                                                <TextField
                                                    label="Tipo de documento"
                                                    type={'text'}
                                                    size="small"
                                                    fullWidth
                                                    value={persona_titular.tipo_documento ?? ""}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <TextField
                                                    label="Número documento"
                                                    type={'text'}
                                                    size="small"
                                                    fullWidth
                                                    value={persona_titular.numero_documento ?? ""}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <TextField
                                                    label="Nombre"
                                                    type={'text'}
                                                    size="small"
                                                    fullWidth
                                                    value={persona_titular.nombre_completo ?? ""}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </Grid>
                                            <FormularioBuscarPersona seccion={true} set_persona_titular={set_persona_titular}></FormularioBuscarPersona>
                                        </Grid>
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
                                            sx={{ mt: '15px' }}
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
                                        <Grid item container spacing={3} sx={{ mt: '1px' }}>
                                            <Grid item xs={12} sm={3}>
                                                <TextField
                                                    label="Tipo de documento"
                                                    type={'text'}
                                                    size="small"
                                                    fullWidth
                                                    value={persona_resp.tipo_documento ?? ""}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <TextField
                                                    label="Número documento"
                                                    type={'text'}
                                                    size="small"
                                                    fullWidth
                                                    value={persona_resp.numero_documento ?? ""}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <TextField
                                                    label="Nombre"
                                                    type={'text'}
                                                    size="small"
                                                    fullWidth
                                                    value={persona_resp.nombre_completo ?? ""}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </Grid>
                                            <FormularioBuscarPersona seccion={false} set_persona_responsable={set_persona_resp}></FormularioBuscarPersona>
                                        </Grid>
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
                                                onChange={(newValue) => { cambio_fecha_creacion(newValue); }}
                                                readOnly={false}
                                                renderInput={(params) => (
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        size="small"
                                                        {...params}
                                                        error={error_fecha_creacion}
                                                    />
                                                )}
                                                minDate={min_date}
                                                maxDate={max_date}
                                            />
                                        </LocalizationProvider>
                                        {error_fecha_creacion && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}

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
                                        <TextField
                                            label="Palabras clave"
                                            type={'text'}
                                            size="small"
                                            fullWidth
                                            value={palabras_clave}
                                            onChange={cambio_palabras_clave}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            InputProps={{
                                                readOnly: false,
                                            }}
                                        />
                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                >
                                    <Grid item xs={12} sm={6} sx={{ pointerEvents: 'none' }}>
                                        {lt_palabras_clave.map((lt: any, index: number) => (
                                            <Fab key={index} size="small" variant="extended" sx={{marginX: '2px', marginY: '1px'}}>
                                                {lt}
                                            </Fab>
                                        ))}

                                    </Grid>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>}
            <Grid container>
                <Grid item xs={12} sm={4}>
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
                                variant='contained'
                                startIcon={<SearchIcon />}
                                onClick={() => {
                                    //     set_buscar_programacion_is_active(true);
                                    //     set_title_programacion('Buscar programación de computadores');
                                }}
                            >
                                Buscar expediente
                            </Button>
                            {/* {buscar_programacion_is_active && (
                                <BuscarProgramacionComponent
                                    is_modal_active={buscar_programacion_is_active}
                                    set_is_modal_active={set_buscar_programacion_is_active}
                                    title={title_programacion}
                                    prog_details={set_prog_details}
                                    parent_details={set_details_state} 
                                    tipo_articulo={"computadores"}/>
                            )} */}
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
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
                                color='success'
                                variant='contained'
                                startIcon={<SaveIcon />}
                                onClick={() => { }}
                            >
                                Guardar
                            </Button>
                            <Button
                                // color='inherit'
                                variant="outlined"
                                startIcon={<CleanIcon />}
                                onClick={() => { }}
                            >
                                Limpiar
                            </Button>
                            <Button
                                sx={{background: '#ff9800'}}
                                variant='contained'
                                startIcon={<ClearIcon />}
                                onClick={() => { }}
                            >
                                Anular expediente
                            </Button>
                            <Button
                                variant='contained'
                                startIcon={<ClearIcon />}
                                onClick={() => { }}
                                sx={{background: '#ff6961'}}
                            >
                                Borrar expediente
                            </Button>
                            <Button
                                color="error"
                                variant='contained'
                                startIcon={<ClearIcon />}
                                onClick={() => { }}
                            >
                                Salir
                            </Button>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}