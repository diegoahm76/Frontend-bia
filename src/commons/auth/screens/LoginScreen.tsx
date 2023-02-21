import { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import ReCaptcha from 'react-google-recaptcha';
import { use_rol } from '../hooks/LoginHooks';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LoginScreen: React.FC = () => {
  const { set_is_captcha_valid, is_captcha_valid } = use_rol();
  const [show_password, set_show_password] = useState(false);
  const [disable, set_disale] = useState(true);

  const handle_click_show_password = (): void => {
    set_show_password((show) => !show);
  };

  const set_value = (value: boolean): void => {
    set_is_captcha_valid(value);
  };

  useEffect(() => {
    if (is_captcha_valid) {
      set_disale(false);
    } else {
      set_disale(true);
    }
  }, [is_captcha_valid]);

  return (
    <Grid
      container
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      padding={2}
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        backgroundColor: 'primary.main',
      }}
    >
      <Grid container justifyContent={'center'}>
        <Grid
          item
          className="box-shadow"
          xs={12}
          sm={6}
          md={3}
          sx={{
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 5,
          }}
        >
          {/* <img src="../../../assets/logos/logoBia.svg" alt="logo bia" /> */}
          <Typography variant="h5" textAlign={'center'} sx={{ mb: 1 }}>
            Login
          </Typography>
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
                >
                  Iniciar Sesión
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};
