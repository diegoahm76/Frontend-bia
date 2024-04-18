/* eslint-disable @typescript-eslint/naming-convention */
import {
  Alert,
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
import { useprogramaHook } from '../../hooks/useprogramaHook';
import { set_current_mode_planes } from '../../../store/slice/indexPlanes';
//* FECHAS
// import type { Dayjs } from 'dayjs';
// import dayjs from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InfoIcon from '@mui/icons-material/Info';
import dayjs from 'dayjs';
import { DataContextprograma } from '../../context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarPrograma: React.FC = () => {
  const {
    control_programa,
    errors_programa,
    reset_programa,
    data_watch_programa,
    register_programa,
    set_value_programa,

    onsubmit_programa,
    onsubmit_editar,
    is_saving_programa,

    limpiar_formulario_programa,

    // fecha
    fecha_creacion,
    set_fecha_creacion,
    handle_change_fecha_creacion,
  } = useprogramaHook();

  const { sector_selected, fetch_data_sector } =
    useContext(DataContextprograma);

  const dispatch = useAppDispatch();

  const { mode, programa } = useAppSelector((state) => state.planes);

  useEffect(() => {
    fetch_data_sector();
  }, []);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_programa();
    }
    if (mode.editar) {
      set_value_programa(
        'fecha_creacion',
        dayjs(programa.fecha_creacion).format('YYYY-MM-DD')
      );
      set_fecha_creacion(programa.fecha_creacion);
      reset_programa({
        id_programa: programa.id_programa,
        nombre_plan: programa.nombre_plan,
        nombre_programa: programa.nombre_programa,
        numero_programa: programa.numero_programa,
        porcentaje_1: programa.porcentaje_1,
        porcentaje_2: programa.porcentaje_2,
        porcentaje_3: programa.porcentaje_3,
        porcentaje_4: programa.porcentaje_4,
        id_sector: programa.id_sector,
        id_eje_estrategico: programa.id_eje_estrategico,
        fecha_creacion: programa.fecha_creacion,
        cumplio: programa.cumplio,
      });
    }
  }, [mode, programa]);

  // Validación porcentaje

  const porcentaje_1 = Number(data_watch_programa.porcentaje_1);
  const porcentaje_2 = Number(data_watch_programa.porcentaje_2);
  const porcentaje_3 = Number(data_watch_programa.porcentaje_3);
  const porcentaje_4 = Number(data_watch_programa.porcentaje_4);

  const sumaPorcentajes =
    porcentaje_1 + porcentaje_2 + porcentaje_3 + porcentaje_4;

  // Verifica si la suma de los porcentajes es mayor que 100
  const isGuardarDisabled = sumaPorcentajes > 100;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode.crear) {
            onsubmit_programa();
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
            <Title title="Registro de programas" />
          </Grid>
          {mode.editar ? (
            <>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_plan"
                  control={control_programa}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Nombre del Plan"
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
              name="nombre_programa"
              control={control_programa}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Nombre del programa"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_programa.nombre_programa}
                  helperText={
                    errors_programa.nombre_programa
                      ? 'Es obligatorio ingresar un nombre'
                      : 'Ingrese un nombre'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="numero_programa"
              control={control_programa}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Número del programa"
                  variant="outlined"
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_programa.nombre_programa}
                  helperText={
                    errors_programa.nombre_programa
                      ? 'Es obligatorio ingresar un número de programa'
                      : 'Ingrese un número de programa'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="porcentaje_1"
              control={control_programa}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Año 1"
                  variant="outlined"
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0) {
                      onChange(e);
                    }
                  }}
                  error={!!errors_programa.porcentaje_1}
                  helperText={
                    errors_programa.porcentaje_1
                      ? 'Es obligatorio ingresar un parcentaje'
                      : 'Ingrese un porcentaje'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="porcentaje_2"
              control={control_programa}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Año 2"
                  variant="outlined"
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0) {
                      onChange(e);
                    }
                  }}
                  error={!!errors_programa.porcentaje_2}
                  helperText={
                    errors_programa.porcentaje_2
                      ? 'Es obligatorio ingresar un porcentaje'
                      : 'Ingrese un porcentaje'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="porcentaje_3"
              control={control_programa}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Año 3"
                  variant="outlined"
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0) {
                      onChange(e);
                    }
                  }}
                  error={!!errors_programa.porcentaje_3}
                  helperText={
                    errors_programa.porcentaje_3
                      ? 'Es obligatorio ingresar un porcentaje'
                      : 'Ingrese un porcentaje'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="porcentaje_4"
              control={control_programa}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Año 4"
                  variant="outlined"
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0) {
                      onChange(e);
                    }
                  }}
                  error={!!errors_programa.porcentaje_4}
                  helperText={
                    errors_programa.porcentaje_4
                      ? 'Es obligatorio ingresar un parcentaje'
                      : 'Ingrese un parcentaje'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="id_sector"
              control={control_programa}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Sector"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_programa.id_sector}
                  helperText={
                    errors_programa.id_sector
                      ? 'Es obligatorio ingresar un sector'
                      : 'Ingrese un sector'
                  }
                >
                  {sector_selected.map((option) => (
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
            md={4}
          >
            <Controller
              name="cumplio"
              control={control_programa}
              // defaultValue=""
              rules={{
                required: data_watch_programa.cumplio
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
                          <strong>Programa cumplido</strong>
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
                          <strong>Programa no cumplido</strong>
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
                label="Fecha de creación *"
                value={fecha_creacion}
                onChange={(value) => {
                  handle_change_fecha_creacion(value);
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    {...register_programa('fecha_creacion', {
                      required: true,
                    })}
                    error={!!errors_programa.fecha_creacion}
                    helperText={
                      errors_programa.fecha_creacion
                        ? 'Es obligatorio la fecha de creacion del programa'
                        : ''
                    }
                  />
                )}
              />
            </LocalizationProvider>
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
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button
                variant="outlined"
                color="warning"
                disabled={false}
                onClick={() => {
                  limpiar_formulario_programa();
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
                disabled={is_saving_programa || isGuardarDisabled}
                startIcon={<SaveIcon />}
                loading={is_saving_programa}
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
