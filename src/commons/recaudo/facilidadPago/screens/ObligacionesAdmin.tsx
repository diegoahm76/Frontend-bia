import { Title } from '../../../../components/Title';
import { TablaObligacionesAdmin } from '../componentes/TablaObligacionesAdmin';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ObligacionesAdmin: React.FC = () => {

  return (
    <>
      <Title title='Listado de Obligaciones Generales - Usuario Cormacarena Admin'/>
      <p>Buzón de facilidades de Pago ingresadas:</p>
      <TablaObligacionesAdmin />
    </>
  )
}
