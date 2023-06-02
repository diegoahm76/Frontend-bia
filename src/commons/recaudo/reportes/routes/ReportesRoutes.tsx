import { Route, Routes } from 'react-router-dom';
import { CarteraGeneral } from '../screens/CarteraGeneral';
import { CarteraDetallada } from '../screens/CarteraDetallada';
import { FacilidadPago } from '../screens/FacilidadPago';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ReportesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/*' element={<CarteraGeneral />} />
      <Route path='cartera_detallada' element={<CarteraDetallada />} />
      <Route path='facilidad_pago' element={<FacilidadPago />} />
    </Routes>
  )
}
