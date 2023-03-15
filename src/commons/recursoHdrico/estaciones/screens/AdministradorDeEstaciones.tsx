import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, CircularProgress, Grid, IconButton } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Title } from '../../../../components/Title';
import { type Estaciones } from '../interfaces/interfaces';
<<<<<<< HEAD
import { consultar_estaciones } from '../../requets/getRequest';
import { control_error } from '../../../../helpers/controlError';

const columns: GridColDef[] = [
    { field: 'id_estacion', headerName: 'NÚMERO', width: 140 },
    { field: 'fecha_modificacion', headerName: 'FECHA MOD.', width: 170 },
    { field: 'nombre_estacion', headerName: 'NOMBRE', width: 170 },
    { field: 'cod_tipo_estacion', headerName: 'COD. ETSACIÓN', width: 170 },
    { field: 'latitud', headerName: 'LATITUD', width: 170 },
    { field: 'longitud', headerName: 'LONGITUD', width: 170 },
    { field: 'indicaciones_ubicacion', headerName: 'INDICACIONES', width: 170 },
    { field: 'fecha_modificacion_coordenadas', headerName: 'FECHA MOD. COORDENADAS', width: 170 },
    {
        field: 'ACCIONES',
        headerName: 'Aciones',
        width: 200,
        renderCell: (params) => (
            <>
                <IconButton>
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
                <IconButton>
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
            </>
        ),
    },
];
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministradorDeEstaciones: React.FC = () => {
    const [list_estaciones, set_estaciones] = useState<Estaciones[]>([]);


=======
import { consultar_estaciones } from '../../requets/Request';
import { control_error } from '../../../../helpers/controlError';
import { CrearEstacionDialog } from '../components/CrearEstacionDialog';
import { EditarEstacionDialog } from '../components/EditarEstacionDialog';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministradorDeEstaciones: React.FC = () => {
    const [list_estaciones, set_estaciones] = useState<Estaciones[]>([]);
    const [crear_estacion_is_active, set_crear_estacion_is_active] = useState<boolean>(false);
    const [editar_estacion_is_active, set_editar_estacion_is_active] = useState<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handle_open_crear_estacion = () => {
        set_crear_estacion_is_active(true);
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handle_open_editar_estacion = () => {
        set_editar_estacion_is_active(true);
    }

    const columns: GridColDef[] = [
        { field: 'id_estacion', headerName: 'NÚMERO', width: 140 },
        { field: 'fecha_modificacion', headerName: 'FECHA MOD.', width: 170 },
        { field: 'nombre_estacion', headerName: 'NOMBRE', width: 170 },
        { field: 'cod_tipo_estacion', headerName: 'COD. ETSACIÓN', width: 170 },
        { field: 'latitud', headerName: 'LATITUD', width: 170 },
        { field: 'longitud', headerName: 'LONGITUD', width: 170 },
        { field: 'indicaciones_ubicacion', headerName: 'INDICACIONES', width: 170 },
        { field: 'fecha_modificacion_coordenadas', headerName: 'FECHA MOD. COORDENADAS', width: 170 },
        {
            field: 'ACCIONES',
            headerName: 'Aciones',
            width: 200,
            renderCell: (params) => (
                <>
                    <IconButton>
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
                                onClick={handle_open_editar_estacion}
                            />
                        </Avatar>
                    </IconButton>
                    <IconButton>
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
                </>
            ),
        },
    ];
>>>>>>> main
    const estacion = async (): Promise<void> => {
        try {
            const response = await consultar_estaciones();
            const new_estacion = response.map((estaciones: Estaciones) => ({

                id_estacion: estaciones.id_estacion,
                fecha_modificacion: estaciones.fecha_modificacion,
                nombre_estacion: estaciones.nombre_estacion,
                cod_tipo_estacion: estaciones.cod_tipo_estacion,
                latitud: estaciones.latitud,
                longitud: estaciones.longitud,
                indicaciones_ubicacion: estaciones.indicaciones_ubicacion,
                fecha_modificacion_coordenadas: estaciones.fecha_modificacion_coordenadas,
                id_persona_modifica: estaciones.id_persona_modifica,

            }))

            set_estaciones(new_estacion);
        } catch (err) {
            control_error(err);
        }
    };

    useEffect(() => {
        void estacion()
    }, []);

    return (
        <Grid container spacing={2}
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
            }}>
            <Title title="ESTACIONES HIDROMETEOROLOGICAS"></Title>
            <Grid item xs={12}>
                <Button
                    sx={{ mb: '20px' }}
                    variant="outlined"
<<<<<<< HEAD
                    // onClick={handle_click_open}
=======
                    onClick={handle_open_crear_estacion}
>>>>>>> main
                    startIcon={<AddIcon />}
                >
                    CREAR ESTACIÓN
                </Button>
            </Grid>
            <Grid item xs={12} container justifyContent='center'>

                {list_estaciones.length > 0 ? (
                    <DataGrid
                        autoHeight
                        rows={list_estaciones}
                        columns={columns}
                        getRowId={(row) => row.id_estacion}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                ) : (
                    <CircularProgress color="secondary" />
                )}
            </Grid>
<<<<<<< HEAD
=======
            <CrearEstacionDialog
                is_modal_active={crear_estacion_is_active}
                set_is_modal_active={set_crear_estacion_is_active}
            />
            <EditarEstacionDialog
                is_modal_active={editar_estacion_is_active}
                set_is_modal_active={set_editar_estacion_is_active}
            />
>>>>>>> main
        </Grid>
    );
};