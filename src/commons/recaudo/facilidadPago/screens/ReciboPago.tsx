import { Stack } from '@mui/material';
import { Title } from '../../../../components/Title';
import { ReciboPagoModulo } from '../componentes/ReciboPago/ReciboPago';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ReciboPago: React.FC = () => {
  return (
    <>
      <Title title='Generar Recibo de Pago' />
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ mt: '30px' }}
      >
        <ReciboPagoModulo />
      </Stack>
    </>
  )
}
