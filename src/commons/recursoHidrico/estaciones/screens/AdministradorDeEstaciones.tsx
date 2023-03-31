/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, CircularProgress, Grid, IconButton } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Title } from '../../../../components/Title';
import type {Datos, Estaciones } from '../interfaces/interfaces';
import type { AxiosError } from 'axios';
import {
    consultar_estaciones, consultar_datos_id, control_success,
    // eliminar_estacion, 
    control_success_fail
} from '../../requets/Request';
import { control_error } from '../../../../helpers/controlError';
import { CrearEstacionDialog } from '../components/CrearEstacionDialog';
import { EditarEstacionDialog } from '../components/EditarEstacionDialog';
import Swal from 'sweetalert2';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministradorDeEstaciones: React.FC = () => {
    const [list_estaciones, set_estaciones] = useState<Estaciones[]>([]);
    const [has_data, set_has_data] = useState(false);
    const [crear_estacion_is_active, set_crear_estacion_is_active] = useState<boolean>(false);
    const [editar_estacion_is_active, set_editar_estacion_is_active] = useState<boolean>(false);
    const [estacion_editado, set_estacion_editado] = useState(null);

    const handle_open_crear_estacion = (): void => {
        set_crear_estacion_is_active(true);
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
                                onClick={() => {
                                    set_estacion_editado(params.row);
                                    set_editar_estacion_is_active(!editar_estacion_is_active);
                                    console.log("se enviaron los siguientes parametros", params.row);
                                }}
                            />
                        </Avatar>
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            confirmar_eliminar_usuario(params.row.id_estacion);
                            void traer_dato({ estacion: { value: params.row.id_estacion } })
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
            ),
        },
    ];
    const estacion = async (): Promise<void> => {
        try {
            set_estaciones([]);
            const response = await consultar_estaciones();
            const new_estacion = response.map((estaciones: Estaciones) => ({

                id_estacion: estaciones.id_estacion,
                fecha_modificacion: estaciones.fecha_modificacion,
                nombre_estacion: estaciones.nombre_estacion,
                cod_tipo_estacion: estaciones.cod_tipo_estacion,
                // cod_municipio: estaciones.cod_municipio,
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

    const traer_dato = async (data: { estacion: { value: any; }; }): Promise<any> => {
        try {
            const estacion_id = data.estacion?.value;
            const estacion = await consultar_datos_id(estacion_id).then((res: Datos[]) => {
                return res
            }).catch( (err: AxiosError) => {
                if(err.status === 404){
                    set_has_data(false)
                }
                throw err
            });
            if(estacion.length > 0 ){
                set_has_data(true)
            } else {
                set_has_data(false)
            }
            
        } catch (err) {
            control_error(err);
        }
    };

    const confirmar_eliminar_usuario = (id_Estacion: number): void => {
        if (has_data) {
            control_success_fail("La estación no se puede eliminar porque contiene datos")
        } else {
            void Swal.fire({
                title: "Estas seguro?",
                text: "Va a eliminar un usuario",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, elminar!",
                cancelButtonText: "Cancelar",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // await eliminar_estacion(id_Estacion);
                    void estacion()
                    control_success('La estación se eliminó correctamente')
                } else {
                    set_has_data(false)
                }
            });
        }
    };

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
                    onClick={handle_open_crear_estacion}
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
            <CrearEstacionDialog
                is_modal_active={crear_estacion_is_active}
                set_is_modal_active={set_crear_estacion_is_active}
                estacion={estacion}
            />
            <EditarEstacionDialog
                is_modal_active={editar_estacion_is_active}
                set_is_modal_active={set_editar_estacion_is_active}
                estacion_editado={estacion_editado}
                set_estacion_editado={set_estacion_editado}
                estacion={estacion}
            />
        </Grid>
    );
};