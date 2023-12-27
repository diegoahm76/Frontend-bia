import {
    useEffect,
    useState,
} from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
    Avatar,
    Button,
    Chip,
    Grid,
    IconButton,
    Stack,
    // Alert,
    // LinearProgress,
    // Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { control_error, control_success } from '../../../../../helpers';
import { Title } from '../../../../../components/Title';
import { eliminar_estado_civil, get_estado_civil } from '../Request/request';
import type { GetEstadoCivil } from '../interfaces/interfaces';
import Swal from 'sweetalert2';
import { AgregarEstadoCivil } from '../Components/AgregarEstadoCivil';
import { ActualizarEstadoCivil } from '../Components/EditarEstadoCivil';


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const EstadoCivilScreen: React.FC = () => {
    const columns: GridColDef[] = [
        {
            field: 'cod_estado_civil',
            headerName: 'CODIGO',
            sortable: true,
            width: 100,flex:1,
        },
        {
            field: 'nombre',
            headerName: 'NOMBRE ESTADO CIVIL',
            sortable: true,
            width: 200,flex:1,
        },
        {
            field: 'activo',
            headerName: 'ESTADO',
            sortable: true,
            width: 120,flex:1,
            renderCell: (params) => {
                return params.row.activo === true ? (
                    <Chip size="small" label="Activo" color="success" variant="outlined" />
                ) : (
                    <Chip size="small" label="Inactivo" color="error" variant="outlined" />
                );
            },
        },
        {
            field: 'precargado',
            headerName: 'PRECARGADO',
            sortable: true,
            width: 120,flex:1,
            renderCell: (params) => {
                return params.row.precargado === true ? (
                    <Chip size="small" label="Activo" color="success" variant="outlined" />
                ) : (
                    <Chip size="small" label="Inactivo" color="error" variant="outlined" />
                );
            },
        },
        {
            field: 'item_ya_usado',
            headerName: 'ITEM YA USADO',
            sortable: true,
            width: 120,flex:1,
            renderCell: (params) => {
                return params.row.item_ya_usado === true ? (
                    <Chip size="small" label="Activo" color="success" variant="outlined" />
                ) : (
                    <Chip size="small" label="Inactivo" color="error" variant="outlined" />
                );
            },
        },
        {
            field: 'ACCIONES',
            headerName: 'ACCIONES',
            width: 200,flex:1,
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
                                onClick={() => {
                                    handle_open_editar();
                                    set_estado_civil(params.row);
                                }}
                            />
                        </Avatar>
                    </IconButton>
                    {params.row.activo === false && (
                        <>
                            <IconButton
                                onClick={() => {
                                    confirmar_eliminar_estado_civil(params.row.cod_estado_civil as string)
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
                        </>
                    )}
                </>
            ),
        },
    ];
    const [rows, set_rows] = useState<GetEstadoCivil[]>([]);
    const [estado_civil, set_estado_civil] = useState<GetEstadoCivil>();
    const [is_crear, set_is_crear] = useState<boolean>(false);
    const [is_editar, set_is_editar] = useState<boolean>(false);

    const handle_open_crear = (): void => {
        set_is_crear(true);
    }
    const handle_open_editar = (): void => {
        set_is_editar(true);
    }

    const get_traer_estado_civil = async (): Promise<void> => {
        try {
            const response = await get_estado_civil();
            const datos_tipo_doc = response.map(
                (datos: GetEstadoCivil) => ({
                    cod_estado_civil: datos.cod_estado_civil,
                    nombre: datos.nombre,
                    precargado: datos.precargado,
                    activo: datos.activo,
                    item_ya_usado: datos.item_ya_usado,
                })
            );
            set_rows(datos_tipo_doc);
        } catch (error: any) {
            control_error(error.response.data.detail);
        }
    };
    const confirmar_eliminar_estado_civil = (estado_civil: string): void => {
        void Swal.fire({
            // title: "Estas seguro?",
            customClass: {
                confirmButton: "square-btn",
                cancelButton: "square-btn",
            },
            width: 350,
            text: "¿Estás seguro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0EC32C",
            cancelButtonColor: "#DE1616",
            confirmButtonText: "Si, elminar!",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await eliminar_estado_civil(estado_civil);
                void get_traer_estado_civil()
                control_success('El estado civil se eliminó correctamente')
            }
        });
    };

    useEffect(() => {
        void get_traer_estado_civil();
    }, []);
    return (
        <>
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
                    <Title title="Configuraciones estado civil" />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        sx={{ mb: '20px' }}
                        variant="outlined"
                        onClick={handle_open_crear}
                        startIcon={<AddIcon />}
                    >
                        CREAR ESTADO CIVIL
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {rows.length > 0 && (
                        <>
                            <DataGrid
                                autoHeight
                                rows={rows ?? []}
                                columns={columns ?? []}
                                getRowId={(row) => row.cod_estado_civil}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                            />
                        </>
                    )}
                    {/* <Grid item xs={12}>
                        <Grid container justifyContent="center" textAlign="center">
                            <Alert icon={false} severity="info">
                                <LinearProgress />
                                <Typography>No se encontraron resultados...</Typography>
                            </Alert>
                        </Grid>
                    </Grid> */}
                </Grid>
                <Grid item xs={12}>
                    <Stack
                        justifyContent="flex-end"
                        sx={{ m: '10px 0 20px 0' }}
                        direction="row"
                        spacing={1}
                    >
                    </Stack>
                </Grid>
            </Grid>
            <AgregarEstadoCivil
                is_modal_active={is_crear}
                set_is_modal_active={set_is_crear}
                get_datos={get_traer_estado_civil}
            />
            <ActualizarEstadoCivil
                is_modal_active={is_editar}
                set_is_modal_active={set_is_editar}
                get_data={get_traer_estado_civil}
                data={estado_civil}
            />
        </>
    );
};

