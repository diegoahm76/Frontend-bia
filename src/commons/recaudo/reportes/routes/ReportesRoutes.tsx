import { Route, Routes } from 'react-router-dom';
import { CarteraGeneral } from '../screens/CarteraGeneral';
import { CarteraDetallada } from '../screens/CarteraDetallada';
import { CarteraGeneralEdad } from '../screens/CarteraGeneralEdad';
import { FacilidadPago } from '../screens/FacilidadPago';
import { FacilidadPagoVencimiento } from '../screens/FacilidadPagoVencimiento';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ReportesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='cartera_general' element={<CarteraGeneral />} />
      <Route path='cartera_detallada' element={<CarteraDetallada />} />
      <Route path='cartera_general_edad' element={<CarteraGeneralEdad />} />
      <Route path='facilidad_pago' element={<FacilidadPago />} />
      <Route path='facilidad_pago_vencimiento' element={<FacilidadPagoVencimiento />} />
    </Routes>
  )
}
