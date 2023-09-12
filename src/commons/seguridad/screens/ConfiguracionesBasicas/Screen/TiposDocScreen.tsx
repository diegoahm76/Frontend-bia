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
import { eliminar_tipos_doc, get_tipos_doc } from '../Request/request';
import type { TiposDoc } from '../interfaces/interfaces';
import Swal from 'sweetalert2';
import { AgregarTiposDoc } from '../Components/AgregarTiposDoc';
import { ActualizarTipoDoc } from '../Components/EditarTiposDoc';


// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const TiposDocumentoScreen: React.FC = () => {
    const columns: GridColDef[] = [
        {
            field: 'cod_tipo_documento',
            headerName: 'CODIGO',
            sortable: true,
            width: 100,flex:1,
        },
        {
            field: 'nombre',
            headerName: 'NOMBRE TIPO DOCUMENTO',
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
                                    set_tipos_doc(params.row);
                                }}
                            />
                        </Avatar>
                    </IconButton>
                    {params.row.activo === false && (
                        <>
                            <IconButton
                                onClick={() => {
                                    confirmar_eliminar_tipo_doc(params.row.cod_tipo_documento as string)
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
    const [rows, set_rows] = useState<TiposDoc[]>([]);
    const [tipos_doc, set_tipos_doc] = useState<TiposDoc>();
    const [is_crear, set_is_crear] = useState<boolean>(false);
    const [is_editar, set_is_editar] = useState<boolean>(false);

    const handle_open_crear = (): void => {
        set_is_crear(true);
    }
    const handle_open_editar = (): void => {
        set_is_editar(true);
    }

    const get_traer_tipos_doc = async (): Promise<void> => {
        try {
            const response = await get_tipos_doc();
            const datos_tipo_doc = response.map(
                (datos: TiposDoc) => ({
                    cod_tipo_documento: datos.cod_tipo_documento,
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
    const confirmar_eliminar_tipo_doc = (tipo_doc: string): void => {
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
                await eliminar_tipos_doc(tipo_doc);
                void get_traer_tipos_doc()
                control_success('El Tipo de Documento civil se eliminó correctamente')
            }
        });
    };

    useEffect(() => {
        void get_traer_tipos_doc();
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
                    <Title title="Configuraciones tipos de documento" />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        sx={{ mb: '20px' }}
                        variant="outlined"
                        onClick={handle_open_crear}
                        startIcon={<AddIcon />}
                    >
                        CREAR TIPO DE DOCUMENTO
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {rows.length > 0 && (
                        <>
                            <DataGrid
                                autoHeight
                                rows={rows}
                                columns={columns}
                                getRowId={(row) => row.cod_tipo_documento}
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
            <AgregarTiposDoc
                is_modal_active={is_crear}
                set_is_modal_active={set_is_crear}
                get_datos={get_traer_tipos_doc}
            />
            <ActualizarTipoDoc
                is_modal_active={is_editar}
                set_is_modal_active={set_is_editar}
                get_data={get_traer_tipos_doc}
                data={tipos_doc}
            />
        </>
    );
};

