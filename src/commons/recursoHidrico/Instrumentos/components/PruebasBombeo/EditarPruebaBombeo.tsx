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
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { LoadingButton } from '@mui/lab';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import { AgregarArchivo } from '../../../../../utils/AgregarArchivo/AgregarArchivo';
import { tipo_sesion } from './utils/choices/choices';
import { use_register_laboratorio_hook } from '../ResultadoLaboratorio/hook/useRegisterLaboratorioHook';
import dayjs from 'dayjs';
import { IconButtonDownLoad } from '../../../../../utils/DownloadButton/IconButtonDownLoad';
import EditIcon from '@mui/icons-material/Edit';
import Select from 'react-select';
import { ButtonInstrumentos } from '../ButtonInstrumentos';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarPruebaBombeo: React.FC = () => {
  const columns_prueba: GridColDef[] = [
    ...colums_bombeo,
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
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 80,
      renderCell: (params) => (
        <>
          <Tooltip title="Seleccionar">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<ChecklistOutlinedIcon />}
              onClick={() => {
                set_id_sesion_bombeo(params.row.id_sesion_prueba_bombeo);
                set_info_sesion_bombeo(params.row);
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];
  const columns_data_sesion: GridColDef[] = [
    {
      field: 'tiempo_transcurrido',
      headerName: 'TIEMPO TRANSCURRIDO',
      sortable: true,
      width: 150,
    },
    {
      field: 'hora',
      headerName: 'HORA',
      sortable: true,
      width: 150,
    },
    {
      field: 'nivel',
      headerName: 'NIVEL',
      sortable: true,
      width: 200,
    },
    {
      field: 'resultado',
      headerName: 'ABATIMIENTO/RECUPERACION',
      sortable: true,
      width: 250,
    },
    {
      field: 'caudal',
      headerName: 'CAUDAL',
      sortable: true,
      width: 200,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 80,
      renderCell: (params) => (
        <>
          <Tooltip title="Seleccionar">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<ChecklistOutlinedIcon />}
              onClick={() => {
                //  console.log('')(params.row, 'params.row');
                set_info_data_sesion_bombeo(params.row);
                set_id_data_sesion_bombeo(
                  params.row.id_dato_sesion_prueba_bombeo
                );
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
      headerName: 'NOMBRE ARCHIVO',
      sortable: true,
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
            fileName={params.row.nombre}
            condition={false}
          />
          <IconButton
            onClick={() => {
              set_is_open_edit_archivos(true);
              setValue_bombeo('nombre_actualizar', params.row.nombre_archivo);
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

  const { pozos_selected, fetch_data_pozo_instrumentos_select } =
    use_register_laboratorio_hook();

  const {
    fecha_prubea_bombeo,
    horaPruebaBombeo,
    row_prueba,
    set_fecha_prubea_bombeo,
    handle_agregar,
    handle_date_change,
    handle_time_change,

    // * use form
    register_bombeo,
    errors_bombeo,
    control_bombeo,
    reset_bombeo,
    setValue_bombeo,
    data_watch_bombeo,

    // *OnSubmit
    onSubmit_editar_datoprueba,
    onSubmit_editar_sesion,
    onSubmit_editar,
    onSubmit_editar_archivos,
    // * data prueba de bombeo
    is_saving,
    is_saving_general,
    is_saving_sesion,
    is_saving_datoprueba,

    // * informacion sesiones
    rows_sesion_bombeo,
    id_bombeo_general,
    info_sesion_bombeo,
    info_data_sesion_bombeo,
    rows_data_sesion_bombeo,
    id_sesion_bombeo,
    rows_anexos_bombeo,
    setHoraPruebaBombeo,
    set_id_sesion_bombeo,
    set_info_data_sesion_bombeo,
    set_info_sesion_bombeo,
    set_id_bombeo_general,
    set_id_data_sesion_bombeo,
    fetch_data_general_sesion,
    fetch_data_sesion,
    fetch_data_anexos_bombeo,

    // * Editar archivos
    is_open_edit_archivos,
    set_is_open_edit_archivos,
    set_id_archivo,
  } = use_register_bombeo_hook();

  const { reset_instrumento, control } = useRegisterInstrumentoHook();

  const { instrumentos, info_prueba_bombeo } = useAppSelector(
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
    set_id_bombeo_general(info_prueba_bombeo?.id_prueba_bombeo);
    reset_bombeo({
      descripcion: info_prueba_bombeo.descripcion,
      latitud: info_prueba_bombeo.latitud,
      longitud: info_prueba_bombeo.longitud,
      ubicacion_prueba: info_prueba_bombeo.ubicacion_prueba,
      id_instrumento: info_prueba_bombeo.id_instrumento as any,
      id_pozo: {
        value: info_prueba_bombeo.id_pozo as any,
        label: info_prueba_bombeo.nombre_pozo,
      },
      id_prueba_bombeo: info_prueba_bombeo.id_prueba_bombeo as any,
      fecha_prueba_bombeo: info_prueba_bombeo.fecha_prueba_bombeo,

      // * datos de sesion
      id_sesion_prueba_bombeo:
        info_sesion_bombeo?.id_sesion_prueba_bombeo as any,
      hora_inicio: info_sesion_bombeo?.fecha_inicio,
      cod_tipo_sesion: info_sesion_bombeo?.cod_tipo_sesion as any,

      // * data prueba de bombeo por sesión
      tiempo_transcurrido: info_data_sesion_bombeo?.tiempo_transcurrido,
      nivel: info_data_sesion_bombeo?.nivel,
      resultado: info_data_sesion_bombeo?.resultado,
      caudal: info_data_sesion_bombeo?.caudal,
    });
    set_fecha_prubea_bombeo(
      dayjs(info_prueba_bombeo.fecha_prueba_bombeo) ?? null
    );
    setValue_bombeo(
      'fecha_prueba_bombeo',
      dayjs(info_prueba_bombeo.fecha_prueba_bombeo)?.format('YYYY-MM-DD') ?? ''
    );
    setHoraPruebaBombeo(dayjs(info_sesion_bombeo?.fecha_inicio));
    setValue_bombeo(
      'hora_inicio',
      dayjs(info_sesion_bombeo?.fecha_inicio).format('HH:mm:ss') ?? ''
    );
  }, [info_prueba_bombeo, info_sesion_bombeo, info_data_sesion_bombeo]);

  useEffect(() => {
    if (id_bombeo_general) {
      void fetch_data_general_sesion();
      void fetch_data_anexos_bombeo(id_bombeo_general);
    }
  }, [id_bombeo_general]);

  useEffect(() => {
    if (instrumentos?.id_pozo) {
      void fetch_data_pozo_instrumentos_select(instrumentos?.id_pozo);
    }
  }, [instrumentos?.id_pozo]);

  useEffect(() => {
    if (id_sesion_bombeo) {
      void fetch_data_sesion();
    }
  }, [id_sesion_bombeo]);

  useEffect(() => {
    setHoraPruebaBombeo(null);
  }, []);

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
            <Title title=" EDICIÓN DE PRUEBAS DE BOMBEO " />
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
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Lugar de prueba de bombeo"
                  fullWidth
                  size="small"
                  margin="dense"
                  required
                  disabled={false}
                  value={value}
                  onChange={onChange}
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
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Latitud"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={true}
                  value={value}
                  onChange={onChange}
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
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Longitud"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={true}
                  value={value}
                  onChange={onChange}
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
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Descripción"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  multiline
                  value={value}
                  onChange={onChange}
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
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select
                        value={value}
                        onChange={(selectedOption) => {
                          onChange(selectedOption);
                        }}
                        options={pozos_selected}
                        placeholder="Seleccionar"
                      />
                      <label>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            marginLeft: '0.25rem',
                          }}
                        >
                          Pozo seleccioando
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
            </>
          ) : null}
          <Grid item spacing={2} justifyContent="end" container>
            <Grid item>
              <LoadingButton
                variant="contained"
                color="success"
                type="submit"
                disabled={is_saving_general}
                loading={is_saving_general}
              >
                Actualizar DATOS GENERALES
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <form
        onSubmit={onSubmit_editar_sesion}
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
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Sección de prueba de bombeo
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="cod_tipo_sesion"
              control={control_bombeo}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label=" Prueba de bombeo / caudal "
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={false}
                  value={value}
                  onChange={onChange}
                  // error={!!errors_bombeo.caudal}
                  // helperText={
                  //   errors_bombeo.caudal
                  //     ? 'Es obligatorio seleccionar un tipo de prueba de bombeo / caudal'
                  //     : 'ingrese el tipo de prueba de bombeo / caudal'
                  // }
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
                onChange={(value) => {
                  handle_time_change(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    {...register_bombeo('hora_inicio', { required: false })}
                    // error={!!errors_bombeo.hora_inicio}
                    // helperText={
                    //   errors_bombeo.hora_inicio
                    //     ? 'Es obligatorio la hora de inicio de la prueba de bombeo'
                    //     : 'Ingrese la hora de inicio de la prueba de bombeo'
                    // }
                  />
                )}
                ampm={true}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item spacing={2} justifyContent="end" container>
            <Grid item>
              <LoadingButton
                variant="contained"
                color="success"
                type="submit"
                disabled={
                  is_saving_sesion ||
                  !data_watch_bombeo?.cod_tipo_sesion ||
                  !data_watch_bombeo?.hora_inicio
                }
                loading={is_saving_sesion}
              >
                Actualizar sesión
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <form
        onSubmit={onSubmit_editar_datoprueba}
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
          {rows_data_sesion_bombeo.length > 0 && (
            <>
              <Grid item xs={12}>
                <Title title="Datos de la medición" />
              </Grid>
              <Grid item xs={12}>
                <>
                  <DataGrid
                    autoHeight
                    rows={rows_data_sesion_bombeo}
                    columns={columns_data_sesion}
                    getRowId={(row) => uuidv4()}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                </>
              </Grid>
            </>
          )}
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
              rules={{ required: false }}
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
                  disabled={false}
                  fullWidth
                  required={false}
                  onChange={onChange}
                  // error={!!errors_bombeo.tiempo_transcurrido}
                  // helperText={
                  //   errors_bombeo.tiempo_transcurrido
                  //     ? 'Es obligatorio ingresar el tiempo transcurrido'
                  //     : 'Ingrese el tiempo transcurrido'
                  // }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="nivel"
              control={control_bombeo}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Nivel (m)"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={false}
                  value={value}
                  onChange={onChange}
                  //   error={!!errors_bombeo.nivel}
                  //   helperText={
                  //     errors_bombeo.nivel
                  //       ? 'Es obligatorio ingresar el nivel'
                  //       : 'Ingrese el nivel'
                  //   }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="resultado"
              control={control_bombeo}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Abatimiento / Recuperación (m)"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={false}
                  value={value}
                  onChange={onChange}
                  // error={!!errors_bombeo.resultado}
                  // helperText={
                  //   errors_bombeo.resultado
                  //     ? 'Es obligatorio ingresar el abatimiento / recuperación'
                  //     : 'Ingrese el abatimiento / recuperación'
                  // }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="caudal"
              control={control_bombeo}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Caudal (l/s)"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={false}
                  value={value}
                  onChange={onChange}
                  // error={!!errors_bombeo.caudal}
                  // helperText={
                  //   errors_bombeo.caudal
                  //     ? 'Es obligatorio ingresar el caudal'
                  //     : 'Ingrese el caudal'
                  // }
                />
              )}
            />
          </Grid>{' '}
          {/* <Box sx={{ flexGrow: 1 }}>
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
              >
                Agregar
              </Button>
            </Stack>
          </Box> */}
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
          <Grid item spacing={2} justifyContent="end" container>
            <Grid item>
              <LoadingButton
                variant="contained"
                color="success"
                type="submit"
                disabled={
                  is_saving_datoprueba ||
                  !data_watch_bombeo?.tiempo_transcurrido ||
                  !data_watch_bombeo?.nivel ||
                  !data_watch_bombeo?.resultado ||
                  !data_watch_bombeo?.caudal
                }
                loading={is_saving_datoprueba}
              >
                Actualizar dato
              </LoadingButton>
            </Grid>
          </Grid>
          {/* <Grid item xs={12}></Grid> */}
        </Grid>
      </form>
      <form
        onSubmit={onSubmit_editar_archivos}
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
          {rows_anexos_bombeo.length > 0 && (
            <>
              <Grid item xs={12}>
                <Title title="Anexos Asociados" />
              </Grid>
              <Grid item xs={12}>
                <>
                  <DataGrid
                    autoHeight
                    rows={rows_anexos_bombeo}
                    columns={columns_anexos}
                    getRowId={(row) => uuidv4()}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                </>
              </Grid>
            </>
          )}
          {is_open_edit_archivos && (
            <>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_actualizar"
                  control={control_bombeo}
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
                      error={!!errors_bombeo.nombre_actualizar}
                      helperText={
                        errors_bombeo?.nombre_actualizar?.type === 'required'
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
                disabled={is_saving}
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
