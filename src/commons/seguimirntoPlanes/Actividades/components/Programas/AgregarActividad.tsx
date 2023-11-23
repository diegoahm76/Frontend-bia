/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, MenuItem, TextField } from '@mui/material';
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

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarActividad: React.FC = () => {
  const {
    control_actividad,
    errors_actividad,
    reset_actividad,

    onsubmit_actividad,
    onsubmit_editar,
    is_saving_actividad,

    limpiar_formulario_actividad,
  } = useActividadHook();

  const { planes_selected, fetch_data_planes_selected } = useContext(
    DataContextActividades
  );

  const dispatch = useAppDispatch();

  const { mode, actividad } = useAppSelector((state) => state.planes);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_actividad();
    }
    if (mode.editar) {
      reset_actividad({
        id_actividad: actividad.id_actividad,
        nombre_actividad: actividad.nombre_actividad,
        numero_actividad: actividad.numero_actividad,
        nombre_plan: actividad.nombre_plan,
        nombre_producto: actividad.nombre_producto,
        id_plan: actividad.id_plan,
        id_producto: actividad.id_producto,
      });
    }
  }, [mode, actividad]);

  useEffect(() => {
    fetch_data_planes_selected();
  }, []);

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
                  // error={!!errors_actividad.numero_actividad}
                  // helperText={
                  //   errors_actividad.numero_actividad
                  //     ? 'Es obligatorio ingresar un nombre'
                  //     : 'Ingrese un nombre'
                  // }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="id_plan"
              control={control_actividad}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  // label="Tipo de eje"
                  select
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required
                  error={!!errors_actividad.id_plan}
                  helperText={
                    errors_actividad?.id_plan?.type === 'required'
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
          <Grid container spacing={2} justifyContent="flex-end">
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
