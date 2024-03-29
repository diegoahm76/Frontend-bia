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
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { control_success } from '../../../recursoHidrico/requets/Request';
import { recover_password } from '../../request/authRequest';
import LinearProgress from '@mui/material/LinearProgress';
import { Email, Sms, Close, Send } from '@mui/icons-material';
import { DEFAULT_AUTH_URL_BETA, DEFAULT_AUTH_URL_PROD } from '../../../../api/axios';

const redirect_url =
(process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_AUTH_URL_BETA || `${DEFAULT_AUTH_URL_BETA}`
  : process.env.REACT_APP_AUTH_URL_PROD || `${DEFAULT_AUTH_URL_PROD}`
) + '/auth/activacion_cuenta';

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
  const [tipo_envio, set_tipo_envio] = useState('');
  const [error_message, set_error] = useState('');
  const [open_alert, set_open_alert] = useState(false);
  const [nombre_de_usuario, set_nombre_de_usuario] = useState('');
  const navigate = useNavigate();

  const handle_close = (): void => {
    set_open(false);
  };

  const send_media = (): void => {
    set_is_sending(true);
    setTimeout(() => {
      void on_submit();
    }, 2000);
  };

  const change_value = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_nombre_de_usuario(e.target.value);
  };

  const change_radio = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_tipo_envio(e.target.value);
  };

  const on_submit = handle_submit(async () => {
    set_is_sending(true);
    set_error('');
    set_open_alert(false);
    try {
      const data_send = {
        nombre_de_usuario,
        tipo_envio,
        redirect_url,
      };
      const { data: resp } = await recover_password(data_send);

      if (resp.data !== undefined) {
        set_open(true);
        set_message(resp.detail);
        return;
      }

      control_success(resp.detail);
      if (open) {
        set_open(false);
        navigate('/login');
      }
    } catch (e) {
      const temp_err = e as AxiosError;
      const error = temp_err.response?.data as any;
      // set_error(error.detail);
      //  console.log('')(error);
      // //  console.log('')(e);
      set_open_alert(true);
    } finally {
      set_tipo_envio('');
      set_is_sending(false);
    }
  });

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
              onChange={change_value}
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
                {is_sending ? `Enviando ${tipo_envio}` : message}
              </DialogContentText>
            </DialogContent>
          </>
        )}
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
        <DialogActions>
          <Grid container justifyContent="space-around" pb={1} spacing={1}>
            <Grid item xs={12} container justifyContent="center">
              <FormControl onChange={change_radio}>
                <RadioGroup
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <Grid container width={300}>
                    <Grid item xs={6} container alignItems="center">
                      <FormControlLabel
                        value="email"
                        control={<Radio />}
                        label="E-mail"
                      />
                      <Email color="primary" />
                    </Grid>
                    <Grid item xs={6} container alignItems="center">
                      <FormControlLabel
                        value="sms"
                        control={<Radio />}
                        label="SMS"
                      />
                      <Sms color="primary" />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Button
                disabled={is_sending || tipo_envio === ''}
                onClick={send_media}
                variant="outlined"
                startIcon={<Send />}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};
