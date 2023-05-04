import { Route, Routes } from 'react-router-dom';
import { ObligacionesUsuario } from '../screens/ObligacionesUsuario';
import { SolicitudFacilidadPago } from '../screens/SolicitudFacilidadPago';
import { ObligacionesAdmin } from '../screens/ObligacionesAdmin';
import { ObligacionesAdminAsignadas } from '../screens/ObligacionesAdminAsignadas';
import { VisualizarSolicitudAdmin } from '../screens/VisualizarSolicitudAdmin';
import { ResolucionRespuesta } from '../screens/ResolucionRespuesta';
import { FacilidadPagoAutorizadas } from '../screens/FacilidadPagoAutorizadas';
import { ConsultaAdminObligaciones } from '../screens/ConsultaAdminObligaciones';
import { DetalleFacilidadPago } from '../screens/DetalleFacilidadPago';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FacilidadPagoRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/*' element={<ObligacionesUsuario />} />
      <Route path='registro' element={<SolicitudFacilidadPago />} />
      <Route path='admin' element={<ObligacionesAdmin />} />
      <Route path='asignadas' element={<ObligacionesAdminAsignadas />} />
      <Route path='solicitud' element={<VisualizarSolicitudAdmin />} />
      <Route path='resolucion' element={<ResolucionRespuesta />} />
      <Route path='autorizadas' element={<FacilidadPagoAutorizadas />} />
      <Route path='consulta' element={<ConsultaAdminObligaciones />} />
      <Route path='seguimiento' element={<DetalleFacilidadPago />} />
    </Routes>
  )
}
