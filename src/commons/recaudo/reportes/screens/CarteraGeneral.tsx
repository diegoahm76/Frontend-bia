import { Title } from '../../../../components/Title';
import { CarteraGeneralFecha } from '../componentes/CarteraGeneralFecha';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CarteraGeneral: React.FC = () => {

  return (
    <>
      <Title title='Informe General de Cartera - Totalizado a fecha de corte seleccionada'/>
      <CarteraGeneralFecha />
    </>
  )
}
