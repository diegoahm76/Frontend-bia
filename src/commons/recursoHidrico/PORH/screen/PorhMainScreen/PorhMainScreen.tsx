/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { AgregarPrograma } from '../../components/AgregarNuevoPrograma/AgregarPrograma';
import { useContext, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { Avatar, ButtonGroup, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { DataContext } from '../../context/contextData';
import {
  editar_activdad,
  editar_programa,
  editar_proyecto,
  eliminar_id,
  post_actividades,
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
import { BusquedaPorh } from '../../components/BusquedaPorh/BusquedaPorh';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PorhMainScreen: React.FC = () => {
  const {
    reset,
    handleSubmit: handle_submit,
    errors,
    rows_programas,
    // rows_proyectos,
    rows_actividades_register,
    rows_proyectos_register,
    is_agregar_programa,
    is_editar_programa,
    is_seleccionar_programa,
    is_agregar_actividad,
    // is_seleccionar_actividad,
    is_agregar_proyecto,
    is_seleccionar_proyecto,
    is_editar_actividad,
    is_editar_proyecto,
    id_actividad,
    id_proyecto,
    is_general,
    is_consulta,
    id_programa,
    id_instrumento,
    info_instrumento,
    set_id_programa,
    fetch_data_actividades,
    fetch_data_proyectos,
    fetch_data_programas,
    set_mode,
    reset_form_agregar_programa,
    set_data_programa,
    set_rows_proyectos_register,
    set_rows_actividades_register,
    set_is_saving,
  } = useContext(DataContext);

  const columns: GridColDef[] = [
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
      width: 250, valueFormatter: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
        return formattedDate;
      },

    },
    {
      field: 'fecha_fin',
      headerName: 'FECHA FIN',
      sortable: true,
      width: 250, valueFormatter: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
        return formattedDate;
      },

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
                      titleAccess="Editar Programa"
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
                      titleAccess="Eliminar Programa"
                      sx={{
                        color: 'red',
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
                  titleAccess="Seleccionar Programa"
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
    if (id_instrumento) {
      void fetch_data_programas();
    }
  }, [id_instrumento]);

  const on_submit = handle_submit(async (form: any) => {
    try {
      set_is_saving(true);
      form.id_instrumento = id_instrumento;
      form.id_programa = id_programa;
      form.id_proyecto = id_proyecto;
      await post_programa(form, rows_proyectos_register);
      reset_form_agregar_programa();
      reset();
      set_mode('register_programa');
      control_success('Se creó correctamente');
      set_is_saving(false);
      await fetch_data_programas();
      await fetch_data_proyectos();
      await fetch_data_actividades();
      set_rows_proyectos_register([]);
    } catch (error: any) {
      set_is_saving(false);
      if (
        error.response.data.detail ===
        'Error: Los campos id_instrumento, nombre deben formar un conjunto único.'
      ) {
        // Manejo del error específico
        control_error('El nombre del programa ya existe');
        // Otras acciones que desees realizar en caso de este error
      } else {
        // Manejo de otros errores
        control_error(error.response.data.detail);
      }
      set_is_saving(false);
    }
  });
  const on_submit_actividades = handle_submit(async (form: any) => {
    //  console.log('')('hi, from onSubmit actividades');
    try {
      set_is_saving(true);
      form.id_instrumento = id_instrumento;
      form.id_programa = id_programa;
      form.id_proyecto = id_proyecto;
      await post_actividades(form, rows_actividades_register);
      set_rows_actividades_register([]);
      control_success('Se creó correctamente');
      set_is_saving(false);
      await fetch_data_programas();
      await fetch_data_proyectos();
      await fetch_data_actividades();
    } catch (error: any) {
      set_is_saving(false);
      control_error(error.response.data.detail);
    }
  });

  const on_submit_editar = handle_submit(async (form: any) => {
    //  console.log('')('hi, from onSubmit edit');
    try {
      set_is_saving(true);
      form.id_instrumento = id_instrumento; 
      //  console.log('')(id_instrumento, 'id_instrumento');
      await editar_programa(id_programa as number, form);
      control_success('Se editó correctamente');
      set_is_saving(false);
      await fetch_data_programas();
    } catch (error: any) {
      set_is_saving(false);
      control_error(
        error.response.data.detail ||
          'hubo un error al editar, intenta de nuevo'
      );
    }
  });
  const on_submit_editar_proyecto = handle_submit(async (form: any) => {
    try {
      set_is_saving(true);
      await editar_proyecto(id_proyecto as number, form);
      control_success('Se editó el proyecto correctamente');
      set_is_saving(false);
      await fetch_data_proyectos();
    } catch (error: any) {
      set_is_saving(false);
      control_error(
        error.response.data.detail ||
          'hubo un error al editar, intenta de nuevo'
      );
    }
  });
  const on_submit_editar_actividad = handle_submit(async (form: any) => {
    try {
      set_is_saving(true);
      await editar_activdad(id_actividad as number, form);
      control_success('Se editó la actividad correctamente');
      set_is_saving(false);
      await fetch_data_actividades();
    } catch (error: any) {
      set_is_saving(false);
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
      text: '¿Estás seguro?',
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
          form.preventDefault();
          //  console.log('')(errors, 'errors');
          if (is_seleccionar_proyecto && is_agregar_actividad) {
            return on_submit_actividades(form);
          }
          if (is_agregar_programa || is_agregar_proyecto) {
            return on_submit(form);
          }
          if (is_editar_programa) {
            return on_submit_editar(form);
          }
          if (is_editar_actividad) {
            return on_submit_editar_actividad(form);
          }
          if (is_editar_proyecto) {
            return on_submit_editar_proyecto(form);
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
            <Title title="Contenido programático plan de ordenamiento de recursos hídrico" />
          </Grid>
          <BusquedaPorh />
          {is_general && (
            <>
              {info_instrumento && rows_programas.length > 0 && (
                <>
                  <Grid item xs={12}>
                    <Title title=" Programas" />
                    {/* <Typography variant="subtitle1" fontWeight="bold">
                      Programas
                    </Typography> */}
                    <Divider />
                    <ButtonGroup
                      style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
                    >
                      {download_xls({ nurseries: rows_programas, columns })}
                      {download_pdf({ nurseries: rows_programas, columns, title: 'Programas' })}
                    </ButtonGroup> 
                  </Grid>
                  <Grid item xs={12}>
                    <DataGrid
                      autoHeight
                      rows={rows_programas}
                      columns={columns}
                      getRowId={(row) => row.id_programa}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                    />
                  </Grid>
                </>
              )}
              {id_instrumento && (
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
              )}
              {is_agregar_programa && (
                <>
                  <AgregarPrograma />
                </>
              )}
              {is_editar_programa && (
                <>
                  <EditarPrograma />
                </>
              )}
              {is_seleccionar_programa && (
                <>
                  <SeleccionarPrograma />
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
            {/* {is_agre && (
              <Grid item>
                <LoadingButton
                  variant="contained"
                  color="success"
                  type="submit"
                  disabled={is_saving}
                  loading={is_saving}
                >
                  Finalizar
                </LoadingButton>
              </Grid>
            )} */}
          </Grid>
        </Grid>
      </form>
    </>
  );
};
