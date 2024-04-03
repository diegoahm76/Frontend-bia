/* eslint-disable @typescript-eslint/naming-convention */
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Title } from '../../../../../components/Title';
import { Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useContext, useEffect } from 'react';
import { set_current_mode_planes } from '../../../store/slice/indexPlanes';
import { useAdquisicionesHook } from '../../hooks/useAdquisicionesHook';
import { DataContextAdquisiciones } from '../../context/context';
import { NumericFormatCustom } from '../../../components/inputs/NumericInput';
import { meses_selected } from '../../choices/selects';
import { BuscarPersona } from '../../../components/BuscarPersona';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarPlanAdquisicion: React.FC = () => {
  const {
    control_adquisiciones,
    errors_adquisiciones,
    reset_adquisiciones,
    data_watch_adquisiciones,
    set_value_adquisiciones,

    onsubmit_adquisiciones,
    onsubmit_editar,
    is_savingd_adquisiciones,

    limpiar_formulario_adquisiciones,
    l,
  } = useAdquisicionesHook();

  const dispatch = useAppDispatch();

  const { mode, plan_adquisiciones } = useAppSelector((state) => state.planes);

  const {
    planes_selected,
    intervalos_selected,
    modalidad_selected,
    recurso_paa_selected,
    estado_vf_selected,
    unidades_organizaciones_selected,
    ubicacion_selected,
    rows_paa_codigos,
    set_id_person,
    set_is_limpiar_formulario,
    fetch_data_planes,
    fetch_data_intervalos,
    fetch_data_modalidad,
    fetch_data_recurso_paa,
    fetch_data_estado_vf,
    fetch_data_unidades,
    fetch_data_ubicacion,
  } = useContext(DataContextAdquisiciones);

  useEffect(() => {
    fetch_data_planes();
    fetch_data_intervalos();
    fetch_data_modalidad();
    fetch_data_recurso_paa();
    fetch_data_estado_vf();
    fetch_data_unidades();
    fetch_data_ubicacion();
  }, []);

  console.log('rows_paa_codigos', rows_paa_codigos);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_adquisiciones();
    }
    if (mode.editar) {
      set_id_person(
        (plan_adquisiciones.id_persona_responsable as number) ?? null
      );
      console.log('plan_adquisiciones', plan_adquisiciones);
      reset_adquisiciones({
        id_plan_anual: plan_adquisiciones.id_plan_anual,
        nombre_plan: plan_adquisiciones.nombre_plan,
        nombre_intervalo: plan_adquisiciones.nombre_intervalo,
        nombre_modalidad: plan_adquisiciones.nombre_modalidad,
        nombre_fuente: plan_adquisiciones.nombre_fuente,
        nombre_estado: plan_adquisiciones.nombre_estado,
        nombre_unidad: plan_adquisiciones.nombre_unidad,
        nombre_ubicacion: plan_adquisiciones.nombre_ubicacion,
        persona_responsable: plan_adquisiciones.persona_responsable,
        codigo_modalidad: plan_adquisiciones.codigo_modalidad,
        email_persona_responsable: plan_adquisiciones.email_persona_responsable,
        telefono_persona_responsable:
          plan_adquisiciones.telefono_persona_responsable,
        descripcion: plan_adquisiciones.descripcion,
        mes_inicio: plan_adquisiciones.mes_inicio,
        mes_oferta: plan_adquisiciones.mes_oferta,
        duracion: plan_adquisiciones.duracion,
        valor_total_estimado: plan_adquisiciones.valor_total_estimado,
        valor_vigencia_actual: plan_adquisiciones.valor_vigencia_actual,
        vigencia_futura: plan_adquisiciones.vigencia_futura,
        decreto_paa: plan_adquisiciones.decreto_paa,
        suministro_paa: plan_adquisiciones.suministro_paa,
        id_plan: plan_adquisiciones.id_plan,
        id_intervalo: plan_adquisiciones.id_intervalo,
        id_modalidad: plan_adquisiciones.id_modalidad,
        id_recurso_paa: plan_adquisiciones.id_recurso_paa,
        id_estado_vf: plan_adquisiciones.id_estado_vf,
        id_unidad_organizacional: plan_adquisiciones.id_unidad_organizacional,
        id_ubicaion: plan_adquisiciones.id_ubicaion,
        id_persona_responsable: plan_adquisiciones.id_persona_responsable,
      });
    }
  }, [mode, plan_adquisiciones]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode.crear) {
            onsubmit_adquisiciones();
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
            <Title title="Registro de Plan Anual de Adquisiciones (PAA)" />
          </Grid>

          {mode.editar ? (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="codigos unspsc"
                  variant="outlined"
                  multiline
                  value={rows_paa_codigos
                    .map((item) => item.codigo_unsp)
                    .join(', ')}
                  disabled={true}
                  required={true}
                />
              </Grid>
            </>
          ) : null}
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="id_plan"
              control={control_adquisiciones}
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
                  error={!!errors_adquisiciones.id_plan}
                  helperText={
                    errors_adquisiciones?.id_plan?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese el plan'
                  }
                >
                  {planes_selected.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Controller
              name="descripcion"
              control={control_adquisiciones}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Descripción"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_adquisiciones.descripcion}
                  helperText={
                    errors_adquisiciones.descripcion
                      ? 'Es obligatorio ingresar una descripción'
                      : 'Ingrese una descripción'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="mes_inicio"
              control={control_adquisiciones}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mes inicio"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_adquisiciones.mes_inicio}
                  helperText={
                    errors_adquisiciones.mes_inicio
                      ? 'Es obligatorio ingresar mes inicio'
                      : 'Ingrese mes inicio'
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
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="mes_oferta"
              control={control_adquisiciones}
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
                  error={!!errors_adquisiciones.mes_oferta}
                  helperText={
                    errors_adquisiciones.mes_oferta
                      ? 'Es obligatorio ingresar mes oferta'
                      : 'Ingrese mes oferta'
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
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="duracion"
              control={control_adquisiciones}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Duración"
                  variant="outlined"
                  type="number"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_adquisiciones.duracion}
                  helperText={
                    errors_adquisiciones.duracion
                      ? 'Es obligatorio ingresar una duración'
                      : 'Ingrese una duración'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="id_intervalo"
              control={control_adquisiciones}
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
                  error={!!errors_adquisiciones.id_intervalo}
                  helperText={
                    errors_adquisiciones?.id_intervalo?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese un intervalo '
                  }
                >
                  {intervalos_selected.map((option) => (
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
              name="id_modalidad"
              control={control_adquisiciones}
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
                  error={!!errors_adquisiciones.id_modalidad}
                  helperText={
                    errors_adquisiciones?.id_modalidad?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese una modalidad '
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
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="id_recurso_paa"
              control={control_adquisiciones}
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
                  error={!!errors_adquisiciones.id_recurso_paa}
                  helperText={
                    errors_adquisiciones?.id_recurso_paa?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese un recurso paa '
                  }
                >
                  {recurso_paa_selected.map((option) => (
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
              name="valor_total_estimado"
              control={control_adquisiciones}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Valor total estimado"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_adquisiciones.valor_total_estimado}
                  helperText={
                    errors_adquisiciones.valor_total_estimado
                      ? 'Es obligatorio ingresar un valor'
                      : 'Ingrese valor total estimado'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="valor_vigencia_actual"
              control={control_adquisiciones}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Valor vigencia actual"
                  variant="outlined"
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_adquisiciones.valor_vigencia_actual}
                  helperText={
                    errors_adquisiciones.valor_vigencia_actual
                      ? 'Es obligatorio ingresar un valor'
                      : 'Ingrese valor vigencia actual'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="vigencia_futura"
              control={control_adquisiciones}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <FormControl variant="outlined" fullWidth size="small">
                  <InputLabel>Vigencia futura</InputLabel>
                  <Select
                    label="Vigencia futura"
                    value={value}
                    onChange={onChange}
                    error={!!errors_adquisiciones.vigencia_futura}
                  >
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                  </Select>
                  <FormHelperText>
                    {errors_adquisiciones.vigencia_futura
                      ? 'Es obligatorio seleccionar una vigencia'
                      : 'Seleccione una vigencia futura'}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="id_estado_vf"
              control={control_adquisiciones}
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
                  error={!!errors_adquisiciones.id_estado_vf}
                  helperText={
                    errors_adquisiciones?.id_estado_vf?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese un estado vigencia futura '
                  }
                >
                  {estado_vf_selected.map((option) => (
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
              control={control_adquisiciones}
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
                  error={!!errors_adquisiciones.id_unidad_organizacional}
                  helperText={
                    errors_adquisiciones?.id_unidad_organizacional?.type ===
                    'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese un grupo '
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
          <Grid item xs={12} sm={6}>
            <Controller
              name="id_ubicaion"
              control={control_adquisiciones}
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
                  error={!!errors_adquisiciones.id_ubicaion}
                  helperText={
                    errors_adquisiciones?.id_ubicaion?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : 'ingrese una ubicación '
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

          {/* COMPONENTE DE BUSQUEDA AVANZADA DE PERSONAS */}

          {mode.editar ? (
            <>
              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="persona_responsable"
                  control={control_adquisiciones}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Persona Responsable"
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
              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="email_persona_responsable"
                  control={control_adquisiciones}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Email Persona Responsable"
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
              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="telefono_persona_responsable"
                  control={control_adquisiciones}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Telefono Persona Responsable"
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
            </>
          ) : null}

          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Seleccione Persona Responsable
            </Typography>
            <BuscarPersona />
          </Grid>

          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button
                variant="outlined"
                color="warning"
                disabled={false}
                onClick={() => {
                  limpiar_formulario_adquisiciones();
                  dispatch(
                    set_current_mode_planes({
                      ver: true,
                      crear: true,
                      editar: false,
                    })
                  );
                  set_is_limpiar_formulario(true);
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
                disabled={is_savingd_adquisiciones}
                startIcon={<SaveIcon />}
                loading={is_savingd_adquisiciones}
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
