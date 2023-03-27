/* eslint-disable @typescript-eslint/no-misused-promises */
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler } from "chart.js";
import { useEffect, useState } from "react";
import { Grid, Stack, Typography, FormControl, Button, TextField, } from '@mui/material';
import { api } from "../../../../api/axios";
import type { EstacionData } from "../interfaces/interfaces";
import { Title } from '../../../../components/Title';
import { Line } from "react-chartjs-2"
import { Controller, useForm } from "react-hook-form";
import type { ChartOptions } from 'chart.js/auto';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment';
import { control_success, control_success_fail } from '../../requets/Request';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const DashboardScreen: React.FC = () => {

    const [selectdashboards, set_select_dashboards] = useState({
        opc_dashboards: 0,
    })
    const {
        control,
    } = useForm();

    const opc_dashboards = [
        { label: 'Estación Guamal', value: 1 },
        { label: 'Estación Guayuriba', value: 2 },
        { label: 'Estación Ocoa', value: 3 },
        { label: 'Estación Puerto Gaitan', value: 4 },
    ];




    const [queryestaciones, setqueryestaciones] = useState<{
        labels: any[];
        datasets: any[];
    }>({
        labels: [],
        datasets: [],
    });
    const [querytemperatura, setquerytemperatura] = useState<{
        labels: any[];
        datasets: any[];
    }>({
        labels: [],
        datasets: [],
    });
    const [queryhumedad, setqueryhumedad] = useState<{
        labels: any[];
        datasets: any[];
    }>({
        labels: [],
        datasets: [],
    });
    const [queryluminosidad, setqueryluminosidad] = useState<{
        labels: any[];
        datasets: any[];
    }>({
        labels: [],
        datasets: [],
    });
    const [queryvelocidadagua, setqueryvelocidadagua] = useState<{
        labels: any[];
        datasets: any[];
    }>({
        labels: [],
        datasets: [],
    });
    const [queryvelocidadviento, setqueryvelocidadviento] = useState<{
        labels: any[];
        datasets: any[];
    }>({
        labels: [],
        datasets: [],
    });
    const [queryprecipitacion, setqueryprecipitacion] = useState<{
        labels: any[];
        datasets: any[];
    }>({
        labels: [],
        datasets: [],
    });
    const [querydireccion, setquerydireccion] = useState<{
        labels: any[];
        datasets: any[];
    }>({
        labels: [],
        datasets: [],
    });
    const [querynivelagua, setquerynivelagua] = useState<{
        labels: any[];
        datasets: any[];
    }>({
        labels: [],
        datasets: [],
    });

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [start_date, set_start_date] = useState<Date | null>(new Date());
    const [end_date, set_end_date] = useState<Date | null>(new Date());

    const [dates_selected, set_dates_selected] = useState(false);

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handle_start_date_change = (date: Date | null) => {
        const start_date_string = (date != null) ? date.toISOString().slice(0, 10) : '';
        console.log(start_date_string);
        set_start_date(date)
        return start_date_string
    };

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handle_end_date_change = (date: Date | null) => {
        const end_date_string = (date != null) ? date.toISOString().slice(0, 10) : '';
        console.log(end_date_string);
        set_end_date(date)
        return end_date_string
    };




    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const get_datos_estaciones = async (): Promise<EstacionData[]> => {

        // primera solicitud para filtrar por fechas
        const start_date_string = handle_end_date_change(start_date)
        const end_date_string = handle_end_date_change(end_date)

        console.log(start_date_string);
        console.log(end_date_string);
        if (end_date_string < start_date_string) { control_success_fail("La fecha inicial no puede ser mas reciente que la fecha final") }
        const { data: { data: data_success } } = await api.get(
            `estaciones/datos/consultar-datos-fecha/${start_date_string}/${end_date_string}`
        );

        console.log(data_success)
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const filtereddata = data_success.filter((datos: EstacionData) =>
            datos.id_estacion === selectdashboards.opc_dashboards &&
            moment(datos.fecha_registro).isBetween(moment(start_date_string), moment(end_date_string))
        );

        const formatteddata = formatdataforchart(filtereddata);
        setqueryestaciones(formatteddata);

        const formatteddatatemperatura = formatdatafortemperatura(filtereddata);
        setquerytemperatura(formatteddatatemperatura);

        const formatteddatahumedad = formatdataforhumedad(filtereddata);
        setqueryhumedad(formatteddatahumedad);

        const formatteddataluminosidad = formatdataforluminosidad(filtereddata);
        setqueryluminosidad(formatteddataluminosidad);

        const formatteddatanivelagua = formatdatafornivelagua(filtereddata);
        setquerynivelagua(formatteddatanivelagua);

        const formatteddatavelocidadagua = formatdataforvelocidadagua(filtereddata);
        setqueryvelocidadagua(formatteddatavelocidadagua);

        const formatteddatavelocidaviento = formatdataforvelocidadviento(filtereddata);
        setqueryvelocidadviento(formatteddatavelocidaviento);

        const formatteddatadireccion = formatatafordireccion(filtereddata);
        setquerydireccion(formatteddatadireccion);

        const formatteddataprecipitacion = formatdataforprecipitacion(filtereddata);
        setqueryprecipitacion(formatteddataprecipitacion);
        if (filtereddata != null) {
            console.log("Paso")
            control_success("Se encontraron Datos")
        } else {
            control_success_fail("No se encontraron datos")
        }

        return filtereddata(data_success);

    };



    const options: ChartOptions = {
        plugins: {
            title: {
                display: true,
                text: ''
            },
            legend: {
                position: 'top',
            }
        }
    };
    ChartJS.register(
        ArcElement,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Tooltip,
        Legend,
        Filler,
    );
    useEffect(() => {
        void get_datos_estaciones();
    }, [end_date]);

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const formatdataforchart = (data: EstacionData[]) => {
        const labels = data.map((item) => item.fecha_registro.toString().slice(0, 10));
        const dataset = {
            label: "Presion",
            data: data.map((item) => item.presion_barometrica),
            borderColor: "rgb(58, 158, 181)",
            backgroundColor: "rgb(58, 158, 181)",
        };
        return { labels, datasets: [dataset] };
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const formatdatafortemperatura = (data: EstacionData[]) => {
        const labels = data.map((item) => item.fecha_registro.toString().slice(0, 10));
        const dataset = {
            label: "Temperatura",
            data: data.map((item) => item.temperatura_ambiente),
            borderColor: "rgb(58, 158, 181)",
            backgroundColor: "rgb(58, 158, 181)",
        };
        return { labels, datasets: [dataset] };
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const formatdataforluminosidad = (data: EstacionData[]) => {
        const labels = data.map((item) => item.fecha_registro.toString().slice(0, 10));
        const dataset = {
            label: "Lux",
            data: data.map((item) => item.luminosidad),
            borderColor: "rgb(58, 158, 181)",
            backgroundColor: "rgb(58, 158, 181)",
        };
        return { labels, datasets: [dataset] };
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const formatdatafornivelagua = (data: EstacionData[]) => {
        const labels = data.map((item) => item.fecha_registro.toString().slice(0, 10));
        const dataset = {
            label: "Nivel [m]",
            data: data.map((item) => item.nivel_agua),
            borderColor: "rgb(58, 158, 181)",
            backgroundColor: "rgb(58, 158, 181)",
        };
        return { labels, datasets: [dataset] };
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const formatdataforvelocidadagua = (data: EstacionData[]) => {
        const labels = data.map((item) => item.fecha_registro.toString().slice(0, 10));
        const dataset = {
            label: "Velocidad m/s",
            data: data.map((item) => item.velocidad_agua),
            borderColor: "rgb(58, 158, 181)",
            backgroundColor: "rgb(58, 158, 181)",
        };
        return { labels, datasets: [dataset] };
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const formatdataforvelocidadviento = (data: EstacionData[]) => {
        const labels = data.map((item) => item.fecha_registro.toString().slice(0, 10));
        const dataset = {
            label: "Velocidad viento",
            data: data.map((item) => item.Velocidad_Viento),
            borderColor: "rgb(58, 158, 181)",
            backgroundColor: "rgb(58, 158, 181)",
        };
        return { labels, datasets: [dataset] };
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const formatdataforhumedad = (data: EstacionData[]) => {
        const labels = data.map((item) => item.fecha_registro.toString().slice(0, 10));
        const dataset = {
            label: "% Humedad",
            data: data.map((item) => item.humedad_ambiente),
            borderColor: "rgb(58, 158, 181)",
            backgroundColor: "rgb(58, 158, 181)",
        };
        return { labels, datasets: [dataset] };
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const formatatafordireccion = (data: EstacionData[]) => {
        const labels = data.map((item) => item.fecha_registro.toString().slice(0, 10));
        const dataset = {
            label: "Direccion viento",
            data: data.map((item) => item.direccion_viento),
            borderColor: "rgb(58, 158, 181)",
            backgroundImage: ``,
        };
        return { labels, datasets: [dataset] };
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const formatdataforprecipitacion = (data: EstacionData[]) => {
        const labels = data.map((item) => item.fecha_registro.toString().slice(0, 10));
        const dataset = {
            label: "Precipitacion",
            data: data.map((item) => item.precipitacion),
            borderColor: "rgb(58, 158, 181)",
            backgroundColor: "rgb(58, 158, 181)",
        };
        return { labels, datasets: [dataset] };
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


                    <Controller
                        name="opcDashboard"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth>
                                <Title title="Comportamiento de las variables" />
                                <Stack direction="row" spacing={2} sx={{ m: '20px 0' }}>
                                    <Controller
                                        name="opcDashboard"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                onChange={(e) => {
                                                    set_select_dashboards({
                                                        ...selectdashboards,
                                                        opc_dashboards: parseInt(e.target.value)
                                                    });
                                                }}
                                                select
                                                variant="outlined"
                                                label="Estacion"
                                                defaultValue={"Estacion"}
                                                value={null}
                                                SelectProps={{
                                                    native: true,
                                                }}
                                            >
                                                {opc_dashboards.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                        )}
                                    />
                                </Stack>
                            </FormControl>
                        )}
                    />


                    <Typography variant="body1" align="center" hidden={selectdashboards.opc_dashboards === 0}>
                        <Title title="Por favor seleccione las fechas para filtrar los dato" ></Title>

                        <Stack direction="row" spacing={1} alignItems="center" sx={{ m: '20px 0' }} >

                            <label >Fecha Inicial</label>

                            <DatePicker
                                selected={start_date}
                                onChange={(date) => {
                                    handle_start_date_change(date);
                                    set_dates_selected(false);
                                }}
                                placeholderText="Fecha inicial"
                            />
                            <label>Fecha Final</label>
                            <DatePicker
                                selected={end_date}
                                onChange={(date) => {
                                    handle_end_date_change(date);
                                    set_dates_selected(false);
                                }}
                                placeholderText="Fecha Final"
                            />
                            <Button variant="contained" type="submit" className="text-capitalize rounded-pill  " fullWidth onClick={() => { set_dates_selected(true); }}>Consultar variables<SearchIcon /></Button>
                        </Stack>

                        <Typography variant="body1" align="center" hidden={!dates_selected}>
                            <Title title="Presión barometrica" ></Title>
                            <Line data={queryestaciones} options={options} />
                            <Title title="Humedad" ></Title>
                            <Line data={queryhumedad} options={options} />
                            <Title title="Direccion de Viento" ></Title>
                            <Line data={querydireccion} options={options} />
                            <Title title="Precipitación" ></Title>
                            <Line data={queryprecipitacion} options={options} />
                            <Title title="Luminosidad" ></Title>
                            <Line data={queryluminosidad} options={options} />
                            <Title title="Temperatura" ></Title>
                            <Line data={querytemperatura} options={options} />
                            <Title title="Velocidad del viento" ></Title>
                            <Line data={queryvelocidadviento} options={options} />
                            <Title title="Velocidad del agua" ></Title>
                            <Line data={queryvelocidadagua} options={options} />
                            <Title title="Nivel del agua" ></Title>
                            <Line data={querynivelagua} options={options} />
                        </Typography>
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}
