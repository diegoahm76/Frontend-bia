/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useContext, useEffect } from 'react';
import { set_current_mode_planes } from '../../../store/slice/indexPlanes';
import { useSeguimientoPOAIHook } from '../../hooks/useSeguimientoPOAIHook';
import { DataContextSeguimientoPOAI } from '../../context/context';
import { NumericFormatCustom } from '../../../components/inputs/NumericInput';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarSeguiminetoPOAI: React.FC = () => {
  const {
    control_seguimiento,
    errors_seguimiento,
    reset_seguimiento,

    onsubmit_seguimiento,
    onsubmit_editar,
    is_savingd_seguimiento,

    limpiar_formulario_seguimiento,
  } = useSeguimientoPOAIHook();

  const dispatch = useAppDispatch();

  const { mode, seguimiento_poai } = useAppSelector((state) => state.planes);

  const {
    rubros_selected,
    fuentes_selected,
    set_id_proyecto,
    set_id_actividad,
    set_id_indicador,
    set_id_meta,
    fetch_data_rubros,
    fetch_data_fuentes,
  } = useContext(DataContextSeguimientoPOAI);

  useEffect(() => {
    fetch_data_rubros();
    fetch_data_fuentes();
  }, []);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_seguimiento();
    }
    if (mode.editar) {
      set_id_proyecto(seguimiento_poai.id_proyecto ?? null);
      set_id_actividad(seguimiento_poai.id_actividad ?? null);
      set_id_indicador(seguimiento_poai.id_indicador ?? null);
      set_id_meta(seguimiento_poai.id_meta ?? null);
      reset_seguimiento({
        id_seguimiento: seguimiento_poai.id_seguimiento,
        nombre_programa: seguimiento_poai.nombre_programa,
        nombre_proyecto: seguimiento_poai.nombre_proyecto,
        nombre_producto: seguimiento_poai.nombre_producto,
        nombre_actividad: seguimiento_poai.nombre_actividad,
        nombre_unidad: seguimiento_poai.nombre_unidad,
        nombre_indicador: seguimiento_poai.nombre_indicador,
        nombre_meta: seguimiento_poai.nombre_meta,
        codigo_modalidad: seguimiento_poai.codigo_modalidad,
        concepto: seguimiento_poai.concepto,
        sector: seguimiento_poai.sector,
        nombre_fuente: seguimiento_poai.nombre_fuente,
        cuenta: seguimiento_poai.cuenta,
        objeto_contrato: seguimiento_poai.objeto_contrato,
        ubicacion: seguimiento_poai.ubicacion,
        clase_tercero: seguimiento_poai.clase_tercero,
        porcentaje_pto: seguimiento_poai.porcentaje_pto,
        vano_1: seguimiento_poai.vano_1,
        vano_2: seguimiento_poai.vano_2,
        vano_3: seguimiento_poai.vano_3,
        vano_4: seguimiento_poai.vano_4,
        valor_total: seguimiento_poai.valor_total,
        numero_cdp_paa: seguimiento_poai.numero_cdp_paa,
        numero_rp_paa: seguimiento_poai.numero_rp_paa,
        valor_seguimiento_banco_paa:
          seguimiento_poai.valor_seguimiento_banco_paa,
        valor_cdp_paa: seguimiento_poai.valor_cdp_paa,
        valor_rp_paa: seguimiento_poai.valor_rp_paa,
        fecha_termiacion: seguimiento_poai.fecha_termiacion,
        duracion: seguimiento_poai.duracion,
        valor_mesual_paoi: seguimiento_poai.valor_mesual_paoi,
        mes_oferta_paa: seguimiento_poai.mes_oferta_paa,
        mes_solicita: seguimiento_poai.mes_solicita,
        valor_pagado: seguimiento_poai.valor_pagado,
        valor_obligado: seguimiento_poai.valor_obligado,
        valor_saldo: seguimiento_poai.valor_saldo,
        porcentaje_ejecuta: seguimiento_poai.porcentaje_ejecuta,
        numero_contrato: seguimiento_poai.numero_contrato,
        numerp_rp: seguimiento_poai.numerp_rp,
        fecha_rp: seguimiento_poai.fecha_rp,
        valor_cdp: seguimiento_poai.valor_cdp,
        fecha_cdp: seguimiento_poai.fecha_cdp,
        observaciones: seguimiento_poai.observaciones,
        id_plan: seguimiento_poai.id_plan,
        id_programa: seguimiento_poai.id_programa,
        id_proyecto: seguimiento_poai.id_proyecto,
        id_producto: seguimiento_poai.id_producto,
        id_actividad: seguimiento_poai.id_actividad,
        id_indicador: seguimiento_poai.id_indicador,
        id_meta: seguimiento_poai.id_meta,
        id_concepto: seguimiento_poai.id_concepto,
        id_fuente_financiacion: seguimiento_poai.id_fuente_financiacion,
        id_unidad_organizacional: seguimiento_poai.id_unidad_organizacional,
        id_detalle_inversion: seguimiento_poai.id_detalle_inversion,
        id_banco_proyecto: seguimiento_poai.id_banco_proyecto,
        id_modalidad: seguimiento_poai.id_modalidad,
        id_ubicacion: seguimiento_poai.id_ubicacion,
        id_clase_tercero: seguimiento_poai.id_clase_tercero,
      });
    }
  }, [mode, seguimiento_poai]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode.crear) {
            onsubmit_seguimiento();
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
            <Title title="Registro de seguimiento POAI" />
          </Grid>
          {mode.editar ? (
            <>
              {/* <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_sector"
                  control={control_seguimiento}
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
              control={control_seguimiento}
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
                  error={!!errors_seguimiento.nombre_meta}
                  helperText={
                    errors_seguimiento.nombre_meta
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
              control={control_seguimiento}
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
                  error={!!errors_seguimiento.objeto_contrato}
                  helperText={
                    errors_seguimiento.objeto_contrato
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
              control={control_seguimiento}
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
                  error={!!errors_seguimiento.banco_valor}
                  helperText={
                    errors_seguimiento.banco_valor
                      ? 'Es obligatorio ingresar un valor'
                      : 'Ingrese un valor'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="id_rubro"
              control={control_seguimiento}
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
                  error={!!errors_seguimiento.id_rubro}
                  helperText={
                    errors_seguimiento?.id_rubro?.type === 'required'
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
              control={control_seguimiento}
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
                  error={!!errors_seguimiento.id_fuente_financiacion}
                  helperText={
                    errors_seguimiento?.id_fuente_financiacion?.type ===
                    'required'
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
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button
                variant="outlined"
                color="warning"
                disabled={false}
                onClick={() => {
                  limpiar_formulario_seguimiento();
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
                disabled={is_savingd_seguimiento}
                startIcon={<SaveIcon />}
                loading={is_savingd_seguimiento}
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
