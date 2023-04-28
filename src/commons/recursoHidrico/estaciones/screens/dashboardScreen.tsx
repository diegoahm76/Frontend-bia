/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from "react";
import { Grid, Stack, MenuItem, Autocomplete, Box, TextField, Button, FormControl, CircularProgress } from '@mui/material';
import { api } from "../../../../api/axios";
import type { Datos, DatosMigracionGraficas } from "../interfaces/interfaces";
import { Title } from '../../../../components/Title';
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
import esLocale from 'dayjs/locale/es';
import ChartData from "../components/ChartData";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { control_error } from '../../../../helpers/controlError';
import type { AxiosError } from 'axios';
import SearchIcon from '@mui/icons-material/Search';

interface Variables {
    title: string,
    chart_id: string,
    data: number[][] | null,
    value: number
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DashboardScreen: React.FC = () => {
    const [selectdashboards, set_select_dashboards] = useState({ opc_dashboards: "0" })
    const [dato_estacion, set_dato_estacion] = useState([]);
    const [dato_estacion_migracion, set_dato_estacion_migracion] = useState([]);
    const [loading, set_loading] = useState(false);
    const [loading_busqueda, set_loading_busqueda] = useState(false);

    const opc_dashboards = [
        { label: 'Guamal', value: "1" },
        { label: 'Guayuriba', value: "2" },
        { label: 'Ocoa', value: "3" },
        { label: 'Puerto Gaitan', value: "4" },
        { label: 'Acaciitas', value: "5" },
        { label: 'Chichimene', value: "6" },
    ];

    const [opc_variables, set_opc_variables] = useState<Variables[]>([
        { title: 'Temperatura', chart_id: "temperatura", data: [], value: 1 },
        { title: 'Humedad', chart_id: "humedad", data: [], value: 2 },
        { title: 'Luminosidad', chart_id: "luminosidad", data: [], value: 3 },
        { title: 'Velocidad del agua', chart_id: "velocidad-agua", data: [], value: 4 },
        { title: 'Nivel del agua', chart_id: "nivel-agua", data: [], value: 5 },
        { title: 'Velocidad del viento', chart_id: "velocidad-viento", data: [], value: 6 },
        { title: 'Dirección del viento', chart_id: "direccion-viento", data: [], value: 7 },
        { title: 'Precipitación', chart_id: "precipitacion", data: [], value: 8 },
        { title: 'Presión barometrica', chart_id: "presion", data: [], value: 9 },
    ]);

    const [opc_variables_migracion, set_opc_variables_migracion] = useState<Variables[]>([
        { title: 'Temperatura', chart_id: "temperatura", data: [], value: 1 },
        { title: 'Humedad', chart_id: "humedad", data: [], value: 2 },
        { title: 'Punto de rocio', chart_id: "punto-rocio", data: [], value: 3 },
        { title: 'Presion atm abs', chart_id: "presion-atm-abs", data: [], value: 4 },
        { title: 'Nivel de Agua', chart_id: "nivel-agua", data: [], value: 5 },
        { title: 'Presion atm rel', chart_id: "presion-atm-rel", data: [], value: 7 },
        { title: 'Precipitación', chart_id: "precipitacion", data: [], value: 6 },
        { title: 'Velocidad del rio', chart_id: "nivel-agua", data: [], value: 8 },
        { title: 'Caudal', chart_id: "caudal", data: [], value: 9 },
    ]);

    const set_variables_select = {
        options: opc_variables,
        getOptionLabel: (option: Variables) => option.title,
    };
    const set_variables_select_migracion = {
        options: opc_variables_migracion,
        getOptionLabel: (option: Variables) => option.title,
    };

    const [variable_selected, set_variable_selected] = useState<Variables>({ title: 'Nivel de agua', chart_id: "Nivel-de-agua", data: [], value: 5 });

    const [variable_selected_migracion, set_variable_selected_migracion] = useState<Variables>({ title: 'Nivel de agua', chart_id: "Nivel-de-agua", data: [], value: 5 });

    const [start_date, set_start_date] = useState<Date | null>(new Date());

    const [end_date, set_end_date] = useState<Date | null>(new Date());

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handle_start_date_change = (date: Date | null) => {
        set_start_date(date)
    };

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handle_end_date_change = (date: Date | null) => {
        set_end_date(date)
    };
    const {
        control: control_filtrar
    } = useForm();
    const get_datos_estaciones = async (): Promise<any> => {
        try {
            set_loading_busqueda(true);
            if (selectdashboards.opc_dashboards === "0") {
                control_error("Por favor seleccione una estación")
                set_loading_busqueda(false);
                return
            }
            const fecha_1 = dayjs(start_date).format('YYYY-MM-DD')
            const fecha_2 = dayjs(end_date).format('YYYY-MM-DD')
            if (fecha_1 === fecha_2) {
                control_error("Por favor seleccione un rango de fechas que no sea igual")
                set_loading_busqueda(false);
                return
            }
            if (fecha_1 > fecha_2) {
                control_error("La fecha inicial no puede ser mayor a la fecha final")
                set_loading_busqueda(false);
                return
            }
            const { data } = await api.get(
                `estaciones/datos/consultar-datos-fecha/${selectdashboards.opc_dashboards}/${fecha_1}/${fecha_2}/`
            );
            if ("data" in data) {
                formatdataforchart(data.data);
                set_loading_busqueda(false);
            } else {
                control_error("No se encontraron datos")
                set_loading_busqueda(false);
            }

            return data.data;
        } catch (err: unknown) {
            const temp_error = err as AxiosError
            if (temp_error.response?.status === 404) {
                control_error("No se encontraron datos para esta estación");
            } else {
                // Otro error, mostrar mensaje de error genérico
                control_error("Ha ocurrido un error, por favor intente de nuevo más tarde.");
            }
        };
    };
    const get_datos_estaciones_migracion = async (): Promise<any> => {
        try {
            set_loading_busqueda(true);
            if (selectdashboards.opc_dashboards === "0") {
                control_error("Por favor seleccione una estación")
                set_loading_busqueda(false);
                return
            }
            const fecha_1 = dayjs(start_date).format('YYYY-MM-DD')
            const fecha_2 = dayjs(end_date).format('YYYY-MM-DD')
            if (fecha_1 === fecha_2) {
                control_error("Por favor seleccione un rango de fechas que no sea igual")
                set_loading_busqueda(false);
                return
            }
            if (fecha_1 > fecha_2) {
                control_error("La fecha inicial no puede ser mayor a la fecha final")
                set_loading_busqueda(false);
                return
            }
            const { data } = await api.get(
                `estaciones/migracion/consultar-migracion-estaciones-id/${selectdashboards.opc_dashboards}/?fecha-desde=${fecha_1}&fecha-hasta=${fecha_2}`
            );
            if ("data" in data) {
                const formatted_data = data.data.map((item: any) => {
                    const formatted_item = { ...item };
                    Object.keys(formatted_item).forEach((key) => {
                        if (!isNaN(Number(formatted_item[key]))) {
                            formatted_item[key] = Number(formatted_item[key]);
                        }
                    });
                    return formatted_item;
                });
                formatdataforchart_migracion(formatted_data);
                set_dato_estacion_migracion(formatted_data);
                set_loading_busqueda(false);
            } else {
                control_error("No se encontraron datos")
                set_loading_busqueda(false);
            }

            return data.data;
        } catch (err: unknown) {
            const temp_error = err as AxiosError
            if (temp_error.response?.status === 404) {
                set_loading_busqueda(false);
                control_error("No se encontraron datos para esta estación en esta fecha");
            } else {
                // Otro error, mostrar mensaje de error genérico
                set_loading_busqueda(false);
                control_error("Ha ocurrido un error, por favor intente de nuevo más tarde.");
            }
        };
    };
    const get_datos_primeros_migracion = async (): Promise<any> => {
        try {
            set_loading(true);
            if (selectdashboards.opc_dashboards === "0") {
                control_error("Por favor seleccione una estación")
                set_loading(false);
                return
            }
            const { data } = await api.get(
                `estaciones/migracion/consultar-migracion-estaciones-id/${selectdashboards.opc_dashboards}/`
            );
            if ("data" in data) {
                // Convertir valores de tipo string a número
                const formatted_data = data.data.map((item: any) => {
                    const formatted_item = { ...item };
                    Object.keys(formatted_item).forEach((key) => {
                        if (!isNaN(Number(formatted_item[key]))) {
                            formatted_item[key] = Number(formatted_item[key]);
                        }
                    });
                    return formatted_item;
                });

                // Obtener solo los últimos 200 datos
                const last_200_data = formatted_data.slice(-200);

                formatdataforchart_migracion(last_200_data);
                set_dato_estacion_migracion(last_200_data);
                set_loading(false);
            } else {
                control_error("No se encontraron datos")
                set_loading(false);
            }

            return data.data;
        } catch (err: unknown) {
            const temp_error = err as AxiosError
            if (temp_error.response?.status === 404) {
                control_error("No se encontraron datos para esta estación");
                set_loading(false);
            } else {
                // Otro error, mostrar mensaje de error genérico
                set_loading(false);
                control_error("Ha ocurrido un error, por favor intente de nuevo más tarde.");
            }
        };
    };

    const get_datos_primeros = async (): Promise<any> => {
        try {
            set_loading(true);
            if (selectdashboards.opc_dashboards === "0") {
                control_error("Por favor seleccione una estación")
                set_loading(false);
                return
            }
            const { data } = await api.get(
                `estaciones/datos/consultar-datos-id-primeros/${selectdashboards.opc_dashboards}/`
            );
            if ("data" in data) {
                formatdataforchart(data.data);
                set_dato_estacion(data.data);
                set_loading(false);
            } else {
                control_error("No se encontraron datos")
                set_loading(false);
            }

            return data.data;
        } catch (err: unknown) {
            const temp_error = err as AxiosError
            if (temp_error.response?.status === 404) {
                control_error("No se encontraron datos para esta estación");
            } else {
                // Otro error, mostrar mensaje de error genérico
                control_error("Ha ocurrido un error, por favor intente de nuevo más tarde.");
            }
        };
    };

    useEffect(() => {
        if (end_date !== null) {
            set_dato_estacion([]);
            set_dato_estacion_migracion([]);
        }
    }, [selectdashboards]);
    useEffect(() => {
        if (variable_selected !== undefined) {
            const update_variable: Variables = (opc_variables.find(variable => variable.value === variable_selected.value)) ?? variable_selected
            set_variable_selected(update_variable)
            set_variable_selected_migracion(update_variable)
        }

    }, [opc_variables]);

    useEffect(() => {
        if (variable_selected_migracion !== undefined) {
            const update_variable: Variables = (opc_variables_migracion.find(variable => variable.value === variable_selected_migracion.value)) ?? variable_selected_migracion
            set_variable_selected(update_variable)
            set_variable_selected_migracion(update_variable)
        }

    }, [opc_variables_migracion]);

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const formatdataforchart = (data: Datos[]) => {
        const data_temperatura: number[][] = []
        const data_humedad: number[][] = []
        const data_luminosidad: number[][] = []
        const data_nivel_agua: number[][] = []
        const data_velocidad_agua: number[][] = []
        const data_velocidad_viento: number[][] = []
        const data_direccion_viento: number[][] = []
        const data_precipitacion: number[][] = []
        const data_presion: number[][] = []
        data.forEach((item) => {
            data_temperatura.push([new Date(item.fecha_registro).getTime(), Number(item.temperatura_ambiente)])
            data_humedad.push([new Date(item.fecha_registro).getTime(), Number(item.humedad_ambiente)])
            data_luminosidad.push([new Date(item.fecha_registro).getTime(), Number(item.luminosidad)])
            data_nivel_agua.push([new Date(item.fecha_registro).getTime(), Number(item.nivel_agua)])
            data_velocidad_agua.push([new Date(item.fecha_registro).getTime(), Number(item.velocidad_agua)])
            data_velocidad_viento.push([new Date(item.fecha_registro).getTime(), Number(item.velocidad_viento)])
            data_direccion_viento.push([new Date(item.fecha_registro).getTime(), Number(item.direccion_viento)])
            data_precipitacion.push([new Date(item.fecha_registro).getTime(), Number(item.precipitacion)])
            data_presion.push([new Date(item.fecha_registro).getTime(), Number(item.presion_barometrica)])

        })
        const data_aux: Variables[] = []
        opc_variables.forEach((item) => {
            item.value === 1 ? data_aux.push({ ...item, data: data_temperatura }) :
                item.value === 2 ? data_aux.push({ ...item, data: data_humedad }) :
                    item.value === 3 ? data_aux.push({ ...item, data: data_luminosidad }) :
                        item.value === 4 ? data_aux.push({ ...item, data: data_velocidad_agua }) :
                            item.value === 5 ? data_aux.push({ ...item, data: data_nivel_agua }) :
                                item.value === 6 ? data_aux.push({ ...item, data: data_velocidad_viento }) :
                                    item.value === 7 ? data_aux.push({ ...item, data: data_direccion_viento }) :
                                        item.value === 8 ? data_aux.push({ ...item, data: data_precipitacion }) :
                                            data_aux.push({ ...item, data: data_presion })

        })
        set_opc_variables(data_aux)
    };

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const formatdataforchart_migracion = (data: DatosMigracionGraficas[]) => {
        const data_temperatura: number[][] = []
        const data_humedad: number[][] = []
        const data_pto_rocio: number[][] = []
        const data_data_presion_abs: number[][] = []
        const data_presion_rel: number[][] = []
        const data_precipitacion: number[][] = []
        const data_nivel_agua: number[][] = []
        const data_velocidad_rio: number[][] = []
        const data_caudal: number[][] = []
        data.forEach((item) => {
            data_temperatura.push([new Date(item.fecha).getTime(), Number(item.temperatura)])
            data_humedad.push([new Date(item.fecha).getTime(), Number(item.humedad_relativa)])
            data_pto_rocio.push([new Date(item.fecha).getTime(), Number(item.punto_de_rocio)])
            data_data_presion_abs.push([new Date(item.fecha).getTime(), Number(item.presion_atm_abs)])
            data_presion_rel.push([new Date(item.fecha).getTime(), Number(item.presion_atm_rel)])
            data_precipitacion.push([new Date(item.fecha).getTime(), Number(item.precipitacion)])
            data_nivel_agua.push([new Date(item.fecha).getTime(), Number(item.nivel_agua)])
            data_velocidad_rio.push([new Date(item.fecha).getTime(), Number(item.velocidad_rio)])
            data_caudal.push([new Date(item.fecha).getTime(), Number(item.caudal)])

        })
        const data_aux: Variables[] = []
        opc_variables_migracion.forEach((item) => {
            item.value === 1 ? data_aux.push({ ...item, data: data_temperatura }) :
                item.value === 2 ? data_aux.push({ ...item, data: data_humedad }) :
                    item.value === 3 ? data_aux.push({ ...item, data: data_pto_rocio }) :
                        item.value === 4 ? data_aux.push({ ...item, data: data_presion_rel }) :
                            item.value === 5 ? data_aux.push({ ...item, data: data_nivel_agua }) :
                                item.value === 6 ? data_aux.push({ ...item, data: data_precipitacion }) :
                                    item.value === 7 ? data_aux.push({ ...item, data: data_data_presion_abs }) :
                                        item.value === 8 ? data_aux.push({ ...item, data: data_velocidad_rio }) :
                                            data_aux.push({ ...item, data: data_caudal })

        })
        set_opc_variables_migracion(data_aux)
    };

    return (
        <>
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
                <Grid item xs={12} spacing={2}>
                    <Title title="Comportamiemto Variable" />
                    <Box component="form">
                        <Stack sx={{ m: '20px 0 20px 0' }} direction="row" spacing={2}>
                            <FormControl fullWidth>
                                <Controller
                                    name="opcDashboard"
                                    control={control_filtrar}
                                    defaultValue={""}
                                    rules={{ required: true }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            margin="dense"
                                            fullWidth
                                            select
                                            size="small"
                                            label="Estación"
                                            variant="outlined"
                                            defaultValue={value}
                                            value={value}
                                            onChange={(event) => {
                                                const selected_value = event.target.value;
                                                set_select_dashboards({ opc_dashboards: selected_value });
                                                onChange(selected_value, event);
                                            }}
                                        >
                                            {opc_dashboards.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    className="search-button text-capitalize rounded-pill"
                                    startIcon={
                                        loading
                                            ? <CircularProgress size={20} key={1} className="align-middle ml-1" />
                                            : <SearchIcon />
                                    }
                                    aria-label="Buscar"
                                    disabled={loading}
                                    size="large"
                                    onClick={() => {
                                        if (end_date !== null) {
                                            set_dato_estacion([]); // Llamada para limpiar el estado
                                            set_dato_estacion_migracion([]) // Llamada para limpiar el estado

                                            if (selectdashboards.opc_dashboards === "1" || selectdashboards.opc_dashboards === "2" || selectdashboards.opc_dashboards === "3" || selectdashboards.opc_dashboards === "4") {
                                                void get_datos_primeros();
                                                return;
                                            }
                                            void get_datos_primeros_migracion();
                                        }

                                    }}
                                >
                                    Buscar
                                    {loading ? '' : ""}
                                </Button>
                            </FormControl>
                        </Stack>
                    </Box>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {dato_estacion.length > 0 ? (
                            <>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Title title="Por favor seleccione las fechas para filtrar los datos" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack direction="row" spacing={2} alignItems="center" sx={{ m: '20px 0' }} >
                                            <FormControl fullWidth>
                                                <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                                                    <DatePicker
                                                        label="Fecha Inical"
                                                        inputFormat="YYYY/MM/DD"
                                                        openTo="day"
                                                        views={['year', 'month', 'day']}
                                                        value={start_date}
                                                        onChange={handle_start_date_change}
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
                                            </FormControl>
                                            <FormControl fullWidth>
                                                <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                                                    <DatePicker
                                                        label="Fecha Final"
                                                        inputFormat="YYYY/MM/DD"
                                                        openTo="day"
                                                        views={['year', 'month', 'day']}
                                                        value={end_date}
                                                        onChange={handle_end_date_change}
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
                                            </FormControl>
                                            <FormControl fullWidth>
                                                <Autocomplete
                                                    {...set_variables_select}
                                                    id="controlled-demo"
                                                    value={variable_selected}
                                                    onChange={(event: any, newValue: any) => {
                                                        set_variable_selected(newValue);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField {...params} label="Variable" variant="standard" />
                                                    )}
                                                    disableClearable={true}
                                                />
                                            </FormControl>
                                            <FormControl fullWidth>
                                                <Button
                                                    variant="contained"
                                                    type="submit"
                                                    className="search-button text-capitalize rounded-pill"
                                                    startIcon={
                                                        loading_busqueda
                                                            ? <CircularProgress size={20} key={1} className="align-middle ml-1" />
                                                            : <SearchIcon />
                                                    }
                                                    aria-label="Buscar"
                                                    disabled={loading_busqueda}
                                                    size="large"
                                                    onClick={() => {
                                                        if (end_date !== null) {
                                                            void get_datos_estaciones();
                                                        }
                                                    }}
                                                >
                                                    Buscar
                                                    {loading_busqueda ? '' : ""}
                                                </Button>
                                            </FormControl>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Title title={variable_selected.title} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ChartData data={variable_selected.data} chart_id={variable_selected.chart_id} />
                                    </Grid>
                                </Grid>
                            </>
                        ) : ""}
                    </Grid>
                </Grid>

                {dato_estacion_migracion.length > 0 ? (
                    <>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Title title="Por favor seleccione las fechas para filtrar los datos" />
                            </Grid>
                            <Grid item xs={12}>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ m: '20px 0' }} >
                                    <FormControl fullWidth>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                                            <DatePicker
                                                label="Fecha Inicio"
                                                inputFormat="YYYY/MM/DD"
                                                openTo="day"
                                                views={['year', 'month', 'day']}
                                                value={start_date}
                                                onChange={handle_start_date_change}
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
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                                            <DatePicker
                                                label="Fecha Final"
                                                inputFormat="YYYY/MM/DD"
                                                openTo="day"
                                                views={['year', 'month', 'day']}
                                                value={end_date}
                                                onChange={handle_end_date_change}
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
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            {...set_variables_select_migracion}
                                            id="controlled-demo"
                                            value={variable_selected_migracion}
                                            onChange={(event: any, newValue: any) => {
                                                set_variable_selected_migracion(newValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Variable" variant="standard" />
                                            )}
                                            disableClearable={true}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            className="search-button text-capitalize rounded-pill"
                                            startIcon={
                                                loading_busqueda
                                                    ? <CircularProgress size={20} key={1} className="align-middle ml-1" />
                                                    : <SearchIcon />
                                            }
                                            aria-label="Buscar"
                                            disabled={loading_busqueda}
                                            size="large"
                                            onClick={() => {
                                                if (end_date !== null) {
                                                    void get_datos_estaciones_migracion();
                                                }
                                            }}
                                        >
                                            Buscar
                                            {loading_busqueda ? '' : ""}
                                        </Button>
                                    </FormControl>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Title title={variable_selected_migracion.title} />
                            </Grid>
                            <Grid item xs={12}>
                                <ChartData data={variable_selected_migracion.data} chart_id={variable_selected_migracion.chart_id} />
                            </Grid>
                        </Grid>
                    </>
                ) : ""}
            </Grid >
        </>
    )
}