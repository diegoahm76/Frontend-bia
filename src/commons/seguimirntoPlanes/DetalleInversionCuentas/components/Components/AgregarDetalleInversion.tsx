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
import { useDetalleInversionHook } from '../../hooks/useDetalleInversionHook';
import { DataContextDetalleInversion } from '../../context/context';
import { DataContextIndicador } from '../../../Indicadores/context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarDetalleInversion: React.FC = () => {
  const {
    control_detalle,
    errors_detalle,
    reset_detalle,
    data_watch_detalle,
    set_value_detalle,

    onsubmit_detalle,
    onsubmit_editar,
    is_savingd_detalle,

    limpiar_formulario_detalle,
  } = useDetalleInversionHook();

  const dispatch = useAppDispatch();

  const { mode, detalle_inversion } = useAppSelector((state) => state.planes);

  const {
    productos_selected,
    actividad_selected,
    fetch_data_actividad_selected,
    fetch_data_producto_selected,
  } = useContext(DataContextIndicador);

  const {
    rubros_selected,
    sector_selected,
    programas_selected,
    subprogramas_selected,
    proyectos_selected,
    fetch_data_rubros,
    fetch_data_sectores,
    fetch_data_programas,
    fetch_data_proyectos,
    fetch_data_subprogramas,
  } = useContext(DataContextDetalleInversion);

  useEffect(() => {
    fetch_data_actividad_selected();
    fetch_data_producto_selected();
    fetch_data_rubros();
    fetch_data_sectores();
    fetch_data_programas();
    fetch_data_proyectos();
    fetch_data_subprogramas();
  }, []);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_detalle();
    }
    if (mode.editar) {
      reset_detalle({
        id_detalle_inversion: detalle_inversion.id_detalle_inversion,
        nombre_sector: detalle_inversion.nombre_sector,
        nombre_rubro: detalle_inversion.nombre_rubro,
        nombre_programa: detalle_inversion.nombre_programa,
        nombre_subprograma: detalle_inversion.nombre_subprograma,
        nombre_proyecto: detalle_inversion.nombre_proyecto,
        nombre_producto: detalle_inversion.nombre_producto,
        nombre_actividad: detalle_inversion.nombre_actividad,
        cuenta: detalle_inversion.cuenta,
        valor_cuenta: detalle_inversion.valor_cuenta,
        id_sector: detalle_inversion.id_sector,
        id_rubro: detalle_inversion.id_rubro,
        id_programa: detalle_inversion.id_programa,
        id_subprograma: detalle_inversion.id_subprograma,
        id_proyecto: detalle_inversion.id_proyecto,
        id_producto: detalle_inversion.id_producto,
        id_actividad: detalle_inversion.id_actividad,
      });
    }
  }, [mode, detalle_inversion]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode.crear) {
            onsubmit_detalle();
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
            <Title title="Registro de detalle inversión" />
          </Grid>
          {mode.editar ? (
            <>
              {/* <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_sector"
                  control={control_detalle}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Nombre del sector"
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
              name="cuenta"
              control={control_detalle}
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
                  error={!!errors_detalle.cuenta}
                  helperText={
                    errors_detalle.cuenta
                      ? 'Es obligatorio ingresar una cuenta'
                      : 'Ingrese una cuenta'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="valor_cuenta"
              control={control_detalle}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Valor detalle_inversion"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_detalle.valor_cuenta}
                  helperText={
                    errors_detalle.valor_cuenta
                      ? 'Es obligatorio ingresar un valor de la cuenta'
                      : 'Ingrese un valor de la cuenta'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="id_sector"
              control={control_detalle}
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
                  error={!!errors_detalle.id_sector}
                  helperText={
                    errors_detalle?.id_sector?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el sector'
                  }
                >
                  {sector_selected.map((option) => (
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
              name="id_rubro"
              control={control_detalle}
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
                  error={!!errors_detalle.id_rubro}
                  helperText={
                    errors_detalle?.id_rubro?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el rubro'
                  }
                >
                  {rubros_selected.map((option) => (
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
              name="id_programa"
              control={control_detalle}
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
                  error={!!errors_detalle.id_programa}
                  helperText={
                    errors_detalle?.id_programa?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el programa'
                  }
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
              name="id_subprograma"
              control={control_detalle}
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
                  error={!!errors_detalle.id_subprograma}
                  helperText={
                    errors_detalle?.id_subprograma?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el subprograma'
                  }
                >
                  {subprogramas_selected.map((option) => (
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
              control={control_detalle}
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
                  error={!!errors_detalle.id_proyecto}
                  helperText={
                    errors_detalle?.id_proyecto?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el proyecto'
                  }
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
              control={control_detalle}
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
                  error={!!errors_detalle.id_producto}
                  helperText={
                    errors_detalle?.id_producto?.type === 'required'
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
              control={control_detalle}
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
                  error={!!errors_detalle.id_actividad}
                  helperText={
                    errors_detalle?.id_actividad?.type === 'required'
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
                  limpiar_formulario_detalle();
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
                disabled={is_savingd_detalle}
                startIcon={<SaveIcon />}
                loading={is_savingd_detalle}
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
