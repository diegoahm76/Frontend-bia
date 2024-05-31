import { useEffect, useState } from 'react';
import {
    Stack,
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import Button from '@mui/material/Button';
import { CalendarPicker, DatePicker, LocalizationProvider, PickersDay } from '@mui/x-date-pickers/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import use_previsualizacion from './hooks/usePrevisualizacion';
import { type crear_mantenimiento } from '../../interfaces/IProps';
import dayjs, { type Dayjs } from 'dayjs';
import { isSameDay } from 'date-fns';
import { getColombiaHolidaysByYear } from 'colombia-holidays';
import { DialogNoticacionesComponent } from '../../../../../../../components/DialogNotificaciones';
interface IProps {
    parent_state_setter: any,
    detalle_seleccionado: any,
    tipo_matenimiento: string,
    especificacion: string,
    user_info: any,
    limpiar_formulario: boolean,
    clean_form?: boolean,
    programacion: any
}
const opcion_programar = [{ value: "MA", label: "Manual" }, { value: "AU", label: "Automatica" }, { value: "OT", label: "Otro" }];

const opcion_programar_fecha = [{ value: "W", label: "Semanas" }, { value: "M", label: "Meses" }];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FechasComponent: React.FC<IProps> = ({ parent_state_setter, detalle_seleccionado, tipo_matenimiento, especificacion, user_info, limpiar_formulario, clean_form, programacion }: IProps) => {
    const [tipo, set_tipo] = useState("");
    const [fecha, set_fecha] = useState("");
    const [fecha_desde, set_fecha_desde] = useState<Date | null>(null);
    const [fecha_hasta, set_fecha_hasta] = useState<Date | null>(null);
    const [fecha_min, set_fecha_min] = useState<Dayjs>(dayjs());
    const [cada, set_cada] = useState("");
    const [fechas_array, set_fechas_array] = useState<Dayjs[]>([]);
    const [check_isd, set_check_isd] = useState(false);
    const [check_if, set_check_if] = useState(false);
    const [disabled_type, set_disabled_type] = useState(true);
    const [selected_date, set_selected_date] = useState<Dayjs[]>([]);
    const [titulo_notificacion, set_titulo_notificacion] = useState<string>("");
    const [mensaje_notificacion, set_mensaje_notificacion] = useState<string>("");
    const [tipo_notificacion, set_tipo_notificacion] = useState<string>("");
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
        if (programacion != null && programacion !== undefined) {
            const fecha_programada = dayjs(programacion.fecha);
            set_fechas_array([fecha_programada]);
            set_selected_date([fecha_programada]);
        }
    }, [programacion]);

    useEffect(() => {
        set_especificacion(especificacion);
    }, [especificacion]);

    useEffect(() => {
        set_detalle_seleccionado(detalle_seleccionado);
    }, [detalle_seleccionado]);

    useEffect(() => {
        if (limpiar_formulario || clean_form) {
            set_tipo("");
            set_fecha("");
            set_fecha_desde(null);
            set_fecha_hasta(null);
            set_fecha_min(dayjs());
            set_cada("");
            set_fechas_array([]);
            set_check_isd(false);
            set_check_if(false);
            set_disabled_type(true);
            set_selected_date([]);
        }
    }, [limpiar_formulario, clean_form]);

    const handle_change: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
        set_tipo(event.target.value);
        set_fecha_min(dayjs());
        set_disabled_type(event.target.value === "MA");
    }

    const handle_change_fecha: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
        set_fecha(event.target.value);
    }

    const handle_change_cada: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_cada(e.target.value);
    };

    const handle_change_fecha_desde = (date: Date | null): void => {
        set_fecha_desde(date);
        set_fecha_min(dayjs());
    };

    const handle_change_fecha_hasta = (date: Date | null): void => {
        set_fecha_hasta(date);
    };

    const handle_change_isd = (e: React.ChangeEvent<HTMLInputElement>): void => {
        set_check_isd(e.target.checked);
    };

    const handle_change_if = (e: React.ChangeEvent<HTMLInputElement>): void => {
        set_check_if(e.target.checked);
    };

    useEffect(() => {
        set_fechas();
    }, [fecha, cada, fecha_hasta, fecha_desde, check_isd, check_if]);

    const set_fechas = (): void => {
        if (fecha_desde !== null && fecha_hasta !== null && cada !== "" && fecha !== "") {
            const f_desde = dayjs(fecha_desde);
            const f_hasta = dayjs(fecha_hasta);
            const i_cada = parseInt(cada);
            void calcular_fechas_auto(i_cada, f_desde, f_hasta, fecha, [], check_isd, check_if).then(response => {
                set_selected_date(response);
                set_fechas_array(response);
                //  console.log('')(fechas_array)
            });
        }
    }

    const onchange_calendar = (new_date: any): void => {
        const dates = [...selected_date];
        const index = dates.findIndex(d => dayjs(d).format("DD-MM-YYYY") === new_date.format("DD-MM-YYYY"))
        if (index !== -1)
            dates.splice(index, 1);
        else
            dates.push(new_date);

        set_selected_date(dates);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const custom_day_render = (date: any, selected_days: any, pickers_day_props: any) => {
        let selected = false
        selected_date.forEach((dateInArray) => {
            if (isSameDay(dateInArray.toDate(), date.toDate()))
                selected = true
        })
        return (
            <PickersDay
                {...pickers_day_props}
                selected={selected}
            />
        )
    }
    /**
     * Obtiene listado de fechas para mantenimiento automatico
     * @param i_cada
     * @param f_desde
     * @param f_hasta
     * @param fecha
     * @param fechas_array
     * @param check_isd
     * @param check_if
     * @returns arreglo de fechas
     */
    const calcular_fechas_auto = async (i_cada: number, f_desde: dayjs.Dayjs, f_hasta: dayjs.Dayjs, fecha: string, fechas_array: Dayjs[], check_isd: boolean, check_if: boolean): Promise<Dayjs[]> => {
        const resp_holidays: any[] = getColombiaHolidaysByYear(f_desde.year());

        if (!check_if)
            f_desde = validate_festivos(resp_holidays, f_desde);

        if (!check_isd)
            f_desde = validate_sabados_domingos(resp_holidays, f_desde);

        fechas_array.push(f_desde);

        const proxima_fecha = fecha === 'W' ? f_desde.add(i_cada, 'week') : f_desde.add(i_cada, 'month');
        if (proxima_fecha.toDate() <= f_hasta.toDate())
            void calcular_fechas_auto(i_cada, proxima_fecha, f_hasta, fecha, fechas_array, check_isd, check_if);

        return fechas_array;
    }

    /**
     * Define la fechas de mantenimiento automatico sin festivos
     * @param resp_holidays dias festivos
     * @param f_desde fecha mantenimiento
     * @returns dia valido para mentenimiento
     */
    function validate_festivos(resp_holidays: any[], f_desde: Dayjs): Dayjs {
        let fecha_f: Dayjs = f_desde;
        resp_holidays.forEach(gh => {
            if (gh.holiday === f_desde.format("YYYY-MM-DD")) {
                fecha_f = fecha_f.add(1, 'd');
                fecha_f = validate_sabados_domingos(resp_holidays, fecha_f);
            }
        })
        return fecha_f;
    }
    /**
     * Define fechas de mantenimiento automatico sin sabados ni domingos
     * @param resp_holidays dias festivos
     * @param f_desde fecha mantenimiento
     * @returns dia valido para mentenimiento
     */
    function validate_sabados_domingos(resp_holidays: any[], f_desde: Dayjs): Dayjs {
        let fecha_sd: Dayjs = f_desde;
        if (fecha_sd.day() === 6) {
            fecha_sd = fecha_sd.add(2, 'd');
            fecha_sd = validate_festivos(resp_holidays, fecha_sd);
        }
        if (fecha_sd.day() === 0) {
            fecha_sd = fecha_sd.add(1, 'd');
            fecha_sd = validate_festivos(resp_holidays, fecha_sd);
        }
        return fecha_sd;
    }

    const emit_new_data: () => void = () => {
        const rows_emit: crear_mantenimiento[] = [];
        if ((tipo_matenimiento !== null && tipo_matenimiento !== "") && (especificacion !== null && especificacion !== "") && detalle_seleccionado !== null && user_info !== null) {
            if(selected_date.length > 0){
                selected_date.forEach(cm => {
                    const data: crear_mantenimiento = {
                        tipo_programacion: "fecha",
                        cod_tipo_mantenimiento: tipo_matenimiento,
                        kilometraje_programado: null,
                        fecha_programada: cm.format("YYYY-MM-DD"),
                        motivo_mantenimiento: especificacion,
                        observaciones: especificacion,
                        fecha_solicitud: dayjs().format("YYYY-MM-DD"),
                        fecha_anulacion: null,
                        justificacion_anulacion: null,
                        ejecutado: false,
                        id_articulo: detalle_seleccionado.id_bien,
                        id_persona_solicita: user_info.id_persona,
                        id_persona_anula: null
                    }
                    rows_emit.push(data);
                })
                set_rows(rows_emit);
            }else{
                set_dialog_notificaciones_is_active(true);
                set_titulo_notificacion("Notificación");
                set_abrir_modal(true);
                set_mensaje_notificacion("Debe seleccionar una o mas fechas para programar.");
                set_tipo_notificacion("info");
            }
        } else {
            set_dialog_notificaciones_is_active(true);
            set_titulo_notificacion("Notificación");
            set_abrir_modal(true);
            set_mensaje_notificacion("Existen campos obligatorios por diligenciar.");
            set_tipo_notificacion("error");
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
                <Grid container>
                    <Grid item container spacing={2} xs={12} sm={4}>
                        <Grid item xs={12} sm={12}>
                            <FormControl required size='small' fullWidth>
                                <InputLabel>Programación</InputLabel>
                                <Select
                                    value={tipo}
                                    label="Programación"
                                    onChange={handle_change}
                                >
                                    {opcion_programar.map(({ value, label }) => (
                                        <MenuItem key={value} value={value}>
                                            {label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item container spacing={2} xs={12} sm={12}>
                            <Grid item xs={12} sm={6}>
                                <FormControl required size='small' fullWidth>
                                    <TextField
                                        type='number'
                                        helperText="Cada"
                                        size="small"
                                        required
                                        fullWidth
                                        value={cada}
                                        disabled={disabled_type}
                                        onChange={handle_change_cada}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <FormControl required size='small' fullWidth>
                                    <InputLabel>Tiempo</InputLabel>
                                    <Select
                                        value={fecha}
                                        label="Tiempo"
                                        onChange={handle_change_fecha}
                                        disabled={disabled_type}
                                    >
                                        {opcion_programar_fecha.map(({ value, label }) => (
                                            <MenuItem key={value} value={value}>
                                                {label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Fecha desde"
                                    value={fecha_desde}
                                    onChange={(newValue) => { handle_change_fecha_desde(newValue); }}
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            fullWidth
                                            size="small"
                                            {...params}
                                        />
                                    )}
                                    minDate={fecha_min.toDate()}
                                    maxDate={fecha_hasta}
                                    disabled={disabled_type}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Fecha hasta"
                                    value={fecha_hasta}
                                    onChange={(newValue) => { handle_change_fecha_hasta(newValue); }}
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            fullWidth
                                            size="small"
                                            {...params}
                                        />
                                    )}
                                    minDate={fecha_desde}
                                    disabled={disabled_type || fecha_desde == null}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <FormGroup>
                                <FormControlLabel control={<Checkbox value={check_isd} onChange={handle_change_isd} />}
                                    label='Incluir sabados y domingos'
                                    disabled={disabled_type} />
                                <FormControlLabel control={<Checkbox value={check_if} onChange={handle_change_if} />}
                                    label='Incluir festivos'
                                    disabled={disabled_type}
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <CalendarPicker date={null} onChange={onchange_calendar} disabled={tipo === ""} renderDay={custom_day_render} minDate={fecha_min} />
                        </LocalizationProvider>
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
                    onClick={emit_new_data}
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

