/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { v4 as uuidv4 } from 'uuid';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import { AgregarArchivo } from '../../../../../utils/AgregarArchivo/AgregarArchivo';
import { BusquedaCuencas } from '../BusquedaCuencas';
import { BusquedaPozos } from '../BusquedaPozos';
import { Controller } from 'react-hook-form';
import { control_error, control_success } from '../../../../../helpers';
import { agregar_instrumento } from '../../request/request';
import dayjs from 'dayjs';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch /* useAppSelector */ } from '../../../../../hooks';
import { setCurrentInstrumento } from '../../toolkit/slice/instrumentosSlice';
import { DataContext } from '../../context/contextData';
import { tipo_agua } from '../RegistroInstrumentos/choices/choices';
import { useRegisterInstrumentoHook } from '../RegistroInstrumentos/hook/useRegisterInstrumentoHook';

export const SeleccionarInstrumento: React.FC = (): JSX.Element => {
  // const { instrumentos } = useAppSelector((state) => state.instrumentos_slice);

  const columns_aforo: GridColDef[] = [
    // ...columns_result_lab,
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 120,
      renderCell: (params) => (
        <>
          {/* <IconButton
                        onClick={() => {
                          set_id_seccion(params.row.id_seccion);
                          set_info_seccion(params.row);
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
                            titleAccess="Seleccionar Sección"
                            sx={{
                              color: 'primary.main',
                              width: '18px',
                              height: '18px',
                            }}
                          />
                        </Avatar>
                      </IconButton> */}
        </>
      ),
    },
  ];
  const columns_prueba_bombeo: GridColDef[] = [
    // ...columns_result_lab,
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 120,
      renderCell: (params) => (
        <>
          {/* <IconButton
                        onClick={() => {
                          set_id_seccion(params.row.id_seccion);
                          set_info_seccion(params.row);
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
                            titleAccess="Seleccionar Sección"
                            sx={{
                              color: 'primary.main',
                              width: '18px',
                              height: '18px',
                            }}
                          />
                        </Avatar>
                      </IconButton> */}
        </>
      ),
    },
  ];
  const columns_laboratorio: GridColDef[] = [
    // ...columns_result_lab,
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 120,
      renderCell: (params) => (
        <>
          {/* <IconButton
                        onClick={() => {
                          set_id_seccion(params.row.id_seccion);
                          set_info_seccion(params.row);
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
                            titleAccess="Seleccionar Sección"
                            sx={{
                              color: 'primary.main',
                              width: '18px',
                              height: '18px',
                            }}
                          />
                        </Avatar>
                      </IconButton> */}
        </>
      ),
    },
  ];

  const {
    reset_instrumento,
    pozos_selected,
    cuenca,
    id_pozo_selected,
    data_id_cuencas,
    id_seccion,
    id_subseccion,
    archivos,
    nombres_archivos,
    fecha_creacion,
    fecha_vigencia,
    current_date,
    tipo_agua_selected,
    row_cartera_aforo,
    row_prueba_bombeo,
    row_result_laboratorio,
    is_loading_submit,
    set_is_loading_submit,
    set_is_open_cuenca,
    set_is_open_pozos,
    handle_date_change,
    handle_change_autocomplete,
    register,
    handleSubmit,
    fetch_data_cuencas,
    fetch_data_pozo,
    control,
    formErrors,
    limpiar_formulario,
    // watch_instrumento,
  } = useRegisterInstrumentoHook();
  const { nombre_subseccion, nombre_seccion, info_instrumentos } =
    useContext(DataContext);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (info_instrumentos) {
      reset_instrumento({
        nombre: info_instrumentos.nombre,
        fecha_creacion_instrumento: info_instrumentos.fecha_creacion,
        fecha_fin_vigencia: info_instrumentos.fecha_vigencia,
        nombre_seccion: info_instrumentos.nombre_seccion,
      });
    }
  }, [info_instrumentos]);

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
      if (fecha_vigencia) {
        datos_instrumento.append('fecha_fin_vigencia', fecha_vigencia);
      }
      datos_instrumento.append('cod_tipo_agua', tipo_agua_selected);
      if (id_seccion && id_subseccion) {
        datos_instrumento.append('id_seccion', id_seccion.toString());
        datos_instrumento.append('id_subseccion', id_subseccion.toString());
      }
      if (id_pozo_selected) {
        datos_instrumento.append('id_pozo', id_pozo_selected.toString());
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

      await agregar_instrumento(datos_instrumento);
      dispatch(
        setCurrentInstrumento({
          nombre: data.nombre,
          nombre_seccion,
          nombre_subseccion,
        })
      );
      control_success('Se agregó instrumento correctamente');
      set_is_loading_submit(false);
      limpiar_formulario();
    } catch (error: any) {
      set_is_loading_submit(false);
      control_error(error.response.data.detail);
    }
  });

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
                  disabled={false}
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
                  disabled={false}
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
                onChange={(value) => {
                  handle_date_change('fecha_creacion', value);
                }}
                renderInput={(params: any) => (
                  <TextField
                    fullWidth
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
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    fullWidth
                    size="medium"
                    options={cuenca}
                    getOptionLabel={(option: any) => option.label}
                    isOptionEqualToValue={(option: any, value) =>
                      option?.value === value?.value
                    }
                    renderInput={(params) => (
                      <TextField
                        key={params.id}
                        {...params}
                        label="Asociar Cuenca"
                        placeholder="Asociar Cuenca"
                      />
                    )}
                    {...register('id_cuencas')}
                    onChange={handle_change_autocomplete}
                  />
                </Grid>
              )}
              <Grid item spacing={2} justifyContent="end" container>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      set_is_open_cuenca(true);
                    }}
                  >
                    Buscar Cuenca
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : null}
          {tipo_agua_selected === 'SUB' ? (
            <>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="id_pozo"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Seleccione un pozo"
                      select
                      size="small"
                      margin="dense"
                      disabled={false}
                      fullWidth
                      // required
                      // error={!!formErrors.cod_tipo_agua}
                      // helperText={
                      //   formErrors?.cod_tipo_agua?.type === 'required' &&
                      //   'Este campo es obligatorio'
                      // }
                    >
                      {pozos_selected.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item spacing={2} justifyContent="end" container>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      set_is_open_pozos(true);
                    }}
                  >
                    Buscar Pozo
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : null}
          <AgregarArchivo multiple={true} />
          <Grid item spacing={2} justifyContent="end" container>
            <Grid item>
              <Button
                variant="outlined"
                color="warning"
                onClick={() => {
                  limpiar_formulario();
                }}
              >
                Limpiar
              </Button>
            </Grid>
            <Grid item>
              <LoadingButton
                variant="contained"
                color="success"
                type="submit"
                loading={is_loading_submit}
                disabled={is_loading_submit}
              >
                Guardar
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </form>

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
            {row_cartera_aforo.length > 0 && (
              <>
                <Grid item xs={12}>
                  <DataGrid
                    autoHeight
                    rows={row_cartera_aforo}
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
                    navigate(
                      '/app/recurso_hidrico/instrumentos/cartera_aforo',
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
            {row_prueba_bombeo.length > 0 && (
              <>
                <Grid item xs={12}>
                  <DataGrid
                    autoHeight
                    rows={row_prueba_bombeo}
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
                    navigate(
                      '/app/recurso_hidrico/instrumentos/prueba_bombeo',
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
        {row_result_laboratorio.length > 0 && (
          <>
            <Grid item xs={12}>
              <DataGrid
                autoHeight
                rows={row_result_laboratorio}
                columns={columns_laboratorio}
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
                navigate(
                  '/app/recurso_hidrico/instrumentos/resultado_laboratorio',
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
      <BusquedaCuencas />
      <BusquedaPozos />
    </>
  );
};
