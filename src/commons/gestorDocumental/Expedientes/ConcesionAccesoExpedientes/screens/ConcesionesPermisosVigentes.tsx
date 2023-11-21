
import { Avatar, Box, Button, Dialog, DialogContent, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch } from '../../../../../hooks';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
interface IProps {
    expediente: any,
    concesion: any,
    accion_guardar: any,
    set_editar_concesion: any
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
        if(props.concesion !== null){
            const concesiones_realizadas_local = [...concesiones_realizadas];
            if(concesiones_realizadas_local.length > 0){
               const index = concesiones_realizadas_local.findIndex((cr: any) => cr.id_concesion_acc === props.concesion.id_concesion_acc);
               if(index !== -1){
                   concesiones_realizadas_local[index] = props.concesion;
                   set_concesiones_realizadas([...concesiones_realizadas_local]);
               }else
                    set_concesiones_realizadas([...concesiones_realizadas,props.concesion]);
            }else 
                set_concesiones_realizadas([...concesiones_realizadas,props.concesion]);
            props.set_editar_concesion(null);
        }
    }, [props.concesion]);

    useEffect(() => {
        if(props.accion_guardar){
            const concesiones = concesiones_realizadas.map((cr: any) => {
                return {
                    "id": cr.id_concesion_acc,
                    "id_persona_recibe_acceso": cr.id_persona_recibe_acceso,
                    "id_unidad_org_destinatario_conceder": cr.id_unidad_org_destinatario_conceder,
                    "con_acceso_tipologias_reservadas": cr.con_acceso_tipologias_reservadas,
                    "fecha_acceso_inicia": dayjs(cr.fecha_acceso_inicia).format('YYYY-MM-DD'),
                    "fecha_acceso_termina": dayjs(cr.fecha_acceso_termina).format('YYYY-MM-DD'),
                    "observacion": cr.observacion
                }
            })
            console.log(concesiones);
        }
    }, [props.accion_guardar]);

    const columns_realizadas: GridColDef[] = [
        {
            field: 'nombre_persona_recibe_acceso',
            headerName: 'CONCEDIDO A',
            sortable: true,
            width: 200
        },
        {
            field: 'nombre_unidad_org_destinatario_conceder',
            headerName: 'UNIDAD ORGANIZACIONAL',
            sortable: true,
            width: 200
        },
        {
            field: 'con_acceso_tipologias_reservadas',
            headerName: 'CON TIPOLOGÍA RESERVADA',
            width: 200,
            valueGetter: (params) => params.row.con_acceso_tipologias_reservadas ? 'Si':'No',
        },
        {
            field: 'fecha_acceso_inicia',
            headerName: 'CONCEDIDO ACCESO DESDE',
            width: 200,
            valueGetter: (params) => dayjs(params.row.fecha_acceso_inicia).format('DD/MM/YYYY'),
        },
        {
            field: 'fecha_acceso_termina',
            headerName: 'CONCEDIDO ACCESO HASTA',
            width: 200,
            valueGetter: (params) => dayjs(params.row.fecha_acceso_termina).format('DD/MM/YYYY'),
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
            field: 'con_acceso_tipologias_reservadas',
            headerName: 'CON TIPOLOGÍA RESERVADA',
            width: 200,
        },
        {
            field: 'fecha_acceso_inicia',
            headerName: 'CONCEDIDO ACCESO DESDE',
            width: 200,
        },
        {
            field: 'fecha_acceso_termina',
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
        props.set_editar_concesion(row);
    }
    const eliminar_concesiones: (row: any) => void = (row: any) => {
            let concesiones_grid: any[] = [...concesiones_realizadas];
            const index = concesiones_grid.findIndex((cg: any) => cg.id_concesion_acc === row.id_concesion_acc);
            concesiones_grid.splice(index, 1);
            set_concesiones_realizadas([...concesiones_grid]);
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
                                getRowId={(row) => row.id_concesion_acc} />
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
                                getRowId={(row) => uuidv4()} />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </>
    );
};