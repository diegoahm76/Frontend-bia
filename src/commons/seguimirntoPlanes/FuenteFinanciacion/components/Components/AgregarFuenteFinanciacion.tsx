/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useContext, useEffect } from 'react';
import { set_current_mode_planes } from '../../../store/slice/indexPlanes';
import { useFuenteFinanciacionHook } from '../../hooks/useFuenteFinanciacionHook';
import { DataContextFuentesFinanciacion } from '../../context/context';
import { NumericFormatCustom } from '../../../components/inputs/NumericInput';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarFuenteFinanciacion: React.FC = () => {
  const {
    control_fuente,
    errors_fuente,
    reset_fuente,

    onsubmit_fuente,
    onsubmit_editar,
    is_savingd_fuente,

    limpiar_formulario_fuente,
  } = useFuenteFinanciacionHook();

  const dispatch = useAppDispatch();

  const { mode, fuente } = useAppSelector((state) => state.planes);

  const { concepto_selected, fetch_data_concepto } = useContext(
    DataContextFuentesFinanciacion
  );

  useEffect(() => {
    fetch_data_concepto();
  }, []);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_fuente();
    }
    if (mode.editar) {
      reset_fuente({
        id_fuente: fuente.id_fuente,
        concepto: fuente.concepto,
        vano_1: fuente.vano_1,
        vano_2: fuente.vano_2,
        vano_3: fuente.vano_3,
        vano_4: fuente.vano_4,
        id_concepto: fuente.id_concepto,
      });
    }
  }, [mode, fuente]);

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
            <Title title="Registro de fuentes" />
          </Grid>
          {mode.editar ? (
            <>
              {/* <Grid item xs={12}>
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
              </Grid> */}
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
              name="id_concepto"
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
                  error={!!errors_fuente.id_concepto}
                  helperText={
                    errors_fuente?.id_concepto?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese concepto'
                  }
                >
                  {concepto_selected.map((option) => (
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
