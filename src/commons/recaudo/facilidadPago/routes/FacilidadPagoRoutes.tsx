import { Route, Routes } from 'react-router-dom';
import { ObligacionesUsuario } from '../screens/ObligacionesUsuario';
import { SolicitudFacilidadPago } from '../screens/SolicitudFacilidadPago';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FacilidadPagoRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/*' element={<ObligacionesUsuario />} />
      <Route path='registro' element={<SolicitudFacilidadPago />} />
    </Routes>
  )
}
