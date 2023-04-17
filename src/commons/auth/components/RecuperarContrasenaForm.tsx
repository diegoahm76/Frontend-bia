import { useState } from 'react';
import {
  Button,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  IconButton,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
// import type { DataUserRecover, ResponseRecover } from '../interfaces';
// import { recover_password } from '../request/authRequest';
import { LoadingButton } from '@mui/lab';
// import { control_success } from '../../recursoHidrico/requets/Request';
import { Email, Sms, Close } from '@mui/icons-material';
import LinearProgress from '@mui/material/LinearProgress';
import type { AxiosError } from 'axios';
import { recover_password } from '../request/authRequest';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecuperarContrasena: React.FC = () => {
  const {
    handleSubmit: handle_submit,
    formState: { errors },
    register,
  } = useForm();

  const [is_sending, set_is_sending] = useState(false);
  const [open, set_open] = useState(false);
  const [message, set_message] = useState('');
  const [type_media, set_type_media] = useState('');
  const [error_message, set_error] = useState('');
  const [open_alert, set_open_alert] = useState(false);

  const handle_close = (): void => {
    set_open(false);
  };

  const on_submit = handle_submit(async ({ nombre_de_usuario }) => {
    set_is_sending(true);
    try {
      set_message('');
      const data_send = {
        nombre_de_usuario,
        tipo_envio: '',
        redirect_url:
          'https://macareniafrontendevelopv2.netlify.app/#/auth/cambiar_contrasena',
      };
      console.log(data_send);
      const { data: resp } = await recover_password(data_send);
      console.log(resp);
    } catch (error) {
      const temp_err = error as AxiosError;
      console.log(temp_err);
      set_error('Error al recuperar contraseña');
    } finally {
      set_is_sending(false);
    }
    // data = {
    //   ...data,
    //   tipo_envio: type_media,
    // };
  });

  // const query_recover_pass = async (
  //   dataRecover: DataUserRecover
  // ): Promise<void> => {
  //   set_is_sending(true);
  //   try {
  //     const { data } = await recover_password(dataRecover);
  //     console.log(data);
  //     if (data?.data !== undefined) {
  //       set_open(true);
  //       set_message(data.detail);
  //       return;
  //     }

  //     control_success(data.detail);
  //   } catch (error: any) {
  //     const { response } = error as AxiosError<ResponseRecover>;
  //     set_error(response?.data.detail as string);
  //     set_open_alert(true);
  //   } finally {
  //     set_is_sending(false);
  //   }
  // };

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
              Ingrese su usuario para recuperar su contraseña
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Usuario"
              error={errors.nombre_de_usuario?.type === 'required'}
              helperText={
                errors.nombre_de_usuario?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
              {...register('nombre_de_usuario', {
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
                <Typography sx={{ textAlign: 'center', mb: '20px' }}>
                  Iniciar sesión
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Dialog open={open} onClose={handle_close}>
        <DialogTitle textAlign="center">Opciones de recuperación</DialogTitle>
        <DialogContent>
          <Typography textAlign="center">
            Seleccione un medio por el cual desea recibir el link, para
            recuperar tu contraseña
          </Typography>
        </DialogContent>
        {is_sending && (
          <>
            <DialogContent>
              {is_sending && <LinearProgress />}
              <DialogContentText textAlign="center">
                {is_sending ? `Enviando ${type_media}` : message}
              </DialogContentText>
            </DialogContent>
          </>
        )}
        <DialogActions>
          <Grid container justifyContent="space-around" pb={1}>
            <Button
              disabled={is_sending}
              onClick={() => {
                set_type_media('mail');
              }}
              variant="outlined"
              startIcon={<Email />}
            >
              E-mail
            </Button>
            <Button
              disabled={is_sending}
              onClick={() => {
                set_type_media('sms');
              }}
              variant="outlined"
              startIcon={<Sms />}
            >
              SMS
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};
