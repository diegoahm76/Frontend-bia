import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useMemo } from 'react';
import {
  Alert,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';

import OutlinedInput from '@mui/material/OutlinedInput';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import ReCaptcha from 'react-google-recaptcha';

import { use_rol } from '../hooks/LoginHooks';
import { use_form } from '../../../hooks/useForm';
import { checking_authentication } from '../store';
import { LoadingButton } from '@mui/lab';

// import logo_bia from '.../../../assets/logos/logo_bia.png';
// import { DialogEntorno } from './DialogEntorno';
import { type IUserInfo } from '../interfaces/authModels';

interface AuthSlice {
  auth: IUserInfo;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LoginForm: React.FC = () => {
  const { set_is_captcha_valid, is_captcha_valid } = use_rol();
  const dispatch = useDispatch();
  const { status, error_message } = useSelector(
    (state: AuthSlice) => state.auth
  );
  const is_authenticating = useMemo(() => status === 'checking', [status]);
  const [show_password, set_show_password] = useState(false);
  const [disable, set_disale] = useState(true);
  const [is_error, set_is_error] = useState(true);
  const { email, password, on_input_change } = use_form({
    email: '',
    password: '',
  });

  const handle_click_show_password = (): void => {
    set_show_password((show) => !show);
  };

  const set_value = (value: boolean): void => {
    set_is_captcha_valid(value);
  };

  const on_submit = (event: any): void => {
    event.preventDefault();
    dispatch(checking_authentication(email, password));
  };

  useEffect(() => {
    if (is_captcha_valid) {
      set_disale(false);
    } else {
      set_disale(true);
    }
  }, [is_captcha_valid]);

  useEffect(() => {
    set_is_error(!is_error);
  }, [error_message]);

  return (
    <form onSubmit={on_submit}>
      <Grid container direction={'column'} spacing={3}>
        <Grid item>
          <TextField
            required
            fullWidth
            label="Usuario o Email"
            value={email}
            name="email"
            onChange={on_input_change}
          />
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Contraseña
            </InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-password"
              type={show_password ? 'text' : 'password'}
              value={password}
              name="password"
              onChange={on_input_change}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handle_click_show_password}
                    edge="end"
                  >
                    {show_password ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Contraseña"
            />
          </FormControl>
        </Grid>
        {is_error ? (
          <Grid item>
            <Alert
              severity="error"
              onClose={() => {
                set_is_error(false);
              }}
            >
              {error_message}
            </Alert>
          </Grid>
        ) : (
          ''
        )}

        <Grid item>
          <Link sx={{ textDecoration: 'none' }} href="#">
            <Typography>¿Olvidó su contraseña?</Typography>
          </Link>
        </Grid>
        <Grid item container justifyContent={'center'}>
          <ReCaptcha
            sitekey={process.env.REACT_APP_SITE_KEY ?? ''}
            hl="es"
            onChange={() => {
              set_value(true);
            }}
            onExpired={() => {
              set_value(false);
            }}
            onError={() => {
              set_value(false);
            }}
          />
        </Grid>
        <Grid item justifyContent="center" container>
          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            color="success"
            loading={is_authenticating}
            disabled={disable}
            style={{ fontSize: '.9rem' }}
          >
            Iniciar Sesión
          </LoadingButton>
        </Grid>
        <Grid item>
          <Button
            fullWidth
            sx={{ textTransform: 'none', textAlign: 'center' }}
            href="/auth/register"
          >
            <Typography sx={{ color: 'black' }}>
              No tienes cuenta? <b>Registrese</b>
            </Typography>
          </Button>
        </Grid>
        <Grid item>{/* <DialogEntorno /> */}</Grid>
      </Grid>
    </form>
  );
};
