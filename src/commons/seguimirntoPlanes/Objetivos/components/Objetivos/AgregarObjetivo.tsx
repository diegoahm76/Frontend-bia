/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useEffect } from 'react';
import { useObjetivoHook } from '../../hooks/useObjetivoHook';
import { set_current_mode_planes } from '../../../store/slice/indexPlanes';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarObjetivo: React.FC = () => {
  const {
    control_objetivo,
    errors_objetivo,
    reset_objetivo,

    onsubmit_objetivo,
    onsubmit_editar,
    is_saving_objetivo,

    limpiar_formulario_objetivo,
  } = useObjetivoHook();

  const dispatch = useAppDispatch();

  const { mode, obj_plan } = useAppSelector((state) => state.planes);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_objetivo();
    }
    if (mode.editar) {
      reset_objetivo({
        id_objetivo: obj_plan.id_objetivo,
        nombre_plan: obj_plan.nombre_plan,
        nombre_objetivo: obj_plan.nombre_objetivo,
        id_plan: obj_plan.id_plan,
      });
    }
  }, [mode, obj_plan]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode.crear) {
            onsubmit_objetivo();
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
            <Title title="Registro de Objetivos" />
          </Grid>
          {mode.editar ? (
            <>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_plan"
                  control={control_objetivo}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Nombre del Plan"
                      variant="outlined"
                      value={value}
                      multiline
                      disabled={true}
                      required={true}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
            </>
          ) : null}
          <Grid item xs={12} sm={mode.editar ? 6 : 12}>
            <Controller
              name="nombre_objetivo"
              control={control_objetivo}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Nombre del Objetivo"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_objetivo.nombre_objetivo}
                  helperText={
                    errors_objetivo.nombre_objetivo
                      ? 'Es obligatorio ingresar un nombre'
                      : 'Ingrese un nombre para el objetivo'
                  }
                />
              )}
            />
          </Grid>
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button
                variant="contained"
                color="error"
                disabled={false}
                onClick={() => {
                  limpiar_formulario_objetivo();
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
                  limpiar_formulario_objetivo();
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
                disabled={is_saving_objetivo}
                startIcon={<SaveIcon />}
                loading={is_saving_objetivo}
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
