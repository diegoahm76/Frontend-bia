/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Box, Grid, Tab } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { GenerarLiquidacion } from '../components/GenerarLiquidacion/GenerarLiquidacion';
import { Title } from '../../../../components/Title';
import { api } from '../../../../api/axios';
import { BotonesFinales } from '../components/BotonesFinales/BotonesFinales';

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
                return params.row.id_liquidacion ? params.row.id_liquidacion.fecha_liquidacion : '';
            },
        },
        {
            field: 'vencimiento',
            headerName: 'Vencimiento',
            minWidth: 150,
            flex: 1,
            valueGetter: (params) => {
                return params.row.id_liquidacion ? params.row.id_liquidacion.vencimiento : '';
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
        {
            field: 'estado',
            headerName: 'Estado',
            minWidth: 150,
            flex: 1,
            valueGetter: (params) => {
                return params.row.id_liquidacion ? params.row.id_liquidacion.estado : '';
            },
        },

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
        },
        {
            field: 'fecha_pago',
            headerName: 'Fecha Pago',
            minWidth: 150,
            flex: 1,
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
        }
    ];





    useEffect(() => {
        api.get('recaudo/pagos/consultar/')
            .then((response) => {
                set_deudores(response.data.data);
            })
            .catch((error) => {
                //  console.log('')(error);
            }).finally(() => {
                set_loading(false);
            });
    }, []);


    return (
        <>
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

                <Grid item xs={12}>
                    <Title title="Pagos Iniciados"></Title>
                </Grid>
                <Grid item xs={12} style={{marginTop:15}}>

                    <DataGrid
                        density='compact'
                        autoHeight
                        rows={deudores}
                        columns={columns_deudores}
                        pageSize={100}
                        rowsPerPageOptions={[100]}
                        experimentalFeatures={{ newEditingApi: true }}
                        getRowId={(row) => row.id_pago}
                        loading={loading}
                    />

                </Grid>
            </Grid>

        </>
    );
};
