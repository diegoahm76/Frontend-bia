/* eslint-disable @typescript-eslint/naming-convention */
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { Title } from '../../../../components/Title';
import { Grid, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { api } from '../../../../api/axios';

// Definición de la interfaz para los datos de la cartera por edad
export interface CarteraEdadData {
    "0 a 30 Dias": number;
    "181 a 360 Dias": number;
    "Mas 360 Dias": number;
}

export const CarteraEdad: React.FC = () => {
    // Estado inicial para los datos de la cartera por edad
    const initialCarteraEdad: CarteraEdadData = {
        "0 a 30 Dias": 0,
        "181 a 360 Dias": 0,
        "Mas 360 Dias": 0
    };

    // Estado para los datos de la cartera por edad
    const [CarteraEdad, set_CarteraEdad] = useState<CarteraEdadData>(initialCarteraEdad);

    const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'];

    // Estado para la serie de datos y las opciones de la gráfica
    const [chartData, setChartData] = useState({
        series: [{
            data: [initialCarteraEdad["0 a 30 Dias"], initialCarteraEdad["181 a 360 Dias"], initialCarteraEdad["Mas 360 Dias"]]
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
                    ['0', 'a', '30 dias'],
                    ['181', 'a', '360 dias'],
                    ['mas de ', '360 dias'],
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



    // Función asincrónica para obtener los datos de la cartera por edad desde la API
    const GraficaCarteraEdad = async (): Promise<void> => {
        try {
            const url = `/recaudo/reportes/reporte-general-cartera-edad/`;
            const res = await api.get(url); // Realiza la solicitud GET a la API
            const data_consulta = res.data.data;
            // Actualiza el estado de la cartera por edad con los datos obtenidos
            set_CarteraEdad(data_consulta);
        } catch (error) {
            console.error(error);
        }
    };

    // Efecto para obtener los datos de la cartera por edad al cargar el componente
    useEffect(() => {
        GraficaCarteraEdad();
    }, []);

    // Efecto para actualizar la serie de datos de la gráfica cuando cambian los datos de la cartera por edad
    useEffect(() => {
        // Verifica si CarteraEdad tiene valores válidos
        if (CarteraEdad) {
            // Actualiza la serie de datos con los nuevos valores de CarteraEdad
            setChartData(prevChartData => ({
                ...prevChartData,
                series: [{
                    data: [CarteraEdad["0 a 30 Dias"], CarteraEdad["181 a 360 Dias"], CarteraEdad["Mas 360 Dias"]]
                }]
            }));
        }
    }, [CarteraEdad]);

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




                {/* Gráfica de ApexCharts */}
                <Grid item xs={12} sm={12} sx={{
                    background: `url('https://api.gbif.org/v1/image/unsafe/https%3A%2F%2Fraw.githubusercontent.com%2FSIB-Colombia%2Flogos%2Fmain%2Fsocio-SiB-cormacarena.png') no-repeat center center, #FFFFFF `,
                }}>
                    <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
                </Grid>

            </Grid>
        </>
    );
};
