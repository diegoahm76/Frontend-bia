/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useContext, useEffect } from 'react';
import { set_current_mode_planes } from '../../../store/slice/indexPlanes';
import { useContextoPoaiHook } from '../../hooks/useContextoPoaiHook';
import { DataContextConceptoPOAI } from '../../context/context';
import { NumericFormatCustom } from '../../../components/inputs/NumericInput';
import { DataContextDetalleInversion } from '../../../DetalleInversionCuentas/context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarConceptoPOAI: React.FC = () => {
  const {
    control_concepto,
    errors_concepto,
    reset_concepto,
    onsubmit_concepto,
    onsubmit_editar,
    is_savingd_concepto,

    limpiar_formulario_concepto,
  } = useContextoPoaiHook();

  const dispatch = useAppDispatch();

  const { mode, concepto_poai } = useAppSelector((state) => state.planes);

  const {
    set_id_indicador,
    unidades_organizacionales_selected,
    fetch_data_unidades_organizacionales,
  } = useContext(DataContextConceptoPOAI);

  const { rubros_selected, fetch_data_rubros } = useContext(
    DataContextDetalleInversion
  );

  useEffect(() => {
    fetch_data_unidades_organizacionales();
    fetch_data_rubros();
  }, []);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_concepto();
    }
    if (mode.editar) {
      set_id_indicador(concepto_poai.id_indicador ?? null);
      reset_concepto({
        id_concepto: concepto_poai.id_concepto,
        nombre_indicador: concepto_poai.nombre_indicador,
        nombre: concepto_poai.nombre,
        concepto: concepto_poai.concepto,
        valor_total: concepto_poai.valor_total,
        id_rubro: concepto_poai.id_rubro,
        id_indicador: concepto_poai.id_indicador,
        id_unidad_organizacional: concepto_poai.id_unidad_organizacional,
      });
    }
  }, [mode, concepto_poai]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode.crear) {
            onsubmit_concepto();
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
            <Title title="Registro de concepto POAI" />
          </Grid>
          {mode.editar ? (
            <>
              {/* <Grid item xs={12}>
                <Controller
                  name="nombre_indicador"
                  control={control_concepto}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Nombre del concepto"
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
              name="concepto"
              control={control_concepto}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
               
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Nombre de concepto "
                  name="mes_proyectado"
                  // value={formData.mes_proyectado}
                  // onChange={handleInputChange}
                />
            
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="valor_total"
              control={control_concepto}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Valor inicial  "
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  error={!!errors_concepto.valor_total}
                  helperText={
                    errors_concepto.valor_total
                      ? 'Es obligatorio ingresar un valor total'
                      : 'Valor inicial '
                  }
                />
              )}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <Controller
              name="id_indicador"
              control={control_concepto}
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
                  error={!!errors_concepto.id_indicador}
                  helperText={
                    errors_concepto?.id_indicador?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el indicador'
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
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="id_rubro"
              control={control_concepto}
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
                  // error={!!errors_concepto.id_cuenca}
                  helperText={
                    errors_concepto?.id_cuenca?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'Unidad organizacional'
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
          <Grid item xs={12} sm={6}>
            <Controller
              name="id_unidad_organizacional"
              control={control_concepto}
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
                  error={!!errors_concepto.id_unidad_organizacional}
                  helperText={
                    errors_concepto?.id_unidad_organizacional?.type ===
                    'required'
                      ? 'Este campo es obligatorio'
                      : 'Modalidad PAA'
                  }
                >
                  {unidades_organizacionales_selected.map((option) => (
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
                  limpiar_formulario_concepto();
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
                disabled={is_savingd_concepto}
                startIcon={<SaveIcon />}
                loading={is_savingd_concepto}
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
