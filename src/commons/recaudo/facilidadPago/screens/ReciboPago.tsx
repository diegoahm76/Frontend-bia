import { Box, Grid, Stack } from '@mui/material';
import { Title } from '../../../../components/Title';
import { ReciboPagoModulo } from '../componentes/ReciboPago/ReciboPago';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ReciboPago: React.FC = () => {
  return (
    <>
      <Title title='Generar Recibo de Pago' />
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
              <Stack
                direction="row"
                justifyContent="center"
                spacing={2}
                sx={{ mt: '30px' }}
              >
                <ReciboPagoModulo />
              </Stack>
            </Box>
          </Grid>
        </Grid>
    </>
  )
}
