import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    OutlinedInput,
    Stack,
} from "@mui/material"
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { DialogNoticacionesComponent } from "../../../../../../../components/DialogNotificaciones";
import { type crear_mantenimiento } from "../../interfaces/IProps";
import use_previsualizacion from "../mantenimientoGeneral/hooks/usePrevisualizacion";
interface IProps {
    parent_state_setter: any,
    detalle_seleccionado: any,
    tipo_matenimiento: string,
    especificacion: string,
    limpiar_formulario: boolean,
    clean_form?: boolean,
    user_info: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const KilometrajeComponent: React.FC<IProps> = ({ parent_state_setter, detalle_seleccionado, tipo_matenimiento, especificacion, limpiar_formulario, clean_form, user_info }: IProps) => {
    const [titulo_notificacion, set_titulo_notificacion] = useState<string>("");
    const [mensaje_notificacion, set_mensaje_notificacion] = useState<string>("");
    const [tipo_notificacion, set_tipo_notificacion] = useState<string>("");
    const [mensaje_error_cada, set_mensaje_error_cada] = useState<string>("");
    const [mensaje_error_hasta, set_mensaje_error_hasta] = useState<string>("");
    const [mensaje_error_desde, set_mensaje_error_desde] = useState<string>("");
    const [abrir_modal, set_abrir_modal] = useState<boolean>(false);
    const [dialog_notificaciones_is_active, set_dialog_notificaciones_is_active] = useState<boolean>(false);
    // Hooks
    const {
        rows,
        set_rows,
        set_detalle_seleccionado,
        set_tipo_mantenimiento,
        set_especificacion,
    } = use_previsualizacion();

    useEffect(() => {
        parent_state_setter(rows);
    }, [parent_state_setter, rows]);

    useEffect(() => {
        set_tipo_mantenimiento(tipo_matenimiento);
    }, [tipo_matenimiento]);

    useEffect(() => {
        set_especificacion(especificacion);
    }, [especificacion]);

    useEffect(() => {
        set_detalle_seleccionado(detalle_seleccionado);
    }, [detalle_seleccionado]);

    useEffect(() => {
        if(limpiar_formulario || clean_form){
            set_cada("");
            set_cada_desde("");
            set_cada_hasta("");
            set_mensaje_error_cada("");
            set_mensaje_error_desde("");
            set_mensaje_error_hasta("");
        }
    }, [limpiar_formulario, clean_form]);

    const [cada, set_cada] = useState("");
    const [cada_desde, set_cada_desde] = useState("");
    const [cada_hasta, set_cada_hasta] = useState("");

    const handle_change_cada: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_cada(e.target.value);
        if(e.target.value !== "")
            set_mensaje_error_cada("");
    };
    const handle_change_cada_desde: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_cada_desde(e.target.value);
        if(parseInt(e.target.value) > parseInt(cada_hasta))
            set_mensaje_error_desde("El campo Desde debe ser menor al campo Hasta.");
        else
            set_mensaje_error_desde("");

    };
    const handle_change_cada_hasta: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_cada_hasta(e.target.value);
        if(parseInt(e.target.value) < parseInt(cada_desde))
            set_mensaje_error_hasta("El campo Hasta debe ser mayor al campo Desde.");
        else
            set_mensaje_error_hasta("");

    };

    const emit_news_mantenimientos = (): void => {
        if (cada !== "" && cada_desde !== "" && cada_hasta !== "") {
            const desde = Number(cada_desde);
            const hasta = Number(cada_hasta);
            const cada_num = Number(cada);
            if ((hasta - desde) % cada_num !== 0) {
                set_mensaje_error_cada("El valor de 'Cada' no cumple con el rango especificado.");
            } else if ((hasta - desde) / cada_num > 100) {
                set_mensaje_error_cada("No se pueden crear más de 100 elementos a la vez.");
            } else {
                set_mensaje_error_cada("");
                void calcular_kilometros(cada, cada_desde, cada_hasta, []).then(response => {
                    set_rows(response)
                })
            }
        }else{
            if(cada === "")
                set_mensaje_error_cada("El campo Cada es obligatorio.");
            if(cada_desde === "")
                set_mensaje_error_desde("El campo Desde es obligatorio.");
            if(cada_hasta === "")
                set_mensaje_error_hasta("El campo Hasta es obligatorio.");
        }
    }

    const calcular_kilometros = async (cada: any, cada_desde: any, cada_hasta: any, rows_emit: crear_mantenimiento[]): Promise<crear_mantenimiento[]> => {
        if ((tipo_matenimiento !== null && tipo_matenimiento !== "") && (especificacion !== null && especificacion !== "") && detalle_seleccionado !== null && user_info !== null) {
            const cada_int = parseInt(cada);
            const cada_desde_int = parseInt(cada_desde);
            const cada_hasta_int = parseInt(cada_hasta);
            rows_emit.push({
                tipo_programacion: "kilometraje",
                cod_tipo_mantenimiento: tipo_matenimiento,
                kilometraje_programado: cada_desde,
                fecha_programada: null,
                motivo_mantenimiento: especificacion,
                observaciones: especificacion,
                fecha_solicitud: dayjs().format("YYYY-MM-DD"),
                fecha_anulacion: null,
                justificacion_anulacion: null,
                ejecutado: false,
                id_articulo: detalle_seleccionado.id_bien,
                id_persona_solicita: user_info.id_persona,
                id_persona_anula: null
            })
            const cada_proximo = (cada_int + cada_desde_int);
            if (cada_proximo <= cada_hasta_int)
                void calcular_kilometros(cada, cada_proximo, cada_hasta, rows_emit);

            return rows_emit;
        } else {
            set_dialog_notificaciones_is_active(true);
            set_titulo_notificacion("Notificación");
            set_abrir_modal(true);
            set_mensaje_notificacion("Existen campos obligatorios por diligenciar.");
            set_tipo_notificacion("error");
            return rows_emit;
        }
    }

    return (
        <>
            <Box
                component="form"
                sx={{ mt: '20px' }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <FormHelperText sx={{ fontSize: '.8rem', fontWeight: 'bold' }}>Cada</FormHelperText>
                            <OutlinedInput
                                endAdornment={<InputAdornment position="end">km</InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                size='small'
                                value={cada}
                                onChange={handle_change_cada}
                                error={mensaje_error_cada !== ""}
                            />
                            {(mensaje_error_cada !== "") && (<FormHelperText error id="desde-error">{mensaje_error_cada}</FormHelperText>)}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <FormHelperText sx={{ fontSize: '.8rem', fontWeight: 'bold' }}>Desde</FormHelperText>
                            <OutlinedInput
                                endAdornment={<InputAdornment position="end">km</InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                size='small'
                                value={cada_desde}
                                onChange={handle_change_cada_desde}
                                error={mensaje_error_desde !== ""}
                            />
                            {(mensaje_error_desde !== "") && (<FormHelperText error id="desde-error">{mensaje_error_desde}</FormHelperText>)}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <FormHelperText sx={{ fontSize: '.8rem', fontWeight: 'bold' }}>Hasta</FormHelperText>
                            <OutlinedInput
                                endAdornment={<InputAdornment position="end">km</InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                size='small'
                                value={cada_hasta}
                                onChange={handle_change_cada_hasta}
                                error={mensaje_error_hasta !== ""}
                            />
                            {(mensaje_error_hasta !== "") && (<FormHelperText error id="desde-error">{mensaje_error_hasta}</FormHelperText>)}
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
            <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={2}
                sx={{ mb: '20px' }}
            >
                <Button
                    color='primary'
                    variant='contained'
                    onClick={emit_news_mantenimientos}
                >
                    Agregar
                </Button>
            </Stack>
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
