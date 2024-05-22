/* eslint-disable @typescript-eslint/naming-convention */
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { Title } from '../../../../components/Title';
import { Grid, TextField, Button, CircularProgress, InputLabel, Select, FormControl, MenuItem, SelectChangeEvent } from '@mui/material';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { api } from '../../../../api/axios';
import SearchIcon from '@mui/icons-material/Search';

export interface CarteraEdadData {
    "0 a 30 Dias": number;
    "181 a 360 Dias": number;
    "Mas 360 Dias": number;
}

export const CarteraEdad: React.FC = () => {
    const initialCarteraEdad: CarteraEdadData = {
        "0 a 30 Dias": 0,
        "181 a 360 Dias": 0,
        "Mas 360 Dias": 0
    };

    const [carteraEdad, setCarteraEdad] = useState<CarteraEdadData>(initialCarteraEdad);
    const [formData, setFormData] = useState({ fecha_facturacion_desde: '', fecha_facturacion_hasta: '', id_rango: '' });
    const [loading, setLoading] = useState(false);
    const [choiseConcepto, setChoiseConcepto] = useState([]);
    const colors = ['#008FFB', '#00E396', '#FEB019'];

    const [chartData, setChartData] = useState({
        series: [{
            data: [initialCarteraEdad["0 a 30 Dias"], initialCarteraEdad["181 a 360 Dias"], initialCarteraEdad["Mas 360 Dias"]]
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar' as const,
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
                    ['0', 'a', '30 días'],
                    ['181', 'a', '360 días'],
                    ['más de', '360 días'],
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

    const fetchCarteraEdad = async (): Promise<void> => {
        setLoading(true);
        try {
            const url = `/recaudo/reportes/reporte-general-cartera-edad/`;
            const res = await api.get(url, { params: formData });
            setCarteraEdad(res.data.data);
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name as string]: value
        }));
    };

    useEffect(() => {
        setChartData(prevChartData => ({
            ...prevChartData,
            series: [{
                data: [carteraEdad["0 a 30 Dias"], carteraEdad["181 a 360 Dias"], carteraEdad["Mas 360 Dias"]]
            }]
        }));
    }, [carteraEdad]);

    useEffect(() => {
        fetchChoiseConcepto();
    }, []);

    return (
        <Grid container item xs={12} marginLeft={2} marginRight={2} spacing={2} marginTop={3} sx={{
            position: 'relative',
            borderRadius: '15px',
            background: '#FAFAFA',
            boxShadow: '0px 3px 6px #042F4A26',
            p: '20px', m: '10px 0 20px 0', mb: '20px',
        }}>
            <Grid item xs={12} sm={12}>
                <Title title="Reporte General de Cartera Por Edad" />
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
            {/* <Grid item xs={12} sm={3}>
                <TextField
                    label="Concepto edad"
                    name="id_rango"
                    disabled
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={formData.id_rango}
                />
            </Grid> */}

            <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                    <InputLabel id="choise-label">Concepto</InputLabel>
                    <Select
                        id="demo-simple-select-2"
                        size="small"
                        name="id_rango"
                        style={{ width: "95%" }}
                        label="Profesional"
                        value={formData.id_rango || ""}
                        onChange={handleSelectChange}
                    >
                        {choiseConcepto.map((item: any, index: number) => (
                            <MenuItem key={index} value={item.id}>
                                {item.descripcion}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={fetchCarteraEdad}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                    >
                    Buscar
                </Button>
            </Grid>

            <Grid item xs={12} sm={12} sx={{
                background: `url('https://api.gbif.org/v1/image/unsafe/https%3A%2F%2Fraw.githubusercontent.com%2FSIB-Colombia%2Flogos%2Fmain%2Fsocio-SiB-cormacarena.png') no-repeat center center, #FFFFFF `,
            }}>
                <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
            </Grid>
        </Grid>
    );
};
