/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from "react";
import { Grid, Stack, Typography, MenuItem, Autocomplete, Box, TextField } from '@mui/material';
import { api } from "../../../../api/axios";
import type { Datos } from "../interfaces/interfaces";
import { Title } from '../../../../components/Title';
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
import { control_success, control_success_fail } from '../../requets/Request';
import esLocale from 'dayjs/locale/es';
import ChartData from "../components/ChartData";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


interface Variables {
    title: string,
    chart_id: string,
    data: number[][] | null,
    value: number
}



// eslint-disable-next-line @typescript-eslint/naming-convention
export const DashboardScreen: React.FC = () => {


    const [selectdashboards, set_select_dashboards] = useState({
        opc_dashboards: "0"
    })

    const opc_dashboards = [
        { label: 'Estación Guamal', value: "1" },
        { label: 'Estación Guayuriba', value: "2" },
        { label: 'Estación Ocoa', value: "3" },
        { label: 'Estación Puerto Gaitan', value: "4" },
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
    const set_variables_select = {
        options: opc_variables,
        getOptionLabel: (option: Variables) => option.title,
    };

    const [variable_selected, set_variable_selected] = useState<Variables>({ title: 'Temperatura', chart_id: "temperatura", data: [], value: 1 });


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
    // const options: Intl.DateTimeFormatOptions = {
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric',
    // };
    const {
        control: control_filtrar
    } = useForm();
    const get_datos_estaciones = async (): Promise<any> => {

        const fecha_1 = dayjs(start_date).format('YYYY-MM-DD')
        const fecha_2 = dayjs(end_date).format('YYYY-MM-DD')
        const { data } = await api.get(
            `estaciones/datos/consultar-datos-fecha/${fecha_1}/${fecha_2}`
        );
        console.log("fin consulta")
        if ("data" in data) {
            control_success("Se encontraron Datos")
            formatdataforchart(data.data);
        } else {
            control_success_fail("No se encontraron datos")
        }

        return data.data;

    };

    useEffect(() => {
        if (end_date !== null) {
            void get_datos_estaciones();
        }
    }, [end_date, selectdashboards]);
    useEffect(() => {
        if (variable_selected !== undefined) {
            const update_variable: Variables = (opc_variables.find(variable => variable.value === variable_selected.value)) ?? variable_selected
            set_variable_selected(update_variable)
        }

    }, [opc_variables]);

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const formatdataforchart = (data: Datos[]) => {
        console.log("init")
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
        console.log(data_temperatura)
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
        console.log("fin")

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

                    <Title title="Comportamiento de las variables" />
                    <Box mb={2} style={{ marginTop: '20px' }}>
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
                    </Box>

                    <Typography variant="body1" align="center" hidden={selectdashboards.opc_dashboards !== "1"}>
                        <Title title="Por favor seleccione las fechas para filtrar los datos" ></Title>

                        <Stack direction="row" spacing={1} alignItems="center" sx={{ m: '20px 0' }} >

                            <label >Fecha Inicial</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                                <DatePicker
                                    label="Desde la fecha"
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
                            <label>Fecha Final</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                                <DatePicker
                                    label="Hasta la fecha"
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

                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ m: '20px 0' }} >
                            <Grid item xs={11} md={3} margin={2} >

                                <Autocomplete
                                    {...set_variables_select}
                                    id="controlled-demo"
                                    value={variable_selected}
                                    onChange={(event: any, newValue: any) => {
                                        set_variable_selected(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Seleccione variable" variant="standard" />
                                    )}
                                />
                            </Grid>
                        </Stack>


                        <Typography variant="body1" align="center">

                            <Title title={variable_selected.title} ></Title>
                            <ChartData data={variable_selected.data} chart_id={variable_selected.chart_id} />
                        </Typography>
                    </Typography>
                    <Typography variant="body1" align="center" hidden={selectdashboards.opc_dashboards !== "2"}>
                        <Title title="Por favor seleccione las fechas para filtrar los datos" ></Title>

                        <Stack direction="row" spacing={1} alignItems="center" sx={{ m: '20px 0' }} >

                            <label >Fecha Inicial</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                                <DatePicker
                                    label="Desde la fecha"
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
                            <label>Fecha Final</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                                <DatePicker
                                    label="Hasta la fecha"
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

                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ m: '20px 0' }} >
                            <Grid item xs={11} md={3} margin={2} >

                                <Autocomplete
                                    {...set_variables_select}
                                    id="controlled-demo"
                                    value={variable_selected}
                                    onChange={(event: any, newValue: any) => {
                                        set_variable_selected(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Seleccione variable" variant="standard" />
                                    )}
                                />
                            </Grid>
                        </Stack>


                        <Typography variant="body1" align="center">

                            <Title title={variable_selected.title} ></Title>
                            <ChartData data={variable_selected.data} chart_id={variable_selected.chart_id} />
                        </Typography>
                    </Typography>
                    <Typography variant="body1" align="center" hidden={selectdashboards.opc_dashboards !== "3"}>
                        <Title title="Por favor seleccione las fechas para filtrar los datos" ></Title>

                        <Stack direction="row" spacing={1} alignItems="center" sx={{ m: '20px 0' }} >

                            <label >Fecha Inicial</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                                <DatePicker
                                    label="Desde la fecha"
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
                            <label>Fecha Final</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                                <DatePicker
                                    label="Hasta la fecha"
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

                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ m: '20px 0' }} >
                            <Grid item xs={11} md={3} margin={2} >

                                <Autocomplete
                                    {...set_variables_select}
                                    id="controlled-demo"
                                    value={variable_selected}
                                    onChange={(event: any, newValue: any) => {
                                        set_variable_selected(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Seleccione variable" variant="standard" />
                                    )}
                                />
                            </Grid>
                        </Stack>


                        <Typography variant="body1" align="center">

                            <Title title={variable_selected.title} ></Title>
                            <ChartData data={variable_selected.data} chart_id={variable_selected.chart_id} />
                        </Typography>
                    </Typography>
                    <Typography variant="body1" align="center" hidden={selectdashboards.opc_dashboards !== "4"}>
                        <Title title="Por favor seleccione las fechas para filtrar los datos" ></Title>

                        <Stack direction="row" spacing={1} alignItems="center" sx={{ m: '20px 0' }} >

                            <label >Fecha Inicial</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                                <DatePicker
                                    label="Desde la fecha"
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
                            <label>Fecha Final</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                                <DatePicker
                                    label="Hasta la fecha"
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

                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ m: '20px 0' }} >
                            <Grid item xs={11} md={3} margin={2} >

                                <Autocomplete
                                    {...set_variables_select}
                                    id="controlled-demo"
                                    value={variable_selected}
                                    onChange={(event: any, newValue: any) => {
                                        set_variable_selected(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Seleccione variable" variant="standard" />
                                    )}
                                />
                            </Grid>
                        </Stack>


                        <Typography variant="body1" align="center">

                            <Title title={variable_selected.title} ></Title>
                            <ChartData data={variable_selected.data} chart_id={variable_selected.chart_id} />
                        </Typography>
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}
