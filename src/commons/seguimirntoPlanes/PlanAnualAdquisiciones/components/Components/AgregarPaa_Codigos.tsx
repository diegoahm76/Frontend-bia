/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useContext, useEffect } from 'react';
import { set_current_mode_paa_codigos } from '../../../store/slice/indexPlanes';
import { usePaaCodigosHook } from '../../hooks/usePaaCodigosHook';
import { DataContextAdquisiciones } from '../../context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarPaa_Codigos: React.FC = () => {
  const {
    control_paa_codidos,
    errors_paa_codidos,
    reset_paa_codidos,

    onsubmit_paa_codidos,
    onsubmit_editar,
    is_saving_paa_codidos,

    limpiar_formulario_paa_codidos,
  } = usePaaCodigosHook();

  const dispatch = useAppDispatch();

  const { mode_paa_codigos, paa_codigos } = useAppSelector(
    (state) => state.planes
  );

  const { codigos_unspsc_selected, fetch_data_codigos_unspsc } = useContext(
    DataContextAdquisiciones
  );

  useEffect(() => {
    fetch_data_codigos_unspsc();
  }, []);

  useEffect(() => {
    if (mode_paa_codigos.crear) {
      limpiar_formulario_paa_codidos();
    }
    if (mode_paa_codigos.editar) {
      //  console.log('')(paa_codigos, 'paa_codigos');
      reset_paa_codidos({
        nombre_paa: paa_codigos.nombre_paa,
        nombre_producto_unsp: paa_codigos.nombre_producto_unsp,
        codigo_unsp: paa_codigos.codigo_unsp,
        id_plan: paa_codigos.id_plan,
        id_codigo: paa_codigos.id_codigo,
      });
    }
  }, [mode_paa_codigos, paa_codigos]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode_paa_codigos.crear) {
            onsubmit_paa_codidos();
          }
          if (mode_paa_codigos.editar) {
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
            <Title title="Registro de códigos unspsc a PAA" />
          </Grid>
          {mode_paa_codigos.editar ? (
            <>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_paa"
                  control={control_paa_codidos}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Nombre del Plan Anual de Adquisiciones"
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

              <Grid item xs={12} sm={6}></Grid>
            </>
          ) : null}
          <Grid item xs={12} sm={6}>
            <Controller
              name="id_codigo"
              control={control_paa_codidos}
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
                  error={!!errors_paa_codidos.id_codigo}
                  helperText={
                    errors_paa_codidos?.id_codigo?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese codigo unspsc'
                  }
                >
                  {codigos_unspsc_selected.map((option) => (
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
                  limpiar_formulario_paa_codidos();
                  dispatch(
                    set_current_mode_paa_codigos({
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
                disabled={is_saving_paa_codidos}
                startIcon={<SaveIcon />}
                loading={is_saving_paa_codidos}
              >
                {mode_paa_codigos.editar ? 'Actualizar' : 'Guardar'}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
