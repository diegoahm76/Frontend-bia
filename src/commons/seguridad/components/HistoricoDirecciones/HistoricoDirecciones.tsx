import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
    Button,
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
    HistoricoDirecciones,
} from '../../../../interfaces/globalModels';
import { useState } from 'react';
import { control_error } from '../../../../helpers';
import CancelIcon from '@mui/icons-material/Cancel';
import { consultar_historico_direcciones } from '../../../seguridad/request/Request';

interface IProps {
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
    id_persona: number;
    tipo_persona: string;
}

const columns: GridColDef[] = [
    {
        field: 'id_historico_direccion',
        headerName: '#',
        sortable: true,
        width: 70,
    },
    {
        field: 'direccion',
        headerName: 'DIRECCIÓN',
        sortable: true,
        width: 170,
    },
    {
        field: 'cod_municipio',
        headerName: 'MUNICIPIO',
        sortable: true,
        width: 170,
    },
    {
        field: 'tipo_direccion',
        headerName: 'TIPO DIRECCIÓN',
        sortable: true,
        width: 170,
    },
    {
        field: 'fecha_cambio',
        headerName: 'FECHA DE CAMBIO',
        sortable: true,
        width: 170,
    },
    {
        field: 'nombre_completo',
        headerName: 'NOMBRE',
        sortable: true,
        width: 300,
    },
];
const columns_juridica: GridColDef[] = [
    {
        field: 'id_historico_direccion',
        headerName: '#',
        sortable: true,
        width: 70,
    },
    {
        field: 'direccion',
        headerName: 'DIRECCIÓN',
        sortable: true,
        width: 170,
    },
    {
        field: 'cod_municipio',
        headerName: 'MUNICIPIO',
        sortable: true,
        width: 170,
    },
    {
        field: 'tipo_direccion',
        headerName: 'TIPO DIRECCIÓN',
        sortable: true,
        width: 170,
    },
    {
        field: 'fecha_cambio',
        headerName: 'FECHA DE CAMBIO',
        sortable: true,
        width: 170,
    },
];

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const DialogHistorialDirecciones: React.FC<IProps> = ({
    is_modal_active,
    set_is_modal_active,
    id_persona,
    tipo_persona,
}: IProps) => {
    const [rows, set_rows] = useState<HistoricoDirecciones[]>([]);

    const handle_close = (): void => {
        set_is_modal_active(false);
    };

    const historico = async (): Promise<void> => {
        try {
            const response = await consultar_historico_direcciones(
                id_persona
            );
            const new_historico = response.map(
                (datos: HistoricoDirecciones) => ({
                    id_historico_direccion: datos.id_historico_direccion,
                    direccion: datos.direccion,
                    cod_municipio: datos.cod_municipio,
                    cod_pais_exterior: null,
                    tipo_direccion: datos.tipo_direccion,
                    fecha_cambio: datos.fecha_cambio,
                    id_persona: datos.id_persona,
                    nombre_completo: datos.nombre_completo,
                })
            );
            set_rows(new_historico);
        } catch (err) {
            control_error(err);
        }
    };

    useEffect(() => {
        void historico();
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
                    <Title title="Histórico de cambios direcciones" />
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
                                            getRowId={(row) => row.id_historico_direccion}
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
                                            getRowId={(row) => row.id_historico_direccion}
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
                                variant="contained"
                                color="error"
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
