import { Title } from '../../../../components/Title';
import { TablaObligacionesAdminAsignadas } from '../componentes/TablaObligacionesAdminAsignadas';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ObligacionesAdminAsignadas: React.FC = () => {

  return (
    <>
      <Title title='Listado de Obligaciones Generales - Usuario Cormacarena Admin'/>
      <p>Buzón de facilidades de Pago ingresadas:</p>
      <TablaObligacionesAdminAsignadas />
    </>
  )
}
