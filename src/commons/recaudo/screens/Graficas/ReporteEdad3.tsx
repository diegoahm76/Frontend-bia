/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import { Title } from '../../../../components/Title';
import { Grid, TextField, Button, InputLabel, FormControl, Select, MenuItem, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ReactApexChart from 'react-apexcharts';
import { api } from '../../../../api/axios';
import ClearIcon from '@mui/icons-material/Clear';

export const GraficaApex = () => {
   

    const initialFormData = {
        fecha_desde: '',
        fecha_hasta: '',
        codigo_contable: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [choiseConcepto, setChoiseConcepto] = useState([]);

    const [estado, setEstado] = useState({
        series: [{
            data: [0]
        }],
        options: {
            chart: {
                type: 'bar' as const,
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: []
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '9px',
                    },
                },
            },
        }
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    
    // Función que obtiene los datos de cartera de deuda y actualiza la gráfica
    const carteraDeuda = async () => {
        setLoading(true);
        try {
            const url = `/recaudo/reportes/reporte-general-cartera-deuda-y-etapa/`;
            const res = await api.get(url, { params: formData });
            const data_consulta = res.data.data;
            const data = Object.values(data_consulta).map((item: any) => item.total_sancion);
            const categories = Object.values(data_consulta).map((item: any) => item.codigo_contable__descripcion);

            setEstado({
                series: [{ data }],
                options: {
                    ...estado.options,
                    xaxis: {
                        categories: categories as never[],
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


    useEffect(() => {
        fetchChoiseConcepto();
        carteraDeuda();
    }, []);

    return (
        <Grid
        container
        item
        xs={12}
        marginLeft={2}
        marginRight={2}
        spacing={2}
        marginTop={3}
        sx={{
          position: 'relative',
          borderRadius: '15px',
          background: '#FAFAFA',
          boxShadow: '0px 3px 6px #042F4A26',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
        }}
      >
            <Grid item xs={12} sm={12}>
                <Title title="Reporte General Cartera Por Deuda" />
            </Grid>

            <Grid item xs={12} sm={3}>
                <TextField
                    fullWidth
                    label="Fecha desde"
                    type="date"
                    size="small"
                    name="fecha_desde"
                    variant="outlined"
                    value={formData.fecha_desde}
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
                    name="fecha_hasta"
                    variant="outlined"
                    value={formData.fecha_hasta}
                    InputLabelProps={{ shrink: true }}
                    onChange={handleInputChange}
                />
            </Grid>

            <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                    <InputLabel id="choise-label">Concepto</InputLabel>
                    <Select
                        id="demo-simple-select-2"
                        size="small"
                        name="id_rango"
                        style={{ width: "95%" }}
                        label="Profesional"
                        value={formData.codigo_contable || ""}
                        onChange={(e) => setFormData({ ...formData, codigo_contable: e.target.value })}
                    >
                        {choiseConcepto.map((item: any, index: number) => (
                            <MenuItem key={index} value={item.id}>
                                {item.descripcion}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item>
                <Button
                    color="primary"
                    variant="contained"
                    startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                    onClick={carteraDeuda}
                    disabled={loading}
                >
                    Buscar
                </Button>
            </Grid>
            <Grid item>
                <Button
                    color="primary"
                    variant="outlined"
                    startIcon={<ClearIcon />}
                    onClick={() => setFormData(initialFormData)}
                    disabled={loading}
                >
                    Limpiar
                </Button>
            </Grid>

            <Grid item xs={12} sm={12} sx={{ background: `url('https://api.gbif.org/v1/image/unsafe/https%3A%2F%2Fraw.githubusercontent.com%2FSIB-Colombia%2Flogos%2Fmain%2Fsocio-SiB-cormacarena.png') no-repeat center center, #FFFFFF ` }}>
                <div id="chart">
                    <ReactApexChart options={estado.options} series={estado.series} type="bar" height={1500} />
                </div>
            </Grid>
        </Grid>
    );
}
