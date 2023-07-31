/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import {
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { v4 as uuidv4 } from 'uuid';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAppDispatch /* useAppSelector */ } from '../../../../../hooks';
// import { setCurrentInstrumento } from '../../toolkit/slice/instrumentosSlice';
import { DataContext } from '../../context/contextData';
import { tipo_agua } from '../RegistroInstrumentos/choices/choices';
import { useRegisterInstrumentoHook } from '../RegistroInstrumentos/hook/useRegisterInstrumentoHook';
import { DownloadButton } from '../../../../../utils/DownloadButton/DownLoadButton';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { useAppDispatch } from '../../../../../hooks';
import EditIcon from '@mui/icons-material/Edit';
import {
  set_current_info_laboratorio,
  set_current_mode,
} from '../../toolkit/slice/instrumentosSlice';

// eslint-disable-next-line @typescript-eslint/naming-convention
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
          <Tooltip title="Seleccionar">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<ChecklistOutlinedIcon />}
              onClick={() => {
                dispatch(set_current_info_laboratorio(params.row));
                dispatch(
                  set_current_mode({
                    ver: true,
                    crear: false,
                    editar: false,
                  })
                );
                navigate(
                  '/app/recurso_hidrico/instrumentos/resultado_laboratorio',
                  {
                    replace: true,
                  }
                );
              }}
            />
          </Tooltip>
          <Tooltip title="Editar Registro de laboratorio">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<EditIcon />}
              onClick={() => {
                dispatch(set_current_info_laboratorio(params.row));
                dispatch(
                  set_current_mode({
                    ver: false,
                    crear: false,
                    editar: true,
                  })
                );
                navigate(
                  '/app/recurso_hidrico/instrumentos/resultado_laboratorio',
                  {
                    replace: true,
                  }
                );
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];
  const columns_cuencas: GridColDef[] = [
    {
      field: 'cuenca',
      headerName: 'NOMBRE CUENCA',
      width: 300,
      renderCell: (params) => <div className="container">{params.value}</div>,
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
      headerName: 'ARCHIVO',
      width: 200,
      renderCell: (params) => (
        <DownloadButton
          fileUrl={params.value}
          fileName={params.row.nombre}
          condition={false}
        />
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

  const {
    reset_instrumento,
    fecha_creacion,
    fecha_vigencia,
    tipo_agua_selected,
    row_cartera_aforo,
    row_prueba_bombeo,
    set_fecha_creacion,
    set_fecha_vigencia,
    handle_date_change,
    register,
    fetch_data_cuencas,
    fetch_data_pozo,
    control,
    formErrors,
    setValue,
    // watch_instrumento,
  } = useRegisterInstrumentoHook();

  const {
    nombre_subseccion,
    nombre_seccion,
    // info_instrumentos,
    info_busqueda_instrumentos,
    rows_cuencas_instrumentos,
    rows_laboratorio,
    rows_anexos,
    id_instrumento,
    rows_edit_pozo,
    fetch_data_cuencas_instrumentos,
    fetch_data_instrumento,
    fetch_data_anexos,
    fetch_data_pozo_id,
    fetch_data_laboratorio,
  } = useContext(DataContext);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id_instrumento) {
      void fetch_data_cuencas_instrumentos();
      void fetch_data_instrumento();
      void fetch_data_anexos();
      void fetch_data_laboratorio();
    }
  }, [id_instrumento]);

  useEffect(() => {
    if (info_busqueda_instrumentos) {
      console.log('info_busqueda_instrumentos', info_busqueda_instrumentos);
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
            <TextField
              label="Sección"
              size="small"
              value={nombre_seccion}
              fullWidth
              multiline
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Subsección"
              size="small"
              value={nombre_subseccion}
              multiline
              fullWidth
              disabled
            />
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
              type="text"
              size="small"
              fullWidth
              value={info_busqueda_instrumentos?.fecha_registro}
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
                disabled={true}
                value={fecha_vigencia}
                onChange={(value) => {
                  handle_date_change('fecha_vigencia', value);
                }}
                renderInput={(params: any) => (
                  <TextField
                    fullWidth
                    disabled={true}
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
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Cuencas Asociadas al instrumento:
                </Typography>
                <Divider />
                <DataGrid
                  autoHeight
                  rows={rows_cuencas_instrumentos}
                  columns={columns_cuencas}
                  getRowId={(row) => uuidv4()}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </Grid>
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
          <Grid item xs={12} sm={6}>
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
                        set_current_mode({
                          ver: false,
                          crear: true,
                          editar: false,
                        })
                      );
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
      ) : null}
    </>
  );
};
