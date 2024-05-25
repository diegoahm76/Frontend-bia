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
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useEffect, useState } from 'react';
import { set_current_mode_planes } from '../../../store/slice/indexPlanes';
import { useMetaHook } from '../../hooks/useMetaHook';
import { tipo_medida } from '../../../Indicadores/choices/selects';
import { NumericFormatCustom } from '../../../components/inputs/NumericInput';
import InfoIcon from '@mui/icons-material/Info';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Agregarmeta: React.FC = () => {
  const {
    control_meta,
    errors_meta,
    reset_meta,
    data_watch_meta,
    register_meta,
    set_value_meta,
    onsubmit_meta,
    onsubmit_editar,
    is_savingd_meta,

    limpiar_formulario_meta,
  } = useMetaHook();

  const dispatch = useAppDispatch();

  const { mode, meta } = useAppSelector((state) => state.planes);

  const [fecha_creacion_meta, set_fecha_creacion_meta] = useState<Dayjs | null>(
    null
  );

  const handle_date_creacion_change = (
    fieldName: string,
    value: Dayjs | null
  ): void => {
    if (value !== null) {
      switch (fieldName) {
        case 'fecha_crea':
          set_fecha_creacion_meta(value);
          set_value_meta('fecha_creacion_meta', value.format('YYYY-MM-DD'));
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (mode.crear) {
      set_value_meta(
        'fecha_creacion_meta',
        fecha_creacion_meta?.format('YYYY-MM-DD')
      );
      limpiar_formulario_meta();
    }
    if (mode.editar) {
      if (meta.fecha_creacion_meta) {
        set_fecha_creacion_meta(dayjs(meta.fecha_creacion_meta));
        set_value_meta('fecha_creacion_meta', meta.fecha_creacion_meta);
      }
      reset_meta({
        id_meta: meta.id_meta,
        nombre_indicador: meta.nombre_indicador,
        nombre_meta: meta.nombre_meta,
        unidad_meta: meta.unidad_meta,
        porcentaje_meta: meta.porcentaje_meta,
        valor_meta: meta.valor_meta,
        cumplio: meta.cumplio,
        fecha_creacion_meta: meta.fecha_creacion_meta,
        agno_1: meta.agno_1,
        agno_2: meta.agno_2,
        agno_3: meta.agno_3,
        agno_4: meta.agno_4,
        valor_ejecutado_compromiso: meta.valor_ejecutado_compromiso,
        valor_ejecutado_obligado: meta.valor_ejecutado_obligado,
        avance_fisico: meta.avance_fisico,
        id_indicador: meta.id_indicador,
        id_plan: meta.id_plan,
        id_programa: meta.id_programa,
        id_proyecto: meta.id_proyecto,
        id_producto: meta.id_producto,
        id_actividad: meta.id_actividad,
        nombre_plan: meta.nombre_plan,
        nombre_programa: meta.nombre_programa,
        nombre_proyecto: meta.nombre_proyecto,
        nombre_producto: meta.nombre_producto,
        nombre_actividad: meta.nombre_actividad,
      });
    }
  }, [mode, meta]);

  const porcentaje_meta = Number(data_watch_meta.porcentaje_meta);
  const isGuardarDisabled = porcentaje_meta > 100;

  const agno_1 = Number(data_watch_meta.agno_1);
  const agno_2 = Number(data_watch_meta.agno_2);
  const agno_3 = Number(data_watch_meta.agno_3);
  const agno_4 = Number(data_watch_meta.agno_4);

  const isAgno1Disabled = agno_1 + agno_2 + agno_3 + agno_4 > 100;

  const valor_meta = Number(data_watch_meta.valor_meta);
  const valor_ejecutado_compromiso = Number(
    data_watch_meta.valor_ejecutado_compromiso
  );
  const valor_ejecutado_obligado = Number(
    data_watch_meta.valor_ejecutado_obligado
  );

  const isValorEjecutadoDisabled =
    valor_ejecutado_compromiso > valor_meta ||
    valor_ejecutado_obligado > valor_meta;
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode.crear) {
            onsubmit_meta();
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
            <Title title="Registro de metas" />
          </Grid>
          {mode.editar ? (
            <>
              <Grid item xs={12}>
                <Controller
                  name="nombre_indicador"
                  control={control_meta}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Nombre del indicador"
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
            </>
          ) : null}
          <Grid item xs={12} sm={6}>
            <Controller
              name="nombre_meta"
              control={control_meta}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Nombre meta"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_meta.nombre_meta}
                  helperText={
                    errors_meta.nombre_meta
                      ? 'Es obligatorio ingresar un nombre'
                      : 'Ingrese un nombre'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="unidad_meta"
              control={control_meta}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Tipo de unidad"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_meta.unidad_meta}
                  helperText={
                    errors_meta.unidad_meta
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
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="porcentaje_meta"
              control={control_meta}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  // type="number"
                  label="Porcentaje meta"
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
                  // error={!!errors_meta.porcentaje_meta}
                  // helperText={
                  //   errors_meta.porcentaje_meta
                  //     ? 'Es obligatorio ingresar un numero'
                  //     : 'Ingrese un numero'
                  // }
                />
              )}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="avance_fisico"
              control={control_meta}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Avance fisico"
                  variant="outlined"
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0) {
                      onChange(e);
                    }
                  }} // error={!!errors_meta.avance_fisico}
                  // helperText={
                  //   errors_meta.avance_fisico
                  //     ? 'Es obligatorio ingresar un numero'
                  //     : 'Ingrese un numero'
                  // }
                />
              )}
            />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="valor_meta"
              control={control_meta}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Valor meta"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0) {
                      onChange(e);
                    }
                  }}
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  error={!!errors_meta.valor_meta}
                  helperText={
                    errors_meta.valor_meta
                      ? 'Es obligatorio ingresar un valor de meta'
                      : 'Ingrese un valor de meta'
                  }
                />
              )}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <Controller
              name="valor_ejecutado_compromiso"
              control={control_meta}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Valor ejecutado compromiso"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0) {
                      onChange(e);
                    }
                  }}
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  error={!!errors_meta.valor_ejecutado_compromiso}
                  helperText={
                    errors_meta.valor_ejecutado_compromiso
                      ? 'Es obligatorio ingresar el valor ejecutado por compromiso'
                      : 'Ingrese un valor ejecutado por compromiso'
                  }
                />
              )}
            />
          </Grid> */}
          {/* <Grid item xs={12} sm={6}>
            <Controller
              name="valor_ejecutado_obligado"
              control={control_meta}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Valor ejecutado compromiso"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0) {
                      onChange(e);
                    }
                  }}
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  error={!!errors_meta.valor_ejecutado_obligado}
                  helperText={
                    errors_meta.valor_ejecutado_obligado
                      ? 'Es obligatorio ingresar el valor ejecutado por obligado'
                      : 'Ingrese un valor ejecutado por obligado'
                  }
                />
              )}
            />
          </Grid> */}
          {/* <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="agno_1"
              control={control_meta}
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
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="agno_2"
              control={control_meta}
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
                  }} // error={!!errors_meta.agno_2}
                  // helperText={
                  //   errors_meta.agno_2
                  //     ? 'Es obligatorio ingresar un numero'
                  //     : 'Ingrese un numero'
                  // }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="agno_3"
              control={control_meta}
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
                  }} // error={!!errors_meta.agno_3}
                  // helperText={
                  //   errors_meta.agno_3
                  //     ? 'Es obligatorio ingresar un numero'
                  //     : 'Ingrese un numero'
                  // }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="agno_4"
              control={control_meta}
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
                  }} // error={!!errors_meta.agno_4}
                  // helperText={
                  //   errors_meta.agno_4
                  //     ? 'Es obligatorio ingresar un numero'
                  //     : 'Ingrese un numero'
                  // }
                />
              )}
            />
          </Grid> */}
          {isGuardarDisabled ? (
            <Grid item xs={12}>
              <Grid container justifyContent="center" textAlign="center">
                <Alert icon={false} severity="error">
                  <Typography>
                    El procentaje de la meta no puede ser mayor a 100
                  </Typography>
                </Alert>
              </Grid>
            </Grid>
          ) : null}
          {/* {isAgno1Disabled ? (
            <Grid item xs={12}>
              <Grid container justifyContent="center" textAlign="center">
                <Alert icon={false} severity="error">
                  <Typography>
                    La suma de los años no puede ser mayor al valor del
                    porcentaje de la meta
                  </Typography>
                </Alert>
              </Grid>
            </Grid>
          ) : null}
          {isValorEjecutadoDisabled ? (
            <Grid item xs={12}>
              <Grid container justifyContent="center" textAlign="center">
                <Alert icon={false} severity="error">
                  <Typography>
                    El valor ejecutado no puede ser mayor al valor de la meta
                  </Typography>
                </Alert>
              </Grid>
            </Grid>
          ) : null} */}
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
              control={control_meta}
              // defaultValue=""
              rules={{
                required: data_watch_meta.cumplio
                  ? 'Este campo es requerido'
                  : false,
              }}
              render={({ field: { onChange, value } }) => (
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
                          <strong>Meta cumplida</strong>
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
                          <strong>Meta no cumplida</strong>
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
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de creación de la meta"
                value={fecha_creacion_meta}
                onChange={(value) => {
                  handle_date_creacion_change('fecha_crea', value);
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    {...register_meta('fecha_creacion_meta', {
                      required: true,
                    })}
                    error={!!errors_meta.fecha_creacion}
                    helperText={
                      errors_meta.fecha_creacion
                        ? 'Es obligatorio la fecha de creación de la meta'
                        : 'Ingrese la fecha de creación de la meta'
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
                  limpiar_formulario_meta();
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
                disabled={
                  // isValorEjecutadoDisabled ||
                  isGuardarDisabled ||
                  // isAgno1Disabled ||
                  is_savingd_meta
                }
                startIcon={<SaveIcon />}
                loading={is_savingd_meta}
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
