/* eslint-disable @typescript-eslint/naming-convention */
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Title } from '../../../../../components/Title';
import { Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useContext, useEffect } from 'react';
import { set_current_mode_planes } from '../../../store/slice/indexPlanes';
import { useIndicadorHook } from '../../hooks/useIndicadorHook';
import { DataContextIndicador } from '../../context/context';
import { tipo_medida, tipo_indicador } from '../../choices/selects';

//* FECHAS
// import type { Dayjs } from 'dayjs';
// import dayjs from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InfoIcon from '@mui/icons-material/Info';
import dayjs from 'dayjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarIndicacdor: React.FC = () => {
  const {
    control_indicador,
    errors_indicador,
    reset_indicador,
    set_value_indicador,
    register_indicador,
    data_watch_indicador,

    onsubmit_indicador,
    onsubmit_editar,
    is_saving_indicador,

    limpiar_formulario_indicador,
    fecha_creacion,
    set_fecha_creacion,
    handle_change_fecha_creacion,
  } = useIndicadorHook();

  const {
    // planes_selected,
    // productos_selected,
    // actividad_selected,
    medidor_selected,
    tipos_selected,
    // proyectos_selected,
    // fetch_data_proyectos_selected,
    // fetch_data_planes_selected,
    // fetch_data_producto_selected,
    // fetch_data_actividad_selected,
    fetch_data_medidor_selected,
    fetch_data_tipos_selected,
  } = useContext(DataContextIndicador);

  const dispatch = useAppDispatch();

  const { mode, indicador } = useAppSelector((state) => state.planes);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_indicador();
    }
    if (mode.editar) {
      console.log('indicador', indicador);
      set_value_indicador(
        'fecha_creacion',
        dayjs(indicador.fecha_creacion).format('YYYY-MM-DD')
      );
      set_fecha_creacion(indicador.fecha_creacion);
      reset_indicador({
        id_indicador: indicador.id_indicador,
        nombre_medicion: indicador.nombre_medicion,
        nombre_tipo: indicador.nombre_tipo,
        nombre_producto: indicador.nombre_producto,
        nombre_actividad: indicador.nombre_actividad,
        nombre_plan: indicador.nombre_plan,
        nombre_indicador: indicador.nombre_indicador,
        nombre_proyecto: indicador.nombre_proyecto,
        numero_indicador: indicador.numero_indicador,
        linea_base: indicador.linea_base,
        medida: indicador.medida,
        tipo_indicador: indicador.tipo_indicador,
        id_medicion: indicador.id_medicion,
        id_tipo: indicador.id_tipo,
        id_producto: indicador.id_producto,
        id_actividad: indicador.id_actividad,
        id_plan: indicador.id_plan,
        id_proyecto: indicador.id_proyecto,
        fecha_creacion: indicador.fecha_creacion,
        cumplio: indicador.cumplio,
      });
    }
  }, [mode, indicador]);

  useEffect(() => {
    // fetch_data_planes_selected();
    // fetch_data_producto_selected();
    // fetch_data_actividad_selected();
    fetch_data_medidor_selected();
    fetch_data_tipos_selected();
    // fetch_data_proyectos_selected();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode.crear) {
            onsubmit_indicador();
          }
          if (mode.editar) {
            onsubmit_editar();
          }
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
            <Title title="Registro de indicadores" />
          </Grid>
          {mode.editar ? (
            <>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_plan"
                  control={control_indicador}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Nombre del plan"
                      variant="outlined"
                      multiline
                      value={value}
                      disabled={true}
                      required={true}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_proyecto"
                  control={control_indicador}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Nombre del proyecto"
                      variant="outlined"
                      multiline
                      value={value}
                      disabled={true}
                      required={true}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_producto"
                  control={control_indicador}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Nombre del producto"
                      variant="outlined"
                      multiline
                      value={value}
                      disabled={true}
                      required={true}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>{' '}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_actividad"
                  control={control_indicador}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Nombre de la actividad"
                      variant="outlined"
                      multiline
                      value={value}
                      disabled={true}
                      required={true}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>{' '}
              {/* <Grid item xs={12} sm={6}></Grid> */}
            </>
          ) : null}
          <Grid item xs={12} sm={6}>
            <Controller
              name="nombre_indicador"
              control={control_indicador}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Nombre indicador"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_indicador.nombre_indicador}
                  helperText={
                    errors_indicador.nombre_indicador
                      ? 'Es obligatorio ingresar un nombre'
                      : 'Ingrese un nombre'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="numero_indicador"
              control={control_indicador}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Numero indicador"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_indicador.numero_indicador}
                  helperText={
                    errors_indicador.numero_indicador
                      ? 'Es obligatorio ingresar un número de indicador'
                      : 'Ingrese un número de indicador'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="linea_base"
              control={control_indicador}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Nombre linea base"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_indicador.linea_base}
                  helperText={
                    errors_indicador.linea_base
                      ? 'Es obligatorio ingresar la linea base'
                      : 'Ingrese la linea base'
                  }
                />
              )}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="id_plan"
              control={control_indicador}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required
                  error={!!errors_indicador.id_plan}
                  helperText={
                    errors_indicador?.id_plan?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el plan'
                  }
                >
                  {planes_selected.map((option) => (
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
              name="id_proyecto"
              control={control_indicador}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required
                  error={!!errors_indicador.id_proyecto}
                  helperText={
                    errors_indicador?.id_proyecto?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el proyecto'
                  }
                >
                  {proyectos_selected.map((option) => (
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
              name="id_producto"
              control={control_indicador}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required
                  error={!!errors_indicador.id_producto}
                  helperText={
                    errors_indicador?.id_producto?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el producto'
                  }
                >
                  {productos_selected.map((option) => (
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
              name="id_actividad"
              control={control_indicador}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required
                  error={!!errors_indicador.id_actividad}
                  helperText={
                    errors_indicador?.id_actividad?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese la actividad'
                  }
                >
                  {actividad_selected.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid> */}
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="id_medicion"
              control={control_indicador}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required
                  error={!!errors_indicador.id_medicion}
                  helperText={
                    errors_indicador?.id_medicion?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el medidor'
                  }
                >
                  {medidor_selected.map((option) => (
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
              name="id_tipo"
              control={control_indicador}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required
                  error={!!errors_indicador.id_tipo}
                  helperText={
                    errors_indicador?.id_tipo?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el tipo'
                  }
                >
                  {tipos_selected.map((option) => (
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
              name="medida"
              control={control_indicador}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Tipo de medida"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_indicador.medida}
                  helperText={
                    errors_indicador.medida
                      ? 'Es obligatorio ingresar un tipo de medida'
                      : 'Ingrese un tipo de medida'
                  }
                >
                  {tipo_medida.map((option) => (
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
              name="tipo_indicador"
              control={control_indicador}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Tipo de indicador"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_indicador.tipo_indicador}
                  helperText={
                    errors_indicador.tipo_indicador
                      ? 'Es obligatorio ingresar un tipo de indicador'
                      : 'Ingrese un tipo de indicador'
                  }
                >
                  {tipo_indicador.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid
            sx={{
              marginBottom: '10px',
              width: 'auto',
            }}
            item
            xs={12}
            sm={6}
          >
            <Controller
              name="cumplio"
              control={control_indicador}
              // defaultValue=""
              rules={{
                required: data_watch_indicador.cumplio
                  ? 'Este campo es requerido'
                  : false,
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={value}
                        onChange={(e) => {
                          onChange(e.target.checked);
                        }}
                        // name="checkedB"
                        color="primary"
                      />
                    }
                    label={
                      value ? (
                        <Typography variant="body2">
                          <strong>Indicador cumplido</strong>
                          <Tooltip title="SI" placement="right">
                            <InfoIcon
                              sx={{
                                width: '1.2rem',
                                height: '1.2rem',
                                ml: '0.5rem',
                                color: 'green',
                              }}
                            />
                          </Tooltip>
                        </Typography>
                      ) : (
                        <Typography variant="body2">
                          <strong>Indicador no cumplido</strong>
                          <Tooltip title="No" placement="right">
                            <InfoIcon
                              sx={{
                                width: '1.2rem',
                                height: '1.2rem',
                                ml: '0.5rem',
                                color: 'orange',
                              }}
                            />
                          </Tooltip>
                        </Typography>
                      )
                    }
                  />
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de creacion"
                value={fecha_creacion}
                onChange={(value) => {
                  handle_change_fecha_creacion(value);
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    {...register_indicador('fecha_creacion', {
                      required: true,
                    })}
                    error={!!errors_indicador.fecha_creacion}
                    helperText={
                      errors_indicador.fecha_creacion
                        ? 'Es obligatorio la fecha de creación del indicador'
                        : ''
                    }
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="medida"
              control={control_indicador}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Tipo de medida"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_indicador.medida}
                  helperText={
                    errors_indicador.medida
                      ? 'Es obligatorio ingresar un tipo de medida'
                      : 'Ingrese un tipo de medida'
                  }
                >
                  {tipo_medida.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid> */}
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button
                variant="outlined"
                color="warning"
                disabled={false}
                onClick={() => {
                  limpiar_formulario_indicador();
                  dispatch(
                    set_current_mode_planes({
                      ver: true,
                      crear: true,
                      editar: false,
                    })
                  );
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
                disabled={is_saving_indicador}
                startIcon={<SaveIcon />}
                loading={is_saving_indicador}
              >
                {mode.editar ? 'Actualizar' : 'Guardar'}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
