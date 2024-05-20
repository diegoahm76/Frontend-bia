/* eslint-disable @typescript-eslint/naming-convention */

import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { Title } from '../../../../components/Title';
import { Grid, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { api } from '../../../../api/axios';

const GraficaApex = () => {


    
    interface top_5_por_codigo_contable {
        "MULTAS COACTIVO DIFICIL RECAUDO": number,
        "TASA RETRIBUTIVA COACTIVO DIFICIL RECAUDO": number,
        "VISITAS TECNICAS DE EVALUACION, SEGUMIENTO Y CONTROL ANTERIOR": number,
        "PORCENTAJE AMBIENTAL ACTUAL": number,
        "TASA USO DE AGUA COACTIVO DIFICIL RECAUDO": number
    }
    
    
    
    


    
    const [CarteraDeudaTop, set_CarteraDeudaTop] = useState<top_5_por_codigo_contable>({
        "MULTAS COACTIVO DIFICIL RECAUDO": 0,
        "TASA RETRIBUTIVA COACTIVO DIFICIL RECAUDO": 0,
        "VISITAS TECNICAS DE EVALUACION, SEGUMIENTO Y CONTROL ANTERIOR": 0,
        "PORCENTAJE AMBIENTAL ACTUAL": 0,
        "TASA USO DE AGUA COACTIVO DIFICIL RECAUDO": 0
    });

    const [estado, setEstado] = useState({
        series: [{
            data: [
                CarteraDeudaTop["MULTAS COACTIVO DIFICIL RECAUDO"],
                CarteraDeudaTop["TASA RETRIBUTIVA COACTIVO DIFICIL RECAUDO"],
                CarteraDeudaTop["VISITAS TECNICAS DE EVALUACION, SEGUMIENTO Y CONTROL ANTERIOR"],
                CarteraDeudaTop["PORCENTAJE AMBIENTAL ACTUAL"],
                CarteraDeudaTop["TASA USO DE AGUA COACTIVO DIFICIL RECAUDO"]
            ]
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
                                ['Visitas tecnicas de', 'evaluacions eguimiento', ' y control actual'],
                                ['Tasa uso de agua  ', ' coactivo dificil recaudado'],
                                ['Porcentaje ', 'ambiental actual'],
                                ['Tasa retributiva coactivo ', 'difucil recaudo'],
            
            
                                ['Multas coactivo ', 'difucil recaudo']
            
                            ],
                        }
        }
    });

    const carteraDeudaTop = async (): Promise<void> => {
        try {
            const url = `/recaudo/reportes/reporte-general-cartera-deuda-top/`;
            const res = await api.get(url);
            const data_consulta = res.data.top_5_por_codigo_contable;
            set_CarteraDeudaTop(data_consulta);

            // Actualizamos el estado de la gráfica con los nuevos valores
            setEstado({
                series: [{
                    data: [
                        data_consulta["MULTAS COACTIVO DIFICIL RECAUDO"],
                        data_consulta["TASA RETRIBUTIVA COACTIVO DIFICIL RECAUDO"],
                        data_consulta["VISITAS TECNICAS DE EVALUACION, SEGUMIENTO Y CONTROL ANTERIOR"],
                        data_consulta["PORCENTAJE AMBIENTAL ACTUAL"],
                        data_consulta["TASA USO DE AGUA COACTIVO DIFICIL RECAUDO"]
                    ]
                }],
                options: estado.options // Mantenemos las opciones del estado anterior
            });

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        carteraDeudaTop();
    }, []);

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={estado.options} series={estado.series} type="bar" height={450} />
            </div>
        </div>
    );
};



export interface FormData {

