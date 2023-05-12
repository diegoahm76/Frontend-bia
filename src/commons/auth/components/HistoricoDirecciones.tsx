import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
    Button,
    Dialog,
    DialogTitle,
    Divider,
    Grid,
    Stack,
} from '@mui/material';
import { Title } from '../../../components/Title';
import type {
    HistoricoDirecciones,
    InfoPersona,
} from '../../../interfaces/globalModels';
import { useState } from 'react';
import { control_error } from '../../../helpers';
import CancelIcon from '@mui/icons-material/Cancel';
import { consultar_historico_direcciones } from '../../seguridad/request/Request';

interface IProps {
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
    historico_direcciones: InfoPersona;
    set_historico_direcciones: Dispatch<SetStateAction<any>>;
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
        field: 'id_persona',
        headerName: 'PERSONA',
        sortable: true,
        width: 170,
    },
];

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const DialogHistorialDirecciones: React.FC<IProps> = ({
    is_modal_active,
    set_is_modal_active,
    historico_direcciones,
    set_historico_direcciones,
}: IProps) => {
    const [rows, set_rows] = useState<HistoricoDirecciones[]>([]);

    const handle_close = (): void => {
        set_is_modal_active(false);
    };

    const historico = async (): Promise<void> => {
        try {
            const response = await consultar_historico_direcciones(
                historico_direcciones.id_persona
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
                })
            );
            console.log("Data Historial",new_historico)
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
                    <Title title="HISTORICO DE CAMBIOS DIRECCIONES" />
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
                        <DataGrid
                            autoHeight
                            rows={rows}
                            columns={columns}
                            getRowId={(row) => row.id_historico_direccion}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
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
