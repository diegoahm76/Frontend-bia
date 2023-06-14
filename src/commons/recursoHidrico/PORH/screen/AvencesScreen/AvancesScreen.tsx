import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { useContext, useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import {
    Divider,
    // IconButton, 
    Typography
} from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ChecklistIcon from '@mui/icons-material/Checklist';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { DataContext } from '../../context/contextData';
import { BusquedaPorh } from '../../components/Buscador/Buscador';
import {
    get_data_id,
    // post_programa,
} from '../../Request/request';
import { AgregarAvance } from '../../components/AgregarAvance/AgregarAvance';
// import { EditarPrograma } from '../../components/ActualizarPrograma/EditarPrograma';
import { useForm } from 'react-hook-form';
import { control_error } from '../../../../../helpers';
import { type AxiosError } from 'axios';
// import { control_error } from '../../../../../helpers';
// import { control_success } from '../../../requets/Request';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AvanceScreen: React.FC = () => {
    const {
        register,
        // reset,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        // handleSubmit,
        // watch,
        // setValue: set_value,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        formState: { errors },
    } = useForm();

    const {
        set_rows_avances,
        // rows_proyectos,
        rows_avances,
    } = useContext(DataContext);

    const columns: GridColDef[] = [

        {
            field: 'accion',
            headerName: 'ACCIÓN',
            sortable: true,
            width: 170,
        },
        {
            field: 'descripcion',
            headerName: 'descripcion',
            sortable: true,
            width: 170,
        },
        {
            field: 'fecha_reporte',
            headerName: 'FECHA REPORTE',
            sortable: true,
            width: 170,
        },
        {
            field: 'evidencia',
            headerName: 'EVIDENCIA',
            sortable: true,
            width: 170,
        },
        // {
        //   field: 'ACCIONES',
        //   headerName: 'ACCIONES',
        //   width: 200,
        //   renderCell: (params: any) => {
        //     const fecha_fin = params.row.fecha_fin;
        //     if (fecha_fin !== null && new Date(fecha_fin) > new Date()) {
        //       return (
        //         <>
        //           <IconButton>
        //             <Avatar
        //               sx={{
        //                 width: 24,
        //                 height: 24,
        //                 background: '#fff',
        //                 border: '2px solid',
        //               }}
        //               variant="rounded"
        //             >
        //               <EditIcon
        //                 sx={{ color: 'primary.main', width: '18px', height: '18px' }}
        //                 onClick={() => {
        //                   set_is_agregar(false)
        //                   set_is_editar(true)
        //                   set_is_seleccionar(false)
        //                   // set_cargos(params.row);
        //                 }}
        //               />
        //             </Avatar>
        //           </IconButton>
        //           <IconButton
        //             onClick={() => {
        //               // confirmar_eliminar_cargo(params.row.id_cargo as number)
        //             }}
        //           >
        //             <Avatar
        //               sx={{
        //                 width: 24,
        //                 height: 24,
        //                 background: '#fff',
        //                 border: '2px solid',
        //               }}
        //               variant="rounded"
        //             >
        //               <DeleteIcon
        //                 sx={{ color: 'primary.main', width: '18px', height: '18px' }}
        //               />
        //             </Avatar>
        //           </IconButton>
        //           <IconButton
        //             onClick={() => {
        //               set_is_agregar(false)
        //               set_is_editar(false)
        //               set_is_seleccionar(true)
        //             }}
        //           >
        //             <Avatar
        //               sx={{
        //                 width: 24,
        //                 height: 24,
        //                 background: '#fff',
        //                 border: '2px solid',
        //               }}
        //               variant="rounded"
        //             >
        //               <ChecklistIcon
        //                 sx={{ color: 'primary.main', width: '18px', height: '18px' }}
        //               />
        //             </Avatar>
        //           </IconButton>

        //         </>
        //       );
        //     } else {
        //       return null;
        //     }
        //   },
        // },
    ];

    const [is_agregar, set_is_agregar] = useState(false);
    const [is_editar, set_is_editar] = useState(false);
    const [is_seleccionar, set_is_seleccionar] = useState(false);


    const get_data = async (): Promise<void> => {
        try {
            await get_data_id(1, set_rows_avances, 'get/avances');
            // } catch (error: any) {
            //     // control_error(error.response.data.detail);
            //     control_error('Hubo un error al traer los datos')
            // }
        } catch (err) {
            const temp = err as AxiosError;
            if (temp.response?.status !== 404) {
                control_error(err);
            }
        }

    };

    useEffect(() => {
        void get_data();
    }, []);


    //   const on_submit = async (form: any, set_rows_programas: any, rows_programas: any): Promise<void> => {
    //     try {
    //       await post_programa(form, set_rows_programas, rows_programas, rows_proyectos, rows_avances);
    //       // await get_data_id(1, set_rows_cargos, 'get/cargos');
    //       reset();
    //       control_success('Programa agregado correctamente')
    //     } catch (err) {
    //       control_error(err);
    //     }
    //   }


    return (
        <>
            <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-void
            // onSubmit={handleSubmit((form) => void on_submit(form, set_rows_programas, rows_programas))}
            >
                <Grid
                    container
                    spacing={2}
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
                        <Title title="SELECCIÓN DE PROYECTO" />
                    </Grid>
                    <BusquedaPorh />
                    <Grid item xs={12}>
                        {rows_avances.length > 0 ? (
                            <>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Avances
                                    </Typography>
                                    <Divider />
                                </Grid>
                                <DataGrid
                                    autoHeight
                                    key={1+4}
                                    rows={rows_avances}
                                    columns={columns}
                                    getRowId={(row) => row.nombre}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                />
                            </>
                        ) : (
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    No se encontraron avances
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item spacing={2} justifyContent="end" container>
                        <Grid item>
                            <LoadingButton
                                variant="outlined"
                                onClick={() => {
                                    set_is_agregar(true)
                                    set_is_editar(false)
                                    set_is_seleccionar(false)
                                }}
                            >
                                Agregar Avance
                            </LoadingButton>
                        </Grid>
                    </Grid>
                    {is_agregar && (
                        <>
                            <AgregarAvance
                                register={register}
                            />
                        </>
                    )}
                    {is_editar && (
                        <>
                            {/* <EditarPrograma
                data={rows_programas}
                register={register}
              /> */}
                        </>
                    )}
                    {is_seleccionar && (
                        <>
                            {/* <AgregarPrograma /> */}
                        </>
                    )}
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item spacing={2} justifyContent="end" container>
                        <Grid item>
                            <LoadingButton
                                variant="outlined"
                                color='primary'
                            >
                                Buscar
                            </LoadingButton>
                        </Grid>
                        <Grid item>
                            <LoadingButton
                                variant="outlined"
                                color='warning'
                                type='submit'
                            >
                                Salir
                            </LoadingButton>
                        </Grid>
                        <Grid item>
                            <LoadingButton
                                variant="contained"
                                color='success'
                                type='submit'
                            >
                                Finalizar
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Grid>
            </form >
        </>
    );
};
