import { Title } from '../../../../../components/Title';
import { RegistroRecepcion } from '../componentes/RegistroRecepcion';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecepcionFisica: React.FC = () => {
  return (
    <>
      <Title title='Crear Recepción de Notificación - Despacho Físico' />
      <RegistroRecepcion />
    </>
  )
}
