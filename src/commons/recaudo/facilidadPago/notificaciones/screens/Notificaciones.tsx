import { Box, Grid } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { TablaNotificaciones } from '../componentes/TablaNotificaciones';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Notificaciones: React.FC = () => {
  return (
    <>
      <Title title='Listado Notificaciones - Usuario Cormacarena' />
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          mb: '20px',
          mt: '20px',
          p: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <TablaNotificaciones />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
