import { useEffect, useState } from 'react';
import { Grid, TextField, Typography, Button, Alert, IconButton } from '@mui/material';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Close} from '@mui/icons-material';
import { recover_user } from '../request/authRequest';
import { get_tipo_documento } from '../../../request';
import type { IList } from '../../../interfaces/globalModels';
import { control_error, control_success } from '../../../helpers';
import { CustomSelect } from '../../../components';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecuperarUsuarioForm: React.FC = () => {
  const {
    handleSubmit: handle_submit,
    formState: { errors },
    register,
    watch,
  } = useForm();
  const [is_sending, set_is_sending] = useState(false);
  const [error_message, set_error] = useState('');
  const [open_alert, set_open_alert] = useState(false);
  const [tipo_documento_opt, set_tipo_documento_opt] = useState<IList[]>([]);
  const navigate = useNavigate();

  const tipo_documento = watch('tipo_documento');

  const get_selects_options = async (): Promise<void> => {
    try {
      const {
        data: { data: res_tipo_documento },
      } = await get_tipo_documento();
      set_tipo_documento_opt(res_tipo_documento ?? []);
    } catch (err) {
      control_error(err);
    }
  };

  const on_submit = handle_submit(async (data) => {
    set_is_sending(true);
    set_error('');
    set_open_alert(false);
    try {
      const { data: resp } = await recover_user({
        email: data.email,
        numero_documento: data.numero_documento,
        tipo_documento: data.tipo_documento,
      });

      control_success(resp.detail);
      navigate('/login');
    } catch (e) {
      const temp_err = e as AxiosError;
      const error = temp_err.response?.data as any;
      set_error(error.detail);
      set_open_alert(true);
    } finally {
      set_is_sending(false);
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography textAlign="center" fontWeight="bold">
              Recuperación de nombre de usuario
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomSelect
              label="Tipo de documento *"
              name="tipo_documento"
              value={tipo_documento}
              options={tipo_documento_opt}
              required={true}
              errors={errors}
              register={register}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Número de documento"
              error={errors.numero_documento?.type === 'required'}
              helperText={
                errors.numero_documento?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
              {...register('numero_documento', {
                required: true,
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="email"
              type="email"
              error={errors.email?.type === 'required'}
              helperText={
                errors.email?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
              {...register('email', {
                required: true,
              })}
            />
          </Grid>
          {open_alert && (
            <Grid item xs={12} container justifyContent="center">
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      set_open_alert(false);
                    }}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                }
              >
                {error_message}
              </Alert>
            </Grid>
          )}
          <Grid item xs={12} container justifyContent="center">
            <Grid item xs={12}>
              <LoadingButton
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                loading={is_sending}
                disabled={is_sending}
              >
                Enviar
              </LoadingButton>
            </Grid>
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <Grid item>
              <Link className="no-decoration" to="/auth/login">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    textAlign: 'center',
                    color: '#ffff',
                  }}

                ><Typography sx={{ textAlign: 'center' }}>
                    Iniciar sesión
                  </Typography></Button>

              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
