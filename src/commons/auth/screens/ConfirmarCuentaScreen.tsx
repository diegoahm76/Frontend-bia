import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { verify_account } from '../request/authRequest';
import { control_error } from '../../../helpers/controlError';
import { Grid, Typography, Button } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfirmarCuentaScreen: React.FC = () => {
  const [cuenta_confirmada, set_cuenta_confirmada] = useState(true);

  const params = useParams();
  const { token } = params;

  const confirmar_cuenta = async (): Promise<void> => {
    try {
      const { data } = await verify_account(token as string);

      console.log(data);
      set_cuenta_confirmada(true);
      console.log(cuenta_confirmada);
    } catch (error) {
      control_error(error);
    }
  };

  useEffect(() => {
    void confirmar_cuenta();
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      alignContent="center"
      sx={{ height: '100vh' }}
      padding={3}
    >
      <Grid item xs={12} sm={6}>
        <Typography variant="h4" textAlign="center">
          Confirmacion de cuenta
        </Typography>
        {/* cuenta_confirmada && */}
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Button fullWidth variant="contained" href="#/auth/login">
            Iniciar sesión
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
