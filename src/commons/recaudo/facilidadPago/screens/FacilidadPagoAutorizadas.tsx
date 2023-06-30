import { Box, Grid, TextField } from '@mui/material';
import { Title } from '../../../../components/Title';
import { TablaFacilidadesAutorizadas } from '../componentes/TablaFacilidadesAutorizadas';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FacilidadPagoAutorizadas: React.FC = () => {

  return (
    <>

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
            <Grid container spacing={2}>
              <Grid item xs={12}  >
                <Title title='Mis Facilidades de Pago' />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Nombres"
                  size="small"
                  fullWidth
                  value={'Marcela Cardenas'}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Identificación"
                  size="small"
                  fullWidth
                  value={'230232019'}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Correo Electrónico"
                  size="small"
                  fullWidth
                  value={'marce@gmail.com'}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
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
            <p>Sus facilidades de pago actuales son:</p>
            <TablaFacilidadesAutorizadas />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
