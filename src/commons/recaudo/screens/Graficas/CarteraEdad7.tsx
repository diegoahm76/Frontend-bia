

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
    const estado = React.useState({
        series: [{
            data: [20, 23, 24, 21,
                10, 14, 27,
                21, 14, 17,
                26, 16, 12,
                25, 15, 14,
                24, 14, 16,
                20, 34, 17,
                24, 14, 17,
                13, 14, 17,
                20, 18, 12]
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

    interface IcontenidoConcepto {
        codigo_contable: number,
        id: number,
        total_sancion: number
    }
    interface InombreConcepto {
        nombre: IcontenidoConcepto
    }

    const [CarteraDeudaTop, set_CarteraDeudaTop] = useState<InombreConcepto[]>([]);

    console.log("CarteraDeudaTop", CarteraDeudaTop);

    const carteraDeuda = async (): Promise<void> => {
        try {
            const url = `/recaudo/reportes/reporte-general-cartera-deuda/`;
            const res = await api.get(url); // Utiliza Axios para realizar la solicitud GET
            const data_consulta = res.data.top_5_por_codigo_contable;
            set_CarteraDeudaTop(data_consulta)
            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx", data_consulta)

        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        carteraDeuda();
    }, [])



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