    edad: any,
    fecha_hasta: any;
    fecha_desde: any;
    deuda: any;
    top: any;
};
export const Reportetop1: React.FC = () => {
    const initialFormData: FormData = {

        fecha_desde: '',
        fecha_hasta: '',
        edad: '',
        deuda: '',
        top: "",
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
                    <Title title="Reporte de Cartera Por Deuda y Edad –Top 1" />
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
                        value={'TODOS'}

                        onChange={handleInputChange}
                    // value={formData.deuda}
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
                        // value={formData.deuda}
                        value={'Top 5'}

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







// /* eslint-disable @typescript-eslint/strict-boolean-expressions */
// // eslint-disable-next-line @typescript-eslint/naming-convention
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// /* eslint-disable @typescript-eslint/naming-convention */
// /* eslint-disable no-unused-vars */
// import 'leaflet/dist/leaflet.css';
// import { useState } from 'react';
// import { Title } from '../../../../components/Title';
// import { Grid, TextField, Button } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// import React from 'react';
// import ReactApexChart from 'react-apexcharts';

// const GraficaApex = () => {
//     // Asegúrate de que los estados iniciales y las opciones cumplan con los tipos esperados
//     const estado = React.useState({
//         series: [{
//             data: [200, 330, 348, 370,
// 100,]
//         }],
//         options: {
//             chart: {
//                 // Especifica explícitamente el tipo de gráfico como un valor literal correspondiente
//                 type: 'bar' as const, // La adición de `as const` asegura que el tipo sea tratado como un literal
//                 height: 350
//             },
//             plotOptions: {
//                 bar: {
//                     borderRadius: 4,
//                     horizontal: true,
//                 }
//             },
//             dataLabels: {
//                 enabled: false
//             },
//             xaxis: {

//                 categories: [
//                     ['Visitas tecnicas de', 'evaluacions eguimiento', ' y control actual'],
//                     ['Tasa uso de agua  ', ' coactivo dificil recaudado'],
//                     ['Porcentaje ', 'ambiental actual'],
//                     ['Tasa retributiva coactivo ', 'difucil recaudo'],


//                     ['Multas coactivo ', 'difucil recaudo']

//                 ],
//             }
//         }
//     })[0]; // Accede directamente al estado inicial desde el hook

//     return (
//         <div>
//             <div id="chart">
//                 <ReactApexChart options={estado.options} series={estado.series} type="bar" height={450} />
//             </div>
//         </div>
//     );
// };


// export interface FormData {

//     edad: any,
//     fecha_hasta: any;
//     fecha_desde: any;
//     deuda: any;
// top:any;
// };
// export const Reportetop1: React.FC = () => {
//     const initialFormData: FormData = {

//         fecha_desde: '',
//         fecha_hasta: '',
//         edad: '',
//         deuda: '',
//         top:"",
//     };
//     const [formData, setFormData] = useState(initialFormData);


//     const handleInputChange = (event: any) => {
//         const { name, value } = event.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };


//     return (
//         <>
//             <Grid container
//                 item xs={12} marginLeft={2} marginRight={2} spacing={2} marginTop={3}
//                 sx={{
//                     position: 'relative',
//                     borderRadius: '15px',
//                     background: '#FAFAFA',
//                     boxShadow: '0px 3px 6px #042F4A26',
//                     p: '20px', m: '10px 0 20px 0', mb: '20px',
//                 }}
//             >
//                 <Grid item xs={12} sm={12}>
//                     <Title title="Reporte de Cartera Por Deuda y Edad –Top 1" />
//                 </Grid>
//                 <Grid item xs={12} sm={3}>
//                     <TextField
//                         fullWidth
//                         label="Fecha desde  "
//                         type="date"
//                         size="small"
//                         name="fecha_desde"
//                         variant="outlined"
//                         value={formData.fecha_desde}
//                         InputLabelProps={{ shrink: true }}
//                         onChange={(e) => {
//                             handleInputChange(e);
//                         }}
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={3}>
//                     <TextField
//                         fullWidth
//                         label=" Fecha hasta  "
//                         type="date"
//                         size="small"
//                         name="fecha_hasta"
//                         variant="outlined"
//                         value={formData.fecha_hasta}
//                         InputLabelProps={{ shrink: true }}
//                         onChange={(e) => {
//                             handleInputChange(e);
//                         }}
//                     />
//                 </Grid>

//                 <Grid item xs={12} sm={3}>
//                     <TextField
//                         label="Concepto edad"
//                         name="edad"
//                         disabled
//                         variant="outlined"
//                         size="small"
//                         fullWidth
//                         onChange={handleInputChange}
//                         // value={formData.edad}
//                         value={'TODOS'}

//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={3}>
//                     <TextField
//                         label="Concepto deuda"
//                         name="deuda"
//                         disabled
//                         variant="outlined"
//                         size="small"
//                         fullWidth
//                         value={'TODOS'}

//                         onChange={handleInputChange}
//                         // value={formData.deuda}
//                     />
//                 </Grid>
//                 <Grid item xs={12} sm={3}>
//                     <TextField
//                         label="Concepto "
//                         name="top"
//                         disabled
//                         variant="outlined"
//                         size="small"
//                         fullWidth
//                         onChange={handleInputChange}
//                         // value={formData.deuda}
//                         value={'Top 5'}

//                     />
//                 </Grid>
//                 <Grid item>
//           <Button
//             color="primary"
//             variant="contained"
//             startIcon={<SearchIcon />}
//             onClick={() => {

//             }}
//           >
//             buscar
//           </Button>
//         </Grid>
//                 <Grid item xs={12} sm={12} sx={{
//                     background: `url('https://api.gbif.org/v1/image/unsafe/https%3A%2F%2Fraw.githubusercontent.com%2FSIB-Colombia%2Flogos%2Fmain%2Fsocio-SiB-cormacarena.png') no-repeat center center, #FFFFFF `,
//                 }}  >
//                     <GraficaApex />
//                 </Grid>


//             </Grid>
//         </>
//     );
// };





