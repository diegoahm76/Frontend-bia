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
import { eliminar_cargo, get_cargos } from '../Request/request';
import type { Cargos } from '../interfaces/interfaces';
import { AgregarCargo } from '../Components/AgregarCargo';
import Swal from 'sweetalert2';
import { ActualizarCargo } from '../Components/EditarCargo';


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const CargoScreen: React.FC = () => {
    const columns: GridColDef[] = [
        {
            field: 'id_cargo',
            headerName: '#',
            sortable: true,
            width: 70,
        },
        {
            field: 'nombre',
            headerName: 'NOMBRE CARGO',
            sortable: true,
            width: 300,
        },
        {
            field: 'activo',
            headerName: 'ESTADO',
            sortable: true,
            width: 120,
            renderCell: (params) => {
                return params.row.activo === true ? (
                    <Chip size="small" label="Activo" color="success" variant="outlined" />
                ) : (
                    <Chip size="small" label="Inactivo" color="error" variant="outlined" />
                );
            },
        },
        {
            field: 'ACCIONES',
            headerName: 'ACCIONES',
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
                                onClick={() => {
                                    handle_open_editar();
                                    set_cargos(params.row);
                                }}
                            />
                        </Avatar>
                    </IconButton>
                    {params.row.activo === false && (
                        <IconButton
                            onClick={() => {
                                confirmar_eliminar_cargo(params.row.id_cargo as number)
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
                    )}
                </>
            ),
        },

    ];
    const [rows, set_rows] = useState<Cargos[]>([]);
    const [cargos, set_cargos] = useState<Cargos>();
    const [is_crear, set_is_crear] = useState<boolean>(false);
    const [is_editar, set_is_editar] = useState<boolean>(false);

    const handle_open_crear = (): void => {
        set_is_crear(true);
    }
    const handle_open_editar = (): void => {
        set_is_editar(true);
    }

    const get_traer_cargos = async (): Promise<void> => {
        try {
            const response = await get_cargos();
            const datos_cargos = response.map(
                (datos: Cargos) => ({
                    id_cargo: datos.id_cargo,
                    nombre: datos.nombre,
                    activo: datos.activo,
                })
            );
            set_rows(datos_cargos);
        } catch (error: any) {
            control_error(error.response.data.detail);
        }
    };
    const confirmar_eliminar_cargo = (id_cargo: number): void => {
        void Swal.fire({
            // title: "Estas seguro?",
            customClass: {
                confirmButton: "square-btn",
                cancelButton: "square-btn",
            },
            width: 350,
            text: "¿Estas seguro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0EC32C",
            cancelButtonColor: "#DE1616",
            confirmButtonText: "Si, elminar!",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await eliminar_cargo(id_cargo);
                void get_traer_cargos()
                control_success('El cargo se eliminó correctamente')
            }
        });
    };

    useEffect(() => {
        void get_traer_cargos();
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
                    <Title title="CONFIGURACIONES BÁSICAS CARGOS" />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        sx={{ mb: '20px' }}
                        variant="outlined"
                        onClick={handle_open_crear}
                        startIcon={<AddIcon />}
                    >
                        CREAR CARGO
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {rows.length > 0 && (
                        <>
                            <DataGrid
                                autoHeight
                                rows={rows}
                                columns={columns}
                                getRowId={(row) => row.id_cargo}
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
            <AgregarCargo
                is_modal_active={is_crear}
                set_is_modal_active={set_is_crear}
                get_datos={get_traer_cargos}
            />
            <ActualizarCargo
                is_modal_active={is_editar}
                set_is_modal_active={set_is_editar}
                get_data={get_traer_cargos}
                data_cargos={cargos}
            />
        </>
    );
};
