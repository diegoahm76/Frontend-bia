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
import { Title } from '../../../components/Title';
import type {
    HistoricoRepresentanteLegal,
} from '../../../interfaces/globalModels';
import { useState } from 'react';
import { control_error } from '../../../helpers';
import CancelIcon from '@mui/icons-material/Cancel';
import { consultar_historico_representante } from '../../seguridad/request/Request';

interface IProps {
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
    id_persona: number | undefined;
}

const columns: GridColDef[] = [
    {
        field: 'id_historico_represent_legal',
        headerName: '#',
        sortable: true,
        width: 70,
    },
    {
        field: 'consec_representacion',
        headerName: 'CONSECUTIVO',
        sortable: true,
        width: 120,
    },
    {
        field: 'fecha_cambio_sistema',
        headerName: 'FECHA DE CAMBIO',
        sortable: true,
        width: 170,
    },
    {
        field: 'fecha_inicio_cargo',
        headerName: 'FECHA DE INICIO',
        sortable: true,
        width: 170,
    },
    {
        field: 'nombre_comercial',
        headerName: 'NOMBRE COMERCIAL',
        sortable: true,
        width: 170,
    },
    {
        field: 'razon_social',
        headerName: 'RAZÓN SOCIAL',
        sortable: true,
        width: 170,
    },
    {
        field: 'nombre_completo_replegal',
        headerName: 'NOMBRE',
        sortable: true,
        width: 300,
    },
];

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const DialogHistoricoRepresentanteLegal: React.FC<IProps> = ({
    is_modal_active,
    set_is_modal_active,
    id_persona,
}: IProps) => {
    const [rows, set_rows] = useState<HistoricoRepresentanteLegal[]>([]);

    const handle_close = (): void => {
        set_is_modal_active(false);
    };

    const historico = async (): Promise<void> => {
        try {
            const response = await consultar_historico_representante(
                id_persona=0
            );
            const new_historico = response.map(
                (datos: HistoricoRepresentanteLegal) => ({
                    id_historico_represent_legal: datos.id_historico_represent_legal,
                    consec_representacion: datos.consec_representacion,
                    fecha_cambio_sistema: datos.fecha_cambio_sistema,
                    fecha_inicio_cargo: datos.fecha_inicio_cargo,
                    id_persona_empresa: datos.id_persona_empresa,
                    nombre_comercial: datos.nombre_comercial,
                    razon_social: datos.razon_social,
                    id_persona_represent_legal: datos.id_persona_represent_legal,
                    nombre_completo_replegal: datos.nombre_completo_replegal,
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
                    <Title title="HISTORICO DE CAMBIOS REPRESENTANTE LEGAL" />
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
                            <DataGrid
                                autoHeight
                                rows={rows}
                                columns={columns}
                                getRowId={(row) => row.id_historico_represent_legal}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                            />
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
