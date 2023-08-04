import { Title } from '../../../../components/Title';
import { Box, Grid } from '@mui/material';
import { TablaFacilidadPagoVencimiento } from '../componentes/TablaFacilidadPagoVencimiento';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FacilidadPagoVencimiento: React.FC = () => {

  return (
    <>
      <Title title='Informe de Facilidades de Pago por Vencimiento'/>
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
            <TablaFacilidadPagoVencimiento />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
