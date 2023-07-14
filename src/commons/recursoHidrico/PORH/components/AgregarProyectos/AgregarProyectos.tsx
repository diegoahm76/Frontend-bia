/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { Avatar, IconButton, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import esLocale from 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataContext } from '../../context/contextData';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import dayjs, { type Dayjs } from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarProyectos: React.FC = () => {
  const columns_proyectos: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'NOMBRE',
      sortable: true,
      width: 250,
    },
    {
      field: 'vigencia_inicial',
      headerName: 'VIGENCIA INICIAL',
      sortable: true,
      width: 250,
    },
    {
      field: 'vigencia_final',
      headerName: 'VIGENCIA FINAL',
      sortable: true,
      width: 250,
    },
    {
      field: 'inversion',
      headerName: 'INVERSIÓN',
      sortable: true,
      width: 250,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params: any) => {
        return (
          <>
            <IconButton
              onClick={() => {
                set_edit_row_proyectos(params.row);
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
                  titleAccess="Editar Proyecto"
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
                handle_eliminar_proyecto(params.row.id);
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
                  titleAccess="Eliminar Proyecto"
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
                set_is_agregar(true);
                set_proyecto_seleccionado(params.row);
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
                <AddIcon
                  titleAccess="Agregar Actividad"
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
  const columns_actividades: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'DESCRIPCIÓN',
      sortable: true,
      width: 300,
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
                handle_eliminar_actividad(params.row.id_act);
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
                  titleAccess="Eliminar Actividad"
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </>
        );
      },
    },
  ];

  const {
    register,
    watch,
    setValue: set_value,
    errors,
    rows_proyectos_register,
    rows_actividades_register,
    id_proyecto,
    rows_proyectos,
    fecha_inicial,
    fecha_fin,
    is_saving,
    set_rows_proyectos_register,
    set_rows_actividades_register,
  } = useContext(DataContext);

  const [is_agregar, set_is_agregar] = useState(false);
  const [edit_row_proyectos, set_edit_row_proyectos] = useState<any>(null);
  const [edit_row_actividades, set_edit_row_actividades] = useState<any>(null);
  const [proyecto_seleccionado, set_proyecto_seleccionado] =
    useState<any>(null);
  const [start_date, set_start_date] = useState<Dayjs | null>(null);
  const [end_date, set_end_date] = useState<Dayjs | null>(null);
  const [is_descripcion_vacia, set_descripcion_vacia] = useState(true);

  const is_vigencias_valid =
    start_date && end_date && fecha_inicial && fecha_fin
      ? start_date.isSameOrAfter(fecha_inicial) &&
        end_date.isSameOrBefore(fecha_fin)
      : false;

  const is_nombre_valid = watch('nombre') !== '';
  const is_descripcion_valid = watch('descripcion') !== '';

  const is_vigencia_final_valid =
    start_date && end_date ? end_date.isAfter(start_date) : false;

  const is_nombre_repetido =
    !edit_row_proyectos &&
    rows_proyectos_register.some(
      (proyecto) => proyecto.nombre === watch('nombre')
    );

  const is_nombre_repetido_table = rows_proyectos.some(
    (proyecto) => proyecto.nombre === watch('nombre')
  );

  const is_descripcion_repetido =
    !edit_row_actividades &&
    rows_actividades_register.some(
      (actividad) => actividad.nombre === watch('descripcion')
    );

  const inversion_value: number = watch('inversion');
  const is_form_valid =
    !errors.nombre &&
    !errors.vigencia_inicial &&
    !errors.vigencia_final &&
    !errors.inversion &&
    watch('nombre') &&
    start_date &&
    end_date &&
    is_vigencias_valid &&
    is_nombre_valid &&
    is_vigencia_final_valid &&
    !is_nombre_repetido &&
    !is_nombre_repetido_table &&
    inversion_value;

  const handle_descripcion_change = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const descripcion = event.target.value;
    set_value('descripcion', descripcion);
    set_descripcion_vacia(descripcion === '');
  };
  const is_form_valid_act =
    !errors.descripcion &&
    watch('descripcion') &&
    is_descripcion_valid &&
    !is_descripcion_repetido;

  const handle_start_date_change = (date: Dayjs | null): void => {
    set_value('vigencia_inicial', dayjs(date));
    set_start_date(dayjs(date));
  };

  const handle_end_date_change = (date: Dayjs | null): void => {
    set_value('vigencia_final', dayjs(date));
    set_end_date(dayjs(date));
  };

  const handle_aceptar = (): void => {
    const nombre = watch('nombre');
    const vigencia_inicial = dayjs(watch('vigencia_inicial')).format(
      'YYYY-MM-DD'
    );
    const vigencia_final = dayjs(watch('vigencia_final')).format('YYYY-MM-DD');
    const inversion = watch('inversion');

    const new_project = {
      id: uuidv4(),
      id_proyecto: id_proyecto as number,
      nombre,
      vigencia_inicial,
      vigencia_final,
      inversion,
      actividades: [],
    };

    if (edit_row_proyectos) {
      const proyectos_actualizados = rows_proyectos_register.map((proyecto) => {
        if (proyecto.id === edit_row_proyectos.id) {
          return {
            ...proyecto,
            nombre,
            vigencia_inicial,
            vigencia_final,
            inversion,
          };
        }
        return proyecto;
      });
      set_rows_proyectos_register(proyectos_actualizados);
      set_edit_row_proyectos(null);
    } else {
      set_rows_proyectos_register([...rows_proyectos_register, new_project]);
    }
    limpiar_proyecto();
  };

  const handle_aceptar_actividad = (): void => {
    set_edit_row_actividades(null);
    const descripcion = watch('descripcion');
    const new_actividad = {
      id_act: uuidv4(),
      nombre: descripcion,
    };
    if (edit_row_actividades) {
      const proyectos_actualizados = rows_proyectos_register.map((proyecto) => {
        if (proyecto.id === proyecto_seleccionado.id) {
          const actividades_ctualizadas = proyecto.actividades
            ? proyecto.actividades.map((actividad) =>
                actividad.id_act === edit_row_actividades.id_act
                  ? { ...actividad, nombre: descripcion }
                  : actividad
              )
            : [];
          return { ...proyecto, actividades: actividades_ctualizadas };
        }
        return proyecto;
      });
      set_rows_proyectos_register(proyectos_actualizados);
      set_proyecto_seleccionado(
        proyectos_actualizados.find((p) => p.id === proyecto_seleccionado.id)
      );
    } else {
      if (proyecto_seleccionado) {
        const proyectos_actualizados = rows_proyectos_register.map(
          (proyecto) => {
            if (proyecto.id === proyecto_seleccionado.id) {
              const actividades_ctualizadas = [
                ...(proyecto.actividades ?? []),
                new_actividad,
              ];
              return { ...proyecto, actividades: actividades_ctualizadas };
            }
            return proyecto;
          }
        );
        set_rows_proyectos_register(proyectos_actualizados);
        set_proyecto_seleccionado(
          proyectos_actualizados.find((p) => p.id === proyecto_seleccionado.id)
        );
      } else {
        set_rows_actividades_register([
          ...rows_actividades_register,
          new_actividad,
        ]);
      }
    }
    limpiar_actividad();
  };
  const handle_eliminar_proyecto = (proyecto_id: string): void => {
    const proyectos_actualizados = rows_proyectos_register.filter(
      (proyecto) => proyecto.id !== proyecto_id
    );
    set_rows_proyectos_register(proyectos_actualizados);
  };

  const handle_eliminar_actividad = (actividad_id: string): void => {
    if (proyecto_seleccionado) {
      const proyectos_actualizados = rows_proyectos_register.map((proyecto) => {
        if (proyecto.id === proyecto_seleccionado.id) {
          const actividades_actualizadas = proyecto.actividades
            ? proyecto.actividades.filter(
                (actividad) => actividad.id_act !== actividad_id
              )
            : [];
          return { ...proyecto, actividades: actividades_actualizadas };
        }
        return proyecto;
      });
      set_rows_proyectos_register(proyectos_actualizados);
      set_proyecto_seleccionado(
        proyectos_actualizados.find((p) => p.id === proyecto_seleccionado.id)
      );
    } else {
      const actividades_actualizadas = rows_actividades_register.filter(
        (actividad) => actividad.id_act !== actividad_id
      );
      set_rows_actividades_register(actividades_actualizadas);
    }
  };

  const limpiar_proyecto = (): void => {
    set_value('nombre', '');
    set_value('vigencia_inicial', '');
    set_value('vigencia_final', '');
    set_value('inversion', '');
    set_start_date(null);
    set_end_date(null);
  };
  const limpiar_actividad = (): void => {
    set_value('descripcion', '');
  };

  useEffect(() => {
    if (edit_row_proyectos) {
      set_value('nombre', edit_row_proyectos.nombre);
      set_value(' vigencia_inicial', edit_row_proyectos.vigencia_inicial);
      set_value('vigencia_final', edit_row_proyectos.vigencia_final);
      set_value('inversion', edit_row_proyectos.inversion);
      set_start_date(dayjs(edit_row_proyectos.vigencia_inicial));
      set_end_date(dayjs(edit_row_proyectos.vigencia_final));
    }
  }, [edit_row_proyectos]);

  useEffect(() => {
    if (edit_row_actividades) {
      set_value('descripcion', edit_row_actividades.nombre);
    }
  }, [edit_row_actividades]);

  return (
    <>
      <Grid item xs={12}>
        <Title title="INFORMACIÓN DE PROYECTO" />
      </Grid>
      {rows_proyectos_register.length > 0 && (
        <Grid item xs={12}>
          <DataGrid
            autoHeight
            rows={rows_proyectos_register}
            columns={columns_proyectos}
            getRowId={(row) => {
              if (row.id) return row.id;
              if (row.id_proyecto) return row.id_proyecto;
              return uuidv4();
            }}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Grid>
      )}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Nombre del proyecto"
          fullWidth
          size="small"
          margin="dense"
          required={rows_proyectos_register.length === 0}
          {...register('nombre', {
            required: rows_proyectos_register.length === 0,
          })}
          error={
            !is_nombre_valid || is_nombre_repetido || is_nombre_repetido_table
          }
          helperText={
            !is_nombre_valid
              ? 'Este campo es obligatorio'
              : is_nombre_repetido
              ? 'El nombre del proyecto ya existe'
              : is_nombre_repetido_table
              ? 'El nombre del proyecto ya existe'
              : ''
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
          <DatePicker
            label="Vigencia Inicial"
            inputFormat="YYYY/MM/DD"
            openTo="day"
            views={['year', 'month', 'day']}
            value={start_date}
            onChange={handle_start_date_change}
            renderInput={(params) => (
              <TextField
                required={rows_proyectos_register.length === 0}
                fullWidth
                size="small"
                {...params}
                {...register('vigencia_inicial', {
                  required: rows_proyectos_register.length === 0,
                })}
                error={!is_vigencias_valid}
                helperText={
                  !is_vigencias_valid
                    ? 'La vigencia debe estar dentro del rango del programa'
                    : ''
                }
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
          <DatePicker
            label="Vigencia Final"
            inputFormat="YYYY/MM/DD"
            openTo="day"
            views={['year', 'month', 'day']}
            value={end_date}
            onChange={handle_end_date_change}
            renderInput={(params) => (
              <TextField
                required={rows_proyectos_register.length === 0}
                fullWidth
                size="small"
                {...params}
                {...register('vigencia_final', {
                  required: rows_proyectos_register.length === 0,
                })}
                error={!is_vigencias_valid || !is_vigencia_final_valid}
                helperText={
                  !is_vigencias_valid
                    ? 'La vigencia debe estar dentro del rango del programa'
                    : !is_vigencia_final_valid
                    ? 'La fecha final debe ser superior a la fecha inicial'
                    : ''
                }
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
          required={rows_proyectos_register.length === 0}
          autoFocus
          type="number"
          {...register('inversion', {
            required: rows_proyectos_register.length === 0,
            min: 0,
          })}
          error={Boolean(errors.inversion)}
          helperText={
            errors.inversion?.type === 'required'
              ? 'Este campo es obligatorio'
              : errors.inversion?.type === 'min'
              ? 'El valor no puede ser negativo'
              : ''
          }
        />
      </Grid>
      <Grid item spacing={2} justifyContent="end" container>
        <Grid item>
          <LoadingButton
            variant="outlined"
            color="primary"
            onClick={() => {
              handle_aceptar();
            }}
            disabled={!is_form_valid}
          >
            Aceptar Proyecto
          </LoadingButton>
        </Grid>
        {!is_agregar && (
          <Grid item>
            <LoadingButton
              variant="contained"
              color="success"
              type="submit"
              disabled={is_saving || rows_proyectos_register.length === 0}
              loading={is_saving}
            >
              Guardar
            </LoadingButton>
          </Grid>
        )}
      </Grid>
      {is_agregar && (
        <>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Descripción de la actividad
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descripción"
              fullWidth
              size="small"
              margin="dense"
              required={proyecto_seleccionado.actividades.length === 0}
              {...register('descripcion', {
                required: proyecto_seleccionado.actividades.length === 0,
              })}
              error={!is_descripcion_valid || is_descripcion_repetido}
              helperText={
                !is_descripcion_valid
                  ? 'Este campo es obligatorio'
                  : is_descripcion_repetido
                  ? 'La descripción ya existe'
                  : ''
              }
              onChange={handle_descripcion_change}
              multiline
              rows={3}
            />
          </Grid>
          {proyecto_seleccionado &&
            proyecto_seleccionado.actividades.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Actividades del proyecto
                </Typography>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={proyecto_seleccionado.actividades}
                  columns={columns_actividades}
                  getRowId={(row) => (row.id_act ? row.id_act : uuidv4())}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  experimentalFeatures={{ newEditingApi: true }}
                />
              </Grid>
            )}

          <Grid item spacing={2} justifyContent="end" container>
            <Grid item>
              <LoadingButton
                variant="outlined"
                color="primary"
                disabled={!is_form_valid_act || is_descripcion_vacia}
                onClick={() => {
                  handle_aceptar_actividad();
                }}
              >
                Aceptar Actividad
              </LoadingButton>
            </Grid>
            <Grid item>
              <LoadingButton
                variant="contained"
                color="success"
                type="submit"
                disabled={is_saving || proyecto_seleccionado.actividades.length === 0}
                loading={is_saving}
              >
                Guardar
              </LoadingButton>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
