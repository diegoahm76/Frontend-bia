import { Route, Routes } from 'react-router-dom';
import { ObligacionesUsuario } from '../screens/ObligacionesUsuario';
import { SolicitudFacilidadPago } from '../screens/SolicitudFacilidadPago';
import { ObligacionesAdmin } from '../screens/ObligacionesAdmin';
import { ObligacionesAdminAsignadas } from '../screens/ObligacionesAdminAsignadas';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FacilidadPagoRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/*' element={<ObligacionesUsuario />} />
      <Route path='registro' element={<SolicitudFacilidadPago />} />
      <Route path='admin' element={<ObligacionesAdmin />} />
      <Route path='asignadas' element={<ObligacionesAdminAsignadas />} />
    </Routes>
  )
}
