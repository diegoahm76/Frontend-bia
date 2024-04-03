/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
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
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Title } from '../../../../../components/Title';
import { tipo_aforo } from './utils/choices/Choices';
import { type GridColDef, DataGrid } from '@mui/x-data-grid';
import { colums_aforos } from './utils/colums/colums';
import { use_register_aforo_hook } from './hook/registerAforoHook';
import { Controller } from 'react-hook-form';
import { useRegisterInstrumentoHook } from '../RegistroInstrumentos/hook/useRegisterInstrumentoHook';
import { useAppSelector } from '../../../../../hooks';
import { useEffect } from 'react';
import { use_register_laboratorio_hook } from '../ResultadoLaboratorio/hook/useRegisterLaboratorioHook';
import { LoadingButton } from '@mui/lab';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import { AgregarArchivo } from '../../../../../utils/AgregarArchivo/AgregarArchivo';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { IconButtonDownLoad } from '../../../../../utils/DownloadButton/IconButtonDownLoad';
import { ButtonInstrumentos } from '../ButtonInstrumentos';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarCartera: React.FC = () => {
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
              set_value_cartera_aforo(
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

  const columns_aforo: GridColDef[] = [
    ...colums_aforos,
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params) => (
        <>
          <Tooltip title="Editar registro de cartera de aforo">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<EditIcon />}
              onClick={() => {
                // Llena los campos del formulario con los valores del registro a editar
                set_value_cartera_aforo(
                  'distancia_a_la_orilla',
                  params.row.distancia_a_la_orilla
                );
                set_value_cartera_aforo('profundidad', params.row.profundidad);
                set_value_cartera_aforo(
                  'velocidad_superficial',
                  params.row.velocidad_superficial
                );
                set_value_cartera_aforo(
                  'velocidad_profunda',
                  params.row.velocidad_profunda
                );
                // Establece el modo de edición
                setEditingId(params.row.id);
              }}
            />
          </Tooltip>
          <Tooltip title="Eliminar registro de cartera de aforo">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<DeleteIcon 
                titleAccess="Eliminar registro de cartera de aforo"
                sx={{
                  color: 'red',
                  width: '18px',
                  height: '18px',
                }}
              />}
              onClick={() => {
                handle_delete_select(params.row.id);
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const {
    control_cartera_aforo,
    errors_cartera_aforo,
    register_cartera_aforo,
    set_value_cartera_aforo,
    reset_cartera_aforo,

    // *Datos generales
    fecha_aforo,
    rows_data_cartera,
    rows_anexos_cartera,
    set_fecha_aforo,
    setEditingId,
    fetch_data_anexos_carteras,
    fetch_data_cartera_especifica,
    handle_date_change,
    handle_agregar_select,
    handle_delete_select,
    watch_aforo,
    // *onSubmit_select
    onSubmit_select,
    is_saving,

    // * Editar archivos
    is_open_edit_archivos,
    set_is_open_edit_archivos,
    set_id_archivo,
  } = use_register_aforo_hook();

  const {
    // watch_instrumento,
    reset_instrumento,
    control,
  } = useRegisterInstrumentoHook();

  const {
    // * cuenca
    cuenca_select,
    fetch_data_cuencas_instrumentos_select,
  } = use_register_laboratorio_hook();

  const {
    instrumentos,
    id_instrumento: id_instrumento_slice,
    info_cartera,
    id_cartera_aforos,
  } = useAppSelector((state) => state.instrumentos_slice);

  useEffect(() => {
    reset_instrumento({
      nombre: instrumentos.nombre,
      nombre_seccion: instrumentos.nombre_seccion,
      nombre_subseccion: instrumentos.nombre_subseccion,
    });
  }, [instrumentos]);

  useEffect(() => {
    //  console.log('')(id_cartera_aforos, 'id_cartera_aforos');
    reset_cartera_aforo({
      id_cuenca: info_cartera.id_cuenca as any,
      ubicacion_aforo: info_cartera.ubicacion_aforo,
      descripcion: info_cartera.descripcion,
      latitud: info_cartera.latitud,
      longitud: info_cartera.longitud,
      fecha_aforo: info_cartera.fecha_aforo,
      cod_tipo_aforo: info_cartera.cod_tipo_aforo,
      numero_serie: info_cartera.numero_serie,
      numero_helice: info_cartera.numero_helice,
      molinete: info_cartera.molinete,
      id_cartera_aforos: info_cartera.id_cartera_aforos,
      id_instrumento: info_cartera.id_instrumento,
    });
    set_value_cartera_aforo(
      'fecha_aforo',
      dayjs(info_cartera.fecha_aforo).format('YYYY-MM-DDTHH:mm:ss')
    );
    set_fecha_aforo(dayjs(info_cartera.fecha_aforo));
  }, [info_cartera]);

  useEffect(() => {
    if (id_instrumento_slice) {
      void fetch_data_cuencas_instrumentos_select();
    }
  }, [id_instrumento_slice]);

  useEffect(() => {
    if (info_cartera.id_cartera_aforos) {
      void fetch_data_anexos_carteras(info_cartera.id_cartera_aforos);
      void fetch_data_cartera_especifica(info_cartera.id_cartera_aforos);
    }
  }, [info_cartera.id_cartera_aforos]);

  return (
    <>
      <form
        onSubmit={onSubmit_select}
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
            <Title title=" INFORMACIÓN DE CARTERA DE AFOROS " />
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
              <DateTimePicker
                label="Fecha de Aforo"
                disabled={false}
                value={fecha_aforo}
                onChange={(value) => {
                  handle_date_change('fecha_aforo', value);
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    disabled={false}
                    size="small"
                    {...register_cartera_aforo('fecha_aforo', {
                      required: true,
                    })}
                    error={!!errors_cartera_aforo.fecha_aforo}
                    helperText={
                      errors_cartera_aforo.fecha_aforo
                        ? 'Es obligatorio seleccionar una fecha'
                        : 'Seleccione una fecha'
                    }
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="ubicacion_aforo"
              control={control_cartera_aforo}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Lugar de Aforo"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={true}
                  error={!!errors_cartera_aforo.ubicacion_aforo}
                  helperText={
                    errors_cartera_aforo.ubicacion_aforo
                      ? 'Es obligatorio ingresar un lugar'
                      : 'Ingrese un lugar'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="cod_tipo_aforo"
              control={control_cartera_aforo}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Tipo de Aforo"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  disabled={false}
                  required={true}
                  error={!!errors_cartera_aforo.cod_tipo_aforo}
                  helperText={
                    errors_cartera_aforo.cod_tipo_aforo
                      ? 'Es obligatorio ingresar un tipo de aforo'
                      : 'Ingrese un tipo de aforo'
                  }
                >
                  {tipo_aforo.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="molinete"
              control={control_cartera_aforo}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Molinete"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={true}
                  error={!!errors_cartera_aforo.molinete}
                  helperText={
                    errors_cartera_aforo.molinete
                      ? 'Es obligatorio ingresar un molinete'
                      : 'Ingrese un molinete'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="numero_serie"
              control={control_cartera_aforo}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="No. de serie"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={true}
                  error={!!errors_cartera_aforo.numero_serie}
                  helperText={
                    errors_cartera_aforo.numero_serie
                      ? 'Es obligatorio ingresar un número de serie'
                      : 'Ingrese un número de serie'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="numero_helice"
              control={control_cartera_aforo}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="No. de hélices"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={true}
                  error={!!errors_cartera_aforo.numero_helice}
                  helperText={
                    errors_cartera_aforo.numero_helice
                      ? 'Es obligatorio ingresar un número de hélices'
                      : 'Ingrese un número de hélices'
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
              control={control_cartera_aforo}
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
                  error={!!errors_cartera_aforo.latitud}
                  helperText={
                    errors_cartera_aforo.latitud
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
              control={control_cartera_aforo}
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
                  error={!!errors_cartera_aforo.longitud}
                  helperText={
                    errors_cartera_aforo.longitud
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
              control={control_cartera_aforo}
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
                  error={!!errors_cartera_aforo.descripcion}
                  helperText={
                    errors_cartera_aforo.descripcion
                      ? 'Es obligatorio ingresar una descripcion'
                      : 'Ingrese una descripcion'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="id_cuenca"
              control={control_cartera_aforo}
              defaultValue={0}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Cuanca Asociada"
                  select
                  size="small"
                  margin="dense"
                  disabled={true}
                  fullWidth
                  required
                  error={!!errors_cartera_aforo.id_cuenca}
                  helperText={
                    errors_cartera_aforo.id_cuenca
                      ? 'Es obligatorio seleccionar una cuenca'
                      : 'Seleccione una cuenca'
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
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Agregar Registro de medición
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="distancia_a_la_orilla"
              control={control_cartera_aforo}
              defaultValue=""
              rules={{ required: rows_data_cartera.length === 0 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Distancia de la orilla (m)"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={rows_data_cartera.length === 0}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="profundidad"
              control={control_cartera_aforo}
              defaultValue=""
              rules={{ required: rows_data_cartera.length === 0 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Profundidad (m)"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={rows_data_cartera.length === 0}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="velocidad_superficial"
              control={control_cartera_aforo}
              defaultValue=""
              rules={{ required: rows_data_cartera.length === 0 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Velocidad superficial (m/s)"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={rows_data_cartera.length === 0}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="velocidad_profunda"
              control={control_cartera_aforo}
              defaultValue=""
              rules={{ required: rows_data_cartera.length === 0 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Velocidad profunda (m/s)"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={rows_data_cartera.length === 0}
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
                onClick={handle_agregar_select}
                disabled={
                  !watch_aforo.distancia_a_la_orilla ||
                  !watch_aforo.profundidad ||
                  !watch_aforo.velocidad_superficial ||
                  !watch_aforo.velocidad_profunda
                }
              >
                Agregar
              </Button>
            </Stack>
          </Box>
          {rows_data_cartera.length > 0 && (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Datos Aforo:
                </Typography>
                <Divider />
                <DataGrid
                  autoHeight
                  rows={rows_data_cartera}
                  columns={columns_aforo}
                  getRowId={(row) => row.id}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Title title="Anexos asociados a la cartera" />
          </Grid>
          <Grid item xs={12}>
            <>
              <DataGrid
                autoHeight
                rows={rows_anexos_cartera}
                columns={columns_anexos}
                getRowId={(row) => uuidv4()}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </>
          </Grid>
          {is_open_edit_archivos && (
            <>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_actualizar"
                  control={control_cartera_aforo}
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
                      error={!!errors_cartera_aforo.nombre_actualizar}
                      helperText={
                        errors_cartera_aforo?.nombre_actualizar?.type ===
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
                disabled={is_saving || rows_data_cartera.length === 0}
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
