import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box, Grid, Stack, Tooltip, IconButton, Avatar } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { delete_bodega_service, get_bodega_service } from '../store/thunks/BodegaThunks';
import CrearBodegaModal from './modales/CrearBodegaModal';
import { bodega_seleccionada } from '../store/slice/BodegaSlice';
import { Title } from '../../../../components/Title';




const initial_state_bodega_seleccionada = {

    id_bodega: 0,
    nombre: "",
    cod_municipio: "",
    direccion: "",
    id_responsable: 0,
    es_principal: false,
};
// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearBodegaForm: React.FC = () => {

    const dispatch = useAppDispatch();
    const [action, set_action] = useState<string>("create");
    const { bodega } = useAppSelector((state) => state.bodegas);
    const [add_bodega_is_active, set_add_bodega_is_active] =
        useState<boolean>(false);


    const columns: GridColDef[] = [
        { field: 'id_bodega', headerName: 'ID', width: 200 },
        {
            field: 'nombre', headerName: 'Nombre', width: 200,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },





        {
            field: 'acciones', headerName: 'Acciones', width: 300,
            renderCell: (params) => (
                <>

                    <Tooltip title="Editar">
                        <IconButton
                            onClick={() => {
                                dispatch(bodega_seleccionada(params.row));
                                set_action("edit")
                                set_add_bodega_is_active(true)
                            }}
                        >
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
                    </Tooltip>



                    <Tooltip title="Eliminar">
                        <IconButton
                            onClick={() => {
                                dispatch(delete_bodega_service(params.row.id_bodega));
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 24,
                                    height: 24,
                                    background: '#fff',
                                    border: '2px solid',
                                }}
                                variant="rounded"
                            >
                                <DeleteIcon
                                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                                />

                            </Avatar>
                        </IconButton>
                    </Tooltip>

                </>
            ),
        },

    ];
    useEffect(() => {
        void dispatch(get_bodega_service());
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
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Title title="CREACIÓN DE BODEGAS"></Title>
                <Grid item xs={12}>

                    <Stack direction="row" spacing={2} sx={{ m: '20px 0' }}>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={() => {
                                dispatch(bodega_seleccionada(initial_state_bodega_seleccionada));
                                set_action("create")
                                set_add_bodega_is_active(true);
                            }}
                        >
                            CREAR BODEGA
                        </Button>
                    </Stack>
                    <Grid item>
                        <Box sx={{ width: '100%' }}>
                            <DataGrid
                                density="compact"
                                autoHeight
                                rows={bodega}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                experimentalFeatures={{ newEditingApi: true }}
                                getRowId={(row) => row.id_bodega}
                            />
                        </Box>
                    </Grid>
                    <CrearBodegaModal
                        is_modal_active={add_bodega_is_active}
                        set_is_modal_active={set_add_bodega_is_active}
                        action={action}
                    />
                </Grid>
            </Grid>
        </>
    );
};
