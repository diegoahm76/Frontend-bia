/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from '@mui/material';
import { Title } from '../../../../../../components/Title';
import { Controller } from 'react-hook-form';
import { useRubrosHook } from '../../hooks/useRubrosHook';

import { LoadingButton } from '@mui/lab';
import { ButtonSalir } from '../../../../../../components/Salir/ButtonSalir';
import SaveIcon from '@mui/icons-material/Save';
import { useAppSelector } from '../../../../../../hooks';
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarRubros: React.FC = () => {
  const {
    control_rubro,
    errors_rubro,
    reset_rubro,

    onsubmit_rubro,
    onsubmit_editar,
    is_saving_rubro,

    limpiar_formulario_rubro,
  } = useRubrosHook();

  const { mode, rubro } = useAppSelector((state) => state.planes);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_rubro();
    }
    if (mode.editar) {
      reset_rubro({
        id_rubro: rubro.id_rubro,
        cod_pre: rubro.cod_pre,
        cuenta: rubro.cuenta,
        valcuenta: rubro.valcuenta,
      });
    }
  }, [mode, rubro]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode.crear) {
            onsubmit_rubro();
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
            <Title title="Registro de Rubros" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="cod_pre"
              control={control_rubro}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Código"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_rubro.cod_pre}
                  helperText={
                    errors_rubro.cod_pre
                      ? 'Es obligatorio ingresar un código'
                      : 'Ingrese un código'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="cuenta"
              control={control_rubro}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Cuenta"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_rubro.cuenta}
                  helperText={
                    errors_rubro.cuenta
                      ? 'Es obligatorio ingresar una cuenta'
                      : 'Ingrese una cuenta'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="valcuenta"
              control={control_rubro}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Valores de la cuenta"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_rubro.valcuenta}
                  helperText={
                    errors_rubro.valcuenta
                      ? 'Es obligatorio ingresar un valor de la cuenta'
                      : 'Ingrese un valor de la cuenta'
                  }
                />
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
                  limpiar_formulario_rubro();
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
                disabled={is_saving_rubro}
                startIcon={<SaveIcon />}
                loading={is_saving_rubro}
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
