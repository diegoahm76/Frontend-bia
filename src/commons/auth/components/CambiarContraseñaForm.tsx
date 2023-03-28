import type React from 'react';
import { useEffect, useState } from 'react';
import { api } from '../../../api/axios';
import { Button, Grid, Box, TextField, Typography } from '@mui/material';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast, type ToastContent } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { type AxiosError } from 'axios';

const params = new URLSearchParams(window.location.search);

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

interface IDefaultValuesUpdatePassword {
  password: string;
  password2: string;
}

const default_values = {
  password: '',
  password2: '',
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CambiarContraseña: React.FC = () => {
  const navigate = useNavigate();
  const token = params.get('?token');
  const uidb64 = params.get('uidb64');
  // const token_valido = params.get('?token-valid');
  const [is_diferent_passwords, set_is_diferent_passwords] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit: handle_submit,
    // formState: { errors },
  } = useForm<IDefaultValuesUpdatePassword>({ defaultValues: default_values });

  const on_submit_new_password: SubmitHandler<
    IDefaultValuesUpdatePassword
  > = async (data: IDefaultValuesUpdatePassword) => {
    if (data.password !== data.password2) {
      set_is_diferent_passwords(true);
      return;
    }
    set_is_diferent_passwords(false);
    const axios_body = {
      password: data.password,
      token,
      uidb64,
    };
    console.log(axios_body);
    try {
      const { data: data_reset_password } = await api.patch(
        'users/pasword-reset-complete',
        axios_body
      );
      control_success('Contraseña cambiada correctamente');
      console.log(data_reset_password);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data_reset_password.is_confirmed) {
        navigate('/auth/login');
      }
    } catch (err: any) {
      console.log(err);
      control_error(err?.response.data.detail);
      return err as AxiosError;
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <Grid item>
        {/* {token_valido !== null ? (
          <Chip size="small" label="Sí" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="error" variant="outlined" />
        )} */}
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
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handle_submit(on_submit_new_password)}
      >
        <Grid item>
          <TextField
            label="Nueva contraseña"
            variant="standard"
            fullWidth
            error={is_diferent_passwords}
            helperText={
              is_diferent_passwords && 'Las contraseñas deben coincidir'
            }
            {...register('password', {
              required: {
                value: true,
                message: 'El campo es requerido',
              },
              minLength: {
                value: 6,
                message: 'La contraseña debe tener 6 carácteres mínimio',
              },
            })}
          />
          <TextField
            label="Confirme su contraseña"
            variant="standard"
            fullWidth
            {...register('password2', {
              required: {
                value: true,
                message: 'El campo es requerido',
              },
              minLength: {
                value: 6,
                message: 'La contraseña debe tener 6 carácteres mínimio',
              },
            })}
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
    </>
  );
};
