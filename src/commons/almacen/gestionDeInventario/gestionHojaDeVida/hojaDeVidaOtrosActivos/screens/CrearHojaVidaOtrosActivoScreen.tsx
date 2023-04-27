/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EditIcon from '@mui/icons-material/Edit';

// import { useNavigate } from 'react-router-dom';
// Componentes de Material UI
import { Grid, Box, IconButton, Avatar, Chip, Tooltip, DialogTitle, } from '@mui/material';
// Icons de Material UI
// eslint-disable-next-line @typescript-eslint/no-unused-vars




import { DataGrid, type GridColDef } from '@mui/x-data-grid';
// Componentes personalizados
import { Title } from '../../../../../../components/Title';
// // Hooks
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
// Thunks
import { get_others_all_service } from '../store/thunks/cvOtrosActivosThunks';

// // Slices
import { current_others } from '../store/slices/indexCvOtrosActivos';
import CrearCvOtrosActivosForm from '../components/CrearCvOtrosActivosForm';
// import { ProgramacionManteniento } from '../../mantenimiento/ProgramacionManteniento';


// // // Slices
// import { current_nursery } from '../store/slice/indexCvComputo';


// eslint-disable-next-line @typescript-eslint/naming-convention
export function CrearHojaVidaOtrosActivosScreen(): JSX.Element {
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // const  [action] = useState<string>("create");
    const { others } = useAppSelector((state) => state.cvo);
    const [action, set_action] = useState<string>("create");
    const [add_cv_oth_is_active, set_add_cv_oth_is_active] =
        useState<boolean>(false);

    const columns: GridColDef[] = [
        { field: 'id_bien', headerName: 'ID', width: 20 },
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 200,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'tiene_hoja_vida',
            headerName: '¿Hoja de vida?',
            width: 120,
            renderCell: (params) => {
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                return params.row.tiene_hoja_vida ? (
                    <Chip size="small" label="SI" color="success" variant="outlined" />
                ) : (
                    <Chip size="small" label="NO" color="error" variant="outlined" />

                );
            },
        },
        {
            field: 'cod_tipo_activo',
            headerName: 'Tipo Activo',
            width: 50,
        },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 100,

        },

        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 300,
            renderCell: (params) => (
                <>
                    {params.row.tiene_hoja_vida ?
                        <Tooltip title="Editar">
                            <IconButton
                                onClick={() => {
                                    dispatch(current_others(params.row));
                                    set_action("create")
                                    set_add_cv_oth_is_active(true)
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
                        </Tooltip> :
                        <Tooltip title="Crear hoja de vida">
                            <IconButton
                                onClick={() => {

                                    set_add_cv_oth_is_active(true);
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
                                    <NoteAddIcon
                                        sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                                    />

                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    }
                    <Tooltip title="Programar mantenimiento">
                        <IconButton
                            onClick={() => {

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
                                <EngineeringIcon
                                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                                />

                            </Avatar>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Asignaciones">
                        <IconButton
                            onClick={() => {

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
                                <AssignmentIndIcon
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
        void dispatch(get_others_all_service());
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
                <Grid item xs={12}>
                    <DialogTitle>Activos</DialogTitle>

                    <Title title="Activos"></Title>

                    <Grid item>
                        <Box sx={{ width: '100%' }}>
                            <DataGrid
                                density="compact"
                                autoHeight
                                rows={others}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                experimentalFeatures={{ newEditingApi: true }}
                                getRowId={(row) => row.id_bien}
                            />
                        </Box>
                    </Grid>
                    <CrearCvOtrosActivosForm
                        is_modal_active={add_cv_oth_is_active}
                        set_is_modal_active={set_add_cv_oth_is_active}
                        action={action}
                    />

                </Grid>
            </Grid>
        </>
    );
}

