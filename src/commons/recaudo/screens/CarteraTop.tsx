

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// eslint-disable-next-line @typescript-eslint/naming-convention
// eslint-disable-next-line @typescript-eslint/no-var-requires
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { api } from '../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { SetStateAction, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { Title } from '../../../components/Title';
import { AuthSlice } from '../../auth/interfaces';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { control_error } from '../alertas/store/thunks/alertas';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { BuscadorPersona } from '../../../components/BuscadorPersona';
import { control_success } from '../../recursoHidrico/requets/Request';
import { DialogGeneradorDeDirecciones } from '../../../components/DialogGeneradorDeDirecciones';
import { FormControl, Grid, TextField, InputLabel, MenuItem, Select, SelectChangeEvent, Button, IconButton, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Logorecaudo from '../../gestorDocumental/InfoEncuesta/components/logorecaudo';



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
            data: [31, 26, 20, 21, 29, 10, 21, 22, 10, 10,]
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
                    ['MUNICIPIO DE', 'VILLAVICENCIO'],
                    ['ECOLOGICAL', 'SOLUTIONS FOR OIL', 'INDUSTY S.A.S'],
                    ['I-M.E.C S.A. E.S.P ', 'INGENIERIA', 'MEDICIONES', 'EMISIONES Y', 'CONTROLES'],
                    ['EMPRESA DE ', 'SERVICIOS PUBLICOS', 'DE RESTREPO AGUA', 'VIVAS S.A E.S.P'],
                    ['E.S.P. EMPRESA DE ', 'SERVICIOS PUBLICOS', 'DEL META "EDESA"'],
                    ['EMPRESA DE ', 'SERVICIOS PUBLICOS', 'DE GRANADA E.S.P'],
                    ['E.S.P. EMPRESA DE ', 'SERVICIOS PUBLICOS', 'DEL META "EDESA"'], 
                    ['SALUDCOOP ENRIDAD', 'PROMOTORA DE', 'SALUD ORGANISMO', 'COOPERATIVO', 'SALUDCOOP EN', 'LIQUIDACION'], 
                    ['EMPRESA DE', 'SERVICIO PUBLICOS', 'DE GRANADA E.S.P.'],
                    ['EMPRESA DE', 'SERVICIO PUBLICOS', 'DE GRANADA E.S.P.'],

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
                        label="Consepto edad"
                        name="edad"
                        disabled
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={handleInputChange}
                        value={formData.edad}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Consepto deuda"
                        name="deuda"
                        disabled
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={handleInputChange}
                        value={formData.deuda}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Consepto top 5"
                        name="top"
                        disabled
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={handleInputChange}
                        value={formData.top}
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





