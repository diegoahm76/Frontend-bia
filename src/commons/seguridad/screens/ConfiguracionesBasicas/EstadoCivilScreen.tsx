import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
    Button,
    Chip,
    Dialog,
    DialogTitle,
    Divider,
    Grid,
    Stack,
    Alert,
    LinearProgress,
    Typography,
} from '@mui/material';
import { Title } from '../../../../components/Title';
import type {
    HistoricoAutorizaNotificaciones,
} from '../../../../interfaces/globalModels';
import { useState } from 'react';
import { control_error } from '../../../../helpers';
import CancelIcon from '@mui/icons-material/Cancel';
import { consultar_historico_autorizaciones } from '../../../seguridad/request/Request';
import React from 'react';

interface IProps {
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
    id_persona: number;
    tipo_persona: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const CargosScreen: React.FC<IProps> = ({
    is_modal_active,
    set_is_modal_active,
    id_persona,
    tipo_persona,
}: IProps) => {
    const columns: GridColDef[] = [
        {
            field: 'id_historico_autoriza_noti',
            headerName: '#',
            sortable: true,
            width: 70,
        },
        {
            field: 'nombre_completo',
            headerName: 'NOMBRE',
            sortable: true,
            width: 300,
        },
        {
            field: 'respuesta_autorizacion_sms',
            headerName: 'ESTADO SMS',
            sortable: true,
            width: 120,
            renderCell: (params) => {
                return params.row.respuesta_autorizacion_sms === true ? (
                    <Chip size="small" label="Activo" color="success" variant="outlined" />
                ) : (
                    <Chip size="small" label="Inactivo" color="error" variant="outlined" />
                );
            },
        },
        {
            field: 'respuesta_autorizacion_mail',
            headerName: 'ESTADO E-MAIL',
            sortable: true,
            width: 170,
            renderCell: (params) => {
                return params.row.respuesta_autorizacion_mail === true ? (
                    <Chip size="small" label="Activo" color="success" variant="outlined" />
                ) : (
                    <Chip size="small" label="Inactivo" color="error" variant="outlined" />
                );
            },
        },
        {
            field: 'fecha_inicio',
            headerName: 'FECHA DE INICIO',
            sortable: true,
            width: 220,
        },
        {
            field: 'fecha_fin',
            headerName: 'FECHA DE FIN',
            sortable: true,
            width: 220,
        },
    ];
    const columns_juridica: GridColDef[] = [
        {
            field: 'id_historico_autoriza_noti',
            headerName: '#',
            sortable: true,
            width: 70,
        },
        {
            field: 'respuesta_autorizacion_sms',
            headerName: 'ESTADO SMS',
            sortable: true,
            width: 120,
            renderCell: (params) => {
                return params.row.respuesta_autorizacion_sms === true ? (
                    <Chip size="small" label="Activo" color="success" variant="outlined" />
                ) : (
                    <Chip size="small" label="Inactivo" color="error" variant="outlined" />
                );
            },
        },
        {
            field: 'respuesta_autorizacion_mail',
            headerName: 'ESTADO E-MAIL',
            sortable: true,
            width: 170,
            renderCell: (params) => {
                return params.row.respuesta_autorizacion_mail === true ? (
                    <Chip size="small" label="Activo" color="success" variant="outlined" />
                ) : (
                    <Chip size="small" label="Inactivo" color="error" variant="outlined" />
                );
            },
        },
        {
            field: 'fecha_inicio',
            headerName: 'FECHA DE INICIO',
            sortable: true,
            width: 220,
        },
        {
            field: 'fecha_fin',
            headerName: 'FECHA DE FIN',
            sortable: true,
            width: 220,
        },
    ];
    const [rows, set_rows] = useState<HistoricoAutorizaNotificaciones[]>([]);

    const handle_close = (): void => {
        set_is_modal_active(false);
    };

    const historico = async (): Promise<void> => {
        try {
            const response = await consultar_historico_autorizaciones(
                id_persona
            );
            const new_historico = response.map(
                (datos: HistoricoAutorizaNotificaciones) => ({
                    id_historico_autoriza_noti: datos.id_historico_autoriza_noti,
                    nombre_completo: datos.nombre_completo,
                    respuesta_autorizacion_sms: datos.respuesta_autorizacion_sms,
                    respuesta_autorizacion_mail: datos.respuesta_autorizacion_mail,
                    fecha_inicio: datos.fecha_inicio,
                    fecha_fin: datos.fecha_fin,
                    id_persona: datos.id_persona,
                })
            );
            set_rows(new_historico);
        } catch (err) {
            control_error(err);
        }
    };

    useEffect(() => {
        if (is_modal_active) {
            void historico();
        }
    }, [is_modal_active]);
    return (
        <>
        
            <Dialog
                open={is_modal_active}
                onClose={handle_close}
                fullWidth
                maxWidth={'lg'}
            >
                <DialogTitle>
                    <Title title="Historico de autorización de notificaciones" />
                </DialogTitle>
                <Divider />
                <Grid
                    container
                    spacing={1}
                    m={2}
                    p={2}
                    sx={{
                        position: 'relative',
                        background: '#FAFAFA',
                        borderRadius: '15px',
                        p: '20px',
                        m: '10px 0 20px 0',
                        mb: '20px',
                        boxShadow: '0px 3px 6px #042F4A26',
                    }}
                >
                    <Grid item xs={12}>
                        {rows.length > 0 ? (
                            <>
                                {tipo_persona === 'J' && (
                                    <>
                                        <DataGrid
                                            autoHeight
                                            rows={rows ?? []}
                                            columns={columns_juridica ?? []}
                                            getRowId={(row) => row.id_historico_autoriza_noti}
                                            pageSize={5}
                                            rowsPerPageOptions={[5]}
                                        />
                                    </>
                                )}
                                {tipo_persona === 'N' && (
                                    <>
                                        <DataGrid
                                            autoHeight
                                            rows={rows ?? []}
                                            columns={columns ?? []}
                                            getRowId={(row) => row.id_historico_autoriza_noti}
                                            pageSize={5}
                                            rowsPerPageOptions={[5]}
                                        />
                                    </>
                                )}
                            </>
                        ) : (
                            <Grid item xs={12}>
                                <Grid container justifyContent="center" textAlign="center">
                                    <Alert icon={false} severity="info">
                                        <LinearProgress />
                                        <Typography>No se encontraron resultados...</Typography>
                                    </Alert>
                                </Grid>
                            </Grid>
                        )}

                    </Grid>
                    <Grid item xs={12}>
                        <Stack
                            justifyContent="flex-end"
                            sx={{ m: '10px 0 20px 0' }}
                            direction="row"
                            spacing={1}
                        >
                            <Button
                                variant="outlined"
                                // eslint-disable-next-line react/jsx-no-undef
                                startIcon={<CancelIcon />}
                                onClick={() => {
                                    handle_close();
                                }}
                            >
                                Cerrar
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
};
