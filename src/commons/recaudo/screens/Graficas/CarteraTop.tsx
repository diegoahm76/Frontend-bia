/* eslint-disable @typescript-eslint/naming-convention */
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { Title } from '../../../../components/Title';
import { Grid, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { api } from '../../../../api/axios';



export interface FormData {

    edad: any,
    fecha_hasta: any;
    fecha_desde: any;
    deuda: any,
    top:any,
};
export const CarteraTop: React.FC = () => {

    const colors = ['#008FFB', '#00E396', '#775DD0', '#FEB019', '#FF4560', '#546E7A', '#26a69a', '#D10CE8'];

    // Estado inicial para la serie y opciones de la gráfica
    const [chartData, setChartData] = useState({
        series: [{
            data: [0]
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
                    columnWidth: '65%',
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
                categories:[],
                labels: {
                  style: {
                    colors: colors,
                    fontSize: '12px'
                  }
                }
              }
            
        },
    });


    const initialFormData: FormData = {

        fecha_desde: '',
        fecha_hasta: '',
        edad: '',
        deuda: '',
        top:"",
    };
    const [formData, setFormData] = useState(initialFormData);


    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    
    const carteraDeudaTop = async (): Promise<void> => {
        try {
            const url = `/recaudo/reportes/reporte-general-cartera-deudores/`;
            const res = await api.get(url);
            const data_consulta = res.data.top_10_deudores;
            const data = Object.values(data_consulta).map((item: any) => item.total_sancion);

            let nombres: string[] = [];
            if (data_consulta && Array.isArray(data_consulta)) {
                nombres = Object.values(data_consulta).map((item: any) => item.nombres);
            }
       
            // Actualizamos el estado de la gráfica con los nuevos valores
            setChartData({
                series: [{ data }],
        
                options: {
                    ...chartData.options,
                    xaxis: {
                        categories: nombres as never[], // Aquí estamos forzando el tipo para evitar el error
                        labels: {
                            style: {
                              colors: colors,
                              fontSize: '12px'
                            }
                          }
                    },
                },
            });

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        carteraDeudaTop();
    }, []);

    
    return (
        <>
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} spacing={2} marginTop={3}
                sx={{
                    position: 'relative',
                    // background: `url('https://api.gbif.org/v1/image/unsafe/https%3A%2F%2Fraw.githubusercontent.com%2FSIB-Colombia%2Flogos%2Fmain%2Fsocio-SiB-cormacarena.png') no-repeat center center, #FFFFFF `,

                    borderRadius: '15px',
                    background: '#FAFAFA',
                    boxShadow: '0px 3px 6px #042F4A26',
                    p: '20px', m: '10px 0 20px 0', mb: '20px',
                }}
            >
                <Grid item xs={12} sm={12}>
                    <Title title="Reporte General Cartera Top 10 Deudores x Concepto " />
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
                        fullWidth
                        onChange={handleInputChange}
                        // value={formData.edad}
                        value={'TODOS'}

                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Concepto deuda"
                        name="deuda"
                        disabled
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={handleInputChange}
                        // value={formData.deuda}
                        value={'TODOS'}

                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Concepto "
                        name="top"
                        disabled
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={handleInputChange}
                        // value={formData.top}
                        value={'Top 10'}

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





