/* eslint-disable @typescript-eslint/naming-convention */
// // import { useState } from 'react';
// // import Button from '@mui/material/Button';
// // import TextField from '@mui/material/TextField';
// // import Dialog from '@mui/material/Dialog';
// // import DialogActions from '@mui/material/DialogActions';
// // import DialogContent from '@mui/material/DialogContent';
// // import DialogContentText from '@mui/material/DialogContentText';
// // import DialogTitle from '@mui/material/DialogTitle';
// // import AddIcon from '@mui/icons-material/Add';
// // import SaveIcon from '@mui/icons-material/Save';
// import EditIcon from '@mui/icons-material/Edit';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Avatar, Divider, Grid, IconButton } from '@mui/material';
// import { DataGrid, type GridColDef } from '@mui/x-data-grid';
// import { useState } from 'react';
// import { Controller, useForm , type FieldValues, type SubmitHandler } from "react-hook-form";
// import { api } from '../../../../api/axios';


// const columns: GridColDef[] = [
//     { field: 'id_estacion', headerName: 'ESTACIÓN', width: 140 },
//     { field: 'fecha_modificacion', headerName: 'FECHA MODIFICACIÓN', width: 140 },
//     { field: 'frecuencia_solicitud_datos', headerName: 'FRECUENCIA', width: 140 },

//     { field: 'temperatura_ambiente_max', headerName: 'TEMPERATURA MAX', width: 140 },
//     { field: 'temperatura_ambiente_min', headerName: 'TEMPERATURA MIN', width: 140 },
//     { field: 'humedad_ambiente_max', headerName: 'HUMEDAD MAX', width: 140 },
//     { field: 'humedad_ambiente_min', headerName: 'HUMEDAD MIN', width: 140 },

//     { field: 'presion_barometrica_max', headerName: 'PRESIÓN MAX', width: 140 },
//     { field: 'presion_barometrica_min', headerName: 'PRESIÓN MIN', width: 140 },
//     { field: 'velocidad_viento_max', headerName: 'VEL. VIENTO MAX', width: 140 },
//     { field: 'velocidad_viento_min', headerName: 'VEL. VIENTO MIN', width: 140 },

//     { field: 'direccion_viento_max', headerName: 'DIR. VIENTO MAX', width: 140 },
//     { field: 'direccion_viento_min', headerName: 'DIR. VIENTO MIN', width: 140 },
//     { field: 'precipitacion_max', headerName: 'PRECIPITACIÓN MAX', width: 140 },
//     { field: 'precipitacion_min', headerName: 'PRECIPITACIÓN MIN', width: 140 },

//     { field: 'luminosidad_max', headerName: 'LUMINOSIDAD MAX', width: 140 },
//     { field: 'luminosidad_min', headerName: 'LUMINOSIDAD MIN', width: 140 },
//     { field: 'nivel_agua_max', headerName: 'NIV. AGUA MAX', width: 140 },
//     { field: 'nivel_agua_min', headerName: 'NIV. AGUA MIN', width: 140 },

//     { field: 'velocidad_agua_max', headerName: 'VEL. AGUA MAX', width: 140 },
//     { field: 'velocidad_agua_min', headerName: 'VEL. AGUA MIN', width: 140 },

//     {
//         field: 'acciones',
//         headerName: 'Aciones',
//         width: 200,
//         renderCell: (params) => (
//             <>
//                 <IconButton>
//                     <Avatar
//                         sx={{
//                             width: 24,
//                             height: 24,
//                             background: '#fff',
//                             border: '2px solid',
//                         }}
//                         variant="rounded"
//                     >
//                         <EditIcon
//                             sx={{ color: 'primary.main', width: '18px', height: '18px' }}
//                         />
//                     </Avatar>
//                 </IconButton>

//             </>
//         ),
//     },
// ];
// interface Parametros {

//     id_estacion: number,
//     frecuencia_solicitud_datos: number,
//     temperatura_ambiente_max: number,
//     temperatura_ambiente_min: number,
//     humedad_ambiente_max: number,
//     humedad_ambiente_min: number,
//     presion_barometrica_max: number,
//     presion_barometrica_min: number,
//     velocidad_viento_max: number,
//     velocidad_viento_min: number,
//     direccion_viento_max: number,
//     direccion_viento_min: number,
//     precipitacion_max: number,
//     precipitacion_min: number,
//     luminosidad_max: number,
//     luminosidad_min: number,
//     nivel_agua_max: number,
//     nivel_agua_min: number,
//     velocidad_agua_max: number,
//     velocidad_agua_min: number,
// }

export const ParametrosReferencia: React.FC = () => {
    return(
        <>
        <h1>Hola</h1>
        </>
    );
}
//     const [parametro_referencia, set_data_parametro] = useState(null);

//     const {
//         handleSubmit: handle_submit_filtrar,
//         control: control_filtrar,
//         formState: { errors: errors_filtrar },
//     } = useForm();

// const on_submit_filtrar: SubmitHandler<FieldValues> = async (data) => {
//     try {
//         const { data: reportes_data } = await api.get(
//             `estaciones/parametros/consultar-parametro/`
//         );
//         const parametros = reportes_data.data.personas.map((parametro: Parametros) => ({
            
//             id_estacion: parametro.id_estacion ,
//             frecuencia_solicitud_datos: parametro.frecuencia_solicitud_datos ,
//             temperatura_ambiente_max: parametro.temperatura_ambiente_max ,
//             temperatura_ambiente_min: parametro.temperatura_ambiente_min ,
//             humedad_ambiente_max: parametro.humedad_ambiente_max ,
//             humedad_ambiente_min: parametro.humedad_ambiente_min ,
//             presion_barometrica_max: parametro.presion_barometrica_max ,
//             presion_barometrica_min: parametro.presion_barometrica_min ,
//             velocidad_viento_max: parametro.velocidad_viento_max ,
//             velocidad_viento_min: parametro.velocidad_viento_min ,
//             direccion_viento_max: parametro.direccion_viento_max ,
//             direccion_viento_min: parametro.direccion_viento_min ,
//             precipitacion_max: parametro.precipitacion_max ,
//             precipitacion_min: parametro.precipitacion_min ,
//             luminosidad_max: parametro.luminosidad_max ,
//             luminosidad_min: parametro.luminosidad_min ,
//             nivel_agua_max: parametro.nivel_agua_max ,
//             nivel_agua_min: parametro.nivel_agua_min ,
//             velocidad_agua_max: parametro.velocidad_agua_max ,
//             velocidad_agua_min: parametro.velocidad_agua_min ,
//         }));
//         console.log(data)
//         console.log("parametros del sistema")
//         console.log(parametros)
//         set_data_parametro(parametros);
//     } catch (err) {
//         console.log(err);
//     }
// };

//     return (
//         <Grid container>
//             <Grid item xs={12}>
//                 <DataGrid
//                     autoHeight
//                     rows={parametro_referencia}
//                     columns={columns}
//                     pageSize={5}
//                     rowsPerPageOptions={[5]}
//                 />
//             </Grid>
//         </Grid>
//     );
// };