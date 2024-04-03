/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Autocomplete,
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LoadingButton } from '@mui/lab';
import { AgregarArchivo } from '../../../../../utils/AgregarArchivo/AgregarArchivo';
import { Controller } from 'react-hook-form';
import { control_error, control_success } from '../../../../../helpers';
import { editar_instrumento } from '../../request/request';
import dayjs from 'dayjs';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch /* useAppSelector */ } from '../../../../../hooks';
import {
  setCurrentInstrumento,
  set_current_id_cartera_aforos,
  set_current_id_prueba_bombeo,
  set_current_info_cartera,
  set_current_info_laboratorio,
  set_current_info_prueba_bombeo,
  set_current_mode,
  set_current_mode_bombeo,
  set_current_mode_cartera,
  set_currente_id_resultado_laboratorio,
} from '../../toolkit/slice/instrumentosSlice';
import { DataContext } from '../../context/contextData';
import { useRegisterInstrumentoHook } from '../RegistroInstrumentos/hook/useRegisterInstrumentoHook';
import { tipo_agua } from '../RegistroInstrumentos/choices/choices';
import { v4 as uuidv4 } from 'uuid';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { IconButtonDownLoad } from '../../../../../utils/DownloadButton/IconButtonDownLoad';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import SaveIcon from '@mui/icons-material/Save';
export const EditarInstrumento: React.FC = (): JSX.Element => {
  const columns_prueba_bombeo: GridColDef[] = [
    {
      field: 'ubicacion_prueba',
      headerName: 'LUGAR DE PRUEBA',
      sortable: true,
      width: 300,
    },
    {
      field: 'fecha_registro',
      headerName: 'FECHA DE REGISTRO',
      sortable: true,
      width: 300,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              dispatch(set_current_info_prueba_bombeo(params.row));
              dispatch(
                set_current_id_prueba_bombeo(params.row.id_prueba_bombeo)
              );
              dispatch(
                set_current_mode_bombeo({
                  ver: true,
                  crear: false,
                  editar: false,
                })
              );
              navigate('/app/recurso_hidrico/biblioteca/instrumentos/prueba_bombeo', {
                replace: true,
              });
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
              <ChecklistOutlinedIcon
                titleAccess="Seleccionar prueba de bombeo"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              dispatch(set_current_info_prueba_bombeo(params.row));
              set_current_id_prueba_bombeo(params.row.id_prueba_bombeo);
              dispatch(
                set_current_mode_bombeo({
                  ver: false,
                  crear: false,
                  editar: true,
                })
              );
              navigate('/app/recurso_hidrico/biblioteca/instrumentos/prueba_bombeo', {
                replace: true,
              });
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
                titleAccess="Editar prueba de bombeo"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];
  const columns_aforo: GridColDef[] = [
    {
      field: 'ubicacion_aforo',
      headerName: 'LUGAR DE AFORO',
      sortable: true,
      width: 300,
    },
    {
      field: 'fecha_registro',
      headerName: 'FECHA DE REGISTRO',
      sortable: true,
      width: 300,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              dispatch(set_current_info_cartera(params.row));
              dispatch(
                set_current_id_cartera_aforos(params.row.id_cartera_aforos)
              );
              dispatch(
                set_current_mode_cartera({
                  ver: true,
                  crear: false,
                  editar: false,
                })
              );
              navigate('/app/recurso_hidrico/biblioteca/instrumentos/cartera_aforo', {
                replace: true,
              });
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
              <ChecklistOutlinedIcon
                titleAccess="Seleccionar cartera de aforo"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              dispatch(set_current_info_cartera(params.row));
              dispatch(
                set_current_id_cartera_aforos(params.row.id_cartera_aforos)
              );
              dispatch(
                set_current_mode_cartera({
                  ver: false,
                  crear: false,
                  editar: true,
                })
              );
              navigate('/app/recurso_hidrico/biblioteca/instrumentos/cartera_aforo', {
                replace: true,
              });
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
              <EditIcon
                titleAccess="Editar cartera de aforo"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];
  const colums_laboratorio: GridColDef[] = [
    {
      field: 'lugar_muestra',
      headerName: 'LUGAR DE MUESTRA',
      sortable: true,
      width: 300,
    },
    {
      field: 'fecha_registro',
      headerName: 'FECHA DE REGISTRO',
      sortable: true,
      width: 300,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              dispatch(set_current_info_laboratorio(params.row));
              dispatch(
                set_currente_id_resultado_laboratorio(
                  params.row.id_resultado_laboratorio
                )
              );
              dispatch(
                set_current_mode({
                  ver: true,
                  crear: false,
                  editar: false,
                })
              );
              navigate(
                '/app/recurso_hidrico/biblioteca/instrumentos/resultado_laboratorio',
                {
                  replace: true,
                }
              );
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
              <ChecklistOutlinedIcon
                titleAccess="Seleccionar resultado de laboratorio"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              dispatch(set_current_info_laboratorio(params.row));
              dispatch(
                set_currente_id_resultado_laboratorio(
                  params.row.id_resultado_laboratorio
                )
              );
              dispatch(
                set_current_mode({
                  ver: false,
                  crear: false,
                  editar: true,
                })
              );
              navigate(
                '/app/recurso_hidrico/biblioteca/instrumentos/resultado_laboratorio',
                {
                  replace: true,
                }
              );
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
                titleAccess="Editar resultado de laboratorio"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];
  const colums_pozos: GridColDef[] = [
    {
      field: 'cod_pozo',
      headerName: 'CÓDIGO POZO',
      width: 200,
    },
    {
      field: 'nombre',
      headerName: 'NOMBRE POZO',
      width: 200,
    },
  ];
  const columns_anexos: GridColDef[] = [
    {
      field: 'nombre_archivo',
      headerName: 'NOMBRE ANEXO',
      width: 300,
    },
    {
      field: 'ruta_archivo',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => (
        <>
          <IconButtonDownLoad
            fileUrl={params.value}
            fileName={params.row.nombre}
            condition={false}
          />
          <IconButton
            onClick={() => {
              set_is_open_edit_archivos(true);
              setValue('nombre_actualizar', params.row.nombre_archivo);
              set_id_archivo(params.row.id_archivo_instrumento);
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
                titleAccess="Editar nombre de archivo"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];

  const {
    // * Editar Archivos
    is_open_edit_archivos,
    id_archivo,
    set_is_open_edit_archivos,
    set_id_archivo,

    cuenca,
    data_id_cuencas,
    id_seccion,
    id_subseccion,
    archivos,
    nombres_archivos,
    fecha_creacion,
    fecha_vigencia,
    current_date,
    tipo_agua_selected,
    is_loading_submit,
    cuenca_select,
    limpiar_archivos,
    handle_change_autocomplete_edit,
    set_fecha_creacion,
    set_fecha_vigencia,
    set_is_loading_submit,
    handle_date_change,
    fetch_data_cuencas_instrumentos_select,
    register,
    handleSubmit,
    fetch_data_cuencas,
    fetch_data_pozo,
    setValue,
    reset_instrumento,
    control,
    formErrors,
  } = useRegisterInstrumentoHook();
  const {
    nombre_subseccion,
    nombre_seccion,
    id_instrumento,
    info_busqueda_instrumentos,
    rows_edit_pozo,
    rows_cartera,
    rows_prueba_bombeo,
    rows_laboratorio,
    rows_anexos,
    fetch_data_cartera,
    fetch_data_prueba_bombeo,
    fetch_data_laboratorio,
    fetch_data_cuencas_instrumentos,
    set_rows_anexos,
    fetch_data_instrumento,
    fetch_data_pozo_id,
    fetch_data_anexos,
  } = useContext(DataContext);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      set_is_loading_submit(true);
      const nombre_archivos_set = new Set(nombres_archivos);
      if (nombre_archivos_set.size !== nombres_archivos.length) {
        control_error('No se permiten nombres de archivo duplicados');
        return;
      }
      const fecha_crea = dayjs(data.fecha_creacion_instrumento).format(
        'YYYY-MM-DDTHH:mm:ss'
      );
      const fecha_vigencia = dayjs(data.fecha_fin_vigencia).format(
        'YYYY-MM-DD'
      );
      const id_cuencas = data_id_cuencas;

      const datos_instrumento = new FormData();
      datos_instrumento.append('nombre', data.nombre);
      datos_instrumento.append('fecha_creacion_instrumento', fecha_crea);
      if (fecha_vigencia && data.fecha_fin_vigencia) {
        datos_instrumento.append('fecha_fin_vigencia', fecha_vigencia);
      }
      datos_instrumento.append('cod_tipo_agua', tipo_agua_selected);
      if (id_seccion && id_subseccion) {
        datos_instrumento.append('id_seccion', id_seccion.toString());
        datos_instrumento.append('id_subseccion', id_subseccion.toString());
      }
      if (info_busqueda_instrumentos?.id_pozo) {
        datos_instrumento.append(
          'id_pozo',
          info_busqueda_instrumentos?.id_pozo.toString()
        );
      }
      if (id_cuencas.length > 0) {
        datos_instrumento.append(
          'id_cuencas',
          JSON.stringify(id_cuencas) as any
        );
      }
      archivos.forEach((archivo: any, index: any) => {
        if (archivo != null) {
          datos_instrumento.append(`archivo`, archivo);
          datos_instrumento.append(`nombre_archivo`, nombres_archivos[index]);
        }
      });

      if (!data.nombre_actualizar && !id_archivo) {
        datos_instrumento.append(
          'nombre_actualizar',
          JSON.stringify([]) as any
        );
      } else {
        const nombre_actualizar = [
          {
            id_archivo: id_archivo as number,
            nombre_archivo: data.nombre_actualizar,
          },
        ];
        datos_instrumento.append(
          'nombre_actualizar',
          JSON.stringify(nombre_actualizar) as any
        );
      }

      await editar_instrumento(id_instrumento as number, datos_instrumento);

      dispatch(
        setCurrentInstrumento({
          nombre: data.nombre,
          nombre_seccion,
          nombre_subseccion,
        })
      );
      control_success('Se actualizó instrumento correctamente');
      set_is_loading_submit(false);
      set_is_open_edit_archivos(false);
      void fetch_data_anexos();

      const update_rows_anexos = rows_anexos.map((row) => {
        if (row.id_archivo_instrumento === id_archivo) {
          return {
            ...row,
            nombre_archivo: data.nombre_actualizar,
          };
        }
        return row;
      });
      set_rows_anexos(update_rows_anexos);
      limpiar_archivos();
    } catch (error: any) {
      set_is_loading_submit(false);
      control_error(error.response.data.detail);
      set_is_loading_submit(false);
    }
  });

  useEffect(() => {
    if (id_instrumento) {
      void fetch_data_cuencas_instrumentos_select();
      void fetch_data_instrumento();
      void fetch_data_anexos();
    }
  }, [id_instrumento]);

  useEffect(() => {
    if (id_instrumento) {
      void fetch_data_cuencas_instrumentos();
      void fetch_data_instrumento();
      void fetch_data_anexos();
      if (info_busqueda_instrumentos?.cod_tipo_agua === 'OTR') {
        return;
      }
      void fetch_data_laboratorio();
      if (info_busqueda_instrumentos?.cod_tipo_agua === 'SUB') {
        void fetch_data_prueba_bombeo();
      }
      if (info_busqueda_instrumentos?.cod_tipo_agua === 'SUP') {
        void fetch_data_cartera();
      }
    }
  }, [id_instrumento]);

  useEffect(() => {
    if (info_busqueda_instrumentos) {
      //  console.log('')('info_busqueda_instrumentos', info_busqueda_instrumentos);
      reset_instrumento({
        nombre: info_busqueda_instrumentos.nombre,
        fecha_creacion_instrumento:
          info_busqueda_instrumentos.fecha_creacion_instrumento,
        fecha_fin_vigencia: info_busqueda_instrumentos.fecha_fin_vigencia,
      });
      setValue('nombre', info_busqueda_instrumentos.nombre);
      setValue(
        'fecha_creacion_instrumento',
        info_busqueda_instrumentos.fecha_creacion_instrumento
      );
      setValue(
        'fecha_fin_vigencia',
        info_busqueda_instrumentos.fecha_fin_vigencia
      );
      setValue('cod_tipo_agua', info_busqueda_instrumentos.cod_tipo_agua);
      set_fecha_creacion(
        info_busqueda_instrumentos.fecha_creacion_instrumento
          ? dayjs(info_busqueda_instrumentos.fecha_creacion_instrumento)
          : null
      );
      set_fecha_vigencia(
        info_busqueda_instrumentos.fecha_fin_vigencia
          ? dayjs(info_busqueda_instrumentos.fecha_fin_vigencia)
          : null
      );
      if (info_busqueda_instrumentos.id_pozo) {
        void fetch_data_pozo_id();
      }
    }
  }, [info_busqueda_instrumentos]);

  useEffect(() => {
    if (info_busqueda_instrumentos) {
      reset_instrumento({
        nombre: info_busqueda_instrumentos.nombre,
        fecha_creacion_instrumento:
          info_busqueda_instrumentos.fecha_creacion_instrumento,
        fecha_fin_vigencia: info_busqueda_instrumentos.fecha_fin_vigencia,
      });
      setValue('nombre', info_busqueda_instrumentos.nombre);
      setValue(
        'fecha_creacion_instrumento',
        info_busqueda_instrumentos.fecha_creacion_instrumento
      );
      setValue(
        'fecha_fin_vigencia',
        info_busqueda_instrumentos.fecha_fin_vigencia
      );
      setValue('cod_tipo_agua', info_busqueda_instrumentos.cod_tipo_agua);
      set_fecha_creacion(
        info_busqueda_instrumentos.fecha_creacion_instrumento
          ? dayjs(info_busqueda_instrumentos.fecha_creacion_instrumento)
          : null
      );
      set_fecha_vigencia(
        info_busqueda_instrumentos.fecha_fin_vigencia
          ? dayjs(info_busqueda_instrumentos.fecha_fin_vigencia)
          : null
      );
      if (info_busqueda_instrumentos.id_pozo) {
        void fetch_data_pozo_id();
      }
    }
  }, [info_busqueda_instrumentos]);

  useEffect(() => {
    void fetch_data_cuencas();
    fetch_data_pozo();
  }, []);

  return (
    <>
      <form
        onSubmit={onSubmit}
        style={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
            <Typography variant="subtitle1" fontWeight="bold">
              Información del Instrumento:
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="nombre"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre"
                  size="small"
                  margin="dense"
                  disabled={true}
                  fullWidth
                  required
                  error={!!formErrors.nombre}
                  helperText={
                    formErrors?.nombre?.type === 'required' &&
                    'Este campo es obligatorio'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Fecha de registro"
              InputLabelProps={{
                shrink: true,
              }}
              type="date"
              size="small"
              fullWidth
              value={current_date}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="cod_tipo_agua"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Tipo de agua"
                  select
                  size="small"
                  margin="dense"
                  disabled={true}
                  fullWidth
                  required
                  error={!!formErrors.cod_tipo_agua}
                  helperText={
                    formErrors?.cod_tipo_agua?.type === 'required' &&
                    'Este campo es obligatorio'
                  }
                >
                  {tipo_agua.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de creación del instrumento"
                value={fecha_creacion}
                disabled={true}
                onChange={(value) => {
                  handle_date_change('fecha_creacion', value);
                }}
                renderInput={(params: any) => (
                  <TextField
                    fullWidth
                    disabled={true}
                    size="small"
                    {...params}
                    {...register('fecha_creacion_instrumento', {
                      required: true,
                    })}
                    error={!!formErrors?.fecha_creacion_instrumento}
                    helperText={
                      formErrors?.fecha_creacion_instrumento?.type ===
                      'required'
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
              label="Resolución"
              size="small"
              margin="dense"
              disabled={true}
              fullWidth
              value="n.O PS-GJ.1.2.6.18-2900"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Finalización de vigencia"
                value={fecha_vigencia}
                onChange={(value) => {
                  handle_date_change('fecha_vigencia', value);
                }}
                renderInput={(params: any) => (
                  <TextField
                    fullWidth
                    size="small"
                    {...params}
                    {...register('fecha_fin_vigencia')}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          {tipo_agua_selected === 'SUP' ? (
            <>
              {cuenca.length > 0 && (
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    multiple
                    fullWidth
                    size="medium"
                    options={cuenca}
                    getOptionLabel={(option: any) => option.label}
                    isOptionEqualToValue={(option: any, value) =>
                      option?.value === value?.value
                    }
                    value={cuenca_select}
                    renderInput={(params) => (
                      <TextField
                        key={params.id}
                        {...params}
                        label="Cuencas Asociadas"
                        placeholder="Cuencas Asociadas"
                      />
                    )}
                    onChange={(event, value, reason, details) => {
                      handle_change_autocomplete_edit(
                        event,
                        value as any,
                        reason,
                        details
                      );
                    }}
                  />
                </Grid>
              )}
            </>
          ) : null}
          {tipo_agua_selected === 'SUB' ? (
            <>
              {info_busqueda_instrumentos?.id_pozo ? (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Pozo asociado al instrumento:
                  </Typography>
                  <Divider />
                  <DataGrid
                    autoHeight
                    rows={rows_edit_pozo}
                    columns={colums_pozos}
                    getRowId={(row) => uuidv4()}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                </Grid>
              ) : null}
            </>
          ) : null}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Anexos asociados al instrumento:
            </Typography>
            <Divider />
            <DataGrid
              autoHeight
              rows={rows_anexos}
              columns={columns_anexos}
              getRowId={(row) => uuidv4()}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Grid>{' '}
          {is_open_edit_archivos && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  // label="Nombre a actualizar"
                  placeholder="Nombre a actualizar"
                  size="small"
                  margin="dense"
                  multiline
                  fullWidth
                  autoFocus
                  required
                  {...register('nombre_actualizar', { required: true })}
                  error={!!formErrors.nombre_actualizar}
                  helperText={
                    formErrors?.nombre_actualizar?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                />
              </Grid>{' '}
              <Grid item xs={12} sm={6}></Grid>
            </>
          )}
          <AgregarArchivo multiple={true} />
          <Grid item spacing={2} justifyContent="end" container>
            <Grid item>
              <LoadingButton
                variant="contained"
                color="success"
                type="submit"
                startIcon={<SaveIcon />}
                loading={is_loading_submit}
                disabled={is_loading_submit}
              >
                Actualizar
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
      {tipo_agua_selected !== 'OTR' ? (
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
          {tipo_agua_selected === 'SUP' ? (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Carteras de aforo
                </Typography>
                <Divider />
              </Grid>
              {rows_cartera.length > 0 && (
                <>
                  <Grid item xs={12}>
                    <DataGrid
                      autoHeight
                      rows={rows_cartera}
                      columns={columns_aforo}
                      getRowId={(row) => uuidv4()}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                    />
                  </Grid>
                </>
              )}
              <Grid item spacing={2} justifyContent="end" container>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      dispatch(
                        set_current_mode_cartera({
                          ver: false,
                          crear: true,
                          editar: false,
                        })
                      );
                      navigate(
                        '/app/recurso_hidrico/biblioteca/instrumentos/cartera_aforo',
                        {
                          replace: true,
                        }
                      );
                    }}
                  >
                    Agregar nueva cartera de aforo
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : null}
          {tipo_agua_selected === 'SUB' ? (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Pruebas de bombeo
                </Typography>
                <Divider />
              </Grid>
              {rows_prueba_bombeo.length > 0 && (
                <>
                  <Grid item xs={12}>
                    <DataGrid
                      autoHeight
                      rows={rows_prueba_bombeo}
                      columns={columns_prueba_bombeo}
                      getRowId={(row) => uuidv4()}
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
                    color="primary"
                    type="submit"
                    onClick={() => {
                      dispatch(
                        set_current_mode_bombeo({
                          ver: false,
                          crear: true,
                          editar: false,
                        })
                      );
                      navigate(
                        '/app/recurso_hidrico/biblioteca/instrumentos/prueba_bombeo',
                        {
                          replace: true,
                        }
                      );
                    }}
                  >
                    Agregar nueva prueba de bombeo
                  </LoadingButton>
                </Grid>
              </Grid>
            </>
          ) : null}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Resultados de laboratorio
            </Typography>
            <Divider />
          </Grid>
          {rows_laboratorio.length > 0 && (
            <>
              <Grid item xs={12}>
                <DataGrid
                  autoHeight
                  rows={rows_laboratorio}
                  columns={colums_laboratorio}
                  getRowId={(row) => uuidv4()}
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
                color="primary"
                type="submit"
                onClick={() => {
                  dispatch(
                    set_current_mode({
                      ver: false,
                      crear: true,
                      editar: false,
                    })
                  );
                  navigate(
                    '/app/recurso_hidrico/biblioteca/instrumentos/resultado_laboratorio',
                    {
                      replace: true,
                    }
                  );
                }}
              >
                Agregar nuevo resultado de laboratorio
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};
