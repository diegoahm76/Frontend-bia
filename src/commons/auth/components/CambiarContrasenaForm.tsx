import type React from 'react';
import { useEffect, useState } from 'react';
import { Button, Grid, Box, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { type AxiosError } from 'axios';
import {
  control_success,
  control_error,
  validate_password,
} from '../../../helpers';
import '../css/index.css';
import {
  password_reset_complete,
  password_unblock_complete,
} from '../request/authRequest';

interface IDefaultValuesUpdatePassword {
  password: string;
  password2: string;
}

const default_values = {
  password: '',
  password2: '',
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CambiarContrasena: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const uidb64 = params.get('uidb64');
  const desbloquear = params.get('desbloquear');
  const {
    register,
    handleSubmit: handle_submit,
    formState: { errors },
    watch,
  } = useForm<IDefaultValuesUpdatePassword>({ defaultValues: default_values });
  const [message_error, set_message_error_password] = useState('');
  const [is_error_password, set_error_password] = useState(false);

  const password = watch('password');
  const password2 = watch('password2');

  useEffect(() => {
    if (password !== password2) {
      set_message_error_password('Las contraseñas no son iguales');
      set_error_password(true);
      return;
    }

    if (password !== undefined && password !== '') {
      if (!validate_password(password)) {
        set_error_password(true);
        set_message_error_password(
          'La contraseña no cumple con el formato requerido'
        );
        return;
      }
    }
    set_error_password(false);
  }, [password, password2]);

  const on_submit_new_password = handle_submit(
    async (data: IDefaultValuesUpdatePassword) => {
      try {
        const axios_body = {
          password: data.password,
          token,
          uidb64,
        };

        if (desbloquear === 'false') {
          await password_reset_complete(axios_body);
        } else {
          await password_unblock_complete(axios_body);
        }

        control_success('Contraseña cambiada correctamente');
        navigate('/auth/login');
      } catch (err: any) {
        control_error(err?.response.data.detail);
        return err as AxiosError;
      }
    }
  );

  useEffect(() => {}, []);

  return (
    <>
      <Grid item>
        <Typography
          textAlign="center"
          variant={'body2'}
          sx={{ mb: '10px' }}
          paragraph
        >
          Ingrese sus nuevas credenciales para iniciar sesión
        </Typography>
      </Grid>
      <Box
        component="form"
        onSubmit={(e) => {
          void on_submit_new_password(e);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <p className="title">
              La contraseña debe cumplir con el siguiente formato:
            </p>
            <ul className="formatoPassowrd">
              <li>Debe contener mínimo 6 caracteres</li>
              <li>Debe contener 1 Caracter en Mayúscula</li>
              <li>Debe contener 1 Caracter numérico</li>
              <li>Debe contener 1 Caracter simbólico (*,-,_,%...)</li>
            </ul>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nueva contraseña"
              variant="standard"
              fullWidth
              error={is_error_password || errors.password?.type === 'required'}
              helperText={message_error}
              {...register('password', {
                required: true,
                minLength: {
                  value: 8,
                  message: 'La contraseña debe tener 6 carácteres mínimio',
                },
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirme su contraseña"
              variant="standard"
              fullWidth
              error={is_error_password || errors.password2?.type === 'required'}
              helperText={message_error}
              {...register('password2', {
                required: true,
                minLength: {
                  value: 8,
                  message: 'La contraseña debe tener 6 carácteres mínimio',
                },
              })}
            />
          </Grid>
          <Grid item xs={12} justifyContent="center" container>
            <Button
              sx={{ mt: '20px' }}
              fullWidth
              type="submit"
              variant="contained"
              size="small"
              color="success"
              disableElevation
              style={{ fontSize: '.9rem' }}
            >
              Enviar
            </Button>
          </Grid>
          <Grid item xs={12} justifyContent="center" container>
            <Link className="no-decoration" to="/auth/login">
              <Typography textAlign="center">Iniciar sesión</Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
