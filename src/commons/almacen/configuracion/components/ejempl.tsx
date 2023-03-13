/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import EditIcon from '@mui/icons-material/Edit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Avatar, Grid, IconButton, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { api } from '../../../../api/axios';

const columns: GridColDef[] = [
    { field: 'id_estacion', headerName: 'ESTACIÓN', width: 140 },
    { field: 'fecha_modificacion', headerName: 'FECHA MODIFICACIÓN', width: 140 },
    { field: 'frecuencia_solicitud_datos', headerName: 'FRECUENCIA', width: 140 },

    { field: 'temperatura_ambiente_max', headerName: 'TEMPERATURA MAX', width: 140 },
    { field: 'temperatura_ambiente_min', headerName: 'TEMPERATURA MIN', width: 140 },
    { field: 'humedad_ambiente_max', headerName: 'HUMEDAD MAX', width: 140 },
    { field: 'humedad_ambiente_min', headerName: 'HUMEDAD MIN', width: 140 },

    { field: 'presion_barometrica_max', headerName: 'PRESIÓN MAX', width: 140 },
    { field: 'presion_barometrica_min', headerName: 'PRESIÓN MIN', width: 140 },
    { field: 'velocidad_viento_max', headerName: 'VEL. VIENTO MAX', width: 140 },
    { field: 'velocidad_viento_min', headerName: 'VEL. VIENTO MIN', width: 140 },

    { field: 'direccion_viento_max', headerName: 'DIR. VIENTO MAX', width: 140 },
    { field: 'direccion_viento_min', headerName: 'DIR. VIENTO MIN', width: 140 },
    { field: 'precipitacion_max', headerName: 'PRECIPITACIÓN MAX', width: 140 },
    { field: 'precipitacion_min', headerName: 'PRECIPITACIÓN MIN', width: 140 },

    { field: 'luminosidad_max', headerName: 'LUMINOSIDAD MAX', width: 140 },
    { field: 'luminosidad_min', headerName: 'LUMINOSIDAD MIN', width: 140 },
    { field: 'nivel_agua_max', headerName: 'NIV. AGUA MAX', width: 140 },
    { field: 'nivel_agua_min', headerName: 'NIV. AGUA MIN', width: 140 },

    { field: 'velocidad_agua_max', headerName: 'VEL. AGUA MAX', width: 140 },
    { field: 'velocidad_agua_min', headerName: 'VEL. AGUA MIN', width: 140 },

    {
        field: 'acciones',
        headerName: 'Aciones',
        width: 200,
        renderCell: (params) => (
            <>
                <IconButton>
                    <Avatar
                        sx={{
                            width: 24,
                            height: 24,
                            background: '#fff',
                            border: '2px solid',
                        }}
                        variant="rounded"
                    >
                        <EditIcon
                            sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                        />
                    </Avatar>
                </IconButton>

            </>
        ),
    },
];
interface Parametros {

    id_estacion: number,
    frecuencia_solicitud_datos: number,
    temperatura_ambiente_max: number,
    temperatura_ambiente_min: number,
    humedad_ambiente_max: number,
    humedad_ambiente_min: number,
    presion_barometrica_max: number,
    presion_barometrica_min: number,
    velocidad_viento_max: number,
    velocidad_viento_min: number,
    direccion_viento_max: number,
    direccion_viento_min: number,
    precipitacion_max: number,
    precipitacion_min: number,
    luminosidad_max: number,
    luminosidad_min: number,
    nivel_agua_max: number,
    nivel_agua_min: number,
    velocidad_agua_max: number,
    velocidad_agua_min: number,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ParametrosReferencia: React.FC = () => {
    const [parametro_referencia, set_data_parametro] = useState(null);

    const parametros = async () => {
        try {
            const url = `estaciones/parametros/consultar-parametro/`
            const response = await api.get(url);
            const parametros = response.data.data.map((parametro: Parametros) => ({

                id_estacion: parametro.id_estacion,
                frecuencia_solicitud_datos: parametro.frecuencia_solicitud_datos,
                temperatura_ambiente_max: parametro.temperatura_ambiente_max,
                temperatura_ambiente_min: parametro.temperatura_ambiente_min,
                humedad_ambiente_max: parametro.humedad_ambiente_max,
                humedad_ambiente_min: parametro.humedad_ambiente_min,
                presion_barometrica_max: parametro.presion_barometrica_max,
                presion_barometrica_min: parametro.presion_barometrica_min,
                velocidad_viento_max: parametro.velocidad_viento_max,
                velocidad_viento_min: parametro.velocidad_viento_min,
                direccion_viento_max: parametro.direccion_viento_max,
                direccion_viento_min: parametro.direccion_viento_min,
                precipitacion_max: parametro.precipitacion_max,
                precipitacion_min: parametro.precipitacion_min,
                luminosidad_max: parametro.luminosidad_max,
                luminosidad_min: parametro.luminosidad_min,
                nivel_agua_max: parametro.nivel_agua_max,
                nivel_agua_min: parametro.nivel_agua_min,
                velocidad_agua_max: parametro.velocidad_agua_max,
                velocidad_agua_min: parametro.velocidad_agua_min,
            }))
            
            set_data_parametro(parametros);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        void parametros()
    }, []);
    return (
        <>
            <Grid container>
                <Grid item xs={12}>

                    {parametro_referencia ? (
                        <DataGrid
                            autoHeight
                            rows={parametro_referencia}
                            columns={columns}
                            getRowId={(row) => row.id_estacion}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    ) : (
                        <Typography>Cargando...</Typography>
                    )}
                </Grid>
            </Grid>
        </>
    );
};