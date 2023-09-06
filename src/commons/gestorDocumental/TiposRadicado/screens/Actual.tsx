/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Title } from '../../../../components/Title';
import { LoadingButton } from '@mui/lab';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { Controller } from 'react-hook-form';
import { DataContext } from '../context/context/context';
// import Select from 'react-select';
import { useRadicadosHook } from '../hooks/useRadicadosHook';
import { useContext, useEffect } from 'react';
import InfoIcon from '@mui/icons-material/Info';

export const Actual: React.FC = () => {
  const {
    control_radicados,
    errors_radicados,
    reset_radicados,
    // * años
    currentYear,
    data_watch_radicados,
    onSubmit_radicados,
  } = useRadicadosHook();
  const { tipos_radicado_selected, fetch_data_tipos_radicado_selected } =
    useContext(DataContext);

  useEffect(() => {
    void fetch_data_tipos_radicado_selected();
    reset_radicados({
      agno_radicado: currentYear,
      cod_tipo_radicado: '',
      prefijo_consecutivo: '',
      consecutivo_inicial: 1,
      cantidad_digitos: 0,
    });
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void onSubmit_radicados();
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
            <Title title="Administración de tipos de radicados y sus consecutivos" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="agno_radicado"
              control={control_radicados}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Año radicado"
                  placeholder="Año radicado"
                  size="small"
                  margin="dense"
                  disabled={true}
                  fullWidth
                  required={true}
                  value={value}
                  onChange={onChange}
                  error={!!errors_radicados.agno_radicado}
                  helperText={
                    errors_radicados.agno_radicado
                      ? 'Este campo es requerido'
                      : 'Selecciona un año'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="cod_tipo_radicado"
              control={control_radicados}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Depósito de archivo"
                  placeholder="Depósito de archivo"
                  select
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={true}
                  value={value}
                  onChange={onChange}
                  error={!!errors_radicados.cod_tipo_radicado}
                  helperText={
                    errors_radicados.cod_tipo_radicado
                      ? 'Este campo es requerido'
                      : 'Selecciona un tipo de radicado'
                  }
                >
                  {tipos_radicado_selected.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />{' '}
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid
            sx={{
              marginBottom: '10px',
              width: 'auto',
            }}
            item
            xs={12}
            sm={6}
          >
            <Controller
              name="implementar"
              control={control_radicados}
              // defaultValue=""
              rules={{
                required: data_watch_radicados.implementar
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
                          <strong>Implementar radicado</strong>
                          <Tooltip
                            title="SI notifiación por correo electrónico"
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
                          <strong>No implementar radicado</strong>
                          <Tooltip
                            title="NO Notificación por correo electrónico"
                            placement="right"
                          >
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
          <Grid item xs={12}>
            <Title title="Configuración de inicio" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="prefijo_consecutivo"
              control={control_radicados}
              rules={{
                required: data_watch_radicados.implementar
                  ? 'Este campo es requerido'
                  : false,
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Asignar prefijo"
                  placeholder="Asignar prefijo"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={data_watch_radicados.implementar}
                  value={value}
                  onChange={onChange}
                  error={!!errors_radicados.prefijo_consecutivo}
                  helperText={
                    errors_radicados.prefijo_consecutivo
                      ? 'Este campo es requerido'
                      : 'Asinar prefijo'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="consecutivo_inicial"
              control={control_radicados}
              rules={{
                required: data_watch_radicados.implementar
                  ? 'Este campo es requerido'
                  : false,
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Valor inicial del consecutivo"
                  placeholder="Valor inicial del consecutivo"
                  type="number"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={data_watch_radicados.implementar}
                  value={value}
                  onChange={onChange}
                  error={!!errors_radicados.consecutivo_inicial}
                  helperText={
                    errors_radicados.consecutivo_inicial
                      ? 'Este campo es requerido'
                      : 'Valor inicial del consecutivo'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="cantidad_digitos"
              control={control_radicados}
              rules={{
                required: data_watch_radicados.implementar
                  ? 'Este campo es requerido'
                  : false,
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Cantidad de dígitos"
                  placeholder="Cantidad de dígitos"
                  type="number"
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={data_watch_radicados.implementar}
                  value={value}
                  onChange={onChange}
                  error={!!errors_radicados.cantidad_digitos}
                  helperText={
                    errors_radicados.cantidad_digitos
                      ? 'Este campo es requerido'
                      : 'Cantidad de dígitos'
                  }
                />
              )}
            />
          </Grid>
        </Grid>

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
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <LoadingButton
                variant="outlined"
                color="primary"
                loading={false}
                disabled={false}
                startIcon={<CleaningServicesIcon />}
                // onClick={() => {
                //   limpiar_formulario();
                // }}
              >
                Limpiar
              </LoadingButton>
            </Grid>
            <Grid item>
              <LoadingButton
                variant="contained"
                color="success"
                type="submit"
                loading={false}
                disabled={false}
                startIcon={<SaveIcon />}
              >
                {/* {mode_estante.editar ? 'Actualizar' : 'Guardar'} */}
                Guardar
              </LoadingButton>
            </Grid>{' '}
            <Grid item>
              <ButtonSalir />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
