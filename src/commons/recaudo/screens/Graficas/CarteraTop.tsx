/* eslint-disable @typescript-eslint/naming-convention */
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { Title } from '../../../../components/Title';
import { Grid, TextField, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { api } from '../../../../api/axios';

export const DeudoresXConceptoTop: React.FC = () => {

    // Colores para la gráfica
    const colors = ['#008FFB', '#00E396', '#775DD0', '#FEB019', '#FF4560', '#546E7A', '#26a69a', '#D10CE8'];
    const [choiseConcepto, setChoiseConcepto] = useState([]);

    // Estado inicial para la serie y opciones de la gráfica
    const [chartData, setChartData] = useState({
        series: [{
            data: [0]
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar' as const,
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
                categories: [],
                labels: {
                    style: {
                        colors: colors,
                        fontSize: '12px'
                    }
                }
            }
        },
    });

    // Estado inicial del formulario
    const initialFormData = {
        fecha_facturacion_desde: '',
        fecha_facturacion_hasta: '',
        codigo_contable: ''
    };

    // Definición de los estados
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);

    // Maneja los cambios en los inputs del formulario
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = event.target as HTMLInputElement;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Función que obtiene los datos de los deudores top 10 y actualiza la gráfica
    const carteraDeudaTop = async (): Promise<void> => {
        setLoading(true);
        try {
            const url = `/recaudo/reportes/reporte-general-cartera-deudores/`;
            const res = await api.get(url, { params: formData });
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
                        categories: nombres as never[],
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
        } finally {
            setLoading(false);
        }
    };

    const fetchChoiseConcepto = async (): Promise<void> => {
        setLoading(true);
        try {
            const url = `/recaudo/reportes/reporte-concepto-contable/`;
            const res = await api.get(url);
            setChoiseConcepto(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Efecto que se ejecuta al montar el componente para cargar datos iniciales
    useEffect(() => {
        fetchChoiseConcepto();
        carteraDeudaTop();
    }, []);

    // Función para limpiar el formulario
    const handleClearForm = () => {
        setFormData(initialFormData);
       
      
    };

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
                    <Title title="Reporte General Cartera Top 10 Deudores x Concepto " />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        label="Fecha desde"
                        type="date"
                        size="small"
                        name="fecha_facturacion_desde"
                        variant="outlined"
                        value={formData.fecha_facturacion_desde}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        label="Fecha hasta"
                        type="date"
                        size="small"
                        name="fecha_facturacion_hasta"
                        variant="outlined"
                        value={formData.fecha_facturacion_hasta}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleInputChange}
                    />
                </Grid>
                
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel id="choise-label">Concepto</InputLabel>
                        <Select
                            id="demo-simple-select-2"
                            size="small"
                            name="codigo_contable"
                            style={{ width: "95%" }}
                            label="Concepto"
                            value={formData.codigo_contable || ""}
                            onChange={(e:any) => handleInputChange(e)}
                        >
                            {choiseConcepto.map((item: any, index: number) => (
                                <MenuItem key={index} value={item.id}>
                                    {item.descripcion}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} sm={2}>
                    <Button
                        color="primary"
                        variant="contained"
                        startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                        onClick={carteraDeudaTop}
                        disabled={loading}
                    >
                        Buscar
                    </Button>
                </Grid>
                <Grid item xs={2} sm={2}>
                    <Button
                        color="primary"
                        variant="outlined"
                        startIcon={<ClearIcon />}
                        onClick={handleClearForm}
                        disabled={loading}
                    >
                        Limpiar
                    </Button>
                </Grid>

                <Grid item xs={12} sm={12} sx={{
                    background: `url('https://api.gbif.org/v1/image/unsafe/https%3A%2F%2Fraw.githubusercontent.com%2FSIB-Colombia%2Flogos%2Fmain%2Fsocio-SiB-cormacarena.png') no-repeat center center, #FFFFFF `,
                }}>
                    <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
                </Grid>
            </Grid>
        </>
    );
};
