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
import { useActividadHook } from '../../hooks/useActividadHook';
import { DataContextActividades } from '../../context/context';

//* FECHAS
// import type { Dayjs } from 'dayjs';
// import dayjs from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InfoIcon from '@mui/icons-material/Info';
import dayjs from 'dayjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarActividad: React.FC = () => {
  const {
    control_actividad,
    errors_actividad,
    reset_actividad,
    data_watch_actividad,
    register_actividad,
    set_value_actividad,

    onsubmit_actividad,
    onsubmit_editar,
    is_saving_actividad,

    limpiar_formulario_actividad,

    // * fechas
    fecha_creacion,
    set_fecha_creacion,
    handle_change_fecha_creacion,
  } = useActividadHook();

  const {
    set_id_programa,
    set_id_proyecto,
    set_id_plan,
    set_id_producto,
    set_id_actividad,
  } = useContext(DataContextActividades);

  const dispatch = useAppDispatch();

  const { mode, actividad } = useAppSelector((state) => state.planes);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_actividad();
    }
    if (mode.editar) {
      set_value_actividad(
        'fecha_creacion',
        dayjs(actividad.fecha_creacion).format('YYYY-MM-DD')
      );
      set_fecha_creacion(actividad.fecha_creacion);
      set_id_programa(actividad.id_programa);
      set_id_proyecto(actividad.id_proyecto);
      set_id_plan(actividad.id_plan ?? null);
      set_id_producto(actividad.id_producto ?? null);
      set_id_actividad(actividad.id_actividad ?? null);
      reset_actividad({
        id_actividad: actividad.id_actividad,
        nombre_actividad: actividad.nombre_actividad,
        numero_actividad: actividad.numero_actividad,
        nombre_plan: actividad.nombre_plan,
        nombre_producto: actividad.nombre_producto,
        numero_producto: actividad.numero_producto,
        id_plan: actividad.id_plan,
        id_producto: actividad.id_producto,
        id_programa: actividad.id_programa,
        id_proyecto: actividad.id_proyecto,
        fecha_creacion: actividad.fecha_creacion,
        cumplio: actividad.cumplio,
      });
    }
  }, [mode, actividad]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode.crear) {
            onsubmit_actividad();
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
            <Title title="Registro de actividades" />
          </Grid>
          {mode.editar ? (
            <>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_plan"
                  control={control_actividad}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Nombre del plan"
                      variant="outlined"
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
                  control={control_actividad}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Nombre del producto"
                      variant="outlined"
                      value={value}
                      disabled={true}
                      required={true}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>{' '}
              {/* numero_producto */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="numero_producto"
                  control={control_actividad}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Numero del producto"
                      variant="outlined"
                      value={value}
                      disabled={true}
                      required={true}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
            </>
          ) : null}
          <Grid item xs={12} sm={6}>
            <Controller
              name="nombre_actividad"
              control={control_actividad}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Nombre actividad"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_actividad.nombre_actividad}
                  helperText={
                    errors_actividad.nombre_actividad
                      ? 'Es obligatorio ingresar un nombre'
                      : 'Ingrese un nombre'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="numero_actividad"
              control={control_actividad}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Numero del actividad"
                  type="number"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_actividad.numero_actividad}
                  helperText={
                    errors_actividad.numero_actividad
                      ? 'Es obligatorio ingresar un número de actividad'
                      : 'Ingrese un número de actividad'
                  }
                />
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
              control={control_actividad}
              // defaultValue=""
              rules={{
                required: data_watch_actividad.cumplio
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
                          <strong>Actividad cumplida</strong>
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
                          <strong>Actividad no cumplida</strong>
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
                    {...register_actividad('fecha_creacion', {
                      required: true,
                    })}
                    error={!!errors_actividad.fecha_creacion}
                    helperText={
                      errors_actividad.fecha_creacion
                        ? 'Es obligatorio la fecha de creación'
                        : ''
                    }
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button
                variant="contained"
                color="error"
                disabled={false}
                onClick={() => {
                  limpiar_formulario_actividad();
                  dispatch(
                    set_current_mode_planes({
                      ver: true,
                      crear: false,
                      editar: false,
                    })
                  );
                }}
              >
                Cerrar
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="warning"
                disabled={false}
                onClick={() => {
                  limpiar_formulario_actividad();
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
                disabled={is_saving_actividad}
                startIcon={<SaveIcon />}
                loading={is_saving_actividad}
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
