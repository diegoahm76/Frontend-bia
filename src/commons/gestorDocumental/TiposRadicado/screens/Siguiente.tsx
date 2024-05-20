/* eslint-disable @typescript-eslint/no-unused-vars */
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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SaveIcon from '@mui/icons-material/Save';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { Controller } from 'react-hook-form';
import { DataContext } from '../context/context/context';
// import Select from 'react-select';
import { useRadicadosHook } from '../hooks/useRadicadosHook';
import { useContext, useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { AñosCerrados } from '../components/AñosCerrados';

export const Siguiente: React.FC = () => {
  const {
    // * useForm
    control_radicados,
    errors_radicados,
    reset_radicados,
    data_watch_radicados,
    // * años
    nextYear,
    formattedDate,
    // * onSubmit
    onSubmit_radicados,
    onSubmit_radicados_update,
    is_saving,
    // * datos usuario
    datos,
  } = useRadicadosHook();

  const {
    tipos_radicado_selected,
    data_consecutivo,
    fetch_data_tipos_radicado_selected,
    fetch_data_consecutivo,
  } = useContext(DataContext);

  const [tipos_radicado, set_tipos_radicado] = useState<string>('');
  const [id_radicado, set_id_radicado] = useState<number>(0);
  const [open_dialog, set_open_dialog] = useState<boolean>(false);

  useEffect(() => {
    void fetch_data_tipos_radicado_selected();
    reset_radicados(
      {
        agno_radicado: nextYear,
        cod_tipo_radicado: '',
        prefijo_consecutivo: '',
        consecutivo_inicial: '1',
        cantidad_digitos: '0',
      },
      {
        keepErrors: true, // Mantener los errores después de resetear el formulario
        keepDirty: true, // Mantener el estado "dirty" después de resetear el formulario
        keepIsSubmitted: false, // Establecer el estado "isSubmitted" a false después de resetear el formulario
        keepTouched: false, // Establecer el estado "touched" a false después de resetear el formulario
        keepIsValid: false, // Establecer el estado "isValid" a false después de resetear el formulario
      }
    );
  }, []);

  useEffect(() => {
    if (tipos_radicado !== '') {
      void fetch_data_consecutivo(nextYear, tipos_radicado);
    }
  }, [tipos_radicado]);

  useEffect(() => {
    if (data_consecutivo?.id_config_tipo_radicado_agno) {
      set_id_radicado(data_consecutivo?.id_config_tipo_radicado_agno);
      //  console.log('')('data_consecutivo', data_consecutivo);
      reset_radicados({
        agno_radicado: nextYear,
        implementar: data_consecutivo?.implementar,
        cod_tipo_radicado: data_consecutivo?.cod_tipo_radicado,
        prefijo_consecutivo: data_consecutivo?.prefijo_consecutivo,
        consecutivo_inicial: data_consecutivo?.consecutivo_inicial as any,
        cantidad_digitos: data_consecutivo?.cantidad_digitos as any,
      });
    } else {
      reset_radicados(
        {
          agno_radicado: nextYear,
          cod_tipo_radicado: data_watch_radicados.cod_tipo_radicado,
          implementar: data_watch_radicados.implementar,
          prefijo_consecutivo: data_watch_radicados.prefijo_consecutivo,
          consecutivo_inicial: '1',
          cantidad_digitos: '0',
        },
        {
          keepErrors: true, // Mantener los errores después de resetear el formulario
          keepDirty: true, // Mantener el estado "dirty" después de resetear el formulario
          keepIsSubmitted: false, // Establecer el estado "isSubmitted" a false después de resetear el formulario
          keepTouched: false, // Establecer el estado "touched" a false después de resetear el formulario
          keepIsValid: false, // Establecer el estado "isValid" a false después de resetear el formulario
        }
      );
    }
  }, [data_consecutivo, tipos_radicado]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!data_consecutivo) {
            void onSubmit_radicados();
          } else {
            void onSubmit_radicados_update(id_radicado as any);
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
                  // placeholder="Año radicado"
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
          <Grid item xs={12} sm={6}>
            <Controller
              name="cod_tipo_radicado"
              control={control_radicados}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Tipo de radicado"
                  // placeholder="Depósito de archivo"
                  select
                  size="small"
                  margin="dense"
                  disabled={false}
                  fullWidth
                  required={true}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                    set_tipos_radicado(e.target.value);
                  }}
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
                  // placeholder="Asignar prefijo"
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
          <Grid item xs={12} sm={6}>
            <Controller
              name="consecutivo_inicial"
              control={control_radicados}
              defaultValue="1"
              rules={{
                required: data_watch_radicados.implementar
                  ? 'Este campo es requerido'
                  : false,
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Valor inicial del consecutivo"
                  // placeholder="Valor inicial del consecutivo"
                  // type="number"
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
          <Grid item xs={12} sm={6}>
            <Controller
              name="cantidad_digitos"
              defaultValue="0"
              control={control_radicados}
              rules={{
                required: data_watch_radicados.implementar
                  ? 'Este campo es requerido'
                  : false,
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Cantidad de dígitos"
                  // placeholder="Cantidad de dígitos"
                  // type="number"
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
          <Grid item xs={12} sm={6}>
            <TextField
              label="Fecha de configuración"
              // placeholder="Fecha de configuración"
              size="small"
              margin="dense"
              disabled={true}
              fullWidth
              required={false}
              value={formattedDate}
              helperText="Fecha de configuración"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              // label="Persona que configuró"
              // placeholder="Persona que configuró"
              size="small"
              margin="dense"
              disabled={true}
              fullWidth
              required={false}
              value={datos?.nombre_completo}
              helperText="Persona que configurá"
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
                color="warning"
                loading={false}
                disabled={false}
                startIcon={<RemoveRedEyeIcon />}
                onClick={() => {
                  set_open_dialog(true);
                }}
              >
                Consultar años cerrados
              </LoadingButton>
            </Grid>
            <Grid item>
              <LoadingButton
                variant="outlined"
                color="primary"
                loading={false}
                disabled={!!data_consecutivo}
                startIcon={<CleaningServicesIcon />}
                onClick={() => {
                  reset_radicados(
                    {
                      agno_radicado: nextYear,
                      cod_tipo_radicado: '',
                      prefijo_consecutivo: '',
                      consecutivo_inicial: '1',
                      cantidad_digitos: '0',
                    },
                    {
                      keepErrors: true, // Mantener los errores después de resetear el formulario
                      keepDirty: true, // Mantener el estado "dirty" después de resetear el formulario
                      keepIsSubmitted: false, // Establecer el estado "isSubmitted" a false después de resetear el formulario
                      keepTouched: false, // Establecer el estado "touched" a false después de resetear el formulario
                      keepIsValid: false, // Establecer el estado "isValid" a false después de resetear el formulario
                    }
                  );
                }}
              >
                Limpiar
              </LoadingButton>
            </Grid>
            <Grid item>
              <LoadingButton
                variant="contained"
                color="success"
                type="submit"
                loading={is_saving}
                disabled={is_saving}
                startIcon={<SaveIcon />}
              >
                {!data_consecutivo ? 'Guardar' : 'Actualizar'}
              </LoadingButton>{' '}
            </Grid>{' '}
            <Grid item>
              <ButtonSalir />
            </Grid>
          </Grid>
        </Grid>
      </form>
      <AñosCerrados
        open_dialog={open_dialog}
        set_open_dialog={set_open_dialog}
      />
    </>
  );
};
