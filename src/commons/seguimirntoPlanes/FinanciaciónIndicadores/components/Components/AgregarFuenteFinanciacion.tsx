/* eslint-disable @typescript-eslint/naming-convention */
import {
  Alert,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { Title } from '../../../../../components/Title';
import { Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useContext, useEffect, useState } from 'react';
import { set_current_mode_planes } from '../../../store/slice/indexPlanes';
import { useFuenteFinanciacionHook } from '../../hooks/useFuenteFinanciacionHook';
import { DataContextFuentesFinanciacion } from '../../context/context';
// import NumberFormat from 'react-number-format';
import { NumericFormatCustom } from '../../../components/inputs/NumericInput';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarFuenteFinanciacion: React.FC = () => {
  const {
    control_fuente,
    errors_fuente,
    reset_fuente,
    data_watch_fuente,
    set_value_fuente,

    onsubmit_fuente,
    onsubmit_editar,
    is_savingd_fuente,

    limpiar_formulario_fuente,
  } = useFuenteFinanciacionHook();

  const dispatch = useAppDispatch();

  const { mode, fuente_financiacion } = useAppSelector((state) => state.planes);

  const {
    cuencas_selected,
    id_indicador,
    rows_metas,
    set_id_proyecto,
    set_id_producto,
    set_id_actividad,
    set_id_indicador,
    fetch_data_cuencas,
    fetch_data_metas_id_indicador,
  } = useContext(DataContextFuentesFinanciacion);

  useEffect(() => {
    fetch_data_cuencas();
  }, []);

  useEffect(() => {
    if (id_indicador) {
      fetch_data_metas_id_indicador();
    }
  }, [id_indicador]);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_fuente();
    }
    if (mode.editar) {
      set_id_proyecto(fuente_financiacion.id_proyecto ?? null);
      set_id_producto(fuente_financiacion.id_producto ?? null);
      set_id_actividad(fuente_financiacion.id_actividad ?? null);
      set_id_indicador(fuente_financiacion.id_indicador ?? null);
      reset_fuente({
        id_fuente: fuente_financiacion.id_fuente,
        nombre_indicador: fuente_financiacion.nombre_indicador,
        nombre_fuente: fuente_financiacion.nombre_fuente,
        nombre_cuenca: fuente_financiacion.nombre_cuenca,
        nombre_proyecto: fuente_financiacion.nombre_proyecto,
        nombre_actividad: fuente_financiacion.nombre_actividad,
        nombre_producto: fuente_financiacion.nombre_producto,
        vano_1: fuente_financiacion.vano_1,
        vano_2: fuente_financiacion.vano_2,
        vano_3: fuente_financiacion.vano_3,
        vano_4: fuente_financiacion.vano_4,
        valor_total: fuente_financiacion.valor_total,
        id_indicador: fuente_financiacion.id_indicador,
        id_cuenca: fuente_financiacion.id_cuenca,
        id_proyecto: fuente_financiacion.id_proyecto,
        id_actividad: fuente_financiacion.id_actividad,
        id_producto: fuente_financiacion.id_producto,
      });
    }
  }, [mode, fuente_financiacion]);

  const vano_1 = Number(data_watch_fuente.vano_1);
  const vano_2 = Number(data_watch_fuente.vano_2);
  const vano_3 = Number(data_watch_fuente.vano_3);
  const vano_4 = Number(data_watch_fuente.vano_4);

  const valor_total = vano_1 + vano_2 + vano_3 + vano_4;

  useEffect(() => {
    set_value_fuente('valor_total', valor_total);
  }, [valor_total]);


  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode.crear) {
            onsubmit_fuente();
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
            <Title title="Registro de fuente de financiación" />
          </Grid>
          {mode.editar ? (
            <>
              <Grid item xs={12}>
                <Controller
                  name="nombre_indicador"
                  control={control_fuente}
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
              name="nombre_fuente"
              control={control_fuente}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Nombre fuente de financiacion"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_fuente.nombre_fuente}
                  helperText={
                    errors_fuente.nombre_fuente
                      ? 'Es obligatorio ingresar un nombre'
                      : 'Ingrese un nombre'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          {/* <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="id_proyecto"
              control={control_fuente}
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
                  error={!!errors_fuente.id_proyecto}
                  helperText={
                    errors_fuente?.id_proyecto?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el proyecto'
                  }
                  onChange={(event) => {
                    field.onChange(event);
                    set_id_proyecto(Number(event.target.value));
                  }}
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
              control={control_fuente}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  margin="dense"
                  disabled={id_proyecto ? false : true}
                  fullWidth
                  required
                  error={!!errors_fuente.id_producto}
                  helperText={
                    errors_fuente?.id_producto?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el producto'
                  }
                  onChange={(event) => {
                    field.onChange(event);
                    set_id_producto(Number(event.target.value));
                  }}
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
              control={control_fuente}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  margin="dense"
                  disabled={id_producto ? false : true}
                  fullWidth
                  required
                  error={!!errors_fuente.id_actividad}
                  helperText={
                    errors_fuente?.id_actividad?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese la actividad'
                  }
                >
                  {actividades_selected.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid> */}
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="vano_1"
              control={control_fuente}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Año 1"
                  variant="outlined"
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                />
              )}
            />
          </Grid>{' '}
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="vano_2"
              control={control_fuente}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  // type="number"
                  label="Año 2"
                  variant="outlined"
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  // error={!!errors_fuente.vano_2}
                  // helperText={
                  //   errors_fuente.vano_2
                  //     ? 'Es obligatorio ingresar un numero'
                  //     : 'Ingrese un numero'
                  // }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="vano_3"
              control={control_fuente}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  // type="number"
                  label="Año 3"
                  variant="outlined"
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  // error={!!errors_fuente.vano_3}
                  // helperText={
                  //   errors_fuente.vano_3
                  //     ? 'Es obligatorio ingresar un numero'
                  //     : 'Ingrese un numero'
                  // }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="vano_4"
              control={control_fuente}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  // type="number"
                  label="Año 4"
                  variant="outlined"
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  // error={!!errors_fuente.vano_4}
                  // helperText={
                  //   errors_fuente.vano_4
                  //     ? 'Es obligatorio ingresar un numero'
                  //     : 'Ingrese un numero'
                  // }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="valor_total"
              control={control_fuente}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Valor fuente_financiacion"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={true}
                  required={true}
                  onChange={onChange}
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  error={!!errors_fuente.valor_total}
                  helperText={
                    errors_fuente.valor_total
                      ? 'Es obligatorio ingresar un valor total de fuente de financiacion'
                      : 'Ingrese un valor total de fuente de financiacion'
                  }
                />
              )}
            />
          </Grid>
          {/* {valorTotalValido ? (
            <Grid item xs={12}>
              <Grid container justifyContent="center" textAlign="center">
                <Alert icon={false} severity="error">
                  <Typography>
                    El total de la fuente supera el valor de la meta
                  </Typography>
                </Alert>
              </Grid>
            </Grid>
          ) : null} */}
          {/* <Grid item xs={12} sm={6}>
            <Controller
              name="id_indicador"
              control={control_fuente}
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
                  error={!!errors_fuente.id_indicador}
                  helperText={
                    errors_fuente?.id_indicador?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el indicador'
                  }
                >
                  {indicadores_selected.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="id_cuenca"
              control={control_fuente}
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
                  error={!!errors_fuente.id_cuenca}
                  helperText={
                    errors_fuente?.id_cuenca?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese la cuenca'
                  }
                >
                  {cuencas_selected.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button
                variant="outlined"
                color="warning"
                disabled={false}
                onClick={() => {
                  limpiar_formulario_fuente();
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
                disabled={is_savingd_fuente}
                startIcon={<SaveIcon />}
                loading={is_savingd_fuente}
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
