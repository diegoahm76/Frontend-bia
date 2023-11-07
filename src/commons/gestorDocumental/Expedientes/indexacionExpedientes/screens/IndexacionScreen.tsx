import { Grid, TextField, Box, Button, Stack, FormHelperText, InputLabel, FormControl, Select, MenuItem, type SelectChangeEvent, Typography, Fab, InputAdornment } from "@mui/material";
import { Title } from "../../../../../components/Title";
import { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { actualizar_expediente, borrar_expediente, buscar_persona, crear_expediente, obtener_unidad_organizacional, obtener_usuario_logueado } from "../../aperturaExpedientes/thunks/aperturaExpedientes";
import { useAppDispatch } from "../../../../../hooks";
import { useNavigate } from "react-router-dom";
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import BuscarExpediente from "./BuscarExpediente";
import MoverCarpeta from "../../../deposito/Carpetas/components/MoverCarpeta";
import { useForm } from "react-hook-form";
import { IObjCarpeta } from "../../../deposito/interfaces/deposito";
import { SerieDocumentalScreen } from "./SerieDocumentalScreen";
import AnularExpedienteModal from "../../aperturaExpedientes/screens/AnularExpediente";
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
export const IndexacionScreen: React.FC = () => {
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

    const handle_close_buscar = () => {
        set_open_modal(false);
    };

    const handle_mover_carpeta = (carpeta_mover: IObjCarpeta) => {
        reset_carpeta_destino(carpeta_mover);
        let carpetas_new = carpetas;
        carpetas_new.push(carpeta_mover);
        carpetas_new.forEach((c: any, i: number) => {
            let my_copy = Object.assign({}, c);
            my_copy.ruta = c.identificacion_caja + ' > ' + c.identificacion_bandeja + ' > ' + c.identificacion_estante + ' > ' + c.identificacion_deposito;
            my_copy.contenedor = c.identificacion_carpeta;
            carpetas_new[i] = my_copy;
        })
        set_carpetas(carpetas_new);
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
        }else if(expediente !== null){
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
        dispatch(borrar_expediente(expediente.expediente[0].id_expediente_documental)).then((response: any)=>{
            if(response.success)
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
                "carpetas_caja": carpetas.map((obj: any) => obj.id_carpeta),
                "id_cat_serie_und_org_ccd_trd_prop": serie.id_catserie_unidadorg,//tripeta serie
                "id_trd_origen": tdr.id_trd,
                "id_und_seccion_propietaria_serie": seccion,
                "id_serie_origen": serie?.id_serie_doc, // se obtiene del objeto de la tripleta
                "id_subserie_origen": serie?.id_subserie_doc,
                "id_persona_titular_exp_complejo": expediente?.cod_tipo_expediente === 'C' ? persona_titular.id_persona : null
            }
            dispatch(crear_expediente(expediente_obj)).then((response: any) => {
                if(response.success)
                    set_expediente({expediente: [response.data]});
            });
        } else {
            const expediente_obj = {
                "palabras_clave_expediente": palabras_clave.replace(/,/g, '|'),
                "carpetas_caja": carpetas.map((obj: any) => obj.id_carpeta),
                "descripcion_expediente": descripcion,
                "fecha_apertura_expediente": fecha_creacion.format('YYYY-MM-DD'),
            }
            dispatch(actualizar_expediente(expediente?.expediente[0].id_expediente_documental, expediente_obj)).then((response: any) => {
                if(response.success)
                    set_expediente({expediente: [response.data]});
            });
        }
    };

    useEffect(() => {
        if (carpetas.length > 0) {
            console.log('carpetas: ', carpetas)
        }
    }, [carpetas]);

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

    return (
        <>
            <Grid
                container
                sx={class_css}
            >
                <SerieDocumentalScreen set_limpiar={limpiar} set_expediente={set_expediente} set_serie={set_serie} set_seccion={set_seccion} set_tdr={set_tdr}></SerieDocumentalScreen>
            </Grid>
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
                                onClick={() => { set_abrir_modal_buscar(true); }}
                            >
                                Buscar documento
                            </Button>
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