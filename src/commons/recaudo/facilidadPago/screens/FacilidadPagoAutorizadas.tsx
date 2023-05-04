import { Box, Grid, TextField } from '@mui/material';
import { Title } from '../../../../components/Title';
import { TablaFacilidadesAutorizadas } from '../componentes/TablaFacilidadesAutorizadas';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FacilidadPagoAutorizadas: React.FC = () => {

  return (
    <>
      <Title title='Mis Facilidades de Pago Autorizadas'/>
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
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="Nombres"
                  helperText='Escribe Nombre y Apellido'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="Identificación"
                  helperText='Escribe Número de Identificación'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="Correo Electrónico"
                  helperText='Escribe Correo Electrónico'
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <p>Sus facilidades de pago actuales son:</p>
      <TablaFacilidadesAutorizadas />
    </>
  )
}
