

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// eslint-disable-next-line @typescript-eslint/naming-convention
// eslint-disable-next-line @typescript-eslint/no-var-requires
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { Title } from '../../../../components/Title';
import { Grid, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const GraficaApex = () => {
    // Asegúrate de que los estados iniciales y las opciones cumplan con los tipos esperados
    const estado = React.useState({
        series: [{
            data: [21, 23, 24, 25,
                26, 25, 24,
                25, 24, 12,
                16, 26, 12,
                15, 25, 14,
                20, 24, 16,
                22, 24, 12,
                22, 24, 17,
                12, 24, 17,
                22, 21,12]
        }],
        options: {
            chart: {
                // Especifica explícitamente el tipo de gráfico como un valor literal correspondiente
                type: 'bar' as const, // La adición de `as const` asegura que el tipo sea tratado como un literal
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

                categories: [
                    ['APROVECHAMIENTO', 'FORESTAL COACTIVO', ' DIFICIL RECAUDO'],
                    ['VISITAS TECNICAS', 'POR COBRAR COACTIVO', ' DIFICIL RECAUDO'],
                    ['PORCENTAJE Y SOBRETASA', 'AMBIENTAL VIGENCIA', 'DIFICIL RECAUDO'],
                    ['MULTAS PERSUASIVO', 'DIFICIL RECAUDO',],
                    ['MULTAS COACTIVO', 'DIFICIL RECAUDO',],
                    ['TASA RETRIBUTIVA', 'COACTIVO', ' DIFICIL RECAUDO'],
                    ['TASA USO DE', 'AGUA COACTIVO', 'DIFICIL RECAUDO'],
                    ['TASA USO DE', 'AGUA PERSUASIVO', 'DIFICIL RECAUDO'],
                    ['PORCENTAJE', 'AMBIENTAL ANTERIOR',],
                    ['PORCENTAJE', 'AMBIENTAL ACTUAL',],
                    ['SOBRETASA AMBIENTAL', 'VIGENCIA ANTERIOR',],
                    ['VISITAS TECNICAS ', 'DE EVALUACION, SEGUMIENTO', 'Y CONTROL ACTUAL'],
                    ['INTERESES VISITAS', 'TECNICAS POR COBRAR',],
                    ['INTERESES', 'SOBRETASA AMBIENTAL', ''],
                    ['INTERESES PORCENTAJE'],
                    ['INTERESES', 'TASA RETRIBUTIVA',],
                    ['INTERESES DEUDORES ', 'TASA USO DE AGUA'],
                    ['INTERESES MULTAS ', 'Y SANCIONES'],
                    ['MULTAS ANTERIOR',],
                    ['MULTAS ACTUAL'],
                    ['TRANSFERENCIA DEL', 'SECTOR ELECTRICO ', 'ANTERIOR TIYAVA'],
                    ['TRANSFERENCIA DEL', 'SECTOR ELECTRICO ', 'ACTUAL GUAYURIBA'],
                    ['TRANSFERENCIA DEL', 'SECTOR ELECTRICO', ' ACTUAL APIAY'],
                    ['TRANSFERENCIA DEL', 'SECTOR ELECTRICO ', 'ACTUAL GUATIQUIA'],
                    ['TRANSFERENCIA DEL', 'SECTOR ELECTRICO ', 'ACTUAL RIO META'],
                    ['TRANSFERENCIA DEL', 'SECTOR ELECTRICO ', 'ACTUAL GUARROJO'],
                    ['TRANSFERENCIA DEL ', 'SECTOR ELECTRICO ', 'ACTUAL TILLAVA'],
                    ['TASA RETRIBUTIVA  ', 'VIGENCIAS ANTERIORES'],
                    ['TASA RETRIBUTIVA ACTUAL '],
                    ['TASA USO DE AGUA  ', 'VIGENCIA ANTERIOR'],
                    ['TASA USO DE AGUA ACTUAL ',],

                ],

            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '9px',
                    },
                    // rotate: -45,
                    // offsetX: -10, // Ajusta según necesidad
                    // offsetY: 5,  // Ajusta según necesidad
                },
            },
        }
    })[0]; // Accede directamente al estado inicial desde el hook

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

export const ReporteEdad3: React.FC = () => {

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
                    <Title title="Reporte General Cartera Por Edad – Deuda y Etapa" />
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
                        label="Etapa "
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





