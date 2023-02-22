import { useDispatch } from 'react-redux';
import { useState, useEffect, useMemo } from 'react';
import {
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

import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import OutlinedInput from '@mui/material/OutlinedInput';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import ReCaptcha from 'react-google-recaptcha';

import { use_rol } from '../hooks/LoginHooks';
import { use_form } from '../../../hooks/useForm';
import { checking_authentication } from '../store';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();
  const is_authenticated = useMemo(() => status === 'checking', [status]);

  const { set_is_captcha_valid, is_captcha_valid } = use_rol();
  const [show_password, set_show_password] = useState(false);
  const [disable, set_disale] = useState(true);
  const [value, set_tab] = useState('1');
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
          <TabContext value={value}>
            <TabPanel value="1">
              {/* <img src="../../../assets/logos/logoBia.svg" alt="logo bia" /> */}
              <Typography variant="h5" textAlign={'center'} sx={{ mb: 1 }}>
                Login
              </Typography>
              <form onSubmit={on_submit}>
                <Grid container direction={'column'} spacing={3}>
                  <Grid item>
                    <TextField
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
                              {show_password ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Contraseña"
                      />
                    </FormControl>
                  </Grid>
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
                    <Button
                      variant="contained"
                      fullWidth
                      color="success"
                      disabled={disable || is_authenticated}
                      type="submit"
                    >
                      Iniciar Sesión
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      fullWidth
                      sx={{ textTransform: 'none', textAlign: 'center' }}
                      disabled={is_authenticated}
                      onClick={() => {
                        set_tab('2');
                      }}
                    >
                      <Typography sx={{ color: 'black' }}>
                        No tienes cuenta? <b>Registrese</b>
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </TabPanel>
            <TabPanel value="2">
              {/* Tab para el registro de usuario */}
              Item Two
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </Grid>
  );
};
