/* eslint-disable @typescript-eslint/naming-convention */
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Title } from '../../../../../components/Title';
import { Controller } from 'react-hook-form';
import { usePlanesHook } from '../../hooks/usePlanesHook';

import InfoIcon from '@mui/icons-material/Info';

// fecha
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { tipo_plan } from '../../choices/selects';
import { LoadingButton } from '@mui/lab';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import SaveIcon from '@mui/icons-material/Save';
import { useAppSelector } from '../../../../../hooks';
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarPlanes: React.FC = () => {
  const {
    set_agno_ini,
    set_agno_fin,

    control_planes,
    errors_planes,
    data_watch_planes,
    reset_planes,

    onsubmit_planes,
    onsubmit_editar,
    is_saving_planes,

    limpiar_formulario_planes,
  } = usePlanesHook();

  const { mode, plan } = useAppSelector((state) => state.planes);

  //  console.log('')(plan, 'plan');

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_planes();
    }
    if (mode.editar) {
      reset_planes({
        nombre_plan: plan.nombre_plan,
        sigla_plan: plan.sigla_plan,
        tipo_plan: plan.tipo_plan,
        agno_inicio: plan.agno_inicio
          ? dayjs().year(plan.agno_inicio).toDate()
          : null,
        agno_fin: plan.agno_fin ? dayjs().year(plan.agno_fin).toDate() : null,
        estado_vigencia: plan.estado_vigencia,
      });
      set_agno_ini(plan.agno_inicio);
      set_agno_fin(plan.agno_fin);
    }
  }, [mode, plan]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode.crear) {
            onsubmit_planes();
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
            <Title title="Registro de Planes" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="nombre_plan"
              control={control_planes}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Nombre del plan"
                  variant="outlined"
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_planes.nombre_plan}
                  helperText={
                    errors_planes.nombre_plan
                      ? 'Es obligatorio ingresar una nombre_plan'
                      : 'Ingrese un nombre'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="sigla_plan"
              control={control_planes}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Sigla del plan"
                  variant="outlined"
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_planes.sigla_plan}
                  helperText={
                    errors_planes.sigla_plan
                      ? 'Es obligatorio ingresar una identificación'
                      : 'Ingrese una sigla'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="tipo_plan"
              control={control_planes}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Tipo de Plan"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_planes.tipo_plan}
                  helperText={
                    errors_planes.tipo_plan
                      ? 'Es obligatorio ingresar un tipo plan'
                      : 'Ingrese un tipo de plan'
                  }
                >
                  {tipo_plan.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="agno_inicio"
                control={control_planes}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <DatePicker
                    label="Seleccione año inicio"
                    value={value || null}
                    onChange={(newValue) => {
                      onChange(newValue);
                      const valor = dayjs(newValue).format('YYYY');
                      set_agno_ini(valor);
                    }}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        fullWidth
                        size="small"
                        autoComplete="off" // Desactivar el autocompletado
                        error={!!error}
                        helperText={
                          error
                            ? 'Es obligatorio seleccionar una fecha'
                            : 'Seleccione un año'
                        }
                      />
                    )}
                    views={['year']}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="agno_fin"
                control={control_planes}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <DatePicker
                    label="Seleccione año final"
                    value={value || null}
                    onChange={(newValue) => {
                      onChange(newValue);
                      const valor = dayjs(newValue).format('YYYY');
                      set_agno_fin(valor);
                    }}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        fullWidth
                        size="small"
                        autoComplete="off" // Desactivar el autocompletado
                        error={!!error}
                        helperText={
                          error
                            ? 'Es obligatorio seleccionar una fecha'
                            : 'Seleccione un año'
                        }
                      />
                    )}
                    views={['year']}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            sx={{
              marginBottom: '10px',
              width: 'auto',
            }}
            item
            xs={12}
            sm={6}
            md={4}
          >
            <Controller
              name="estado_vigencia"
              control={control_planes}
              // defaultValue=""
              rules={{
                required: data_watch_planes.implementar
                  ? 'Este campo es requerido'
                  : false,
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={value}
                        onChange={(e) => {
                          onChange(e.target.checked);
                        }}
                        // name="checkedB"
                        color="primary"
                      />
                    }
                    label={
                      value ? (
                        <Typography variant="body2">
                          <strong>Estado vigente</strong>
                          <Tooltip
                            title="Si el plan está vigente, se debe seleccionar esta opción"
                            placement="right"
                          >
                            <InfoIcon
                              sx={{
                                width: '1.2rem',
                                height: '1.2rem',
                                ml: '0.5rem',
                                color: 'green',
                              }}
                            />
                          </Tooltip>
                        </Typography>
                      ) : (
                        <Typography variant="body2">
                          <strong>Estado no vigente</strong>
                          <Tooltip title="Estado no vigente" placement="right">
                            <InfoIcon
                              sx={{
                                width: '1.2rem',
                                height: '1.2rem',
                                ml: '0.5rem',
                                color: 'orange',
                              }}
                            />
                          </Tooltip>
                        </Typography>
                      )
                    }
                  />
                </FormControl>
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
                  limpiar_formulario_planes();
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
                disabled={is_saving_planes}
                startIcon={<SaveIcon />}
                loading={is_saving_planes}
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
