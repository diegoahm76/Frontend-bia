import React from 'react';
import { api } from '../../../api/axios';
import { Button, Grid, Box, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { toast, type ToastContent } from 'react-toastify';
import { Link } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_error = (message: ToastContent = 'Algo pasó, intente de nuevo') =>
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_success = (message: ToastContent) =>
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

interface DataUser {
  nombre_de_usuario: string;
  tipo_envio: string;
  redirect_url: string;
}

const data_values: DataUser = {
  nombre_de_usuario: '',
  tipo_envio: '',
  redirect_url:
    'https://macareniafrontendevelopv2.netlify.app/#/auth/cambiar_contrasena',
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecuperarContrasena: React.FC = () => {
  const [display_medio_recuperacion, set_display_medio_recuperacion] =
    React.useState(false);

  const { control, handleSubmit: handle_submit } = useForm({
    defaultValues: data_values,
  });

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const on_submit = (data: any) => {
    void query_recover_pass(data);
  };

  const handle_selection_recover_pass = (metodo_envio: string): void => {
    if (metodo_envio === 'email') {
      data_values.tipo_envio = 'email';
    } else if (metodo_envio === 'sms') {
      data_values.tipo_envio = 'sms';
    }
    console.log(metodo_envio);
    set_display_medio_recuperacion(false);
    void query_recover_pass(data_values);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const query_recover_pass = async (dataRecover: any) => {
    try {
      const { data } = await api.post(
        'users/request-reset-email/',
        dataRecover
      );
      console.log(data);
      if ('data' in data) {
        console.log('ingreso');
        if (data.data.email !== null && data.data.sms !== null) {
          data_values.nombre_de_usuario = dataRecover.nombre_de_usuario;
          set_display_medio_recuperacion(true);
        }
      }

      control_success(data.detail);
    } catch (error: any) {
      void control_error(error.message);
    }
  };

  return (
    <>
      <Grid item>
        {display_medio_recuperacion ? (
          <Typography
            textAlign="center"
            variant={'body2'}
            sx={{ mb: '10px' }}
            paragraph
          >
            Selecciona uno de los medios para la recuperación de contraseña
          </Typography>
        ) : (
          <Typography
            textAlign="center"
            variant={'body2'}
            sx={{ mb: '10px' }}
            paragraph
          >
            Ingrese su usuario para recuperar contraseña
          </Typography>
        )}
      </Grid>
      {display_medio_recuperacion ? (
        <Grid item>
          <Grid item justifyContent="center" container>
            <Button
              sx={{ mt: '20px' }}
              fullWidth
              type="submit"
              variant="contained"
              size="small"
              color="success"
              disableElevation
              onClick={() => {
                handle_selection_recover_pass('email');
              }}
              style={{ fontSize: '.9rem' }}
            >
              <Typography>Email</Typography>
            </Button>

            <Button
              sx={{ mt: '20px' }}
              fullWidth
              type="submit"
              variant="contained"
              size="small"
              color="success"
              disableElevation
              onClick={() => {
                handle_selection_recover_pass('sms');
              }}
              style={{ fontSize: '.9rem' }}
            >
              <Typography>Mensaje de texto</Typography>
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Box
          component="form"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handle_submit(on_submit)}
        >
          <Grid item>
            <Controller
              name="nombre_de_usuario"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Usuario"
                  variant="standard"
                  fullWidth
                />
              )}
            />
            <Grid item justifyContent="center" container>
              <Button
                sx={{ mt: '20px' }}
                fullWidth
                type="submit"
                variant="contained"
                size="small"
                color="success"
                disableElevation
                // loading={}
                // disabled={disable}
                style={{ fontSize: '.9rem' }}
              >
                Enviar
              </Button>
            </Grid>
            <Grid item sx={{ pt: '10px !important' }}>
              <Link className="no-decoration" to="/auth/login">
                <Typography sx={{ textAlign: 'center', mb: '20px' }}>
                  Iniciar sesión
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};
