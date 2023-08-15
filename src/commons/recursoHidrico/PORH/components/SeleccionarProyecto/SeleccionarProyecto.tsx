/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import {
  Avatar,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import esLocale from 'dayjs/locale/es';
// import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { DataContext } from '../../context/contextData';
import ChecklistIcon from '@mui/icons-material/Checklist';
import Swal from 'sweetalert2';
import { control_success } from '../../../requets/Request';
import { eliminar_id } from '../../Request/request';
import { control_error } from '../../../../../helpers';
import dayjs, { type Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
  data: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeleccionarProyecto: React.FC<IProps> = ({ data }: IProps) => {
  const {
    is_saving,
    rows_actividades,
    rows_actividades_register,
    is_agregar_actividad,
    is_editar_actividad,
    is_seleccionar_actividad,
    register,
    watch,
    setValue: set_value,
    data_actividad,
    set_data_actividad,
    set_id_actividad,
    fetch_data_actividades,
    set_mode,
    set_rows_actividades_register,
  } = useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'DESCRIPCIÓN',
      sortable: true,
      width: 300,
    },
    {
      field: 'fecha_registro',
      headerName: 'FECHA REGISTRO',
      sortable: true,
      width: 250,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              onClick={() => {
                // set_id_programa(params.row.id_programa as number);
                set_data_actividad(params.row);
                set_id_actividad(params.row.id_actividades as number);
                set_mode('editar_actividad');
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
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
            <IconButton
              onClick={() => {
                confirmar_eliminar(params.row.id_actividades as number);
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
                  sx={{ color: 'red', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
            <IconButton
              onClick={() => {
                set_data_actividad(params.row);
                set_id_actividad(params.row.id_actividades as number);
                set_mode('select_actividad');
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
  const columns_register: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'DESCRIPCIÓN',
      sortable: true,
      width: 300,
    },
    {
      field: 'fecha_actual',
      headerName: 'FECHA DE REGISTRO',
      width: 200,
      renderCell: () => {
        const fechaActual = new Date().toLocaleDateString();
        return <span>{fechaActual}</span>;
      },
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              onClick={() => {
                set_edit_row_actividades(params.row);
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
                  titleAccess="Editar Actividad"
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
            <IconButton
              onClick={() => {
                handle_eliminar(params.row);
              }}
            >
              {' '}
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
                  titleAccess="Eliminar Actividad"
                  sx={{ color: 'red', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    void fetch_data_actividades();
  }, [data]);

  const descripcion = watch('descripcion');
  const [edit_row_actividades, set_edit_row_actividades] = useState<any>(null);

  useEffect(() => {
    if (edit_row_actividades) {
      set_value('descripcion', edit_row_actividades.nombre);
    }
  }, [edit_row_actividades]);

  useEffect(() => {
    if (data) {
      set_start_date(dayjs(data?.vigencia_inicial));
      set_value('nombre', data?.nombre);
      set_value('inversion', data?.inversion);
      set_value('vigencia_final', data?.vigencia_final);
      set_value('vigencia_inicial', data?.vigencia_inicial);
      set_end_date(dayjs(data?.vigencia_final));
    }
  }, [data]);

  useEffect(() => {
    if (data_actividad) {
      set_value('descripcion', data_actividad?.nombre);
    }
  }, [data_actividad]);

  // fechas
  const [start_date, set_start_date] = useState<Dayjs | null>(null);
  const [end_date, set_end_date] = useState<Dayjs | null>(null);

  const handle_start_date_change = (date: Dayjs | null): void => {
    set_value('vigencia_inicial', date);
    set_start_date(dayjs(date));
  };

  const handle_end_date_change = (date: Dayjs | null): void => {
    set_value('vigencia_final', date);
    set_end_date(dayjs(date));
  };
  const confirmar_eliminar = (id_actividad: number): void => {
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
          await eliminar_id(id_actividad, 'eliminar/actividad');
          void fetch_data_actividades();
          control_success('La actividad se eliminó correctamente');
        } catch (error: any) {
          control_error(
            error.response.data.detail ||
              'hubo un error al eliminar, intenta de nuevo'
          );
        }
      }
    });
  };
  const handle_aceptar_actividad = (): void => {
    set_edit_row_actividades(null);
    const descripcion = watch('descripcion');
    const new_actividad = {
      id_act: uuidv4(),
      nombre: descripcion,
    };
    if (edit_row_actividades) {
      const new_actividades = rows_actividades_register.map(
        (acticvidades: any) => {
          if (acticvidades.id_act === edit_row_actividades.id_act) {
            return {
              ...acticvidades,
              nombre: descripcion,
            };
          }
          return acticvidades;
        }
      );
      set_rows_actividades_register(new_actividades);
    } else {
      set_rows_actividades_register([
        ...rows_actividades_register,
        new_actividad,
      ]);
    }
    limpiar_act();
  };
  const handle_eliminar = (row: any): void => {
    const updated_rows = rows_actividades_register.filter(
      (r) => r.id_act !== row.id_act
    );
    set_rows_actividades_register(updated_rows);
  };

  // const limpiar_todo = (): void => {
  //   set_value('descripcion', '');
  //   set_value('vigencia_inicial', '');
  //   set_value('vigencia_final', '');
  //   set_start_date(null);
  //   set_end_date(null);
  // }
  const limpiar_act = (): void => {
    set_value('descripcion', '');
  };

  return (
    <>
      <Grid item xs={12}>
        <Title title="INFORMACIÓN DE PROYECTO" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Nombre del proyecto"
          fullWidth
          size="small"
          margin="dense"
          value={data.nombre}
          autoFocus
          disabled
          {...register('nombre')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
          <DatePicker
            label="Fecha Inical"
            inputFormat="YYYY/MM/DD"
            openTo="day"
            views={['year', 'month', 'day']}
            value={start_date}
            disabled
            onChange={handle_start_date_change}
            renderInput={(params) => (
              <TextField
                fullWidth
                disabled
                size="small"
                {...params}
                {...register('vigencia_inicial')}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
          <DatePicker
            label="Fecha Final"
            inputFormat="YYYY/MM/DD"
            openTo="day"
            views={['year', 'month', 'day']}
            value={end_date}
            disabled
            onChange={handle_end_date_change}
            renderInput={(params) => (
              <TextField
                fullWidth
                disabled
                size="small"
                {...params}
                {...register('vigencia_final')}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Inversión total"
          fullWidth
          size="small"
          margin="dense"
          autoFocus
          value={data.inversion}
          type="text"
          disabled
          {...register('inversion')}
        />
      </Grid>
      {rows_actividades.length > 0 && (
        <>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Actividades
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <DataGrid
              density="compact"
              autoHeight
              rows={rows_actividades}
              columns={columns}
              getRowId={(row) => row.id_actividades}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </Grid>
        </>
      )}
      {!is_editar_actividad && (
        <>
          <Grid item spacing={2} justifyContent="end" container>
            <Grid item>
              <LoadingButton
                variant="outlined"
                onClick={() => {
                  set_mode('register_actividad');
                  // limpiar_act();
                }}
              >
                Agregar Nueva Actividad
              </LoadingButton>
            </Grid>
          </Grid>
        </>
      )}
      {is_agregar_actividad ||
      is_seleccionar_actividad ||
      is_editar_actividad ? (
        <>
          {rows_actividades_register.length > 0 && (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Actividades
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_actividades_register}
                  columns={columns_register}
                  getRowId={(row) => row.id_act}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                />
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Descripción de la actividad
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descripción de la actividad"
              fullWidth
              size="small"
              margin="dense"
              disabled={is_seleccionar_actividad}
              value={descripcion}
              required={!(rows_actividades_register.length > 0)}
              autoFocus
              multiline
              rows={3}
              {...register('descripcion', {
                required: !(rows_actividades_register.length > 0),
              })}
            />
          </Grid>
          <Grid item spacing={2} justifyContent="end" container>
            <Grid item>
              <LoadingButton
                variant="outlined"
                color="primary"
                onClick={() => {
                  handle_aceptar_actividad();
                }}
                disabled={is_seleccionar_actividad || is_editar_actividad}
              >
                Aceptar
              </LoadingButton>
            </Grid>
            {is_editar_actividad && (
              <>
                <Grid item>
                  <LoadingButton
                    variant="contained"
                    color="success"
                    type="submit"
                    disabled={is_saving}
                    loading={is_saving}
                  >
                    Actualizar
                  </LoadingButton>
                </Grid>
              </>
            )}
            {is_agregar_actividad && (
              <>
                <Grid item>
                  <LoadingButton
                    variant="contained"
                    color="success"
                    type="submit"
                    disabled={
                      is_saving || rows_actividades_register.length === 0
                    }
                    loading={is_saving}
                  >
                    Guardar
                  </LoadingButton>
                </Grid>
              </>
            )}
          </Grid>
        </>
      ) : null}
    </>
  );
};
