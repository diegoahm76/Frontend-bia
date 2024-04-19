/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useContext, useEffect } from 'react';
import { useEjeEstrategicoHook } from '../../hooks/useEjeEstrategicoHook';
import { DataContextEjeEstrategico } from '../../context/context';
import { set_current_mode_planes } from '../../../store/slice/indexPlanes';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarEjeEstrategico: React.FC = () => {
  const {
    control_eje_estrategico,
    errors_eje_estrategico,
    data_watch_eje_estrategico,
    reset_eje_estrategico,

    onsubmit_eje_estrategico,
    onsubmit_editar,
    is_saving_eje_estrategico,

    limpiar_formulario_eje_estrategico,
  } = useEjeEstrategicoHook();

  const { id_plan, tipo_eje_selected, fetch_data_tipo_eje } = useContext(
    DataContextEjeEstrategico
  );

  const dispatch = useAppDispatch();

  const { mode, eje_estrategico } = useAppSelector((state) => state.planes);

  useEffect(() => {
    fetch_data_tipo_eje();
  }, []);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_eje_estrategico();
    }
    if (mode.editar) {
      reset_eje_estrategico({
        id_eje_estrategico: eje_estrategico.id_eje_estrategico,
        nombre_plan: eje_estrategico.nombre_plan,
        sigla_plan: eje_estrategico.sigla_plan,
        nombre_tipo_eje: eje_estrategico.nombre_tipo_eje,
        nombre: eje_estrategico.nombre,
        nombre_objetivo: eje_estrategico.nombre_objetivo,
        id_programa: eje_estrategico.id_programa,
        id_plan: eje_estrategico.id_plan,
        id_tipo_eje: eje_estrategico.id_tipo_eje,
      });
    }
  }, [mode, eje_estrategico]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode.crear) {
            onsubmit_eje_estrategico();
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
            <Title title="Registro de eje estrategico" />
          </Grid>
          {mode.editar ? (
            <>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_plan"
                  control={control_eje_estrategico}
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
              <Grid item xs={12} sm={6}>
                <Controller
                  name={id_plan ? 'sigla_plan' : 'nombre_objetivo'}
                  control={control_eje_estrategico}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label={id_plan ? 'Sigla plan' : 'Nombre objetivo'}
                      variant="outlined"
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
              name="nombre"
              control={control_eje_estrategico}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Nombre del eje estrategico"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_eje_estrategico.nombre_plan}
                  helperText={
                    errors_eje_estrategico.nombre_plan
                      ? 'Es obligatorio ingresar un nombre'
                      : 'Ingrese un nombre'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="id_tipo_eje"
              control={control_eje_estrategico}
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
                  error={!!errors_eje_estrategico.id_tipo_eje}
                  helperText={
                    errors_eje_estrategico?.id_tipo_eje?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el tipo de eje estrategico'
                  }
                >
                  {tipo_eje_selected.map((option) => (
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
                  limpiar_formulario_eje_estrategico();
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
                disabled={is_saving_eje_estrategico}
                startIcon={<SaveIcon />}
                loading={is_saving_eje_estrategico}
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
