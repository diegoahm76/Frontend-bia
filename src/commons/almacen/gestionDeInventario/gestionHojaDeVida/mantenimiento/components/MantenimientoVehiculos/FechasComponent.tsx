import { useEffect, useState } from 'react';
import { Stack, 
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

import { CalendarPicker, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import use_previsualizacion from './hooks/usePrevisualizacion';
import { type crear_mantenimiennto } from '../../interfaces/IProps';
import dayjs from 'dayjs';
import { type IcvVehicles } from '../../../hojaDeVidaVehiculo/interfaces/CvVehiculo';


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
    const [disabled_type, set_disabled_type] = useState(false);
    const [selected_date, set_selected_date] = useState(null);

    const handle_change: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
        set_tipo(event.target.value);
        set_disabled_type(tipo === 'AU' || tipo === 'OT');
    }

    const handle_change_fecha: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
        set_fecha(event.target.value);
    }

    const handle_change_cada: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_cada(e.target.value);
    };

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handle_change_fecha_desde = (date: Date | null) => {
        const fecha_desde = date;
        set_fecha_desde(date);
        if (fecha_desde !== null && fecha_hasta !== null) {
            const f_desde = dayjs(fecha_desde);
            const f_hasta = dayjs(fecha_hasta);
            const i_cada = parseInt(cada);
            set_fechas_array(calcular_fechas_auto(i_cada,f_desde,f_hasta,fecha,[]));
            console.log('global1: ',fechas_array);
        }
        return fecha_desde
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handle_change_fecha_hasta = (date: Date | null) => {
        const fecha_hasta = date;
        set_fecha_hasta(date);
        if (fecha_desde !== null && fecha_hasta !== null) {
            const f_desde = dayjs(fecha_desde);
            const f_hasta = dayjs(fecha_hasta);
            const i_cada = parseInt(cada);
            set_fechas_array(calcular_fechas_auto(i_cada,f_desde,f_hasta,fecha,[]));
            console.log('global2: ',fechas_array);
        }
        return fecha_desde
    };

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
                            />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label='Incluir sabados y domingos'
                                    disabled={disabled_type} />
                                <FormControlLabel control={<Checkbox />} label='Incluir festivos'
                                    disabled={disabled_type} />
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <CalendarPicker date={selected_date} onChange={(selected_date) => { set_selected_date(selected_date); }} />
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
function calcular_fechas_auto(i_cada: number,f_desde: dayjs.Dayjs,f_hasta: dayjs.Dayjs,fecha: string,fechas_array: Date[]): Date[] {
    const proxima_fecha = fecha === 'W' ? f_desde.add(i_cada, 'week') : f_desde.add(i_cada,'month');
    if(fechas_array.length === 0)
        fechas_array.push(f_desde.toDate());

    if(proxima_fecha.toDate() <= f_hasta.toDate()){
        fechas_array.push(proxima_fecha.toDate());
        calcular_fechas_auto(i_cada,proxima_fecha,f_hasta,fecha,fechas_array);
    }

    return fechas_array;
}

