/* eslint-disable @typescript-eslint/naming-convention */
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
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
import { useEffect } from 'react';
import { useProyectoHook } from '../../hooks/useProyectoHook';
import { set_current_mode_planes } from '../../../store/slice/indexPlanes';
//* FECHAS
// import type { Dayjs } from 'dayjs';
// import dayjs from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InfoIcon from '@mui/icons-material/Info';
import dayjs from 'dayjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarProyecto: React.FC = () => {
  const {
    control_proyecto,
    errors_proyecto,
    reset_proyecto,
    data_watch_proyecto,
    register_proyecto,
    set_value_proyecto,

    onsubmit_proyecto,
    onsubmit_editar,
    is_saving_proyecto,

    limpiar_formulario_proyecto,

    fecha_creacion,
    set_fecha_creacion,
    handle_change_fecha_creacion,
  } = useProyectoHook();

  const dispatch = useAppDispatch();

  const { mode, proyecto } = useAppSelector((state) => state.planes);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_proyecto();
    }
    if (mode.editar) {
      set_value_proyecto(
        'fecha_creacion',
        dayjs(proyecto.fecha_creacion).format('YYYY-MM-DD')
      );
      set_fecha_creacion(proyecto.fecha_creacion);
      reset_proyecto({
        id_proyecto: proyecto.id_proyecto,
        nombre_proyecto: proyecto.nombre_proyecto,
        nombre_programa: proyecto.nombre_programa,
        pondera_1: proyecto.pondera_1,
        pondera_2: proyecto.pondera_2,
        pondera_3: proyecto.pondera_3,
        pondera_4: proyecto.pondera_4,
        numero_proyecto: proyecto.numero_proyecto,
        id_programa: proyecto.id_programa,
        fecha_creacion: proyecto.fecha_creacion,
        cumplio: proyecto.cumplio,
        id_plan: proyecto.id_plan,
      });
    }
  }, [mode, proyecto]);

  // Validación porcentaje

  const pondera_1 = Number(data_watch_proyecto.pondera_1);
  const pondera_2 = Number(data_watch_proyecto.pondera_2);
  const pondera_3 = Number(data_watch_proyecto.pondera_3);
  const pondera_4 = Number(data_watch_proyecto.pondera_4);

  const sumaPorcentajes = pondera_1 + pondera_2 + pondera_3 + pondera_4;

  // Verifica si la suma de los porcentajes es mayor que 100
  const isGuardarDisabled = sumaPorcentajes > 100;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode.crear) {
            onsubmit_proyecto();
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
            <Title title="Registro de proyectos" />
          </Grid>
          {mode.editar ? (
            <>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_programa"
                  control={control_proyecto}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Nombre del programa"
                      variant="outlined"
                      value={value}
                      disabled={true}
                      required={true}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
            </>
          ) : null}
          <Grid item xs={12} sm={6}>
            <Controller
              name="nombre_proyecto"
              control={control_proyecto}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Nombre del proyecto"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_proyecto.nombre_proyecto}
                  helperText={
                    errors_proyecto.nombre_proyecto
                      ? 'Es obligatorio ingresar un nombre'
                      : 'Ingrese un nombre'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="numero_proyecto"
              control={control_proyecto}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Numero del proyecto"
                  type="number"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_proyecto.numero_proyecto}
                  helperText={
                    errors_proyecto.numero_proyecto
                      ? 'Es obligatorio ingresar un número de proyecto'
                      : 'Ingrese un número de proyecto'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="pondera_1"
              control={control_proyecto}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Valor Año 1"
                  variant="outlined"
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  // error={!!errors_proyecto.pondera_1}
                  // helperText={
                  //   errors_proyecto.pondera_1
                  //     ? 'Es obligatorio ingresar un numero'
                  //     : 'Ingrese un numero'
                  // }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="pondera_2"
              control={control_proyecto}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Valor Año 2"
                  variant="outlined"
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  // error={!!errors_proyecto.pondera_2}
                  // helperText={
                  //   errors_proyecto.pondera_2
                  //     ? 'Es obligatorio ingresar un numero'
                  //     : 'Ingrese un numero'
                  // }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="pondera_3"
              control={control_proyecto}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Valor Año 3"
                  variant="outlined"
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  // error={!!errors_proyecto.pondera_3}
                  // helperText={
                  //   errors_proyecto.pondera_3
                  //     ? 'Es obligatorio ingresar un numero'
                  //     : 'Ingrese un numero'
                  // }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="pondera_4"
              control={control_proyecto}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Valor Año 4"
                  variant="outlined"
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  // error={!!errors_proyecto.pondera_4}
                  // helperText={
                  //   errors_proyecto.pondera_4
                  //     ? 'Es obligatorio ingresar un numero'
                  //     : 'Ingrese un numero'
                  // }
                />
              )}
            />
          </Grid>
          {isGuardarDisabled ? (
            <Grid item xs={12}>
              <Grid container justifyContent="center" textAlign="center">
                <Alert icon={false} severity="error">
                  <Typography>
                    El total de los porcentajes no debe superar el 100%{' '}
                  </Typography>
                </Alert>
              </Grid>
            </Grid>
          ) : null}
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
              control={control_proyecto}
              // defaultValue=""
              rules={{
                required: data_watch_proyecto.cumplio
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
                          <strong>Proyecto cumplido</strong>
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
                          <strong>Proyecto no cumplido</strong>
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
                    {...register_proyecto('fecha_creacion', {
                      required: true,
                    })}
                    error={!!errors_proyecto.fecha_creacion}
                    helperText={
                      errors_proyecto.fecha_creacion
                        ? 'Es obligatorio la fecha de creación del proyecto'
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
                variant="outlined"
                color="warning"
                disabled={false}
                onClick={() => {
                  limpiar_formulario_proyecto();
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
                disabled={is_saving_proyecto || isGuardarDisabled}
                startIcon={<SaveIcon />}
                loading={is_saving_proyecto}
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
