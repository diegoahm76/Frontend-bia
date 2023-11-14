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
import { useIndicadorHook } from '../../hooks/useIndicadorHook';
import { DataContextIndicador } from '../../context/context';
import { tipo_medida } from '../../choices/selects';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarIndicacdor: React.FC = () => {
  const {
    control_indicador,
    errors_indicador,
    reset_indicador,

    onsubmit_indicador,
    onsubmit_editar,
    is_saving_indicador,

    limpiar_formulario_indicador,
  } = useIndicadorHook();

  const {
    planes_selected,
    productos_selected,
    actividad_selected,
    medidor_selected,
    tipos_selected,
    fetch_data_planes_selected,
    fetch_data_producto_selected,
    fetch_data_actividad_selected,
    fetch_data_medidor_selected,
    fetch_data_tipos_selected,
  } = useContext(DataContextIndicador);

  const dispatch = useAppDispatch();

  const { mode, indicador } = useAppSelector((state) => state.planes);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_indicador();
    }
    if (mode.editar) {
      reset_indicador({
        id_indicador: indicador.id_indicador,
        nombre_medicion: indicador.nombre_medicion,
        nombre_tipo: indicador.nombre_tipo,
        nombre_producto: indicador.nombre_producto,
        nombre_actividad: indicador.nombre_actividad,
        nombre_plan: indicador.nombre_plan,
        nombre_indicador: indicador.nombre_indicador,
        linea_base: indicador.linea_base,
        medida: indicador.medida,
        id_medicion: indicador.id_medicion,
        id_tipo: indicador.id_tipo,
        id_producto: indicador.id_producto,
        id_actividad: indicador.id_actividad,
        id_plan: indicador.id_plan,
      });
    }
  }, [mode, indicador]);

  useEffect(() => {
    fetch_data_planes_selected();
    fetch_data_producto_selected();
    fetch_data_actividad_selected();
    fetch_data_medidor_selected();
    fetch_data_tipos_selected();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode.crear) {
            onsubmit_indicador();
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
            <Title title="Registro de indicadores" />
          </Grid>
          {mode.editar ? (
            <>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_plan"
                  control={control_indicador}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Nombre del plan"
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
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_producto"
                  control={control_indicador}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Nombre del producto"
                      variant="outlined"
                      multiline
                      value={value}
                      disabled={true}
                      required={true}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>{' '}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_actividad"
                  control={control_indicador}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Nombre de la actividad"
                      variant="outlined"
                      multiline
                      value={value}
                      disabled={true}
                      required={true}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>{' '}
              <Grid item xs={12} sm={6}></Grid>
            </>
          ) : null}
          <Grid item xs={12} sm={6}>
            <Controller
              name="nombre_indicador"
              control={control_indicador}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Nombre indicador"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_indicador.nombre_indicador}
                  helperText={
                    errors_indicador.nombre_indicador
                      ? 'Es obligatorio ingresar un nombre'
                      : 'Ingrese un nombre'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="linea_base"
              control={control_indicador}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Nombre linea base"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_indicador.linea_base}
                  helperText={
                    errors_indicador.linea_base
                      ? 'Es obligatorio ingresar la linea base'
                      : 'Ingrese la linea base'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="id_plan"
              control={control_indicador}
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
                  error={!!errors_indicador.id_plan}
                  helperText={
                    errors_indicador?.id_plan?.type === 'required'
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
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="id_producto"
              control={control_indicador}
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
                  error={!!errors_indicador.id_producto}
                  helperText={
                    errors_indicador?.id_producto?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el producto'
                  }
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
              control={control_indicador}
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
                  error={!!errors_indicador.id_actividad}
                  helperText={
                    errors_indicador?.id_actividad?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese la actividad'
                  }
                >
                  {actividad_selected.map((option) => (
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
              name="id_medicion"
              control={control_indicador}
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
                  error={!!errors_indicador.id_medicion}
                  helperText={
                    errors_indicador?.id_medicion?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el medidor'
                  }
                >
                  {medidor_selected.map((option) => (
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
              name="id_tipo"
              control={control_indicador}
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
                  error={!!errors_indicador.id_tipo}
                  helperText={
                    errors_indicador?.id_tipo?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el tipo'
                  }
                >
                  {tipos_selected.map((option) => (
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
              name="medida"
              control={control_indicador}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Tipo de medida"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_indicador.medida}
                  helperText={
                    errors_indicador.medida
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
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <ButtonSalir />
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="warning"
                disabled={false}
                onClick={() => {
                  limpiar_formulario_indicador();
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
                disabled={is_saving_indicador}
                startIcon={<SaveIcon />}
                loading={is_saving_indicador}
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
