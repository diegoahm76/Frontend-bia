import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { BusquedaSeccionSubseccion } from '../components/BusquedaSeccionSubseccion';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InstrumentosScreen: React.FC = () => {
  return (
    <>
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="ADMINISTRACIÓN DE INSTRUMENTOS EN BIBLIOTECA" />
        </Grid>
      </Grid>
      <BusquedaSeccionSubseccion />
    </>
  );
};
