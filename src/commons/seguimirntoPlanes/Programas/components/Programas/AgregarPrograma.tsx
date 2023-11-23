/* eslint-disable @typescript-eslint/naming-convention */
import { Alert, Button, Grid, TextField, Typography } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useEffect } from 'react';
import { useprogramaHook } from '../../hooks/useprogramaHook';
import { set_current_mode_planes } from '../../../store/slice/indexPlanes';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarPrograma: React.FC = () => {
  const {
    control_programa,
    errors_programa,
    reset_programa,
    data_watch_programa,

    onsubmit_programa,
    onsubmit_editar,
    is_saving_programa,

    limpiar_formulario_programa,
  } = useprogramaHook();

  const dispatch = useAppDispatch();

  const { mode, programa } = useAppSelector((state) => state.planes);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_programa();
    }
    if (mode.editar) {
      reset_programa({
        id_programa: programa.id_programa,
        nombre_plan: programa.nombre_plan,
        nombre_programa: programa.nombre_programa,
        porcentaje_1: programa.porcentaje_1,
        porcentaje_2: programa.porcentaje_2,
        porcentaje_3: programa.porcentaje_3,
        porcentaje_4: programa.porcentaje_4,
        id_plan: programa.id_plan,
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
          <Grid item xs={12}>
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
                  onChange={onChange}
                  error={!!errors_programa.porcentaje_1}
                  helperText={
                    errors_programa.porcentaje_1
                      ? 'Es obligatorio ingresar un numero'
                      : 'Ingrese un numero'
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
                  onChange={onChange}
                  error={!!errors_programa.porcentaje_2}
                  helperText={
                    errors_programa.porcentaje_2
                      ? 'Es obligatorio ingresar un numero'
                      : 'Ingrese un numero'
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
                  onChange={onChange}
                  error={!!errors_programa.porcentaje_3}
                  helperText={
                    errors_programa.porcentaje_3
                      ? 'Es obligatorio ingresar un numero'
                      : 'Ingrese un numero'
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
                  onChange={onChange}
                  error={!!errors_programa.porcentaje_4}
                  helperText={
                    errors_programa.porcentaje_4
                      ? 'Es obligatorio ingresar un numero'
                      : 'Ingrese un numero'
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
