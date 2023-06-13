import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { AgregarPrograma } from '../../components/AgregarNuevoPrograma/AgregarPrograma';
import { useContext, useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Avatar, Divider, IconButton, Typography } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { DataContext } from '../../context/contextData';
import { BusquedaPorh } from '../../components/Buscador/Buscador';
import { get_data_id, post_programa } from '../../Request/request';
import { EditarPrograma } from '../../components/ActualizarPrograma/EditarPrograma';
import { useForm } from 'react-hook-form';
import { control_error } from '../../../../../helpers';
import { control_success } from '../../../requets/Request';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PorhMainScreen: React.FC = () => {
  const {
    register,
    reset,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    watch,
    setValue: set_value,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useForm();

  const {
    rows_programas,
    set_rows_programas,
    rows_proyectos,
    rows_actividades,
  } = useContext(DataContext);

  const columns: GridColDef[] = [

    {
      field: 'id_programa',
      headerName: 'No PROGRAMA',
      sortable: true,
      width: 170,
    },
    {
      field: 'nombre',
      headerName: 'NOMBRE PROGRAMA',
      sortable: true,
      width: 170,
    },
    {
      field: 'fecha_inicio',
      headerName: 'FECHA INICIO',
      sortable: true,
      width: 170,
    },
    {
      field: 'fecha_fin',
      headerName: 'FECHA FIN',
      sortable: true,
      width: 170,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params: any) => {
        const fecha_fin = params.row.fecha_fin;
        if (fecha_fin !== null && new Date(fecha_fin) > new Date()) {
          return (
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
                      set_is_agregar(false)
                      set_is_editar(true)
                      set_is_seleccionar(false)
                      // set_cargos(params.row);
                    }}
                  />
                </Avatar>
              </IconButton>
              <IconButton
                onClick={() => {
                  // confirmar_eliminar_cargo(params.row.id_cargo as number)
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
              <IconButton
                onClick={() => {
                  set_is_agregar(false)
                  set_is_editar(false)
                  set_is_seleccionar(true)
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
                  <ChecklistIcon
                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                  />
                </Avatar>
              </IconButton>

            </>
          );
        } else {
          return null;
        }
      },
    },
  ];

  const [is_agregar, set_is_agregar] = useState(false);
  const [is_editar, set_is_editar] = useState(false);
  const [is_seleccionar, set_is_seleccionar] = useState(false);
  const [id_programa, set_id_programa] = useState<number | null>(null);
  // const [id_proyecto, set_id_proyecto] = useState<number | null>(null);

  const fetch_data = async (): Promise<void> => {
    try {
      await get_data_id(1, set_rows_programas, 'get/programas');
    } catch (error) {
      control_error(error);
    }
  };

  useEffect(() => {
    void fetch_data();
  }, []);


  const on_submit = async (form: any, set_rows_programas: any, rows_programas: any, rows_proyectos: any, rows_actividades: any): Promise<void> => {
    try {
      console.log()
      form.id_programa = id_programa
      await post_programa(form, set_rows_programas, rows_programas, rows_proyectos, rows_actividades);
      reset();
      control_success('Programa agregado correctamente')
    } catch (err) {
      control_error(err);
    }
  }


  return (
    <>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-void
        onSubmit={handleSubmit((form) => void on_submit(form, set_rows_programas, rows_programas, rows_proyectos, rows_actividades))}
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
            <Title title="CONTENIDO PROGRAMÁTICO PLAN DE ORDENAMIENTO DE RECURSO HÍDRICO" />
          </Grid>
          <BusquedaPorh />
          {rows_programas.length > 0 && (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Programas
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12}>

                <DataGrid
                  autoHeight
                  rows={rows_programas}
                  columns={columns}
                  getRowId={(row) => row.id_programa}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </Grid>
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
          <Grid item spacing={2} justifyContent="end" container>
            <Grid item>
              <LoadingButton
                variant="outlined"
                onClick={() => {
                  set_id_programa(null)
                  set_is_agregar(true)
                  set_is_editar(false)
                  set_is_seleccionar(false)
                }}
              >
                Agregar programa
              </LoadingButton>
            </Grid>
          </Grid>
          {is_agregar && (
            <>
              <AgregarPrograma
                register={register}
                watch={watch}
                set_value = {set_value}
              />
            </>
          )}
          {is_editar && (
            <>
              <EditarPrograma
                data={rows_programas}
                register={register}
              />
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
              // type='submit'
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
