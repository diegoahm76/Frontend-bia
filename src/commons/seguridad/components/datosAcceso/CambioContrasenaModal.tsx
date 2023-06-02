import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { type SetStateAction, type Dispatch, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { validate_password } from '../../../../helpers';
interface IDefaultValuesUpdatePassword {
  password: string;
  password2: string;
}

const default_values = {
  password: '',
  password2: ''
};
interface Iprops {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
export const CambioContrasenaModal = ({
  is_modal_active,
  set_is_modal_active,
}: Iprops) => {
  const {
    register,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleSubmit: handle_submit,
    formState: { errors },
    watch
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


  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={is_modal_active}
      onClose={() => {
        set_is_modal_active(false);
      }}
    >
      <DialogTitle>Cambiar contraseña</DialogTitle>
      <DialogContent>
        <DialogContentText
          component={'span'}
          id="alert-dialog-slide-description"
        >

          <Grid container>
            <Grid item container spacing={2} xs={12} sm={4}>
              <Grid item xs={12} sm={12}>
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
                      message: 'La contraseña debe tener 6 carácteres mínimio'
                    }
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
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
                      message: 'La contraseña debe tener 6 carácteres mínimio'
                    }
                  })}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ pl: '150px' }}>
              <Typography variant="h6">
                Criterios de establecimiento de contraseña
              </Typography>
              <Typography>
                La contraseña debe tener al menos una letra mayúscula.
              </Typography>
              <Typography>
                La contraseña debe tener al menos un número.
              </Typography>
              <Typography>
                La contraseña debe tener al menos un carácter especial.
              </Typography>
            </Grid>
          </Grid>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              p: '20px',
            }}
          >
            <Button sx={{ mr: '400px' }} color="warning" variant="contained">
              Cambiar contraseña
            </Button>
            <Button
              sx={{ mt: '20px' }}
              color="error"
              variant="contained"
              onClick={() => {
                set_is_modal_active(false);
              }}
            >
              Salir
            </Button>
          </Stack>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
