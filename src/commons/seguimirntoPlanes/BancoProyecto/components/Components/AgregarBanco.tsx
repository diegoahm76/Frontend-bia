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
import { useBancosHook } from '../../hooks/useBancosHook';
import { DataContextBancos } from '../../context/context';
import { DataContextIndicador } from '../../../Indicadores/context/context';
import { NumericFormatCustom } from '../../../components/inputs/NumericInput';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarBanco: React.FC = () => {
  const {
    control_banco,
    errors_banco,
    reset_banco,
    data_watch_banco,
    set_value_banco,

    onsubmit_banco,
    onsubmit_editar,
    is_savingd_banco,

    limpiar_formulario_banco,
  } = useBancosHook();

  const dispatch = useAppDispatch();

  const { mode, banco } = useAppSelector((state) => state.planes);

  const id_indicador = data_watch_banco.id_indicador;

  const {
    actividad_selected,
    fetch_data_actividad_selected,
    indicadores_selected,
    fetch_data_indicadores,
  } = useContext(DataContextIndicador);

  const {
    rubros_selected,
    metas_selected,
    proyectos_selected,
    fuentes_selected,
    set_id_indicador,
    fetch_data_metas,
    fetch_data_rubros,
    fetch_data_proyectos,
    fetch_data_fuentes,
  } = useContext(DataContextBancos);

  useEffect(() => {
    fetch_data_actividad_selected();
    fetch_data_rubros();
    fetch_data_metas();
    fetch_data_proyectos();
    fetch_data_fuentes();
    fetch_data_indicadores();
  }, []);

  useEffect(() => {
    if (id_indicador || banco.id_indicador) {
      set_id_indicador(id_indicador ?? banco.id_indicador);
    }
  }, [id_indicador, banco]);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_banco();
    }
    if (mode.editar) {
      reset_banco({
        id_banco: banco.id_banco,
        nombre_proyecto: banco.nombre_proyecto,
        nombre_actividad: banco.nombre_actividad,
        nombre_indicador: banco.nombre_indicador,
        nombre_meta: banco.nombre_meta,
        rubro: banco.rubro,
        banco_valor: banco.banco_valor,
        objeto_contrato: banco.objeto_contrato,
        id_proyecto: banco.id_proyecto,
        id_actividad: banco.id_actividad,
        id_indicador: banco.id_indicador,
        id_meta: banco.id_meta,
        id_rubro: banco.id_rubro,
        id_fuente_financiacion: banco.id_fuente_financiacion,
      });
    }
  }, [mode, banco]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode.crear) {
            onsubmit_banco();
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
                  control={control_banco}
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
          {/* <Grid item xs={12} sm={6}>
            <Controller
              name="nombre_meta"
              control={control_banco}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Nombre Meta"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_banco.nombre_meta}
                  helperText={
                    errors_banco.nombre_meta
                      ? 'Es obligatorio ingresar un nombre'
                      : 'Ingrese un nombre'
                  }
                />
              )}
            />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="objeto_contrato"
              control={control_banco}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Objeto contrato"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_banco.objeto_contrato}
                  helperText={
                    errors_banco.objeto_contrato
                      ? 'Es obligatorio ingresar un nombre'
                      : 'Ingrese un nombre'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="banco_valor"
              control={control_banco}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Valor banco"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_banco.banco_valor}
                  helperText={
                    errors_banco.banco_valor
                      ? 'Es obligatorio ingresar un valor'
                      : 'Ingrese un valor'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="id_indicador"
              control={control_banco}
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
                  error={!!errors_banco.id_indicador}
                  helperText={
                    errors_banco?.id_indicador?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el sector'
                  }
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
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="id_meta"
              control={control_banco}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  margin="dense"
                  disabled={!id_indicador}
                  fullWidth
                  required
                  error={!!errors_banco.id_meta}
                  helperText={
                    errors_banco?.id_meta?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese meta'
                  }
                >
                  {metas_selected.map((option) => (
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
              control={control_banco}
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
                  error={!!errors_banco.id_rubro}
                  helperText={
                    errors_banco?.id_rubro?.type === 'required'
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
              name="id_fuente_financiacion"
              control={control_banco}
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
                  error={!!errors_banco.id_fuente_financiacion}
                  helperText={
                    errors_banco?.id_fuente_financiacion?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el fuente financiacion'
                  }
                >
                  {fuentes_selected.map((option) => (
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
              control={control_banco}
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
                  error={!!errors_banco.id_proyecto}
                  helperText={
                    errors_banco?.id_proyecto?.type === 'required'
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
              name="id_actividad"
              control={control_banco}
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
                  error={!!errors_banco.id_actividad}
                  helperText={
                    errors_banco?.id_actividad?.type === 'required'
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
              <Button
                variant="outlined"
                color="warning"
                disabled={false}
                onClick={() => {
                  limpiar_formulario_banco();
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
                disabled={is_savingd_banco}
                startIcon={<SaveIcon />}
                loading={is_savingd_banco}
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
