import { Title } from '../../../../components/Title';
import { RegistroIncumplimiento } from '../componentes/RegistroIncumplimiento';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const IncumplimientoFacilidadPago: React.FC = () => {

  return (
    <>
      <Title title='Incumplimiento de Facilidad de Pago - Usuario Operativo Cormacarena'/>
      <RegistroIncumplimiento />
    </>
  )
}
