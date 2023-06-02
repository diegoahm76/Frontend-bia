import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Inicio } from './imagen';
import { Jaguar } from './Jaguar';
import { LJaguarBlanco } from './LJaguarBlanco';
import { Insta } from './Insta';
import { Face } from '@mui/icons-material';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Pantalla: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Inicio />
        </Grid>
        <Grid item xs={12}>
          <Box border={0} sx={{ backgroundColor: '#042f4a', position: 'relative', top: '-4px' }}>
            <Grid container spacing={0}>
              <Grid item xs={5} style={{ width: '150px', height: '120px' }}>
                <Jaguar />
              </Grid>
              <Grid item xs={4} border={0}>
                <LJaguarBlanco />
              </Grid>
              <Grid item xs>
                <Typography color="white" variant="body2" gutterBottom align="center">
                  Horario de atención: 8:00 am-6:00 pm
                  <br />
                  Línea nacional 01-8000-51847095
                  <br />
                  info@cormacarena.gov.co
                  <br />
                  Villavicencio, Colombia
                  <br />
                  <Insta />
                  <Face />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
