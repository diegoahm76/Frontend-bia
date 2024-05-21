import {
  type SelectChangeEvent,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { control_error } from '../../../../helpers/controlError';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { get_tipo_documento } from '../../../../request/getRequest';
import ReCaptcha from 'react-google-recaptcha';
import { desbloquer_usuario } from '../../request/authRequest';
import type { Dayjs } from 'dayjs';
import type {
  IList,
  ResponseServer,
} from '../../../../interfaces/globalModels';
import type { AxiosError } from 'axios';
import { control_success } from '../../../recursoHidrico/requets/Request';
import { CustomSelect } from '../../../../components';
import dayjs from 'dayjs';
import { DEFAULT_AUTH_URL_BETA, DEFAULT_AUTH_URL_PROD } from '../../../../api/axios';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DesbloqueodeUsuario: React.FC = () => {
  const {
    register,
    handleSubmit: handle_submit,
    setValue: set_value,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const [is_loading, set_is_loading] = useState(false);
  const [fecha_nacimiento, set_fecha_nacimiento] = useState<Dayjs | null>(null);
  const [data_register, set_data_register] = useState({
    nombre_de_usuario: '',
    numero_documento: '',
    telefono_celular: '',
    email: '',
    fecha_nacimiento: '',
    redirect_url:
    (process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_AUTH_URL_BETA || `${DEFAULT_AUTH_URL_BETA}`
      : process.env.REACT_APP_AUTH_URL_PROD || `${DEFAULT_AUTH_URL_PROD}`
    ) + '/auth/cambiar_contrasena?desbloquear=true',
  });
  const [tipo_documento_opt, set_tipo_documento_opt] = useState<IList[]>([]);
  const [tipo_documento, set_tipo_documento] = useState('');
  const [is_valida_captcha, set_is_valida_captcha] = useState(false);
  // establece la fecha de nacimiento
  const on_change_birt_day = (value: Dayjs | null): void => {
    const date = dayjs(value).format('YYYY-MM-DD');
    set_value('fecha_nacimiento', date);
    set_value_form('fecha_nacimiento', date);
    set_fecha_nacimiento(value);
  };

  const get_selects_options = async (): Promise<void> => {
    set_is_loading(true);
    try {
      const {
        data: { data: res_tipo_documento },
      } = await get_tipo_documento();
      set_tipo_documento_opt(res_tipo_documento ?? []);
    } catch (err) {
      control_error(err);
    } finally {
      set_is_loading(false);
    }
  };

  // Se usa para escuchar los cambios de valor del componente CustomSelect
  const on_change = (e: SelectChangeEvent<string>): void => {
    set_tipo_documento(e.target.value);
    set_value_form(e.target.name, e.target.value);
  };

  // Establece los valores del formulario
  const set_value_form = (name: string, value: string): void => {
    set_data_register({
      ...data_register,
      [name]: value,
    });
    set_value(name, value);
  };

  const handle_change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_value_form(e.target.name, e.target.value);
  };

  const on_submit = handle_submit(async (data: any) => {
    set_is_loading(true);
    try {
      const { data } = await desbloquer_usuario({
        ...data_register,
        telefono_celular: `${data_register.telefono_celular}`,
      });
      control_success(data.detail);
      window.location.href = '#/app/auth/login';
    } catch (error) {
      const temp_error = error as AxiosError;
      const resp = temp_error.response?.data as ResponseServer<any>;
      control_error(resp.detail);
    } finally {
      set_is_loading(false);
    }
  });

  useEffect(() => {
    void get_selects_options();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          void on_submit(e);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              textAlign="center"
              variant="h6"
              sx={{ mb: '10px' }}
              paragraph
            >
              Desbloqueo de Usuario
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomSelect
              onChange={on_change}
              label="Tipo de documento *"
              name="tipo_documento"
              value={tipo_documento}
              options={tipo_documento_opt}
              required={true}
              errors={errors}
              register={register}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Usuario"
              {...register('nombre_de_usuario', {
                required: true,
              })}
              onChange={handle_change}
              error={errors.nombre_de_usuario?.type === 'required'}
              helperText={
                errors.nombre_de_usuario?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Cédula"
              type="number"
              {...register('numero_documento', {
                required: true,
              })}
              onChange={handle_change}
              error={errors.numero_documento?.type === 'required'}
              helperText={
                errors.numero_documento?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Celular"
              type="number"
              {...register('telefono_celular', {
                required: true,
              })}
              onChange={handle_change}
              error={errors.telefono_celular?.type === 'required'}
              helperText={
                errors.telefono_celular?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="E-mail"
              type="email"
              {...register('email', {
                required: true,
              })}
              onChange={handle_change}
              error={errors.email?.type === 'required'}
              helperText={
                errors.email?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de nacimiento"
                value={fecha_nacimiento}
                onChange={on_change_birt_day}
                renderInput={(params: any) => (
                  <TextField
                    fullWidth
                    size="small"
                    {...params}
                    {...register('fecha_nacimiento', {
                      required: true,
                    })}
                    onChange={handle_change}
                    error={errors.fecha_nacimiento?.type === 'required'}
                    helperText={
                      errors.fecha_nacimiento?.type === 'required'
                        ? 'Este campo es obligatorio'
                        : ''
                    }
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            xs={12}
            sx={{
              [theme.breakpoints.only('sm')]: {
                height: '83px',
              },
            }}
          >
            <ReCaptcha
              className="g-recaptcha"
              sitekey={process.env.REACT_APP_SITE_KEY ?? ''}
              hl="es"
              onChange={() => {
                set_is_valida_captcha?.(true);
              }}
              onExpired={() => {
                set_is_valida_captcha?.(false);
              }}
              onError={() => {
                set_is_valida_captcha?.(false);
              }}
            />
          </Grid>
          <Grid item xs={12} justifyContent="center" container spacing={2}>
            <Grid item xs={12} md={6}>
              <LoadingButton
                variant="outlined"
                fullWidth
                color="warning"
                disabled={is_loading}
                onClick={() => {
                  window.location.href = '#/auth/login';
                }}
              >
                Iniciar sesión
              </LoadingButton>
            </Grid>
            <Grid item xs={12} md={6}>
              <LoadingButton
                type="submit"
                variant="contained"
                fullWidth
                color="success"
                loading={is_loading}
                disabled={is_loading || !is_valida_captcha}
              >
                Desbloquear usuario
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
