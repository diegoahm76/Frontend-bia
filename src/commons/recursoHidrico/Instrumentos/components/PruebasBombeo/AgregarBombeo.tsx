/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

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
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { v4 as uuidv4 } from 'uuid';
import { Title } from '../../../../../components/Title';
import { type GridColDef, DataGrid } from '@mui/x-data-grid';
import { use_register_bombeo_hook } from './hook/useRegisterBombeoHook';
import { colums_bombeo } from './utils/colums/colums';
import { useRegisterInstrumentoHook } from '../RegistroInstrumentos/hook/useRegisterInstrumentoHook';
import { useAppSelector } from '../../../../../hooks';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { get_header_name } from './utils/functions/functions';
import { LoadingButton } from '@mui/lab';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import { AgregarArchivo } from '../../../../../utils/AgregarArchivo/AgregarArchivo';
import { tipo_sesion } from './utils/choices/choices';
import { use_register_laboratorio_hook } from '../ResultadoLaboratorio/hook/useRegisterLaboratorioHook';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { EditarSesionPrueba } from './EditarSesionPrueba';
import { ButtonInstrumentos } from '../ButtonInstrumentos';
import ChecklistIcon from '@mui/icons-material/Checklist';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarBombeo: React.FC = () => {
  const columns_prueba: GridColDef[] = [
    ...colums_bombeo,
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              handleEdit(params.row);
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
                titleAccess="Editar"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
          <IconButton onClick={() => {handle_eliminar(params.row.id)}}>
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
                titleAccess="Eliminar"
                sx={{
                  color: 'red',
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
  const columns_sesion: GridColDef[] = [
    {
      field: 'cod_tipo_sesion',
      headerName: 'SECCIÓN/CAUDAL',
      sortable: true,
      width: 400,
      valueGetter: (params) => get_header_name(params.value),
    },
    {
      field: 'fecha_inicio',
      headerName: 'HORA INICIO',
      sortable: true,
      width: 200,
    },
    // {
    //   field: 'ACCIONES',
    //   headerName: 'ACCIONES',
    //   width: 80,
    //   renderCell: (params) => (
    //     <>
    //       <Tooltip title="Editar prueba de bombeo">
    //         <Button
    //           variant="outlined"
    //           color="primary"
    //           size="small"
    //           startIcon={<EditIcon />}
    //           onClick={() => {
    //             //  console.log('')(params.row, 'params.row');
    //             // set_id_sesion_bombeo(params.row.id_sesion_prueba_bombeo);
    //             // set_info_sesion_bombeo(params.row);
    //           }}
    //         />
    //       </Tooltip>
    //       <Tooltip title="Eliminar prueba de bombeo">
    //         <Button
    //           variant="outlined"
    //           color="primary"
    //           size="small"
    //           startIcon={
    //             <DeleteIcon
    //               titleAccess="Eliminar prueba de bombeo"
    //               sx={{
    //                 color: 'red',
    //                 width: '18px',
    //                 height: '18px',
    //               }}
    //             />
    //           }
    //           onClick={() => {
    //             //  console.log('')(params.row, 'params.row');
    //             // set_id_sesion_bombeo(params.row.id_sesion_prueba_bombeo);
    //             // set_info_sesion_bombeo(params.row);
    //           }}
    //         />
    //       </Tooltip>
    //     </>
    //   ),
    // },
  ];
  const { pozos_selected, fetch_data_pozo_instrumentos_select } =
    use_register_laboratorio_hook();
  const {
    fecha_prubea_bombeo,
    horaPruebaBombeo,
    row_prueba,
    row_data_prueba,
    handle_agregar,
    handle_date_change,
    handle_time_change,
    handleEdit,
    handle_eliminar,

    // * use form
    register_bombeo,
    handleSubmit_bombeo,
    errors_bombeo,
    control_bombeo,
    data_watch_bombeo,
    reset_bombeo,
    setValue_bombeo,
    getValues_bombeo,
    watch_bombeo,

    // *OnSubmit
    onSubmit,
    is_saving,

    // * datos de sesion
    rows_sesion_bombeo,
    set_rows_sesion_bombeo,
    id_bombeo_general,
    fetch_data_general_sesion,
  } = use_register_bombeo_hook();

  const {
    // watch_instrumento,
    reset_instrumento,
    control,
  } = useRegisterInstrumentoHook();

  const { instrumentos, mode_editar_bombeo } = useAppSelector(
    (state) => state.instrumentos_slice
  );

  useEffect(() => {
    reset_instrumento({
      nombre: instrumentos.nombre,
      nombre_seccion: instrumentos.nombre_seccion,
      nombre_subseccion: instrumentos.nombre_subseccion,
    });
  }, [instrumentos]);

  useEffect(() => {
    if (instrumentos.id_pozo) {
      void fetch_data_pozo_instrumentos_select(instrumentos.id_pozo);
    }
  }, [instrumentos.id_pozo]);

  useEffect(() => {
    set_rows_sesion_bombeo([]);
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
            <Title title=" REGISTRO DE PRUEBAS DE BOMBEO " />
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
                label="Fecha de prueba de bombeo"
                value={fecha_prubea_bombeo}
                onChange={(value) => {
                  handle_date_change('fecha_prueba', value);
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    {...register_bombeo('fecha_prueba_bombeo', {
                      required: true,
                    })}
                    error={!!errors_bombeo.fecha_prueba_bombeo}
                    helperText={
                      errors_bombeo.fecha_prueba_bombeo
                        ? 'Es obligatorio la fecha de la prueba de bombeo'
                        : 'Ingrese la fecha de la prueba de bombeo'
                    }
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="ubicacion_prueba"
              control={control_bombeo}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Lugar de prueba de bombeo"
                  fullWidth
                  size="small"
                  margin="dense"
                  required
                  disabled={false}
                  error={!!errors_bombeo.ubicacion_prueba}
                  helperText={
                    errors_bombeo.ubicacion_prueba
                      ? 'Es obligatorio la ubicación de la prueba de bombeo'
                      : 'Ingrese la ubicación de la prueba de bombeo'
                  }
                />
              )}
            />
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
            <Controller
              name="latitud"
              control={control_bombeo}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Latitud"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={true}
                  error={!!errors_bombeo.latitud}
                  helperText={
                    errors_bombeo.latitud
                      ? 'Es obligatorio ingresar una latitud'
                      : 'Ingrese una latitud'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="longitud"
              control={control_bombeo}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Longitud"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={true}
                  error={!!errors_bombeo.longitud}
                  helperText={
                    errors_bombeo.longitud
                      ? 'Es obligatorio ingresar una longitud'
                      : 'Ingrese una longitud'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="descripcion"
              control={control_bombeo}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descripción"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  multiline
                  rows={2}
                  required={true}
                  error={!!errors_bombeo.descripcion}
                  helperText={
                    errors_bombeo.descripcion
                      ? 'Es obligatorio ingresar una descripcion'
                      : 'Ingrese una descripcion'
                  }
                />
              )}
            />
          </Grid>
          {instrumentos.cod_tipo_agua === 'SUB' ? (
            <>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="id_pozo"
                  control={control_bombeo}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="Seleccione un pozo"
                      select
                      size="small"
                      margin="dense"
                      disabled={false}
                      fullWidth
                      required
                      value={value}
                      onChange={onChange}
                      error={!!errors_bombeo.id_pozo}
                      helperText={
                        errors_bombeo?.id_pozo?.type === 'required' &&
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
          {mode_editar_bombeo.crear ? (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Registro de Sección de prueba de bombeo
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="cod_tipo_sesion"
                  control={control_bombeo}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label=" Prueba de bombeo / caudal "
                      size="small"
                      margin="dense"
                      select
                      fullWidth
                      disabled={row_prueba.length > 0}
                      required={true}
                      error={!!errors_bombeo.caudal}
                      helperText={
                        errors_bombeo.caudal
                          ? 'Es obligatorio seleccionar un tipo de prueba de bombeo / caudal'
                          : 'ingrese el tipo de prueba de bombeo / caudal'
                      }
                    >
                      {tipo_sesion.map((option) => (
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
                  <TimePicker
                    label="Hora de prueba de bombeo"
                    value={horaPruebaBombeo}
                    disabled={row_prueba.length > 0}
                    onChange={(value) => {
                      handle_time_change(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        autoComplete="off"
                        {...params}
                        fullWidth
                        disabled={row_prueba.length > 0}
                        size="small"
                        {...register_bombeo('hora_inicio', { required: true })}
                        error={!!errors_bombeo.hora_inicio}
                        helperText={
                          errors_bombeo.hora_inicio
                            ? 'Es obligatorio la hora de inicio de la prueba de bombeo'
                            : 'Ingrese la hora de inicio de la prueba de bombeo'
                        }
                      />
                    )}
                    ampm={true}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Registro de medición
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="tiempo_transcurrido"
                  control={control_bombeo}
                  rules={{ required: row_prueba.length === 0 }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      value={value}
                      label="Tiempo transcurrido (min)"
                      size="small"
                      margin="dense"
                      type="number"
                      disabled={
                        row_prueba.length === 0 ||
                        !data_watch_bombeo.hora_inicio ||
                        !data_watch_bombeo.cod_tipo_sesion
                      }
                      fullWidth
                      required={row_prueba.length === 0}
                      onChange={onChange}
                      error={!!errors_bombeo.tiempo_transcurrido}
                      helperText={
                        errors_bombeo.tiempo_transcurrido
                          ? 'Es obligatorio ingresar el tiempo transcurrido'
                          : 'Ingrese el tiempo transcurrido'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nivel"
                  control={control_bombeo}
                  defaultValue=""
                  rules={{ required: row_prueba.length === 0 }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nivel (m)"
                      size="small"
                      margin="dense"
                      disabled={
                        !data_watch_bombeo.hora_inicio ||
                        !data_watch_bombeo.cod_tipo_sesion
                      }
                      fullWidth
                      required={row_prueba.length === 0}
                      error={!!errors_bombeo.nivel}
                      helperText={
                        errors_bombeo.nivel
                          ? 'Es obligatorio ingresar el nivel'
                          : 'Ingrese el nivel'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="resultado"
                  control={control_bombeo}
                  defaultValue=""
                  rules={{ required: row_prueba.length === 0 }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Abatimiento / Recuperación (m)"
                      size="small"
                      margin="dense"
                      disabled={
                        !data_watch_bombeo.hora_inicio ||
                        !data_watch_bombeo.cod_tipo_sesion
                      }
                      fullWidth
                      required={row_prueba.length === 0}
                      error={!!errors_bombeo.resultado}
                      helperText={
                        errors_bombeo.resultado
                          ? 'Es obligatorio ingresar el abatimiento / recuperación'
                          : 'Ingrese el abatimiento / recuperación'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="caudal"
                  control={control_bombeo}
                  defaultValue=""
                  rules={{ required: row_prueba.length === 0 }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Caudal (l/s)"
                      size="small"
                      margin="dense"
                      disabled={
                        !data_watch_bombeo.hora_inicio ||
                        !data_watch_bombeo.cod_tipo_sesion
                      }
                      fullWidth
                      required={row_prueba.length === 0}
                      error={!!errors_bombeo.caudal}
                      helperText={
                        errors_bombeo.caudal
                          ? 'Es obligatorio ingresar el caudal'
                          : 'Ingrese el caudal'
                      }
                    />
                  )}
                />
              </Grid>{' '}
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
                    onClick={handle_agregar}
                    disabled={
                      !data_watch_bombeo?.tiempo_transcurrido ||
                      !data_watch_bombeo?.nivel ||
                      !data_watch_bombeo?.resultado ||
                      !data_watch_bombeo?.caudal
                    }
                  >
                    Agregar
                  </Button>
                </Stack>
              </Box>
            </>
          ) : null}
          {mode_editar_bombeo.editar ? <EditarSesionPrueba /> : null}
          {row_prueba.length > 0 && (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Datos de Prueba de bombeo:
                </Typography>
                <Divider />
                <DataGrid
                  autoHeight
                  rows={row_prueba}
                  columns={columns_prueba}
                  getRowId={(row) => uuidv4()}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}></Grid>
          <AgregarArchivo multiple={true} />
          {rows_sesion_bombeo.length > 0 && (
            <>
              <Grid item xs={12}>
                <Title title="Secciones" />
              </Grid>
              <Grid item xs={12}>
                <DataGrid
                  autoHeight
                  rows={rows_sesion_bombeo}
                  columns={columns_sesion}
                  getRowId={(row) => uuidv4()}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </Grid>
            </>
          )}
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
                disabled={is_saving}
                loading={is_saving}
              >
                Guardar
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
