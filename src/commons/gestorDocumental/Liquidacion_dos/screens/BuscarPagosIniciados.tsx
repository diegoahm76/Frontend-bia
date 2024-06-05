/* eslint-disable @typescript-eslint/naming-convention */

import React, { useState, useEffect } from 'react';
import { Box, Button, Chip, Grid } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Title } from '../../../../components/Title';
import { api } from '../../../../api/axios';
import { LetraFormatoHumano } from '../utils/LetraFormatoHumano';
import { useNavigate } from 'react-router-dom';

// Definición de la interfaz para los datos del deudor
export interface Deudor {
    id_pago: string;
    id_liquidacion: {
        id: number;
        fecha_liquidacion: string;
        vencimiento: string;
        periodo_liquidacion: string;
        ciclo_liquidacion: string;
        valor: string;
        estado: string;
        id_deudor: number;
        id_expediente: number;
    };
    desc_estado_pago: string;
    fecha_inicio_pago: string;
    fecha_pago: string;
    estado_pago: number;
    notificacion: boolean;
    id_persona_pago: number;
}

// Componente para buscar los pagos iniciados
export const BuscarPagosIniciados: React.FC = () => {
    const [loading, set_loading] = useState(true);
    const [deudores, set_deudores] = useState<Deudor[]>([]);

 
    const columns_deudores: GridColDef[] = [

        {
            field: 'fecha_liquidacion',
            headerName: 'Fecha Liquidación',
            minWidth: 150,
            flex: 1,
            valueGetter: (params) => {
                return params.row.id_liquidacion ? LetraFormatoHumano(params.row.id_liquidacion.fecha_liquidacion) : '';
            },
        },
        {
            field: 'vencimiento',
            headerName: 'Vencimiento',
            minWidth: 150,
            flex: 1,
            valueGetter: (params) => {
                return params.row.id_liquidacion ? LetraFormatoHumano(params.row.id_liquidacion.vencimiento) : '';
            },
        },
        {
            field: 'periodo_liquidacion',
            headerName: 'Periodo Liquidación',
            minWidth: 150,
            flex: 1,
            valueGetter: (params) => {
                return params.row.id_liquidacion ? params.row.id_liquidacion.periodo_liquidacion : '';
            },
        },
        {
            field: 'ciclo_liquidacion',
            headerName: 'Ciclo Liquidación',
            minWidth: 150,
            flex: 1,
            valueGetter: (params) => {
                return params.row.id_liquidacion ? params.row.id_liquidacion.ciclo_liquidacion : '';
            },
        },
        {
            field: 'valor',
            headerName: 'Valor',
            minWidth: 150,
            flex: 1,
            valueGetter: (params) => {
                return params.row.id_liquidacion ? params.row.id_liquidacion.valor : '';
            },
        },
        // {
        //     field: 'estado',
        //     headerName: 'Estado',
        //     minWidth: 150,
        //     flex: 1,
        //     valueGetter: (params) => {
        //         return params.row.id_liquidacion ? params.row.id_liquidacion.estado : '';
        //     },
        // },

        {
            field: 'desc_estado_pago',
            headerName: 'Descripción Estado Pago',
            minWidth: 150,
            flex: 1,
        },
        {
            field: 'fecha_inicio_pago',
            headerName: 'Fecha Inicio Pago',
            minWidth: 150,
            flex: 1,
            valueFormatter: (params) => {
                return LetraFormatoHumano(params.value);
            },
        },
        {
            field: 'fecha_pago',
            headerName: 'Fecha Pago',
            minWidth: 150,
            flex: 1,
            valueFormatter: (params) => {
                return LetraFormatoHumano(params.value);
            },
        },
        {
            field: 'estado_pago',
            headerName: 'Estado Pago',
            minWidth: 150,
            flex: 1,
        },
        {
            field: 'notificacion',
            headerName: 'Notificación',
            minWidth: 150,
            flex: 1,
            renderCell: (params) => {
                const isNotificado = params.value;
                return (
                    <Chip
                        label={isNotificado ? 'Notificado' : 'No Notificado'}
                        color={isNotificado ? 'primary' : 'secondary'}
                        variant="outlined"
                    />
                );
            },
        },
        // {
        //     field: 'comprobante_pago',
        //     headerName: 'Comprobante Pago',
        //     minWidth: 150,
        //     flex: 1,
        //     valueGetter: (params) => {
        //         return params.row.comprobante_pago_url ? params.row.comprobante_pago_url : '';
        //     },
        // },
        {
            field: 'comprobante_pago',
            headerName: 'Comprobante Pago',
            minWidth: 150,
            flex: 1,
            renderCell: (params) => {
                const rutaArchivo = '/media/home/BIA/Recaudo/GDEA/Pagos/b8b2ee887853e28739d1.pdf'; // Ruta del archivo PDF
                const urlCompleta = api + rutaArchivo; // Concatena la URL base de la API con la ruta del archivo PDF
        
                return (
                    <Button
                        fullWidth
                        style={{ width: "90%", marginTop: 15, backgroundColor: "green", color: "white" }}
                        variant="contained"
                        color="error"
                        onClick={() => {
                            window.location.href = urlCompleta;
                        }}
                    >
                        Documento
                    </Button>
                );
            },
        }
        

    ];


    // Hook useEffect para cargar los datos de los deudores cuando el componente se monta
    useEffect(() => {
        // Realiza la solicitud GET para obtener los datos de los deudores
        api.get('recaudo/pagos/consultar/')
            .then((response) => {
                // Establece los datos de los deudores en el estado
                set_deudores(response.data.data);
            })
            .catch((error) => {
                // Manejo de errores en caso de que falle la solicitud
                // console.log('')(error);
            }).finally(() => {
                // Establece el estado de carga como falso después de que se complete la solicitud
                set_loading(false);
            });
    }, []); // Se pasa un arreglo vacío para que el efecto se ejecute solo una vez al montar el componente

    return (
        <>
            {/* Contenedor principal */}
            <Grid
                container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26'
                }}
            >
                {/* Título de la página */}
                <Grid item xs={12}>
                    <Title title="Pagos Iniciados"></Title>
                </Grid>
                {/* Contenedor de la tabla */}
                <Grid item xs={12} style={{ marginTop: 15 }}>
                    {/* Tabla de datos */}
                    <DataGrid
                        density='compact' // Densidad de la tabla
                        autoHeight // Altura automática
                        rows={deudores} // Datos de los deudores
                        columns={columns_deudores} // Columnas de la tabla
                        pageSize={10} // Tamaño de página
                        rowsPerPageOptions={[10]} // Opciones de tamaño de página
                        loading={loading} // Estado de carga
                    />
                </Grid>
            </Grid>
        </>
    );
};
