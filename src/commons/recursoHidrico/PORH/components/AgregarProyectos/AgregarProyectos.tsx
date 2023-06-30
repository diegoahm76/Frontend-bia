/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
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

interface IProps {
  fecha_inicial_programa: Date | null; // Fecha de inicio del programa
  fecha_fin_programa: Date | null; // Fecha de finalización del programa
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarProyectos: React.FC<IProps> = ({
  fecha_inicial_programa,
  fecha_fin_programa,
}: IProps) => {
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
                setEditRowProyectos(params.row);
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
            <IconButton onClick={() => {}}>
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
                setProyectoSeleccionado(params.row);
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
                setEditRowActividades(params.row);
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
            <IconButton onClick={() => {}}>
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
    set_rows_proyectos_register,
    set_rows_actividades_register,
  } = useContext(DataContext);

  const [is_agregar, set_is_agregar] = useState(false);
  const [edit_row_proyectos, setEditRowProyectos] = useState<any>(null);
  const [edit_row_actividades, setEditRowActividades] = useState<any>(null);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<any>(null);
  const [start_date, set_start_date] = useState<Dayjs | null>(null);
  const [end_date, set_end_date] = useState<Dayjs | null>(null);

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

    const new_subseccion = {
      id: uuidv4(),
      id_proyecto: id_proyecto as number,
      nombre,
      vigencia_inicial,
      vigencia_final,
      inversion,
      actividades: [],
    };

    if (edit_row_proyectos) {
      const proyectosActualizados = rows_proyectos_register.map((proyecto) => {
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
      set_rows_proyectos_register(proyectosActualizados);
      setEditRowProyectos(null);
    } else {
      set_rows_proyectos_register([...rows_proyectos_register, new_subseccion]);
    }
    limpiar_proyecto();
  };

  const handle_aceptar_actividad = (): void => {
    setEditRowActividades(null);
    const descripcion = watch('descripcion');
    const new_actividad = {
      id_act: uuidv4(),
      nombre: descripcion,
    };
    if (edit_row_actividades) {
      const proyectosActualizados = rows_proyectos_register.map((proyecto) => {
        if (proyecto.id === proyectoSeleccionado.id) {
          const actividadesActualizadas = proyecto.actividades
            ? proyecto.actividades.map((actividad) =>
                actividad.id_act === edit_row_actividades.id_act
                  ? { ...actividad, nombre: descripcion }
                  : actividad
              )
            : [];
          return { ...proyecto, actividades: actividadesActualizadas };
        }
        return proyecto;
      });
      set_rows_proyectos_register(proyectosActualizados);
      setProyectoSeleccionado(
        proyectosActualizados.find((p) => p.id === proyectoSeleccionado.id)
      );
    } else {
      if (proyectoSeleccionado) {
        const proyectosActualizados = rows_proyectos_register.map(
          (proyecto) => {
            if (proyecto.id === proyectoSeleccionado.id) {
              const actividadesActualizadas = [
                ...(proyecto.actividades ?? []),
                new_actividad,
              ];
              return { ...proyecto, actividades: actividadesActualizadas };
            }
            return proyecto;
          }
        );
        set_rows_proyectos_register(proyectosActualizados);
        setProyectoSeleccionado(
          proyectosActualizados.find((p) => p.id === proyectoSeleccionado.id)
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

  const inversion_value: number = watch('inversion');
  const is_form_valid =
    !errors.nombre &&
    !errors.vigencia_inicial &&
    !errors.vigencia_final &&
    !errors.inversion &&
    watch('nombre') &&
    start_date &&
    end_date &&
    inversion_value;

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

  useEffect(() => {
    console.log(proyectoSeleccionado, 'proyectoSeleccionado');
  }, [proyectoSeleccionado]);

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
          required
          {...register('nombre', { required: true })}
          error={Boolean(errors.nombre)}
          helperText={
            errors.nombre?.type === 'required'
              ? 'Este campo es obligatorio'
              : ''
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
          <DatePicker
            label="Fecha Inicial"
            inputFormat="YYYY/MM/DD"
            openTo="day"
            views={['year', 'month', 'day']}
            value={start_date}
            onChange={handle_start_date_change}
            renderInput={(params) => (
              <TextField
                required
                fullWidth
                size="small"
                {...params}
                {...register('vigencia_inicial', { required: true })}
                error={(errors.vigencia_inicial)}
                helperText={
                  errors.vigencia_inicial?.type === 'required'
                    ? 'Este campo es obligatorio'
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
            label="Fecha Final"
            inputFormat="YYYY/MM/DD"
            openTo="day"
            views={['year', 'month', 'day']}
            value={end_date}
            onChange={handle_end_date_change}
            renderInput={(params) => (
              <TextField
                required
                fullWidth
                size="small"
                {...params}
                {...register('vigencia_final', { required: true })}
                error={Boolean(errors.vigencia_final)}
                helperText={
                  errors.vigencia_final?.type === 'required'
                    ? 'Este campo es obligatorio'
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
          required
          autoFocus
          type="number"
          {...register('inversion', { required: true, min: 0 })}
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
            Aceptar
          </LoadingButton>
        </Grid>
      </Grid>
      {is_agregar && (
        <>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Descripción de la actividad
            </Typography>
            {/* {rows_actividades_register.length > 0 && (
              <Grid item xs={12}>
                <DataGrid
                  autoHeight
                  rows={rows_actividades_register}
                  columns={columns_actividades}
                  getRowId={(row) => row.id_act? row.id_act : uuidv4()}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </Grid>
            )} */}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descripción de la actividad"
              fullWidth
              size="small"
              margin="dense"
              required
              autoFocus
              multiline
              {...register('descripcion', { required: true })}
              error={Boolean(errors.descripcion)}
              helperText={
                errors.descripcion?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
            />
          </Grid>
          {proyectoSeleccionado &&
            proyectoSeleccionado.actividades.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Actividades del proyecto
                </Typography>
                <DataGrid
                  autoHeight
                  rows={proyectoSeleccionado.actividades}
                  columns={columns_actividades}
                  getRowId={(row) => (row.id_act ? row.id_act : uuidv4())}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </Grid>
            )}

          <Grid item spacing={2} justifyContent="end" container>
            <Grid item>
              <LoadingButton
                variant="outlined"
                color="primary"
                onClick={() => {
                  handle_aceptar_actividad();
                }}
                disabled={false}
              >
                Aceptar
              </LoadingButton>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
