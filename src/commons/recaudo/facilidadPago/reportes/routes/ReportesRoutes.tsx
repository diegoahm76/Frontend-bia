import { Route, Routes } from 'react-router-dom';
import { CarteraGeneral } from '../screens/CarteraGeneral';
import { CarteraDetallada } from '../screens/CarteraDetallada';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ReportesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='cartera_general' element={<CarteraGeneral />} />
      <Route path='cartera_detallada' element={<CarteraDetallada />} />
    </Routes>
  )
}
