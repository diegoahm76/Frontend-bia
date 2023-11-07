import { Grid, TextField, Box, Button, Stack, FormHelperText, InputLabel, FormControl, Select, MenuItem, type SelectChangeEvent, Typography, Fab, InputAdornment, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Title } from "../../../../../components/Title";
import { useEffect, useState } from "react";
import { FormularioBuscarPersona } from "./FormularioBuscarPersona";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { actualizar_expediente, borrar_expediente, buscar_expediente_id, buscar_persona, crear_expediente, obtener_unidad_organizacional, obtener_usuario_logueado } from "../thunks/aperturaExpedientes";
import { useAppDispatch } from "../../../../../hooks";
import { useNavigate } from "react-router-dom";
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { AperturaExpedientesScreen } from "./AperturaExpedientesScreen";
import dayOfYear from 'dayjs/plugin/dayOfYear';
import AnularExpedienteModal from "./AnularExpediente";
import BuscarExpediente from "./BuscarExpediente";
import MoverCarpeta from "../../../deposito/Carpetas/components/MoverCarpeta";
import { useForm } from "react-hook-form";
import { IObjCarpeta } from "../../../deposito/interfaces/deposito";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
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
    const [open_modal, set_open_modal] = useState(false);
    const { control: control_carpeta_destino, reset: reset_carpeta_destino, getValues: get_values_carpeta_destino, handleSubmit: handle_submit_carpeta_destino } = useForm<IObjCarpeta>();
    const msj_error = "El campo es obligatorio."
    const min_date = dayjs().dayOfYear(1);
    const max_date = dayjs();
    const [lt_unidades_org, set_lt_unidades_org] = useState<any[]>([]);
    const [palabras_clave, set_palabras_clave] = useState<string>("");
    const [lt_palabras_clave, set_lt_palabras_clave] = useState<any>([]);
    const [error_fecha_creacion, set_msj_error_fecha_creacion] = useState<boolean>(false);
    const [expediente, set_expediente] = useState<any>(null);
    const [usuario, set_usuario] = useState<any>(null);
    const [fecha_creacion, set_fecha_creacion] = useState<Dayjs>(dayjs());
    const [titulo, set_titulo] = useState<string>("");
    const [msj_error_titulo, set_msj_error_titulo] = useState<boolean>(false);
    const [descripcion, set_descripcion] = useState<string>("");
    const [und_organizacional, set_und_organizacional] = useState<string>("");
    const [msj_error_und_organizacional, set_msj_error_und_organizacional] = useState<boolean>(false);
    const [persona_titular, set_persona_titular] = useState<any>({});
    const [persona_resp, set_persona_resp] = useState<any>({});
    const [carpetas, set_carpetas] = useState<any>([]);
    const [abrir_modal_anular, set_abrir_modal_anular] = useState<boolean>(false);
    const [abrir_modal_buscar, set_abrir_modal_buscar] = useState<boolean>(false);
    const [limpiar, set_limpiar] = useState<boolean>(false);
    // Sección apertura
    const [tdr, set_tdr] = useState<any>({});
    const [seccion, set_seccion] = useState<string>("");
    const [serie, set_serie] = useState<any>("");
    const [expanded, set_expanded] = useState<string | false>('panel1');
    const handle_close_buscar = () => {
        set_open_modal(false);
    };

    const handle_mover_carpeta = (carpeta_mover: any) => {
        reset_carpeta_destino(carpeta_mover);
        let carpetas_new = carpetas;
        carpetas_new.push({ ruta: carpeta_mover.identificacion_caja + ' > ' + carpeta_mover.identificacion_bandeja + ' > ' + carpeta_mover.identificacion_estante + ' > ' + carpeta_mover.identificacion_deposito, carpetas: [{id_carpeta_caja: carpeta_mover.id_carpeta, carpeta: carpeta_mover.identificacion_carpeta}]});
        set_carpetas([...carpetas_new]);
    };

    useEffect(() => {
        if (palabras_clave !== "")
            set_lt_palabras_clave(palabras_clave.split(',', 5));
        else
            set_lt_palabras_clave([]);
    }, [palabras_clave]);

    useEffect(() => {
        if (expediente !== null && expediente.expediente.length !== 0) {
            set_titulo(expediente.expediente[0].titulo_expediente);
            set_descripcion(expediente.expediente[0].descripcion_expediente);
            set_fecha_creacion(dayjs(expediente.expediente[0].fecha_apertura_expediente));
            set_und_organizacional(expediente.expediente[0].id_und_org_oficina_respon_actual);
            set_palabras_clave(expediente.expediente[0].palabras_clave_expediente.replace(/\|/g, ','));

            if(expediente.expediente[0]?.carpetas_caja?.length > 0)
                crear_obj_carpetas(expediente.expediente[0]);
            
            if (expediente.expediente[0].id_persona_responsable_actual !== null) {
                dispatch(buscar_persona(expediente.expediente[0].tipo_documento_persona_responsable_actual, expediente.expediente[0].nro_documento_persona_responsable_actual)).then((response: any) => {
                    set_persona_resp(response.data[0]);
                })
            } else
                set_persona_resp({});

            if (expediente.expediente[0].id_persona_titular_exp_complejo !== null) {
                dispatch(buscar_persona(expediente.expediente[0].tipo_documento_persona_titular_exp_complejo, expediente.expediente[0].nro_documento_persona_titular_exp_complejo)).then((response: any) => {
                    set_persona_titular(response.data[0]);
                })
            } else
                set_persona_titular({});

            obtener_unidad_organizacional_fc();
            obtener_usuario_logueado_fc();
        } else if (expediente !== null) {
            obtener_unidad_organizacional_fc();
            obtener_usuario_logueado_fc();
        }
    }, [expediente]);

    const obtener_unidad_organizacional_fc: () => void = () => {
        dispatch(obtener_unidad_organizacional()).then((response: any) => {
            set_lt_unidades_org(response.data);
        })
    }

    const borrar_expediente_fc: () => void = () => {
        dispatch(borrar_expediente(expediente.expediente[0].id_expediente_documental)).then((response: any) => {
            if (response.success)
                limpiar_formulario();
        });
    }

    const obtener_usuario_logueado_fc: () => void = () => {
        dispatch(obtener_usuario_logueado()).then((response: any) => {
            set_usuario(response);
            set_und_organizacional(response.id_unidad_organizacional_actual)
        })
    }

    const cambio_und_organizacional: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_und_organizacional(e.target.value);
        set_msj_error_und_organizacional(!(e.target.value !== null && e.target.value !== ""));
    }

    const handle_change = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        set_expanded(newExpanded ? panel : false);
    };

    const buscar_expediente: any = (expediente: any) => {
        dispatch(buscar_expediente_id(expediente.id_expediente_documental)).then(((response: any) =>{
            if(response.data !== null && response.data !== undefined)
                set_expediente({expediente: [response.data]});
            else
                set_expediente(null);
        }));
    }

    const crear_obj_carpetas: any = (expediente: any) => {
        let obj_carpetas: { ruta: string; carpetas: any; }[] = [];
        expediente?.carpetas_caja.forEach((dp: any) => {
            dp.estantes?.forEach((st: any) => {
                st.bandejas?.forEach((bj: any) => {
                    bj.cajas?.forEach((cj: any) => {
                        obj_carpetas.push({ ruta: dp.deposito + ' > ' + st.estante + ' > ' + bj.bandeja + ' > ' + cj.caja, carpetas: cj.carpetas })
                    });
                });
            });
        });
        set_carpetas(obj_carpetas);
    }

    const cambio_titulo: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_titulo(e.target.value);
        set_msj_error_titulo(!(e.target.value !== null && e.target.value !== ""));
    }

    const cambio_descripcion: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_descripcion(e.target.value);
    }

    const cambio_palabras_clave: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        const palabras_clave_before = palabras_clave;
        set_palabras_clave(e.target.value);
        if ((palabras_clave_before.match(/\,/g) || []).length > 4)
            set_palabras_clave(palabras_clave_before.slice(0, -1))
    }

    const cambio_fecha_creacion = (date: Dayjs | null): void => {
        if (date !== null)
            set_fecha_creacion(date);
        set_msj_error_fecha_creacion(!(date !== null));
    }

    const limpiar_formulario = (): void => {
        set_limpiar(true);
    }

    const salir_expediente: () => void = () => {
        navigate('/home');
    }

    const crear_obj_expediente = (): void => {
        if (expediente.expediente.length === 0) {
            const expediente_obj = {
                "titulo_expediente": titulo,
                "descripcion_expediente": descripcion,
                "id_unidad_org_oficina_respon_original": und_organizacional,
                "id_und_org_oficina_respon_actual": und_organizacional,
                "id_persona_responsable_actual": persona_resp?.id_persona,
                "fecha_apertura_expediente": fecha_creacion.format('YYYY-MM-DD'),
                "palabras_clave_expediente": palabras_clave.replace(/,/g, '|'),
                "cod_tipo_expediente": expediente?.cod_tipo_expediente,
                "carpetas_caja": carpetas.length === 0 ? [] : carpetas?.map((obj: any) => obj.carpetas.map((obj_carp: any) => obj_carp.id_carpeta_caja))[0],
                "id_cat_serie_und_org_ccd_trd_prop": serie.id_catserie_unidadorg,//tripeta serie
                "id_trd_origen": tdr.id_trd,
                "id_und_seccion_propietaria_serie": seccion,
                "id_serie_origen": serie?.id_serie_doc, // se obtiene del objeto de la tripleta
                "id_subserie_origen": serie?.id_subserie_doc,
                "id_persona_titular_exp_complejo": expediente?.cod_tipo_expediente === 'C' ? persona_titular.id_persona : null
            }
            dispatch(crear_expediente(expediente_obj)).then((response: any) => {
                if (response.success)
                    buscar_expediente(response.data);
            });
        } else {
            const expediente_obj = {
                "palabras_clave_expediente": palabras_clave.replace(/,/g, '|'),
                "carpetas_caja":  carpetas.length === 0 ? [] : carpetas?.map((obj: any) => obj.carpetas.map((obj_carp: any) => obj_carp.id_carpeta_caja))[0],
                "descripcion_expediente": descripcion,
                "fecha_apertura_expediente": fecha_creacion.format('YYYY-MM-DD'),
            }
            dispatch(actualizar_expediente(expediente?.expediente[0].id_expediente_documental, expediente_obj)).then((response: any) => {
                if (response.success)
                    buscar_expediente(response.data);;
            });
        }
    };

    useEffect(() => {
        if (limpiar) {
            set_und_organizacional("");
            set_titulo("");
            set_descripcion("");
            set_persona_resp({});
            set_persona_titular({});
            set_fecha_creacion(dayjs());
            set_palabras_clave("");
            set_lt_palabras_clave([]);
            set_carpetas([]);
            set_expediente(null);
            set_limpiar(false);
        }
    }, [limpiar]);

    const eliminar_carpeta = (index: number, sub_index: number): void => {
        let carpetas_local = [...carpetas];
        carpetas_local[index].carpetas.splice(sub_index, 1);
        if(carpetas_local[index].carpetas.length === 0)
            carpetas_local.splice(index, 1);

        set_carpetas([...carpetas_local]);
    }

    return (
        <>
            <Grid
                container
                sx={class_css}
            >
                <AperturaExpedientesScreen set_limpiar={limpiar} set_expediente={set_expediente} set_serie={set_serie} set_seccion={set_seccion} set_tdr={set_tdr}></AperturaExpedientesScreen>
            </Grid>
            {expediente !== null && <Grid
                container
                sx={class_css}
            >
                <Grid item md={12} xs={12}>
                    <Title title={expediente.expediente.length === 0 ? 'Creación de expedientes' : 'Actualización de expediente'} />
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
                                        readOnly: expediente?.expediente.length !== 0,
                                    }}
                                    onChange={cambio_titulo}
                                    fullWidth
                                    value={titulo}
                                    error={msj_error_titulo}
                                />
                                {msj_error_titulo && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Descripción"
                                    type={'text'}
                                    size="small"
                                    InputProps={{
                                        readOnly: (expediente?.expediente.length !== 0 && expediente?.expediente[0].creado_automaticamente),
                                    }}
                                    onChange={cambio_descripcion}
                                    fullWidth
                                    value={descripcion}
                                />
                            </Grid>
                            {expediente?.cod_tipo_expediente === 'C' && <Grid item xs={12} sm={12}>
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
                                            <FormularioBuscarPersona seccion={true} set_persona_titular={set_persona_titular} expediente={expediente}></FormularioBuscarPersona>
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
                                                        error={msj_error_und_organizacional}
                                                        readOnly={expediente !== null && expediente?.expediente.length !== 0}
                                                    >
                                                        {lt_unidades_org.map((lt: any) => (
                                                            <MenuItem key={lt.id_unidad_organizacional} value={lt.id_unidad_organizacional}>
                                                                {lt.codigo_unidad_org_actual_admin_series + ' - '}{lt.nombre}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                {msj_error_und_organizacional && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}

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
                                            <FormularioBuscarPersona seccion={false} set_persona_responsable={set_persona_resp} expediente={expediente}></FormularioBuscarPersona>
                                        </Grid>
                                    </Grid>
                                </Stack>
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
                                                readOnly={(expediente?.expediente.length !== 0 && expediente?.expediente[0].creado_automaticamente)}
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
                                            onClick={() => { set_open_modal(true) }}
                                        >
                                            Agregar
                                        </Button>
                                        {open_modal && (
                                            <Grid item xs={12} marginY={1}>
                                                <MoverCarpeta
                                                    control_carpeta_destino={control_carpeta_destino}
                                                    open={open_modal}
                                                    handle_close_buscar={handle_close_buscar}
                                                    get_values={get_values_carpeta_destino}
                                                    handle_mover_carpeta={handle_mover_carpeta}
                                                />
                                            </Grid>
                                        )}
                                    </Grid>
                                </Stack>
                            </Grid>
                            {carpetas.map((c: any, index: number) => (
                                <Grid item xs={12} sm={12} key={index}>
                                    <Stack
                                        direction="row"
                                        justifyContent="center"
                                        spacing={2}
                                    >
                                        <Grid item xs={12} sm={6}>
                                            <Accordion expanded={expanded === 'panel' + index} onChange={handle_change('panel' + index)} sx={{ padding: '0px' }}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
                                                    <FolderOutlinedIcon sx={{ marginTop: '5px', marginRight: '10px' }} />
                                                    <Typography sx={{ fontSize: '16px', fontWeight: '420', display: 'inline-flex', flexDirection: 'row', marginTop: '7px' }}>
                                                        {c.ruta}
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    {c.carpetas.map((carp: any, sub_index: number) => (
                                                        <Grid item xs={12} sm={12} key={sub_index}>
                                                            <Grid item xs={12} sm={6}>
                                                                <Typography sx={{ fontSize: '16px', fontWeight: '410', color: 'gray', display: 'inline-flex', flexDirection: 'row' }}>
                                                                    <FolderIcon sx={{ marginRight: '10px', color: 'gray' }} />
                                                                    {carp.carpeta}
                                                                    <Stack
                                                                        direction="row"
                                                                        justifyContent="flex-end"
                                                                    >
                                                                        <ClearOutlinedIcon onClick={() => { eliminar_carpeta(index, sub_index) }} sx={{ color: 'red', cursor: 'pointer' }} />
                                                                    </Stack>
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>

                                                    ))}
                                                </AccordionDetails>
                                            </Accordion>
                                        </Grid>
                                    </Stack>
                                </Grid>))}
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
                                            <Fab key={index} size="small" variant="extended" sx={{ marginX: '2px', marginY: '1px' }}>
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
                            {expediente?.cod_tipo_expediente === 'S' && <Button
                                color='primary'
                                variant='contained'
                                startIcon={<SearchIcon />}
                                onClick={() => { set_abrir_modal_buscar(true); }}
                            >
                                Buscar expediente
                            </Button>}
                            {abrir_modal_buscar && <BuscarExpediente is_modal_active={abrir_modal_buscar} set_is_modal_active={set_abrir_modal_buscar} set_expediente={set_expediente} serie={serie}></BuscarExpediente>}
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
                            {expediente !== null && <Button
                                color='success'
                                variant='contained'
                                startIcon={<SaveIcon />}
                                onClick={() => { crear_obj_expediente() }}
                            >
                                {expediente?.expediente.length !== 0 ? 'Actualizar' : 'Guardar'}
                            </Button>}
                            <Button
                                // color='inherit'
                                variant="outlined"
                                startIcon={<CleanIcon />}
                                onClick={() => { limpiar_formulario() }}
                            >
                                Limpiar
                            </Button>
                            {expediente?.expediente.length !== 0 && !(expediente?.expediente[0].creado_automaticamente) && expediente !== null && <Button
                                sx={{ background: '#ff9800' }}
                                variant='contained'
                                startIcon={<ClearIcon />}
                                onClick={() => { set_abrir_modal_anular(true) }}
                            >
                                Anular expediente
                            </Button>}
                            {<AnularExpedienteModal is_modal_active={abrir_modal_anular} set_is_modal_active={set_abrir_modal_anular} title={"Anular expediente"} user_info={usuario} id_expediente={expediente?.expediente.length !== 0 ? expediente?.expediente[0].id_expediente_documental : null}></AnularExpedienteModal>}
                            {expediente?.expediente.length !== 0 && !(expediente?.expediente[0].creado_automaticamente) && expediente !== null && <Button
                                variant='contained'
                                startIcon={<ClearIcon />}
                                onClick={() => { borrar_expediente_fc() }}
                                sx={{ background: '#ff6961' }}
                            >
                                Borrar expediente
                            </Button>}
                            <Button
                                color="error"
                                variant='contained'
                                startIcon={<ClearIcon />}
                                onClick={() => { salir_expediente() }}
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