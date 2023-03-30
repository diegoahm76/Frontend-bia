import { CircularProgress, Grid } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { control_error } from '../../../../helpers/controlError';
import { consultar_datos_gaitan_paginado } from '../../requets/Request';
import type{ Datos } from '../interfaces/interfaces';

const columns: GridColDef[] = [
    { field: 'fecha_registro', headerName: 'FECHA REGISTRO', width: 170 },
    { field: 'temperatura_ambiente', headerName: 'TEMPERATURA ', width: 170 },
    { field: 'humedad_ambiente', headerName: 'HUMEDAD ', width: 170 },
    { field: 'presion_barometrica', headerName: 'PRESIÓN BAROMETRICA', width: 170 },
    { field: 'velocidad_viento', headerName: 'VEL. VIENTO', width: 140 },
    { field: 'direccion_viento', headerName: 'DIR. VIENTO', width: 170 },
    { field: 'precipitacion', headerName: 'PRECIPITACIÓN', width: 170 },
    { field: 'luminosidad', headerName: 'LUMINOSIDAD', width: 170 },
    { field: 'nivel_agua', headerName: 'NIVEL AGUA', width: 170 },
    { field: 'velocidad_agua', headerName: 'VEL. AGUA', width: 170 },
    { field: 'id_estacion', headerName: 'NÚMERO ESTACIÓN', width: 170 },
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HistorialDatosGaitan: React.FC = () => {
    const [dato, set_dato] = useState<Datos[]>([]);

    const historial_datos = async (): Promise<void> => {
        try {
            const response = await consultar_datos_gaitan_paginado();
            const list_datos = response.map((dato: Datos) => ({
              
                id_data: dato.id_data,
                fecha_registro: dato.fecha_registro,
                temperatura_ambiente: dato.temperatura_ambiente,
                humedad_ambiente: dato.humedad_ambiente,
                presion_barometrica: dato.presion_barometrica,
                velocidad_viento: dato.velocidad_viento,
                direccion_viento: dato.direccion_viento,
                precipitacion: dato.precipitacion,
                luminosidad: dato.luminosidad,
                nivel_agua: dato.nivel_agua,
                velocidad_agua: dato.velocidad_agua,
                id_estacion: dato.id_estacion,

            }))
            console.log("Lista de datos", list_datos)
            set_dato(list_datos);
            console.log(list_datos)
        } catch (err) {
            control_error(err)
        }
    };

    useEffect(() => {
        void historial_datos()
    }, []);


    return (
        <Grid container>
            <Grid item xs={12} container justifyContent='center'>
                {dato.length > 0 ? (
                    <DataGrid
                        autoHeight
                        rows={dato}
                        columns={columns}
                        getRowId={(row) => row.id_data}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                ) : (
                    <CircularProgress color="secondary" />
                )}
            </Grid>
        </Grid>
    );
};