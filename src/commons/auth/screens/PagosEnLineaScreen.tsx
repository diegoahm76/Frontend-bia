// import logo_bia from '.../../../assets/logos/logo_bia.png';
import { Button, Grid, TextField } from '@mui/material';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { AuthLayout } from '../layouts/AuthLayout';
import { Title } from '../../../components';
import { Footer } from '../components/PagosEnLinea/Footer';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PagosEnLineaScreen: React.FC = () => {
  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12} marginY={2}>
          <Title title="Pagos en Línea"></Title>
        </Grid>
        <Grid container xs={12} spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              size='small'
              label="Número de identificación"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              size='small'
              label="Referencia de Pago"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              fullWidth
            >
              Consultar
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};
