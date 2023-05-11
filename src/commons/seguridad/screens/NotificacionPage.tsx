import { Grid } from '@mui/material';
import { AutorizacionNotificacion } from '../components/datosPersonales/AutorizacionNotificacion';
import { Title } from '../../../components';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NotificacionPage: React.FC = () => {
  return (
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
      <Grid item xs={12}>
        <Title title="Autorizacion de notificacion y tratamiento de datos"></Title>
        <AutorizacionNotificacion />
      </Grid>
    </Grid>
  );
};
