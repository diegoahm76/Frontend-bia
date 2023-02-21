import { useEffect, useState } from 'react';

import OutlinedInput from '@mui/material/OutlinedInput';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import ReCaptcha from 'react-google-recaptcha';
import { use_rol } from '../hooks/LoginHooks';
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LoginForm: React.FC = () => {
  const { set_is_captcha_valid, is_captcha_valid } = use_rol();
  const [show_password, set_show_password] = useState(false);
  const [disable, set_disale] = useState(true);
  const [value, set_tab] = useState('1');

  useEffect(() => {
    if (is_captcha_valid) {
      set_disale(false);
    } else {
      set_disale(true);
    }
    console.log(value);
  }, [is_captcha_valid]);

  const handle_click_show_password = (): void => {
    set_show_password((show: boolean) => !show);
  };

  const set_value = (value: boolean): void => {
    set_is_captcha_valid(value);
  };

  const handle_change = (
    event: React.SyntheticEvent | null,
    newValue: string
  ): void => {
    set_tab(newValue);
  };

  return (
    <form>
      <Grid container direction={'column'} spacing={3}>
        <Grid item>
          <TextField fullWidth label="Usuario o Email" type="text" />
        </Grid>
        <Grid item>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Contraseña
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={show_password ? 'text' : 'password'}
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
          <Button
            variant="contained"
            fullWidth
            color="success"
            disabled={disable}
            onClick={() => {
              handle_change(null, '2');
            }}
          >
            Iniciar Sesión
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="success"
            onClick={() => {
              handle_change(null, '1');
            }}
          >
            Test
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
