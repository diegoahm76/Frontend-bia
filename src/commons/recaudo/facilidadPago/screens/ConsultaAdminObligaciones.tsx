import { Title } from '../../../../components/Title';
import { TablaConsultaAdmin } from '../componentes/TablaConsultaAdmin';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultaAdminObligaciones: React.FC = () => {

  return (
    <>
      <Title title='Listado de Obligaciones - Usuario Interno Cormacarena'/>
      <TablaConsultaAdmin />
    </>
  )
}
