/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import {
  Box,
  Button,
  Divider,
  Grid,
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
import { ButtonInstrumentos } from '../ButtonInstrumentos';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarCartera: React.FC = () => {
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
                titleAccess="Eliminar elemento"
                sx={{
                  color: 'red',
                  width: '18px',
                  height: '18px',
                }}
                />}
              onClick={() => {
                handle_delete(params.row.id);
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

    // *Datos generales
    fecha_aforo,
    row_aforo,
    setEditingId,
    handle_date_change,
    handle_agregar,
    handle_delete,
    watch_aforo,
    // *onSubmit
    onSubmit,
    is_saving,
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

  const { instrumentos, id_instrumento: id_instrumento_slice } = useAppSelector(
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
    if (id_instrumento_slice) {
      void fetch_data_cuencas_instrumentos_select();
    }
  }, [id_instrumento_slice]);

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
            <Title title=" REGISTRO DE CARTERA DE AFOROS " />
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
                  /* helperText={
                        error
                          ? 'Es obligatorio subir un archivo'
                          : 'Seleccione un archivo'
                      } */
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Fecha de Aforo"
                value={fecha_aforo}
                onChange={(value) => {
                  handle_date_change('fecha_aforo', value);
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
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
                  label="Seleccione una cuenca"
                  select
                  size="small"
                  margin="dense"
                  disabled={false}
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
              Registro de medición
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
              rules={{ required: row_aforo.length === 0 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Distancia de la orilla (m)"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={row_aforo.length === 0}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="profundidad"
              control={control_cartera_aforo}
              defaultValue=""
              rules={{ required: row_aforo.length === 0 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Profundidad (m)"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={row_aforo.length === 0}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="velocidad_superficial"
              control={control_cartera_aforo}
              defaultValue=""
              rules={{ required: row_aforo.length === 0 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Velocidad superficial (m/s)"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={row_aforo.length === 0}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="velocidad_profunda"
              control={control_cartera_aforo}
              defaultValue=""
              rules={{ required: row_aforo.length === 0 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Velocidad profunda (m/s)"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={row_aforo.length === 0}
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
                onClick={handle_agregar}
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
          {row_aforo.length > 0 && (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Datos Aforo:
                </Typography>
                <Divider />
                <DataGrid
                  autoHeight
                  rows={row_aforo}
                  columns={columns_aforo}
                  getRowId={(row) => row.id}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}></Grid>
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
                disabled={is_saving || row_aforo.length === 0}
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
