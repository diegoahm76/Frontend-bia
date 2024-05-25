/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useEffect } from 'react';
import { set_current_mode_planes } from '../../../store/slice/indexPlanes';
import { useSubprogramaHook } from '../../hooks/useSubprogramaHook';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarSubprograma: React.FC = () => {
  const {
    control_subprograma,
    errors_subprograma,
    reset_subprograma,

    onsubmit_subprograma,
    onsubmit_editar,
    is_saving_subprograma,

    limpiar_formulario_subprograma,
  } = useSubprogramaHook();

  const dispatch = useAppDispatch();

  const { mode, subprograma } = useAppSelector((state) => state.planes);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_subprograma();
    }
    if (mode.editar) {
      reset_subprograma({
        id_subprograma: subprograma.id_subprograma,
        nombre_subprograma: subprograma.nombre_subprograma,
        nombre_programa: subprograma.nombre_programa,
        numero_subprograma: subprograma.numero_subprograma,
        id_programa: subprograma.id_programa,
      });
    }
  }, [mode, subprograma]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode.crear) {
            onsubmit_subprograma();
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
            <Title title="Registro de subprogramas" />
          </Grid>
          {mode.editar ? (
            <>
              <Grid item xs={12}>
                <Controller
                  name="nombre_programa"
                  control={control_subprograma}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Nombre del programa"
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
              {/* <Grid item xs={12} sm={6}></Grid> */}
            </>
          ) : null}
          <Grid item xs={12} sm={6}>
            <Controller
              name="nombre_subprograma"
              control={control_subprograma}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Nombre del subprograma"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_subprograma.nombre_subprograma}
                  helperText={
                    errors_subprograma.nombre_subprograma
                      ? 'Es obligatorio ingresar un nombre'
                      : 'Ingrese un nombre'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="numero_subprograma"
              control={control_subprograma}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Número del subprograma"
                  variant="outlined"
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_subprograma.numero_subprograma}
                  helperText={
                    errors_subprograma.numero_subprograma
                      ? 'Es obligatorio ingresar un número de subprograma'
                      : 'Ingrese un número de subprograma'
                  }
                />
              )}
            />
          </Grid>

          <Grid container spacing={2} my={1} justifyContent="flex-end">
            <Grid item>
              <Button
                variant="contained"
                color="error"
                disabled={false}
                onClick={() => {
                  limpiar_formulario_subprograma();
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
                  limpiar_formulario_subprograma();
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
                disabled={is_saving_subprograma}
                startIcon={<SaveIcon />}
                loading={is_saving_subprograma}
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
