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
import { CalendarPicker, DatePicker, LocalizationProvider, PickersDay, PickersDayProps } from '@mui/x-date-pickers/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import use_previsualizacion from './hooks/usePrevisualizacion';
import { type holidays_co, type crear_mantenimiennto } from '../../interfaces/IProps';
import dayjs, { type Dayjs } from 'dayjs';
import { type IcvVehicles } from '../../../hojaDeVidaVehiculo/interfaces/CvVehiculo';
import getColombianHolidays from 'colombian-holidays';
import { type ColombianHoliday } from 'colombian-holidays/lib/types';
import moment from 'moment';
import { isSameDay } from 'date-fns';


interface IProps {
    parent_state_setter: any,
    detalle_vehiculo: IcvVehicles,
    tipo_matenimiento: string,
    especificacion: string
}
const opcion_programar = [{ value: "MA", label: "Manual" }, { value: "AU", label: "Automatica" }, { value: "OT", label: "Otro" }];

const opcion_programar_fecha = [{ value: "W", label: "Semanas" }, { value: "M", label: "Meses" }];

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const FechasComponent: React.FC<IProps> = ({ parent_state_setter, detalle_vehiculo, tipo_matenimiento, especificacion }) => {
    // Hooks
    const {
        rows,
        set_rows,
        set_detalle_vehiculo,
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
        set_detalle_vehiculo(detalle_vehiculo);
    }, [detalle_vehiculo]);

    const [tipo, set_tipo] = useState("");
    const [fecha, set_fecha] = useState("");
    const [fecha_desde, set_fecha_desde] = useState<Date | null>(null);
    const [fecha_hasta, set_fecha_hasta] = useState<Date | null>(null);
    const [cada, set_cada] = useState("");
    const [fechas_array, set_fechas_array] = useState<Date[]>([]);
    const [check_isd, set_check_isd] = useState(false);
    const [check_if, set_check_if] = useState(false);
    const [disabled_type, set_disabled_type] = useState(true);
    const [selected_date, set_selected_date] = useState<Dayjs[]>([]);
    const [date, set_date] = useState<Dayjs>();

    const handle_change: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
        set_tipo(event.target.value);
        set_disabled_type(event.target.value === "MA");
    }

    const handle_change_fecha: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
        set_fecha(event.target.value);
        set_fechas();
    }

    const handle_change_cada: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_cada(e.target.value);
        set_fechas();
    };

    const handle_change_fecha_desde = (date: Date | null) => {
        const fecha_desde = date;
        set_fecha_desde(date);
        set_fechas();
        return fecha_desde;
    };

    const handle_change_fecha_hasta = (date: Date | null) => {
        const fecha_hasta = date;
        set_fecha_hasta(date);
        set_fechas();
        return fecha_hasta;
    };

    const handle_change_isd = (e: React.ChangeEvent<HTMLInputElement>): void => {
        set_check_isd(e.target.checked);
        set_fechas();
    };

    const handle_change_if = (e: React.ChangeEvent<HTMLInputElement>): void => {
        set_check_if(e.target.checked);
        set_fechas();
    };

    const set_fechas = (): void => {
        if (fecha_desde !== null && fecha_hasta !== null && cada !== "" && fecha !== "") {
            const f_desde = dayjs(fecha_desde);
            const f_hasta = dayjs(fecha_hasta);
            const i_cada = parseInt(cada);
            set_fechas_array(calcular_fechas_auto(i_cada, f_desde, f_hasta, fecha, [], check_isd, check_if));
            console.log('set_fechas: ', fechas_array);
        }
    }

    const onchange_calendar = (new_date: any): void => {
        set_date(new_date);
        const dates = [...selected_date];
        const index = dates.findIndex(d => dayjs(d).format("DD-MM-YYYY") === new_date.format("DD-MM-YYYY"))
        if (index !== -1)
            dates.splice(index, 1);
        else
            dates.push(new_date);

        set_selected_date(dates);
    }

    const customDayRenderer = (
        date: any,
        selectedDays: any,
        pickersDayProps: any
      ) => {
        let selected = false
        selected_date?.forEach((dateInArray) => {
          if (isSameDay(dateInArray.toDate(), date.toDate())) {
            selected = true
          }
        })
    
        return (
          <PickersDay
            {...pickersDayProps}
            selected={selected}
          />
        )
      }

    const emit_new_data: () => void = () => {
        const data: crear_mantenimiennto = {
            tipo_programacion: "Por Fecha",
            cod_tipo_mantenimiento: tipo_matenimiento,
            kilometraje_programado: "",
            fecha_programada: dayjs().add(2, 'd').format("DD-MM-YYYY"),
            motivo_mantenimiento: especificacion,
            observaciones: especificacion,
            fecha_solicitud: dayjs().format("DD-MM-YYYY"),
            fecha_anulacion: "",
            justificacion_anulacion: "",
            ejecutado: false,
            id_articulo: 170,
            id_persona_solicita: 1,
            id_persona_anula: 0
        }
        set_rows([...rows, data])
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
                                    onChange={(newValue) => handle_change_fecha_desde(newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            fullWidth
                                            size="small"
                                            {...params}
                                        />
                                    )}
                                    disabled={disabled_type}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Fecha hasta"
                                    value={fecha_hasta}
                                    onChange={(newValue) => handle_change_fecha_hasta(newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            fullWidth
                                            size="small"
                                            {...params}
                                        />
                                    )}
                                    disabled={disabled_type}
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
                            <CalendarPicker date={date} onChange={onchange_calendar} disabled={tipo === ""} renderDay={customDayRenderer} />
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
        </>
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
function calcular_fechas_auto(i_cada: number, f_desde: dayjs.Dayjs, f_hasta: dayjs.Dayjs, fecha: string, fechas_array: Date[], check_isd: boolean, check_if: boolean): Date[] {
    const resp_holidays: ColombianHoliday[] = get_holidays({ year: f_desde.year(), month: (f_desde.month() + 1), valueAsDate: false });

    if (!check_if)
        f_desde = validate_festivos(resp_holidays, f_desde);

    if (!check_isd)
        f_desde = validate_sabados_domingos(resp_holidays, f_desde);

    fechas_array.push(f_desde.toDate());

    const proxima_fecha = fecha === 'W' ? f_desde.add(i_cada, 'week') : f_desde.add(i_cada, 'month');
    if (proxima_fecha.toDate() <= f_hasta.toDate())
        calcular_fechas_auto(i_cada, proxima_fecha, f_hasta, fecha, fechas_array, check_isd, check_if);

    return fechas_array;
}
/**
 * Obtine listado de dias festivos
 * @param year 
 * @returns arreglo de dias festivos
 */
function get_holidays(year: holidays_co) {
    try {
        return getColombianHolidays(year).sort((a, b) =>
            a.date.localeCompare(b.date)
        );
    } catch {
        return [];
    }
}
/**
 * Define la fechas de mantenimiento automatico sin festivos
 * @param resp_holidays dias festivos
 * @param f_desde fecha mantenimiento
 * @returns dia valido para mentenimiento
 */
function validate_festivos(resp_holidays: ColombianHoliday[], f_desde: Dayjs): Dayjs {
    let fecha_f: Dayjs = f_desde;
    resp_holidays.forEach(gh => {
        if (gh.date === moment(f_desde.toDate()).format("YYYY-MM-DD")) {
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
function validate_sabados_domingos(resp_holidays: ColombianHoliday[], f_desde: Dayjs): Dayjs {
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

