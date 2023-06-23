/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { AgregarPrograma } from '../../components/AgregarNuevoPrograma/AgregarPrograma';
import { useContext, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { Avatar, Divider, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { DataContext } from '../../context/contextData';
import { BusquedaPorh } from '../../components/Buscador/Buscador';
import {
  editar_activdad,
  editar_programa,
  editar_proyecto,
  eliminar_id,
  post_programa,
} from '../../Request/request';
import { EditarPrograma } from '../../components/ActualizarPrograma/EditarPrograma';
import { control_error } from '../../../../../helpers';
import { control_success } from '../../../requets/Request';
import { SeleccionarPrograma } from '../../components/SeleccionarPrograma/SeleccionarPrograma';
import Swal from 'sweetalert2';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import { BusquedaAvanzada } from '../../components/BusquedaAvanzadaPORH/BusquedaAvanzada';
import { ConsultaPorh } from '../../components/ConsultaPorh/ConsultaPorh';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PorhMainScreen: React.FC = () => {
  const {
    reset,
    handleSubmit: handle_submit,
    errors,
    rows_programas,
    set_rows_programas,
    rows_proyectos,
    rows_actividades,
    is_agregar_programa,
    is_editar_programa,
    is_seleccionar_programa,
    is_agregar_actividad,
    is_agregar_proyecto,
    is_editar_actividad,
    is_editar_proyecto,
    id_actividad,
    id_proyecto,
    set_id_programa,
    id_programa,
    fetch_data_actividades,
    fetch_data_proyectos,
    fetch_data_programas,
    is_general,
    is_consulta,
    set_mode,
    set_data_programa,
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
                    set_data_programa(params.row);
                    set_mode('editar_programa');
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
                    confirmar_eliminar(params.row.id_programa as number);
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
                set_data_programa(params.row);
                set_mode('select_programa');
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

  useEffect(() => {
    void fetch_data_programas();
  }, []);

  const on_submit = handle_submit(async (form: any) => {
    try {
      form.id_programa = id_programa;
      form.id_proyecto = id_proyecto;
      await post_programa(
        form,
        set_rows_programas,
        rows_programas,
        rows_proyectos,
        rows_actividades
      );
      reset();
      control_success('Se creó correctamente');
      await fetch_data_programas();
      await fetch_data_proyectos();
      await fetch_data_actividades();
    } catch (error: any) {
      control_error(
        error.response.data.detail || 'hubo un error al crear, intenta de nuevo'
      );
    }
  });

  const on_submit_editar = handle_submit(async (form: any) => {
    try {
      await editar_programa(id_programa as number, form);
      control_success('Se editó correctamente');
      await fetch_data_programas();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'hubo un error al editar, intenta de nuevo'
      );
    }
  });
  const on_submit_editar_proyecto = handle_submit(async (form: any) => {
    try {
      await editar_proyecto(id_proyecto as number, form);
      control_success('Se editó el proyecto correctamente');
      await fetch_data_proyectos();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'hubo un error al editar, intenta de nuevo'
      );
    }
  });
  const on_submit_editar_actividad = handle_submit(async (form: any) => {
    try {
      await editar_activdad(id_actividad as number, form);
      control_success('Se editó la actividad correctamente');
      await fetch_data_actividades();
    } catch (error: any) {
      control_error(
        error.response.data.detail ||
          'hubo un error al editar, intenta de nuevo'
      );
    }
  });

  const confirmar_eliminar = (id_programa: number): void => {
    void Swal.fire({
      // title: "Estas seguro?",
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn',
      },
      width: 350,
      text: '¿Estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0EC32C',
      cancelButtonColor: '#DE1616',
      confirmButtonText: 'Si, elminar!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminar_id(id_programa, 'eliminar/programa');
          void fetch_data_programas();
          control_success('El programa se eliminó correctamente');
        } catch (error: any) {
          control_error(
            error.response.data.detail ||
              'hubo un error al eliminar, intenta de nuevo'
          );
        }
      }
    });
  };

  return (
    <>
      <form
        onSubmit={(form) => {
          if (
            is_agregar_programa ||
            is_agregar_actividad ||
            is_agregar_proyecto
          ) {
            void on_submit(form);
          }
          if (is_editar_programa) {
            void on_submit_editar(form);
          }
          if (is_editar_actividad) {
            void on_submit_editar_actividad(form);
          }
          if (is_editar_proyecto) {
            void on_submit_editar_proyecto(form);
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
          {is_general && (
            <>
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
                      set_id_programa(null);
                      set_mode('register_programa');
                    }}
                  >
                    Agregar programa
                  </LoadingButton>
                </Grid>
              </Grid>
              {is_agregar_programa && (
                <>
                  <AgregarPrograma />
                </>
              )}
              {is_editar_programa && (
                <>
                  <EditarPrograma/>
                </>
              )}
              {is_seleccionar_programa && (
                <>
                  <SeleccionarPrograma/>
                </>
              )}
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </>
          )}
          {is_consulta && (
            <>
              <ConsultaPorh />{' '}
            </>
          )}

          <Grid item spacing={2} justifyContent="end" container>
            <BusquedaAvanzada />
            <Grid item>
              <ButtonSalir />
            </Grid>
            {is_general && (
              <Grid item>
                <LoadingButton
                  variant="contained"
                  color="success"
                  type="submit"
                  disabled={Object.keys(errors).length > 0}
                >
                  Finalizar
                </LoadingButton>
              </Grid>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
};
