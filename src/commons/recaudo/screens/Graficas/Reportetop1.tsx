/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect } from 'react';
import { Title } from '../../../../components/Title';
import { Grid, TextField, Button, InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ReactApexChart from 'react-apexcharts';
import { api } from '../../../../api/axios';
import ClearIcon from '@mui/icons-material/Clear';



export const ReporteCarteraDeudayEdadTop: React.FC = () => {
    interface FormData {
        fecha_facturacion_desde: string;
        fecha_facturacion_hasta: string;
        codigo_contable: string;
        id_rango: string;
    }

    interface TopData {
        [key: string]: number;
    }

    const initialFormData: FormData = {
        fecha_facturacion_desde: '',
        fecha_facturacion_hasta: '',
        codigo_contable: '',
        id_rango: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [topData, setTopData] = useState<TopData>({});
    const [loading, setLoading] = useState(false);
    console.log("formData", formData)


    const fetchTopData = async (): Promise<void> => {
        setLoading(true);
        try {
            const url = `/recaudo/reportes/reporte-general-cartera-deuda-top/`;
            const res = await api.get(url, { params: formData });
            setTopData(res.data.top_5_por_codigo_contable);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    const [choiseConcepto, setChoiseConcepto] = useState([]);

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
        fetchTopData();
        fetchChoiseConcepto();
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
                <Title title="Reporte de Cartera Por Deuda y Edad – Top 1" />
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
                    onChange={(e) => setFormData({ ...formData, fecha_facturacion_desde: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, fecha_facturacion_hasta: e.target.value })}
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField
                    label="Codigo Contable"
                    name="codigo_contable"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={formData.codigo_contable}
                    onChange={(e) => setFormData({ ...formData, codigo_contable: e.target.value })}

                />
            </Grid>

            <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                    <InputLabel id="choise-label">Concepto</InputLabel>
                    <Select
                        id="demo-simple-select-2"
                        size="small"
                        name="codigo_contable"
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
                    startIcon={<SearchIcon />}
                    onClick={fetchTopData}
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
                <ReactApexChart
                    options={{
                        chart: {
                            type: 'bar',
                            height: 450,
                        },
                        plotOptions: {
                            bar: {
                                borderRadius: 4,
                                horizontal: true,
                            },
                        },
                        dataLabels: { enabled: false },
                        xaxis: {
                            categories: Object.keys(topData).map((key) => [key]),
                        },
                    }}
                    series={[{ data: Object.values(topData) }]}
                    type="bar"
                    height={450}
                />
            </Grid>
        </Grid>
    );
};

