
import { Avatar, Box, Button, Dialog, DialogContent, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch } from '../../../../../hooks';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
interface IProps {
    expediente: any;
}

const class_icon = {
    width: 24,
    height: 24,
    background: '#fff',
    border: '2px solid',
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConcesionesPermisosVigentes: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [concesiones_realizadas, set_concesiones_realizadas] = useState<any>([]);
    const [concesiones_realizadas_otros, set_concesiones_realizadas_otros] = useState<any>([]);

    useEffect(() => {
    }, []);

    const columns_realizadas: GridColDef[] = [
        {
            field: 'codigo_exp_Agno',
            headerName: 'CONCEDIDO A',
            sortable: true,
            width: 200,
        },
        {
            field: 'codigo_exp_consec_por_agno',
            headerName: 'UNIDAD ORGANIZACIONAL',
            sortable: true,
            width: 200,
        },
        {
            field: 'tipologia',
            headerName: 'CON TIPOLOGÍA RESERVADA',
            width: 200,
        },
        {
            field: 'desde',
            headerName: 'CONCEDIDO ACCESO DESDE',
            width: 200,
        },
        {
            field: 'hasta',
            headerName: 'CONCEDIDO ACCESO HASTA',
            width: 200,
        },
        {
            field: 'acciones',
            headerName: 'ACCIONES',
            width: 150,
            renderCell: (params) => (
                <>
                    <Tooltip title="Editar">
                        <IconButton onClick={() => { editar_concesiones(params.row) }}>
                            <Avatar sx={class_icon} variant="rounded">
                                <EditOutlinedIcon sx={{ color: 'primary.main', width: '18px', height: '18px' }} />
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <IconButton onClick={() => { eliminar_concesiones(params.row) }}>
                            <Avatar sx={class_icon} variant="rounded">
                                <ClearOutlinedIcon sx={{ color: 'primary.main', width: '18px', height: '18px' }} />
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </>
            ),

        },
    ];
    const columns_realizadas_otros: GridColDef[] = [
        {
            field: 'codigo_exp_Agno',
            headerName: 'CONCEDIDO A',
            sortable: true,
            width: 200,
        },
        {
            field: 'codigo_exp_consec_por_agno',
            headerName: 'UNIDAD ORGANIZACIONAL',
            sortable: true,
            width: 200,
        },
        {
            field: 'por',
            headerName: 'CONCEDIDO POR',
            sortable: true,
            width: 200,
        },
        {
            field: 'tipologia',
            headerName: 'CON TIPOLOGÍA RESERVADA',
            width: 200,
        },
        {
            field: 'desde',
            headerName: 'CONCEDIDO ACCESO DESDE',
            width: 200,
        },
        {
            field: 'hasta',
            headerName: 'CONCEDIDO ACCESO HASTA',
            width: 200,
        },
        {
            field: 'acciones',
            headerName: 'ACCIONES',
            width: 120,
            renderCell: (params) => (
                <>
                    <Tooltip title="Eliminar">
                        <IconButton onClick={() => { eliminar_concesiones(params.row) }}>
                            <Avatar sx={class_icon} variant="rounded">
                                <ClearOutlinedIcon sx={{ color: 'primary.main', width: '18px', height: '18px' }} />
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </>
            ),

        },
    ];

    const editar_concesiones: (row: any) => void = (row: any) => {

    }
    const eliminar_concesiones: (row: any) => void = (row: any) => {

    }

    return (
        <>
            <Grid item md={12} xs={12}>
                <Title title="Concesiones de permisos vigentes" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={12}>
                        <Typography sx={{ fontSize: '18px', fontWeight: '420' }}> Concesiones realizadas por mi </Typography>
                            <DataGrid
                                density="compact"
                                autoHeight
                                columns={columns_realizadas}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                rows={concesiones_realizadas}
                                getRowId={(row) => row.orden_en_expediente} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                        <Typography sx={{ fontSize: '18px', fontWeight: '420' }}> Concesiones realizadas por otros usuarios </Typography>
                            <DataGrid
                                density="compact"
                                autoHeight
                                columns={columns_realizadas_otros}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                rows={concesiones_realizadas_otros}
                                getRowId={(row) => row.orden_en_expediente} />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </>
    );
};