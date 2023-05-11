import { Box, Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { TablaObligacionesAdminAsignadas } from '../componentes/TablaObligacionesAdminAsignadas';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ObligacionesAdminAsignadas: React.FC = () => {

  return (
    <>
      <Title title='Listado de Facilidades de Pago Asignadas - Usuario Cormacarena'/>
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
            <p>Buzón de facilidades de pago asignadas:</p>
            <TablaObligacionesAdminAsignadas />
          </Box>
        </Grid>
      </Grid>

    </>
  )
}
