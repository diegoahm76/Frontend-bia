

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// eslint-disable-next-line @typescript-eslint/naming-convention
// eslint-disable-next-line @typescript-eslint/no-var-requires
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { Title } from '../../../components/Title';
import { Grid, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import ReactApexChart from 'react-apexcharts';



export interface FormData {

    edad: any,
    fecha_hasta: any;
    fecha_desde: any;
    estado_solicitud: any,
};
export const CarteraEdad: React.FC = () => {
    const initialFormData: FormData = {

        fecha_desde: '',
        fecha_hasta: '',
        edad: '',
        estado_solicitud: '',
    };
    const [formData, setFormData] = useState(initialFormData);


    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };





    const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'];

    // Estado inicial para la serie y opciones de la gráfica
    const [chartData, setChartData] = useState({
        series: [{
            data: [21, 22, 10,]
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar' as const, // Corregido para ser reconocido como un valor específico y no un string genérico
                events: {
                    click: function (chart: any, w: any, e: any) {
                        // Puedes manejar clics en la gráfica aquí
                    }
                }
            },
            colors: colors,
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            xaxis: {
                categories: [
                    ['0 a', '30 dias'],
                    ['181 a', '360 dias'],
                    ['mas de ', '360 dias'],

                    // ['Peter', 'Brown'],
                    // ['Mary', 'Evans'],
                    // ['David', 'Wilson'],
                    // ['Lily', 'Roberts'],
                ],
                labels: {
                    style: {
                        colors: colors,
                        fontSize: '12px'
                    }
                }
            }
        },
    });
    return (
        <>
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} spacing={2} marginTop={3}
                sx={{
                    position: 'relative',
                    borderRadius: '15px',
                    background: '#FAFAFA',
                    boxShadow: '0px 3px 6px #042F4A26',
                    p: '20px', m: '10px 0 20px 0', mb: '20px',
                }}
            >
                <Grid item xs={12} sm={12}>
                    <Title title="Reporte General de Cartera Por Edad" />
                </Grid>

                
                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        label="Fecha desde  "
                        type="date"
                        size="small"
                        name="fecha_desde"
                        variant="outlined"
                        value={formData.fecha_desde}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => {
                            handleInputChange(e);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        label=" Fecha hasta  "
                        type="date"
                        size="small"
                        name="fecha_hasta"
                        variant="outlined"
                        value={formData.fecha_hasta}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => {
                            handleInputChange(e);
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Concepto edad"
                        name="edad"
                        disabled
                        variant="outlined"
                        size="small"
                        value={'TODOS'}

                        fullWidth
                        onChange={handleInputChange}
                        // value={formData.edad}
                    />
                </Grid>

                <Grid item>
                    <Button
                        color="primary"
                        variant="contained"
                        startIcon={<SearchIcon />}
                        onClick={() => {

                        }}
                    >
                        buscar
                    </Button>
                </Grid>

                <Grid item xs={12} sm={12} sx={{
                    background: `url('https://api.gbif.org/v1/image/unsafe/https%3A%2F%2Fraw.githubusercontent.com%2FSIB-Colombia%2Flogos%2Fmain%2Fsocio-SiB-cormacarena.png') no-repeat center center, #FFFFFF `,
                }}  >
                    <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
                </Grid>

            </Grid>
        </>
    );
};





