

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// eslint-disable-next-line @typescript-eslint/naming-convention
// eslint-disable-next-line @typescript-eslint/no-var-requires
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { Title } from '../../../../components/Title';
import { Grid, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { api } from '../../../../api/axios';





const GraficaApex = () => {




    // Asegúrate de que los estados iniciales y las opciones cumplan con los tipos esperados

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



    const carteraDeuda = async (): Promise<void> => {
        try {
            const url = `/recaudo/reportes/reporte-general-cartera-deuda/`;
            const res = await api.get(url);
            const data_consulta = res.data.data;
            const data_consulta_dos = res.data.data;


            // Extraer las claves y valores del objeto de datos
            // const categories = Object.keys(data_consulta);
            const data = Object.values(data_consulta).map((item: any) => item.total_sancion);
            let categories: string[] = [];

            if (data_consulta_dos && Array.isArray(data_consulta_dos)) {
                categories = Object.values(data_consulta_dos).map((item: any) => item.codigo_contable__descripcion);
            }
            console.log("categories", categories)

 

            setEstado({
                series: [{ data }],
                options: {
                    ...estado.options,
                    xaxis: {
                        categories: categories as never[], // Aquí estamos forzando el tipo para evitar el error
                    },
                },
            });





        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        carteraDeuda();
    }, [])


    return (
        <div>
            <div id="chart">
                <ReactApexChart options={estado.options} series={estado.series} type="bar" height={1500} />
            </div>
        </div>
    );
};

export interface FormData {

    edad: any,
    fecha_hasta: any;
    fecha_desde: any;
    deuda: any,
};

export const CarteraEdad7: React.FC = () => {

    const initialFormData: FormData = {

        fecha_desde: '',
        fecha_hasta: '',
        edad: '',
        deuda: '',
    };
    const [formData, setFormData] = useState(initialFormData);


    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
                    <Title title="Reporte General Cartera Por Deuda" />
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
                        value={'TODOS'}

                        onChange={handleInputChange}
                    // value={formData.edad}
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
                    <GraficaApex />
                </Grid>


            </Grid>
        </>
    );
};





