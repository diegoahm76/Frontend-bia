/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useContext, useEffect, useState } from 'react';
import { set_current_mode_planes } from '../../../store/slice/indexPlanes';
import { useSeguimientoPOAIHook } from '../../hooks/useSeguimientoPOAIHook';
import { DataContextSeguimientoPOAI } from '../../context/context';
import { NumericFormatCustom } from '../../../components/inputs/NumericInput';
import { meses_selected } from '../../../PlanAnualAdquisiciones/choices/selects';

// librerias de manejo de fechas

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarSeguiminetoPOAI: React.FC = () => {
  const {
    control_seguimiento,
    errors_seguimiento,
    reset_seguimiento,
    register_seguimiento,
    set_value_seguimiento,
    data_watch_seguimiento,

    onsubmit_seguimiento,
    onsubmit_editar,
    is_savingd_seguimiento,

    limpiar_formulario_seguimiento,
  } = useSeguimientoPOAIHook();

  const dispatch = useAppDispatch();

  const { mode, seguimiento_poai } = useAppSelector((state) => state.planes);

  const {
    fuentes_selected,
    concepto_selected,
    sector_selected,
    detalle_selected,
    ubicacion_selected,
    unidades_organizaciones_selected,
    modalidad_selected,
    banco_selected,
    clase_terceros_selected,
    set_id_proyecto,
    set_id_actividad,
    set_id_indicador,
    set_id_meta,
    fetch_data_rubros,
    fetch_data_fuentes,
    fetch_data_concepto,
    fetach_data_sector,
    fetch_data_detalle,
    fetch_data_ubicacion,
    fetch_data_unidades_organizaciones,
    fetch_data_modalidad,
    fetch_data_banco,
    fetch_data_clase_terceros,
  } = useContext(DataContextSeguimientoPOAI);

  console.log('clase_terceros_selected', clase_terceros_selected);

  useEffect(() => {
    fetch_data_rubros();
    fetch_data_fuentes();
    fetch_data_concepto();
    fetach_data_sector();
    fetch_data_detalle();
    fetch_data_ubicacion();
    fetch_data_unidades_organizaciones();
    fetch_data_modalidad();
    fetch_data_banco();
    fetch_data_clase_terceros();
  }, []);

  // calcular valor_total suma de vanos
  const vano_1 = Number(data_watch_seguimiento.vano_1);
  const vano_2 = Number(data_watch_seguimiento.vano_2);
  const vano_3 = Number(data_watch_seguimiento.vano_3);
  const vano_4 = Number(data_watch_seguimiento.vano_4);

  const valor_total = vano_1 + vano_2 + vano_3 + vano_4;

  useEffect(() => {
    set_value_seguimiento('valor_total', valor_total);
  }, [valor_total]);

  const [fecha_termiacion, set_fecha_termiacion] = useState<Dayjs | null>(null);
  const [fecha_rp, set_fecha_rp] = useState<Dayjs | null>(null);
  const [fecha_cdp, set_fecha_cdp] = useState<Dayjs | null>(null);

  const handle_date_creacion_change = (
    fieldName: string,
    value: Dayjs | null
  ): void => {
    if (value !== null) {
      switch (fieldName) {
        case 'fecha_termiacion':
          set_fecha_termiacion(value);
          set_value_seguimiento('fecha_termiacion', value.format('YYYY-MM-DD'));
          break;
        case 'fecha_rp':
          set_fecha_rp(value);
          set_value_seguimiento('fecha_rp', value.format('YYYY-MM-DD'));
          break;
        case 'fecha_cdp':
          set_fecha_cdp(value);
          set_value_seguimiento('fecha_cdp', value.format('YYYY-MM-DD'));
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (mode.crear) {
      set_value_seguimiento(
        'fecha_termiacion',
        fecha_termiacion?.format('YYYY-MM-DD')
      );
      set_fecha_termiacion(fecha_termiacion ?? null);
      set_value_seguimiento('fecha_rp', fecha_rp?.format('YYYY-MM-DD'));
      set_fecha_rp(fecha_rp ?? null);
      limpiar_formulario_seguimiento();
    }
    if (mode.editar) {
      if (seguimiento_poai?.fecha_termiacion) {
        set_value_seguimiento(
          'fecha_termiacion',
          dayjs(seguimiento_poai.fecha_termiacion).format('YYYY-MM-DD')
        );
        set_fecha_termiacion(dayjs(seguimiento_poai.fecha_termiacion) ?? null);
      }
      if (seguimiento_poai?.fecha_rp) {
        set_value_seguimiento(
          'fecha_rp',
          dayjs(seguimiento_poai.fecha_rp).format('YYYY-MM-DD')
        );
        set_fecha_rp(dayjs(seguimiento_poai.fecha_rp) ?? null);
      }
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
          {/* porcentaje_pto */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="porcentaje_pto"
              control={control_seguimiento}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="% PTO"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0) {
                      onChange(e);
                    }
                  }}
                  error={!!errors_seguimiento.porcentaje_pto}
                  helperText={
                    errors_seguimiento.porcentaje_pto
                      ? 'Es obligatorio ingresar un porcentaje'
                      : 'Ingrese un porcentaje'
                  }
                />
              )}
            />
          </Grid>
          {/* id_concepto */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="id_concepto"
              control={control_seguimiento}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Concepto"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_seguimiento.id_concepto}
                  helperText={
                    errors_seguimiento.id_concepto
                      ? 'Es obligatorio ingresar un concepto'
                      : 'Ingrese un concepto'
                  }
                >
                  {concepto_selected.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          {/* id_sector */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="id_sector"
              control={control_seguimiento}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Sector"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_seguimiento.id_sector}
                  helperText={
                    errors_seguimiento.id_sector
                      ? 'Es obligatorio ingresar un sector'
                      : 'Ingrese un sector'
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
          {/* id_detalle_inversion */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="id_detalle_inversion"
              control={control_seguimiento}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Detalle de inversion"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_seguimiento.id_detalle_inversion}
                  helperText={
                    errors_seguimiento.id_detalle_inversion
                      ? 'Es obligatorio ingresar un detalle de inversion'
                      : 'Ingrese un detalle de inversion'
                  }
                >
                  {detalle_selected.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          {/* id_unidad_organizacional */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="id_unidad_organizacional"
              control={control_seguimiento}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Unidad organizacional"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_seguimiento.id_unidad_organizacional}
                  helperText={
                    errors_seguimiento.id_unidad_organizacional
                      ? 'Es obligatorio ingresar una unidad organizacional'
                      : 'Ingrese una unidad organizacional'
                  }
                >
                  {unidades_organizaciones_selected.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          {/* id_fuente financiacion */}
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
          {/* descripcion */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="descripcion"
              control={control_seguimiento}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Descripción"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  error={!!errors_seguimiento.descripcion}
                  helperText={
                    errors_seguimiento.descripcion
                      ? 'Es obligatorio ingresar un nombre'
                      : 'Ingrese un nombre'
                  }
                />
              )}
            />
          </Grid>
          {/* vano 1 con label de año 1 */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="vano_1"
              control={control_seguimiento}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Año 1"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_seguimiento.vano_1}
                  helperText={
                    errors_seguimiento.vano_1
                      ? 'Es obligatorio ingresar un valor'
                      : 'Ingrese un valor'
                  }
                />
              )}
            />
          </Grid>
          {/* vano 2 con label de año 2 */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="vano_2"
              control={control_seguimiento}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Año 2"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  error={!!errors_seguimiento.vano_2}
                  helperText={
                    errors_seguimiento.vano_2
                      ? 'Es obligatorio ingresar un valor'
                      : 'Ingrese un valor'
                  }
                />
              )}
            />
          </Grid>
          {/* vano 3 con label de año 3 */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="vano_3"
              control={control_seguimiento}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Año 3"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  error={!!errors_seguimiento.vano_3}
                  helperText={
                    errors_seguimiento.vano_3
                      ? 'Es obligatorio ingresar un valor'
                      : 'Ingrese un valor'
                  }
                />
              )}
            />
          </Grid>
          {/* vano 4 con label de año 4 */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="vano_4"
              control={control_seguimiento}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Año 4"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  error={!!errors_seguimiento.vano_4}
                  helperText={
                    errors_seguimiento.vano_4
                      ? 'Es obligatorio ingresar un valor'
                      : 'Ingrese un valor'
                  }
                />
              )}
            />
          </Grid>
          {/* valor_total */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="valor_total"
              control={control_seguimiento}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Valor total"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={true}
                  required={true}
                  onChange={onChange}
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  error={!!errors_seguimiento.valor_total}
                  helperText={
                    errors_seguimiento.valor_total
                      ? 'Es obligatorio ingresar un valor total de fuente de financiacion'
                      : 'Ingrese un valor total de fuente de financiacion'
                  }
                />
              )}
            />
          </Grid>
          {/* id_banco */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="id_banco_proyecto"
              control={control_seguimiento}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Banco"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_seguimiento.id_banco_proyecto}
                  helperText={
                    errors_seguimiento.id_banco_proyecto
                      ? 'Es obligatorio ingresar un banco'
                      : 'Ingrese un banco'
                  }
                >
                  {banco_selected.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          {/* numero_cdp_paa */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="numero_cdp_paa"
              control={control_seguimiento}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Número CDP PAA"
                  variant="outlined"
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0) {
                      onChange(e);
                    }
                  }}
                  error={!!errors_seguimiento.numero_cdp_paa}
                  helperText={
                    errors_seguimiento.numero_cdp_paa
                      ? 'Es obligatorio ingresar un número'
                      : 'Ingrese un número'
                  }
                />
              )}
            />
          </Grid>
          {/* numero_rp_paa */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="numero_rp_paa"
              control={control_seguimiento}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Número RP PAA"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0) {
                      onChange(e);
                    }
                  }}
                  error={!!errors_seguimiento.numero_rp_paa}
                  helperText={
                    errors_seguimiento.numero_rp_paa
                      ? 'Es obligatorio ingresar un número'
                      : 'Ingrese un número'
                  }
                />
              )}
            />
          </Grid>
          {/* valor_seguimiento_banco_paa */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="valor_seguimiento_banco_paa"
              control={control_seguimiento}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Valor seguimiento banco PAA"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_seguimiento.valor_seguimiento_banco_paa}
                  helperText={
                    errors_seguimiento.valor_seguimiento_banco_paa
                      ? 'Es obligatorio ingresar un valor'
                      : 'Ingrese un valor'
                  }
                />
              )}
            />
          </Grid>
          {/* valor_cdp_paa */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="valor_cdp_paa"
              control={control_seguimiento}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Valor CDP PAA"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  error={!!errors_seguimiento.valor_cdp_paa}
                  helperText={
                    errors_seguimiento.valor_cdp_paa
                      ? 'Es obligatorio ingresar un valor'
                      : 'Ingrese un valor'
                  }
                />
              )}
            />
          </Grid>
          {/* valor_rp_paa */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="valor_rp_paa"
              control={control_seguimiento}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Valor RP PAA"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  error={!!errors_seguimiento.valor_rp_paa}
                  helperText={
                    errors_seguimiento.valor_rp_paa
                      ? 'Es obligatorio ingresar un valor'
                      : 'Ingrese un valor'
                  }
                />
              )}
            />
          </Grid>
          {/* Fecha de terminacion */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de terminación"
                value={fecha_termiacion}
                onChange={(value) => {
                  handle_date_creacion_change('fecha_termiacion', value);
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    {...register_seguimiento('fecha_termiacion', {
                      required: true,
                    })}
                    error={!!errors_seguimiento.fecha_termiacion}
                    helperText={
                      errors_seguimiento.fecha_termiacion
                        ? 'Es obligatorio la fecha de terminación'
                        : 'Ingrese la fecha de terminación'
                    }
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          {/* duracion debe ser un selECT con dia(s), mes(es), año(s) */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="duracion"
              control={control_seguimiento}
              defaultValue="dia"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  size="small"
                  label="Duración"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required
                  error={!!errors_seguimiento.duracion}
                  helperText={
                    errors_seguimiento?.duracion?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el duracion'
                  }
                >
                  <MenuItem key="dia" value="dia">
                    Día(s)
                  </MenuItem>
                  <MenuItem key="mes" value="mes">
                    Mes(es)
                  </MenuItem>
                  <MenuItem key="año" value="año">
                    Año(s)
                  </MenuItem>
                </TextField>
              )}
            />
          </Grid>
          {/* valor_mesual_paoi */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="valor_mesual_paoi"
              control={control_seguimiento}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Valor mensual PAOI"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_seguimiento.valor_mesual_paoi}
                  helperText={
                    errors_seguimiento.valor_mesual_paoi
                      ? 'Es obligatorio ingresar un valor'
                      : 'Ingrese un valor'
                  }
                />
              )}
            />
          </Grid>
          {/* id_modalidad */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="id_modalidad"
              control={control_seguimiento}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Modalidad"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_seguimiento.id_modalidad}
                  helperText={
                    errors_seguimiento.id_modalidad
                      ? 'Es obligatorio ingresar una modalidad'
                      : 'Ingrese una modalidad'
                  }
                >
                  {modalidad_selected.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          {/* mes_oferta_paa */}
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="mes_oferta_paa"
              control={control_seguimiento}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mes oferta"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_seguimiento.mes_oferta_paa}
                  helperText={
                    errors_seguimiento.mes_oferta_paa
                      ? 'Es obligatorio ingresar mes de oferta'
                      : 'Ingrese un  mes de oferta'
                  }
                >
                  {meses_selected.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          {/* mes_solicita */}
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="mes_solicita"
              control={control_seguimiento}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mes solicita"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_seguimiento.mes_solicita}
                  helperText={
                    errors_seguimiento.mes_solicita
                      ? 'Es obligatorio ingresar mes de solicitud'
                      : 'Ingrese un  mes de solicitud'
                  }
                >
                  {meses_selected.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          {/* valor_pagado */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="valor_pagado"
              control={control_seguimiento}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Valor pagado"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  error={!!errors_seguimiento.valor_pagado}
                  helperText={
                    errors_seguimiento.valor_pagado
                      ? 'Es obligatorio ingresar un valor'
                      : 'Ingrese un valor'
                  }
                />
              )}
            />
          </Grid>
          {/* valor_obligado */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="valor_obligado"
              control={control_seguimiento}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Valor obligado"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  error={!!errors_seguimiento.valor_obligado}
                  helperText={
                    errors_seguimiento.valor_obligado
                      ? 'Es obligatorio ingresar un valor'
                      : 'Ingrese un valor'
                  }
                />
              )}
            />
          </Grid>
          {/* valor_saldo */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="valor_saldo"
              control={control_seguimiento}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Valor saldo"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  multiline
                  value={value}
                  disabled={true}
                  required={false}
                  onChange={onChange}
                  error={!!errors_seguimiento.valor_saldo}
                  helperText={
                    errors_seguimiento.valor_saldo
                      ? 'Es obligatorio ingresar un valor'
                      : 'Ingrese un valor'
                  }
                />
              )}
            />
          </Grid>
          {/* porcentaje_ejecuta */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="porcentaje_ejecuta"
              control={control_seguimiento}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="% ejecuta"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0) {
                      onChange(e);
                    }
                  }}
                  error={!!errors_seguimiento.porcentaje_ejecuta}
                  helperText={
                    errors_seguimiento.porcentaje_ejecuta
                      ? 'Es obligatorio ingresar un porcentaje'
                      : 'Ingrese un porcentaje'
                  }
                />
              )}
            />
          </Grid>
          {/* id_ubicacion */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="id_ubicacion"
              control={control_seguimiento}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Ubicación"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_seguimiento.id_ubicacion}
                  helperText={
                    errors_seguimiento.id_ubicacion
                      ? 'Es obligatorio ingresar una ubicación'
                      : 'Ingrese una ubicación'
                  }
                >
                  {ubicacion_selected.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          {/* numero_contrato */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="numero_contrato"
              control={control_seguimiento}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Número contrato"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  error={!!errors_seguimiento.numero_contrato}
                  helperText={
                    errors_seguimiento.numero_contrato
                      ? 'Es obligatorio ingresar un número'
                      : 'Ingrese un número'
                  }
                />
              )}
            />
          </Grid>
          {/* id_banco */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="id_banco_proyecto"
              control={control_seguimiento}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Banco"
                  size="small"
                  margin="dense"
                  disabled={true}
                  select
                  fullWidth
                  required={true}
                  error={!!errors_seguimiento.id_banco_proyecto}
                  helperText={
                    errors_seguimiento.id_banco_proyecto
                      ? 'Es obligatorio ingresar un banco'
                      : 'Ingrese un banco'
                  }
                >
                  {banco_selected.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          {/* numerp_rp */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="numerp_rp"
              control={control_seguimiento}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Número RP"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  error={!!errors_seguimiento.numerp_rp}
                  helperText={
                    errors_seguimiento.numerp_rp
                      ? 'Es obligatorio ingresar un número'
                      : 'Ingrese un número'
                  }
                />
              )}
            />
          </Grid>
          {/* fecha_rp */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha RP"
                value={fecha_rp}
                onChange={(value) => {
                  handle_date_creacion_change('fecha_rp', value);
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    {...register_seguimiento('fecha_rp', {
                      required: true,
                    })}
                    error={!!errors_seguimiento.fecha_rp}
                    helperText={
                      errors_seguimiento.fecha_rp
                        ? 'Es obligatorio la fecha RP'
                        : 'Ingrese la fecha RP'
                    }
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          {/* valor_cdp */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="valor_cdp"
              control={control_seguimiento}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  fullWidth
                  size="small"
                  label="Valor CDP"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  error={!!errors_seguimiento.valor_cdp}
                  helperText={
                    errors_seguimiento.valor_cdp
                      ? 'Es obligatorio ingresar un valor'
                      : 'Ingrese un valor'
                  }
                />
              )}
            />
          </Grid>
          {/* fecha_cdp */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha CDP"
                value={fecha_cdp}
                onChange={(value) => {
                  handle_date_creacion_change('fecha_cdp', value);
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    {...register_seguimiento('fecha_cdp', {
                      required: true,
                    })}
                    error={!!errors_seguimiento.fecha_cdp}
                    helperText={
                      errors_seguimiento.fecha_cdp
                        ? 'Es obligatorio la fecha CDP'
                        : 'Ingrese la fecha CDP'
                    }
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          {/* id_clase_tercero */}
          {/* <Grid item xs={12} sm={6}>
            <Controller
              name="id_clase_tercero"
              control={control_seguimiento}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Clase tercero"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_seguimiento.id_clase_tercero}
                  helperText={
                    errors_seguimiento.id_clase_tercero
                      ? 'Es obligatorio ingresar una clase de tercero'
                      : 'Ingrese una clase de tercero'
                  }
                >
                  {clase_terceros_selected.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                  ;
                </TextField>
              )}
            />
          </Grid> */}
          {/* observaciones */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="observaciones"
              control={control_seguimiento}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  multiline
                  label="Observaciones"
                  variant="outlined"
                  value={value}
                  disabled={false}
                  required={false}
                  onChange={onChange}
                  error={!!errors_seguimiento.observaciones}
                  helperText={
                    errors_seguimiento.observaciones
                      ? 'Es obligatorio ingresar un nombre'
                      : 'Ingrese un nombre'
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
