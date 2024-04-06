/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { v4 as uuidv4 } from 'uuid';
import { Title } from '../../../../../components/Title';
import { use_register_laboratorio_hook } from './hook/useRegisterLaboratorioHook';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { tipo_parametro_choices } from './utils/choices/choices';
import { AgregarArchivo } from '../../../../../utils/AgregarArchivo/AgregarArchivo';
import { LoadingButton } from '@mui/lab';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import { useRegisterInstrumentoHook } from '../RegistroInstrumentos/hook/useRegisterInstrumentoHook';
import { useAppSelector } from '../../../../../hooks';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { tipo_agua } from '../RegistroInstrumentos/choices/choices';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButtonDownLoad } from '../../../../../utils/DownloadButton/IconButtonDownLoad';
import { ButtonInstrumentos } from '../ButtonInstrumentos';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarLaboratorio: React.FC = () => {
  const colums_resultado_laboratorio: GridColDef[] = [
    {
      field: 'parametro',
      headerName: 'PARAMETRO',
      sortable: true,
      width: 200,
    },
    {
      field: 'unidad',
      headerName: 'UNIDAD DE MEDIDA',
      sortable: true,
      width: 200,
    },
    {
      field: 'metodo',
      headerName: 'METODO',
      sortable: true,
      width: 200,
    },
    {
      field: 'fecha_analisis',
      headerName: 'FECHA DE ANALISIS',
      sortable: true,
      width: 200,
    },
    {
      field: 'resultado',
      headerName: 'RESULTADO',
      sortable: true,
      width: 150,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params) => (
        <>
          <Tooltip title="Editar Registro de laboratorio">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<EditIcon />}
              onClick={() => {
                handleEdit_select(params.row);
                setSelectedRow_edit(params.row);
              }}
            />
          </Tooltip>
          <Tooltip title="Eliminar registro de laboratorio">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={
                <DeleteIcon
                  titleAccess="Eliminar registro de laboratorio"
                  sx={{
                    color: 'red',
                    width: '18px',
                    height: '18px',
                  }}
                />
              }
              onClick={() => {
                //  console.log('')(params.row.id, 'id para eliminar');
                handleDelete_select(params.row.id);
              }}
            />
          </Tooltip>
        </>
      ),
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
        <>
          <IconButtonDownLoad
            fileUrl={params.value}
            fileName={params.row.nombre_archivo}
            condition={false}
          />
          <IconButton
            onClick={() => {
              set_is_open_edit_archivos(true);
              set_value_laboratorio(
                'nombre_actualizar',
                params.row.nombre_archivo
              );
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
    // watch_instrumento,
    reset_instrumento,
    control,
  } = useRegisterInstrumentoHook();

  const {
    tipo_parametro_value,
    rows_laboratorio,
    fecha_toma_muestra,
    fecha_analisis,
    fecha_envio,
    fecha_resultado,
    set_fecha_toma_muestra,
    set_fecha_envio,
    set_fecha_resultado,
    handle_date_change,
    handle_change_inputs,
    handle_agregar_editar,
    setSelectedRow_edit,
    handleDelete_select,
    handleEdit_select,

    // *Autocomplete
    cuenca_select,
    pozos_selected,
    parametros_select,
    undidad_medida_select,
    id_instrumento_slice,
    fetch_data_parametros_laboratorios_select,
    fetch_data_cuencas_instrumentos_select,
    fetch_data_pozo_instrumentos_select,

    // * Use Form
    register_laboratorio,
    control_registro_laboratorio,
    formErrors_laboratorio,
    data_watch,
    set_value_laboratorio,

    // * onSubmit_editar
    onSubmit_editar,
    is_saving,
    reset_laboratorio,

    rows_resultado_laboratorio,
    fetch_data_resultado_laboratorio,
    fetch_data_cuencas_id,

    rows_anexos_laboratorio,
    fetch_data_anexos_laboratorio,
    fetch_data_parametros_laboratorios_select_id,

    // * Editar archivos
    is_open_edit_archivos,
    set_is_open_edit_archivos,
    set_id_archivo,
  } = use_register_laboratorio_hook();

  const { instrumentos, info_laboratorio } = useAppSelector(
    (state) => state.instrumentos_slice
  );
  useEffect(() => {
    if (info_laboratorio?.id_resultado_laboratorio && tipo_parametro_value) {
      void fetch_data_resultado_laboratorio();
    }
  }, [info_laboratorio, tipo_parametro_value]);

  useEffect(() => {
    if (info_laboratorio?.id_cuenca) {
      void fetch_data_cuencas_id();
    }
  }, [info_laboratorio?.id_cuenca]);

  const navigate = useNavigate();

  useEffect(() => {
    if (info_laboratorio?.id_resultado_laboratorio) {
      void fetch_data_anexos_laboratorio(
        info_laboratorio?.id_resultado_laboratorio
      );
    }
  }, [info_laboratorio?.id_resultado_laboratorio]);

  useEffect(() => {
    reset_instrumento({
      nombre: instrumentos.nombre,
      nombre_seccion: instrumentos.nombre_seccion,
      nombre_subseccion: instrumentos.nombre_subseccion,
      cod_tipo_agua: instrumentos.cod_tipo_agua,
    });
  }, [instrumentos]);

  useEffect(() => {
    reset_laboratorio({
      descripcion: info_laboratorio.descripcion,
      lugar_muestra: info_laboratorio.lugar_muestra,
      cod_clase_muestra: info_laboratorio.cod_clase_muestra,
      fecha_toma_muestra: info_laboratorio.fecha_toma_muestra,
      fecha_resultados_lab: info_laboratorio.fecha_resultados_lab,
      fecha_envio_lab: info_laboratorio.fecha_envio_lab,
      latitud: info_laboratorio.latitud,
      longitud: info_laboratorio.longitud,
      id_cuenca: info_laboratorio.id_cuenca as any,
      id_pozo: info_laboratorio.id_pozo as any,
    });
    set_fecha_toma_muestra(dayjs(info_laboratorio.fecha_toma_muestra));
    set_fecha_envio(dayjs(info_laboratorio.fecha_envio_lab));
    set_fecha_resultado(dayjs(info_laboratorio.fecha_resultados_lab));
  }, [info_laboratorio]);

  useEffect(() => {
    if (id_instrumento_slice) {
      void fetch_data_cuencas_instrumentos_select();
    }
  }, [id_instrumento_slice]);

  useEffect(() => {
    if (instrumentos.id_pozo) {
      void fetch_data_pozo_instrumentos_select(instrumentos.id_pozo);
    }
  }, [instrumentos.id_pozo]);

  useEffect(() => {
    if (tipo_parametro_value) {
      void fetch_data_parametros_laboratorios_select();
    }
  }, [tipo_parametro_value]);

  useEffect(() => {
    if (data_watch?.id_parametro) {
      void fetch_data_parametros_laboratorios_select_id();
    }
  }, [data_watch?.id_parametro]);

  useEffect(() => {
    if (rows_resultado_laboratorio.length > 0) {
      //  console.log('')(rows_resultado_laboratorio);
    }
  }, [rows_resultado_laboratorio]);

  return (
    <>
      <form
        onSubmit={onSubmit_editar}
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
            <Title title=" Registro de laboratorio" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Datos Generales
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Sección"
              fullWidth
              size="small"
              margin="dense"
              value={instrumentos.nombre_seccion}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Subsección"
              fullWidth
              value={instrumentos.nombre_subseccion}
              size="small"
              margin="dense"
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="nombre"
              control={control}
              defaultValue=""
              // rules={{ required: false }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  margin="dense"
                  fullWidth
                  label="Instrumento Asociado"
                  size="small"
                  variant="outlined"
                  disabled={true}
                  value={value}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    onChange(e.target.value);
                    //  console.log('')(e.target.value);
                  }}
                  error={!!error}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de toma de muestra"
                value={fecha_toma_muestra}
                disabled={false}
                onChange={(value) => {
                  handle_date_change('fecha_toma_muestra', value);
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    required
                    {...register_laboratorio('fecha_toma_muestra', {
                      required: true,
                    })}
                    error={!!formErrors_laboratorio.fecha_toma_muestra}
                    helperText={
                      formErrors_laboratorio?.fecha_toma_muestra?.type ===
                        'required' && 'Este campo es obligatorio'
                    }
                    disabled={false}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Lugar de la muestra"
              fullWidth
              required
              size="small"
              margin="dense"
              disabled={false}
              {...register_laboratorio('lugar_muestra', { required: true })}
              error={!!formErrors_laboratorio.lugar_muestra}
              helperText={
                formErrors_laboratorio?.lugar_muestra?.type === 'required' &&
                'Este campo es obligatorio'
              }
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
                label="Enviado a laboratorio el día"
                value={fecha_envio}
                disabled={false}
                onChange={(value) => {
                  handle_date_change('fecha_envio', value);
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    size="small"
                    {...register_laboratorio('fecha_envio_lab', {
                      required: true,
                    })}
                    disabled={false}
                    error={!!formErrors_laboratorio.fecha_envio_lab}
                    helperText={
                      formErrors_laboratorio?.fecha_envio_lab?.type ===
                        'required' && 'Este campo es obligatorio'
                    }
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="resultados de laboratorio"
                value={fecha_resultado}
                disabled={false}
                onChange={(value) => {
                  handle_date_change('fecha_resultado', value);
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    disabled={false}
                    size="small"
                    {...register_laboratorio('fecha_resultados_lab', {
                      required: true,
                    })}
                    error={!!formErrors_laboratorio.fecha_resultados_lab}
                    helperText={
                      formErrors_laboratorio?.fecha_resultados_lab?.type ===
                        'required' && 'Este campo es obligatorio'
                    }
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Coordenadas
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Latitud"
              size="small"
              fullWidth
              margin="dense"
              disabled={false}
              required
              {...register_laboratorio('latitud', { required: true })}
              error={!!formErrors_laboratorio.latitud}
              helperText={
                formErrors_laboratorio?.latitud?.type === 'required' &&
                'Este campo es obligatorio'
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Longitud"
              size="small"
              fullWidth
              margin="dense"
              disabled={false}
              required
              {...register_laboratorio('longitud', { required: true })}
              error={!!formErrors_laboratorio.longitud}
              helperText={
                formErrors_laboratorio?.longitud?.type === 'required' &&
                'Este campo es obligatorio'
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descripción"
              fullWidth
              multiline
              size="small"
              margin="dense"
              disabled={false}
              rows={2}
              {...register_laboratorio('descripcion', { required: true })}
              error={!!formErrors_laboratorio.descripcion}
              helperText={
                formErrors_laboratorio?.descripcion?.type === 'required' &&
                'Este campo es obligatorio'
              }
            />
          </Grid>
          {instrumentos.cod_tipo_agua === 'SUP' ? (
            <>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="id_cuenca"
                  control={control_registro_laboratorio}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Seleccione una cuenca"
                      select
                      size="small"
                      margin="dense"
                      disabled={true}
                      fullWidth
                      required
                      error={!!formErrors_laboratorio.id_cuenca}
                      helperText={
                        formErrors_laboratorio?.id_cuenca?.type ===
                          'required' && 'Este campo es obligatorio'
                      }
                    >
                      {cuenca_select.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
            </>
          ) : null}
          {instrumentos.cod_tipo_agua === 'SUB' ? (
            <>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="id_pozo"
                  control={control_registro_laboratorio}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Seleccione un pozo"
                      select
                      size="small"
                      margin="dense"
                      disabled={true}
                      fullWidth
                      required
                      error={!!formErrors_laboratorio.id_pozo}
                      helperText={
                        formErrors_laboratorio?.id_pozo?.type === 'required' &&
                        'Este campo es obligatorio'
                      }
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
            </>
          ) : null}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Seleccione un tipo de parametro para consultar o editar los
              regristros existentes
            </Typography>
          </Grid>
          {rows_resultado_laboratorio.length > 0 && (
            <>
              <Grid item xs={12}>
                <Title title="Analisis de laboratorio" />
              </Grid>
              <Grid item xs={12}>
                <>
                  <DataGrid
                    autoHeight
                    rows={rows_resultado_laboratorio}
                    columns={colums_resultado_laboratorio}
                    getRowId={(row) => row.id}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                </>
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <Title title="Registro de medición" />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Tipo parámetro "
              select
              fullWidth
              size="small"
              value={tipo_parametro_value}
              margin="dense"
              disabled={rows_laboratorio.length > 0}
              name="tipo_parametro"
              onChange={handle_change_inputs}
            >
              {tipo_parametro_choices.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="id_parametro"
              control={control_registro_laboratorio}
              defaultValue=""
              rules={{ required: false }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Seleccione un parametro"
                  select
                  size="small"
                  margin="dense"
                  disabled={tipo_parametro_value === ''}
                  fullWidth
                  required={false}
                  error={!!formErrors_laboratorio.id_parametro}
                  helperText={
                    formErrors_laboratorio?.id_parametro?.type === 'required' &&
                    'Este campo es obligatorio'
                  }
                >
                  {parametros_select.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="unidad de medida"
              // select
              fullWidth
              size="small"
              margin="dense"
              value={undidad_medida_select || ''}
              disabled={true}
              name="unidad_medida"
              onChange={handle_change_inputs}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="metodo"
              control={control_registro_laboratorio}
              defaultValue=""
              rules={{ required: false }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Método de análisis"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={false}
                ></TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de análisis"
                value={fecha_analisis}
                onChange={(value) => {
                  handle_date_change('fecha_analisis', value);
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    {...register_laboratorio('fecha_analisis')}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="resultado"
              control={control_registro_laboratorio}
              defaultValue=""
              rules={{ required: false }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Resultado"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={false}
                />
              )}
            />
          </Grid>
          <Box sx={{ flexGrow: 1 }}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{ mt: '10px' }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={handle_agregar_editar}
                disabled={
                  !data_watch.id_parametro ||
                  !tipo_parametro_value ||
                  !undidad_medida_select ||
                  !data_watch.metodo ||
                  !fecha_analisis ||
                  !data_watch.resultado
                }
              >
                Agregar
              </Button>
            </Stack>
          </Box>
          <Grid item xs={12}>
            <Title title="Anexos asociados al resultado de laboratorio:" />
            <Divider />
            <DataGrid
              autoHeight
              rows={rows_anexos_laboratorio}
              columns={columns_anexos}
              getRowId={(row) => uuidv4()}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Grid>
          {is_open_edit_archivos && (
            <>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_actualizar"
                  control={control_registro_laboratorio}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      // label="Nombre a actualizar"
                      {...field}
                      label="Nombre a actualizar"
                      size="small"
                      margin="dense"
                      multiline
                      fullWidth
                      autoFocus
                      required
                      error={!!formErrors_laboratorio.nombre_actualizar}
                      helperText={
                        formErrors_laboratorio?.nombre_actualizar?.type ===
                        'required'
                          ? 'Este campo es obligatorio'
                          : ''
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
            </>
          )}
          <AgregarArchivo multiple={true} />
          <Grid item spacing={2} justifyContent="end" container>
            <Grid item>
              <ButtonInstrumentos />
            </Grid>
            <Grid item>
              <ButtonSalir />
            </Grid>
            <Grid item>
              <LoadingButton
                variant="contained"
                color="success"
                type="submit"
                disabled={is_saving || !!data_watch.resultado}
                loading={is_saving}
              >
                Actualizar
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
