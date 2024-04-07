/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import 'leaflet/dist/leaflet.css';
import { api } from '../../../../api/axios';
import Divider from '@mui/material/Divider';
import { Title } from '../../../../components';
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ButtonGroup, Dialog, Grid, TextField, } from '@mui/material';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';


interface BuscarProps {
    is_modal_active: any;
    set_is_modal_active: any;
    idFacilidadSeleccionada: any;
}

interface Cuota {
    id: number;
    nro_cuota: number;
    monto_cuota: string;
    id_plan_pago: number;
    id_tipo_pago: number;
    valor_capital: string;
    valor_interes: string;
    saldo_pendiente: string;
    fecha_vencimiento: string;
    fecha_pago: string | null;
    monto_pagado: string | null;
    id_cuota_anterior: number | null;
}

interface PlanPagoData {
    plan_pago: any; // Ajusta esto según la estructura de tu plan_pago
    cuotas: Cuota[];
}

export const PlanPago: React.FC<BuscarProps> = ({ idFacilidadSeleccionada, is_modal_active, set_is_modal_active }) => {
    const [cuotas, setCuotas] = useState<Cuota[]>([]);

    const fetchPlanPago = async (): Promise<void> => {
        try {
            const url = `/recaudo/planes-pagos/validacion/${idFacilidadSeleccionada}/`;
            const res = await api.get(url);
            const planPagoData: PlanPagoData = res.data?.data || { plan_pago: {}, cuotas: [] };
            setCuotas(planPagoData?.cuotas);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {

        void fetchPlanPago();
    }, [idFacilidadSeleccionada]);

    useEffect(() => {
        void fetchPlanPago();
    }, []);

    // Definición de las columnas para la DataGrid
    const columns: GridColDef[] = [
        { field: 'nro_cuota', headerName: 'No cuota', width: 130, flex: 1 },
        { field: 'fecha_vencimiento', headerName: 'Fecha de vencimiento', width: 130, flex: 1 },
        { field: 'valor_capital', headerName: 'Valor capital ', width: 130, flex: 1 },
        { field: 'valor_interes', headerName: 'Valor interes ', width: 130, flex: 1 },
        {
            field: 'monto_cuota', headerName: 'Cuotas', width: 130, flex: 1, renderCell: (params) => `${params?.value} COP`
        },

    ];
    const totalValorCapital = cuotas.reduce((acc, cuota) => acc + parseFloat(cuota.valor_capital), 0);
    const totalValorInteres = cuotas.reduce((acc, cuota) => acc + parseFloat(cuota.valor_interes), 0);
    const totalMontoCuota = cuotas.reduce((acc, cuota) => acc + parseFloat(cuota.monto_cuota), 0);

    const handle_close = (): void => {
        set_is_modal_active(false);
    };
    return (

        <>
            <Dialog open={is_modal_active} onClose={handle_close} maxWidth="xl"
            >
                {/* <button onClick={() => //  console.log('')(tipoRio)}>Mostrar zonahidrica en la consola</button> */}

                <Grid container
                    item xs={12} marginLeft={2} marginRight={2} marginTop={3}
                    sx={{

                        width: '900px', // Cambia '700px' por el ancho que desees
                        height: '900px', // Cambia '500px' por el alto que desees
                        position: 'relative',
                        background: '#FAFAFA',
                        borderRadius: '15px',
                        p: '20px', m: '10px 0 20px 0', mb: '20px',
                        boxShadow: '0px 3px 6px #042F4A26',
                    }}
                >
                    <Title title="Facilidad de Pago " />
                    <Grid container item xs={12} spacing={2} marginTop={2} justifyContent="flex-end">
                        <ButtonGroup style={{ margin: 7 }}>
                            {download_xls({ nurseries: cuotas, columns })}
                            {download_pdf({
                                nurseries: cuotas,
                                columns,
                                title: 'Facilidad de Pago ',
                            })}
                        </ButtonGroup>
                    </Grid>
                    <Grid container item xs={12} spacing={2} marginTop={2}>

                        <Divider
                            style={{
                                width: '98%',
                                marginTop: '8px',
                                marginBottom: '8px',
                                marginLeft: 'auto',
                            }}
                        />
                        <Grid item xs={12} sm={12} marginTop={0}>
                            {/* <div style={{ height: 400, width: '100%' }}> */}
                            <DataGrid
                                rows={cuotas}
                                columns={columns}
                                pageSize={5}
                                autoHeight
                            />
                            {/* </div> */}
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                size="small"
                                fullWidth
                                disabled
                                label="Total Valor Capital"
                                value={totalValorCapital.toFixed(2)}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                size="small"
                                disabled
                                fullWidth
                                label="Total Valor Interés"
                                value={totalValorInteres.toFixed(2)}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                size="small"
                                disabled
                                fullWidth
                                label="Total Monto Cuota"
                                value={totalMontoCuota.toFixed(2)}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>

                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
};