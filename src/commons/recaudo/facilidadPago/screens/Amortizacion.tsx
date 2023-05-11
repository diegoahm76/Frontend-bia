import { Title } from '../../../../components/Title';
import { Box, Grid, TextField } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Amortizacion: React.FC = () => {
  return (
    <>
      <Title title='Crear Amortización Automática - Usuario Cormacarena' />
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
            <Grid item xs={16}>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Grid item xs={12} sm={3} mb='10px'>
                  <TextField
                    disabled
                    label="Plazo (Nro. Cuotas)"
                    size="small"
                    fullWidth
                    value={10}
                  />
                </Grid>
                <Grid item xs={12} sm={3} mb='10px'>
                  <TextField
                    disabled
                    label="Monto Deuda"
                    size="small"
                    fullWidth
                    value={100000000}
                    />
                </Grid>
                <Grid item xs={12} sm={3} mb='10px'>
                  <TextField
                    label="Tasa Anual"
                    size="small"
                    fullWidth
                    value={'20,90%'}
                    />
                </Grid>
                <Grid item xs={12} sm={3} mb='10px'>
                  <TextField
                    label="Tasa Anual C/IVA"
                    size="small"
                    fullWidth
                    value={'24,24%'}
                    />
                </Grid>
                <Grid item xs={12} sm={3} mb='10px'>
                  <TextField
                    label="Tasa Mensual S/IVA"
                    size="small"
                    fullWidth
                    value={'1,74%'}
                    />
                </Grid>
                <Grid item xs={12} sm={3} mb='10px'>
                  <TextField
                    label="Tasa Mensual C/IVA"
                    size="small"
                    fullWidth
                    value={'2,02%'}
                    />
                </Grid>
                <Grid item xs={12} sm={3} mb='10px'>
                  <TextField
                    label="Valor a Pagar"
                    size="small"
                    fullWidth
                    value={11144499.66}
                  />
                </Grid>
                <Grid item xs={12} sm={3} mb='10px'>
                  <TextField
                    disabled
                    label="Periodicidad de Pagos"
                    size="small"
                    fullWidth
                    value={'Mensual'}
                    />
                </Grid>
                <Grid item xs={12} sm={3} mb='10px'>
                  <TextField
                    label="Fecha Inicio de Pago"
                    size="small"
                    fullWidth
                    value={'01-ene-23'}
                    />
                </Grid>
              </Box>
            </Grid>
          </Grid>
    </>
  )
}
