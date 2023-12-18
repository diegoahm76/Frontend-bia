/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { Title } from '../../../../../../components/Title';
import { Controller } from 'react-hook-form';
import { useRubrosHook } from '../../hooks/useRubrosHook';

import { LoadingButton } from '@mui/lab';
import { ButtonSalir } from '../../../../../../components/Salir/ButtonSalir';
import SaveIcon from '@mui/icons-material/Save';
import { useAppSelector } from '../../../../../../hooks';
import { useContext, useEffect } from 'react';
import { DataContextRubros } from '../../context/context';
import { NumericFormatCustom } from '../../../../components/inputs/NumericInput';

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

  const {
    id_programa,
    id_proyecto,
    id_producto,
    set_id_programa,
    set_id_proyecto,
    set_id_producto,
    indicadores_selected,
    proyectos_selected,
    productos_selected,
    programas_selected,
    actividades_selected,
    fetch_data_indicadores,
    fetch_data_proyectos,
    fetch_data_productos,
    fetch_data_actividades,
    fetch_data_programas,
  } = useContext(DataContextRubros);

  useEffect(() => {
    fetch_data_indicadores();
    fetch_data_programas();
  }, []);

  useEffect(() => {
    if (id_programa) {
      fetch_data_proyectos();
    }
  }, [id_programa]);

  useEffect(() => {
    if (id_proyecto) {
      fetch_data_productos();
    }
  }, [id_proyecto]);

  useEffect(() => {
    if (id_producto) {
      fetch_data_actividades();
    }
  }, [id_producto]);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_rubro();
    }
    if (mode.editar) {
      set_id_programa(rubro.id_programa ?? null);
      set_id_proyecto(rubro.id_proyecto ?? null);
      set_id_producto(rubro.id_producto ?? null);
      reset_rubro({
        id_rubro: rubro.id_rubro,
        cod_pre: rubro.cod_pre,
        cuenta: rubro.cuenta,
        valcuenta: rubro.valcuenta,
        nombre_programa: rubro.nombre_programa,
        nombre_proyecto: rubro.nombre_proyecto,
        nombre_producto: rubro.nombre_producto,
        nombre_actividad: rubro.nombre_actividad,
        nombre_indicador: rubro.nombre_indicador,
        id_programa: rubro.id_programa,
        id_proyecto: rubro.id_proyecto,
        id_producto: rubro.id_producto,
        id_actividad: rubro.id_actividad,
        id_indicador: rubro.id_indicador,
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
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="id_programa"
              control={control_rubro}
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
                  error={!!errors_rubro.id_programa}
                  helperText={
                    errors_rubro?.id_programa?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el programa'
                  }
                  onChange={(event) => {
                    field.onChange(event);
                    set_id_programa(Number(event.target.value));
                  }}
                >
                  {programas_selected.map((option) => (
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
              name="id_proyecto"
              control={control_rubro}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  margin="dense"
                  disabled={id_programa ? false : true}
                  fullWidth
                  required
                  error={!!errors_rubro.id_proyecto}
                  helperText={
                    errors_rubro?.id_proyecto?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el proyecto'
                  }
                  onChange={(event) => {
                    field.onChange(event);
                    set_id_proyecto(Number(event.target.value));
                  }}
                >
                  {proyectos_selected.map((option) => (
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
              control={control_rubro}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  margin="dense"
                  disabled={id_proyecto ? false : true}
                  fullWidth
                  required
                  error={!!errors_rubro.id_producto}
                  helperText={
                    errors_rubro?.id_producto?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el producto'
                  }
                  onChange={(event) => {
                    field.onChange(event);
                    set_id_producto(Number(event.target.value));
                  }}
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
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="id_actividad"
              control={control_rubro}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  margin="dense"
                  disabled={id_producto ? false : true}
                  fullWidth
                  required
                  error={!!errors_rubro.id_actividad}
                  helperText={
                    errors_rubro?.id_actividad?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese la actividad'
                  }
                >
                  {actividades_selected.map((option) => (
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
              name="id_indicador"
              control={control_rubro}
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
                  error={!!errors_rubro.id_indicador}
                  helperText={
                    errors_rubro?.id_indicador?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el indicador'
                  }
                  onChange={(event) => {
                    field.onChange(event);
                    set_id_programa(Number(event.target.value));
                  }}
                >
                  {indicadores_selected.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
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
                  label="Valor de la cuenta"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
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
