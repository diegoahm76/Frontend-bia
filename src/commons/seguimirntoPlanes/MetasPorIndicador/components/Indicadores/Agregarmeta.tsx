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
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useEffect } from 'react';
import { set_current_mode_planes } from '../../../store/slice/indexPlanes';
import { useMetaHook } from '../../hooks/useMetaHook';
import { tipo_medida } from '../../../Indicadores/choices/selects';
import { NumericFormatCustom } from '../../../components/inputs/NumericInput';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Agregarmeta: React.FC = () => {
  const {
    control_meta,
    errors_meta,
    reset_meta,
    data_watch_meta,

    onsubmit_meta,
    onsubmit_editar,
    is_savingd_meta,

    limpiar_formulario_meta,
  } = useMetaHook();

  const dispatch = useAppDispatch();

  const { mode, meta } = useAppSelector((state) => state.planes);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_meta();
    }
    if (mode.editar) {
      reset_meta({
        id_meta: meta.id_meta,
        nombre_indicador: meta.nombre_indicador,
        nombre_meta: meta.nombre_meta,
        unidad_meta: meta.unidad_meta,
        porcentaje_meta: meta.porcentaje_meta,
        valor_meta: meta.valor_meta,
        id_indicador: meta.id_indicador,
      });
    }
  }, [mode, meta]);

  const porcentaje_meta = Number(data_watch_meta.porcentaje_meta);
  const isGuardarDisabled = porcentaje_meta > 100;

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
                  onChange={onChange}
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
                  onChange={onChange}
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
                disabled={is_savingd_meta}
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
