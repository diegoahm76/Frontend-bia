import { Grid, TextField, Box, Button, Stack, FormHelperText, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Title } from "../../../../components/Title";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { buscar_persona, obtener_unidad_organizacional, obtener_usuario_logueado } from "../../Expedientes/aperturaExpedientes/thunks/aperturaExpedientes";
import { useAppDispatch } from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import CleanIcon from '@mui/icons-material/CleaningServices';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import AnularExpedienteModal from "../../Expedientes/aperturaExpedientes/screens/AnularExpediente";
import BuscarExpediente from "../../Expedientes/aperturaExpedientes/screens/BuscarExpediente";
import MoverCarpeta from "../../deposito/Carpetas/components/MoverCarpeta";
import { useForm } from "react-hook-form";
import { IObjCarpeta } from "../../deposito/interfaces/deposito";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import { control_success } from "../../../../helpers";
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
export const Expedien: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [open_modal, set_open_modal] = useState(false);
    const { control: control_carpeta_destino, reset: reset_carpeta_destino, getValues: get_values_carpeta_destino, handleSubmit: handle_submit_carpeta_destino } = useForm<IObjCarpeta>();
    const msj_error = "El campo es obligatorio."
    const [lt_unidades_org, set_lt_unidades_org] = useState<any[]>([]);
    const [palabras_clave, set_palabras_clave] = useState<string>("");
    const [lt_palabras_clave, set_lt_palabras_clave] = useState<any>([]);
    const [error_fecha_creacion, set_msj_error_fecha_creacion] = useState<boolean>(false);
    const [expediente, set_expediente] = useState<any>(null);

    // console.log(expediente);
    const [serie_e, set_serie_e] = useState<any>();
    const [usuario, set_usuario] = useState<any>(null);
    const [fecha_creacion, set_fecha_creacion] = useState<Dayjs>(dayjs());
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
    const [configuracion, set_configuracion] = useState<any>(null);
    const [expedientes, set_expedientes] = useState<any>([]);
    const [titulo, set_titulo] = useState<string>("");
    // Sección apertura
    const [serie, set_serie] = useState<any>("");
    const [tdr, set_tdr] = useState<any>({});
    const [seccion, set_seccion] = useState<string>("");
    const [expanded, set_expanded] = useState<string | false>('panel1');
    const handle_close_buscar = () => {
        set_open_modal(false);
    };

    const handle_mover_carpeta = (carpeta: any) => {
        reset_carpeta_destino(carpeta);
        let carpetas_new: any[] = carpetas;
        const index = carpetas_new.findIndex((c: any) => c.ruta === (carpeta.identificacion_deposito + ' > ' + carpeta.identificacion_estante + ' > ' + carpeta.identificacion_bandeja + ' > ' + carpeta.identificacion_caja).toUpperCase())
        if (index !== -1) {
            const carpeta_index = carpetas_new[index].carpetas.findIndex((c: any) => c.id_carpeta_caja === carpeta.id_carpeta);
            if (carpeta_index === -1)
                carpetas_new[index].carpetas.push({ id_carpeta_caja: carpeta.id_carpeta, carpeta: carpeta.identificacion_carpeta });
        } else
        control_success( "Carpeta agregada exitosamente ");

            carpetas_new.push({ ruta: (carpeta.identificacion_deposito + ' > ' + carpeta.identificacion_estante + ' > ' + carpeta.identificacion_bandeja + ' > ' + carpeta.identificacion_caja).toUpperCase(), carpetas: [{ id_carpeta_caja: carpeta.id_carpeta, carpeta: carpeta.identificacion_carpeta }] });

        set_carpetas([...carpetas_new]);
    };

    useEffect(() => {
        if (palabras_clave !== "")
            set_lt_palabras_clave(palabras_clave.split(',', 5));
        else
            set_lt_palabras_clave([]);
    }, [palabras_clave]);

    const [variable_tres, ser_const_dos] = useState();

    const [select_expediente, set_select_expediente] = useState<any>(null);
    const estado = select_expediente?.nombre_unidad_org;
    console.log("aqui", estado);

    useEffect(() => {
        if (expediente !== null && expediente.expediente.length !== 0) {
            set_serie_e(expediente.expediente[0].titulo_expediente)
            set_titulo(expediente.expediente[0].titulo_expediente);
            set_descripcion(expediente.expediente[0].descripcion_expediente);
            ser_const_dos(expediente.nombre_unidad_org)
            set_fecha_creacion(dayjs(expediente.expediente[0].fecha_apertura_expediente));
            set_und_organizacional(expediente.expediente[0].id_und_org_oficina_respon_actual);
            set_palabras_clave(expediente.expediente[0].palabras_clave_expediente.replace(/\|/g, ','));

            if (expediente.expediente[0]?.carpetas_caja?.length > 0)
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



    const obtener_usuario_logueado_fc: () => void = () => {
        dispatch(obtener_usuario_logueado()).then((response: any) => {
            set_usuario(response);
            set_und_organizacional(response.id_unidad_organizacional_actual)
        })
    }



    const handle_change = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        set_expanded(newExpanded ? panel : false);
    };



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

    const limpiar_formulario = (): void => {
        set_limpiar(true);
    }

    const salir_expediente: () => void = () => {
        navigate('/home');
    }



    useEffect(() => {
        if (limpiar) {
            set_titulo("");
            set_descripcion("");
            set_persona_resp({});
            set_persona_titular({});
            set_fecha_creacion(dayjs());
            set_palabras_clave("");
            set_lt_palabras_clave([]);
            set_carpetas([]);
            set_expediente(null);
            set_und_organizacional("");
            set_limpiar(false);
            set_select_expediente(null);
            set_select_expediente((prevState: any) => ({
                ...prevState,
                nombre_subserie_origen: '',
                nombre_unidad_org: "",
                nombre_serie_origen: "",
                codigo_exp_und_serie_subserie: "",
                // Establecer nombre_subserie_origen como cadena vacía
            }));
        }
    }, [limpiar]);

    const eliminar_carpeta = (index: number, sub_index: number): void => {
        let carpetas_local = [...carpetas];
        carpetas_local[index].carpetas.splice(sub_index, 1);
        if (carpetas_local[index].carpetas.length === 0)
            carpetas_local.splice(index, 1);

        set_carpetas([...carpetas_local]);
    }


    return (
        <>
            <Grid
                container spacing={2} marginTop={2}
                sx={class_css} >

                <Title title={"Reubicación física de expedientes  "} />
            </Grid>



            <Grid
                container spacing={2} marginTop={2}
                sx={class_css} >
                <Title title={"Selección de expedinte "} />


                <Grid item xs={12} sm={3}>
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
                            Buscar expediente
                        </Button>
                        {abrir_modal_buscar && <BuscarExpediente set_select_expediente={set_select_expediente} is_modal_active={abrir_modal_buscar} set_is_modal_active={set_abrir_modal_buscar} set_expediente={set_expediente} serie={serie}></BuscarExpediente>}
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={10}>

                </Grid>



                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Titulo"
                        type={'text'}
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        value={titulo}
                        onChange={cambio_titulo}
                    />
                    {msj_error_titulo && (<FormHelperText error id="desde-error">{msj_error}</FormHelperText>)}
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Nombre unidad organizacional"
                        type={'text'}
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        value={select_expediente?.nombre_unidad_org}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Identificación del expediente"
                        type={'text'}
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        value={select_expediente?.codigo_exp_und_serie_subserie}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Serie    "
                        type={'text'}
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        value={select_expediente?.nombre_serie_origen}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Sub Serie "
                        type={'text'}
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        value={select_expediente?.nombre_subserie_origen}
                    />
                </Grid>


                <Grid item xs={12} sm={12}>
                    <TextField
                        label="Descripción"
                        type={'text'}
                        size="small"
                        multiline
                        rows={3}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        value={descripcion}
                        onChange={cambio_descripcion}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                        sx={{ mt: '5px' }}
                    >
                    </Stack>
                </Grid>



                <Grid item xs={12} sm={6}>
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        spacing={2}
                    >
                        <Grid item xs={12} sm={6}>

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


            </Grid>

            <Grid
                container spacing={2} marginTop={2}
                sx={class_css} >

                <Title title={"Actualización de ubicación fícica   "} />

                <Grid item xs={12} sm={6}>
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={() => { set_open_modal(true) }}
                    >
                        Agregar
                    </Button>

                </Grid>


                <Grid item xs={12} sm={3}>
                    <Typography sx={{ fontSize: '18px', fontWeight: '500' }}> Ubicación física</Typography>
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


                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <Box
                            component="form"
                            sx={{ mt: '20px', mb: '20px' }}
                            noValidate
                            autoComplete="off"
                        >

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
                                    // color='inherit'
                                    variant="outlined"
                                    startIcon={<CleanIcon />}
                                    onClick={() => { limpiar_formulario() }}
                                >
                                    Limpiar
                                </Button>

                                {<AnularExpedienteModal is_modal_active={abrir_modal_anular} set_is_modal_active={set_abrir_modal_anular} title={"Anular expediente"} user_info={usuario} id_expediente={expediente?.expediente.length !== 0 ? expediente?.expediente[0].id_expediente_documental : null}></AnularExpedienteModal>}

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


            </Grid>



        </>
    )
}