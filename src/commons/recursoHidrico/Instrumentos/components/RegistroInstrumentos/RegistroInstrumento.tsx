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
import { tipo_agua } from './choices/choices';
import { useRegisterInstrumentoHook } from './hook/useRegisterInstrumentoHook';
import { Controller } from 'react-hook-form';
import { control_error, control_success } from '../../../../../helpers';
import { agregar_instrumento } from '../../request/request';
import dayjs from 'dayjs';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch /* useAppSelector */ } from '../../../../../hooks';
import {
  setCurrentInstrumento,
  set_current_id_instrumento,
  set_current_mode,
  set_current_mode_bombeo,
  set_current_mode_cartera,
} from '../../toolkit/slice/instrumentosSlice';
import { DataContext } from '../../context/contextData';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
export const RegistroInstrumentos: React.FC = (): JSX.Element => {
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
    // * agregar resultado de laboratorio

    is_open_result_laboratorio,
    set_is_open_result_laboratorio,
    // reset_instrumento,
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
    tipo_agua_instrumento,
    set_tipo_agua_instrumento,
    set_is_loading_submit,
    handle_date_change,
    handle_change_autocomplete,
    register,
    handleSubmit,
    fetch_data_cuencas,
    fetch_data_pozo,
    control,
    formErrors,
    limpiar_formulario,
  } = useRegisterInstrumentoHook();

  const { nombre_subseccion, nombre_seccion } = useContext(DataContext);

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

      await agregar_instrumento(datos_instrumento).then((response) => {
        const {
          data: {
            instrumento: { id_instrumento },
          },
        } = response;
        dispatch(set_current_id_instrumento(id_instrumento));
      });

      dispatch(
        setCurrentInstrumento({
          nombre: data.nombre,
          nombre_seccion,
          nombre_subseccion,
          cod_tipo_agua: tipo_agua_selected,
          id_cuencas,
          id_pozo: id_pozo_selected,
        })
      );
      control_success('Se agregó instrumento correctamente');
      limpiar_formulario();
    } catch (error: any) {
      control_error(error.response.data.detail);
    } finally {
      set_is_loading_submit(false);
      set_is_open_result_laboratorio(true);
    }
  });

  useEffect(() => {
    //  console.log('')(tipo_agua_selected, 'tipo_agua_selected');
  }, [tipo_agua_selected]);

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
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Tipo de agua"
                  select
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                    set_tipo_agua_instrumento(e.target.value);
                  }}
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
                    onChange={handle_change_autocomplete as any}
                  />
                </Grid>
              )}
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
              <Grid item xs={12} sm={6}></Grid>
            </>
          ) : null}
          <AgregarArchivo multiple={true} />
          <Grid item spacing={2} justifyContent="end" container>
            <Grid item>
              <Button
                variant="outlined"
                // color="warning"
                 startIcon={<CleanIcon />}
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
                startIcon={<SaveIcon />}
              >
                Guardar
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
      {is_open_result_laboratorio ? (
        <>
          {tipo_agua_instrumento !== 'OTR' ? (
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
              {tipo_agua_instrumento === 'SUP' ? (
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
              {tipo_agua_instrumento === 'SUB' ? (
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
      ) : null}
    </>
  );
};
