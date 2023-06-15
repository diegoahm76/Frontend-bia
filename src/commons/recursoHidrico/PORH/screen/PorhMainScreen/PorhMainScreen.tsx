import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { AgregarPrograma } from '../../components/AgregarNuevoPrograma/AgregarPrograma';
import { useContext, useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Avatar, Divider, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { DataContext } from '../../context/contextData';
import { BusquedaPorh } from '../../components/Buscador/Buscador';
import { editar_activdad, editar_programa, editar_proyecto, get_data_id, post_programa } from '../../Request/request';
import { EditarPrograma } from '../../components/ActualizarPrograma/EditarPrograma';
import { useForm } from 'react-hook-form';
import { control_error } from '../../../../../helpers';
import { control_success } from '../../../requets/Request';
import type { GetPrograma } from '../../Interfaces/interfaces';
import { SeleccionarPrograma } from '../../components/SeleccionarPrograma/SeleccionarPrograma';

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
    is_agregar_programa,
    set_is_agregar_programa,
    is_editar_programa,
    set_is_editar_programa,
    is_seleccionar_programa,
    set_is_seleccionar_programa,
    is_agregar_actividad,
    is_agregar_proyecto,
    is_editar_actividad,
    is_editar_proyecto,
    id_actividad,
    id_proyecto,
    set_id_programa,
    id_programa,
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
      width: 250,
    },
    {
      field: 'fecha_inicio',
      headerName: 'FECHA INICIO',
      sortable: true,
      width: 250,
    },
    {
      field: 'fecha_fin',
      headerName: 'FECHA FIN',
      sortable: true,
      width: 250,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params: any) => {
        const fecha_fin = params.row.fecha_fin;
        return (
          <>
            {fecha_fin !== null && new Date(fecha_fin) > new Date() && (
              <>
                <IconButton
                  onClick={() => {
                    set_id_programa(params.row.id_programa as number);
                    set_data(params.row);
                    set_is_agregar_programa(false);
                    set_is_editar_programa(true);
                    set_is_seleccionar_programa(false);
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
                      sx={{
                        color: 'primary.main',
                        width: '18px',
                        height: '18px',
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
                      sx={{
                        color: 'primary.main',
                        width: '18px',
                        height: '18px',
                      }}
                    />
                  </Avatar>
                </IconButton>
              </>
            )}
            <IconButton
              onClick={() => {
                set_id_programa(params.row.id_programa as number);
                set_data(params.row);
                set_is_agregar_programa(false);
                set_is_editar_programa(false);
                set_is_seleccionar_programa(true);
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
                  sx={{
                    color: 'primary.main',
                    width: '18px',
                    height: '18px',
                  }}
                />
              </Avatar>
            </IconButton>

          </>

        );
      },
    },
  ];

  const [data, set_data] = useState<GetPrograma>();

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

  const on_submit = handleSubmit(async (form) => {
    try {
      form.id_programa = id_programa
      form.id_proyecto = id_proyecto
      await post_programa(form, set_rows_programas, rows_programas, rows_proyectos, rows_actividades);
      reset();
      control_success('Se creó correctamente')
      await fetch_data();
    } catch (err) {
      control_error(err);
    }
  });

  const on_submit_editar = handleSubmit(async (form) => {
    try {
      await editar_programa(id_programa as number, form);
      // reset();
      control_success('Se editó correctamente')
    } catch (err) {
      control_error(err);
    }
  });
  const on_submit_editar_proyecto = handleSubmit(async (form) => {
    try {
      await editar_proyecto(id_proyecto as number, form);
      // reset();
      control_success('Se editó correctamente')
    } catch (err) {
      control_error(err);
    }
  });
  const on_submit_editar_actividad = handleSubmit(async (form) => {
    try {
      await editar_activdad(id_actividad as number, form);
      // reset();
      control_success('Se editó correctamente')
    } catch (err) {
      control_error(err);
    }
  });

  return (
    <>
      <form
        onSubmit={(form) => {
          if (is_agregar_programa || is_agregar_actividad || is_agregar_proyecto) {
            void on_submit(form)
          }
          if (is_editar_programa) {
            void on_submit_editar(form)
          }
          if (is_editar_actividad) {
            void on_submit_editar_actividad(form)
          }
          if (is_editar_proyecto) {
            void on_submit_editar_proyecto(form)
          }
        }}
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
          <Grid item spacing={2} justifyContent="end" container>
            <Grid item>
              <LoadingButton
                variant="outlined"
                onClick={() => {
                  set_id_programa(null)
                  set_is_agregar_programa(true)
                  set_is_editar_programa(false)
                  set_is_seleccionar_programa(false)
                }}
              >
                Agregar programa
              </LoadingButton>
            </Grid>
          </Grid>
          {is_agregar_programa && (
            <>
              <AgregarPrograma
                register={register}
                watch={watch}
                set_value={set_value}
              />
            </>
          )}
          {is_editar_programa && (
            <>
              <EditarPrograma
                data={data}
                register={register}
                watch={watch}
                set_value={set_value}
                set_data={set_data}
              />
            </>
          )}
          {is_seleccionar_programa && (
            <>
              <SeleccionarPrograma
                data={data}
                register={register}
                watch={watch}
                set_value={set_value}
                set_data={set_data}
              />
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
            {!is_editar_programa || !is_editar_actividad || !is_editar_proyecto ? (
              <Grid item>
                <LoadingButton
                  variant="contained"
                  color='success'
                  type='submit'
                >
                  Finalizar
                </LoadingButton>
              </Grid>
            ) : (
              <Grid item>
                <LoadingButton
                  variant="contained"
                  color='success'
                  type='submit'
                >
                  Actualizar
                </LoadingButton>
              </Grid>
            )}
          </Grid>
        </Grid>
      </form >
    </>
  );
};
