import { Route, Routes } from 'react-router-dom';
import { ObligacionesUsuarios } from '../screens/ObligacionesUsuario';
import { ConsultaAdminObligaciones } from '../screens/ConsultaAdminObligaciones';
import { SolicitudFacilidadPago } from '../screens/SolicitudFacilidadPago';
import { ObligacionesAdmin } from '../screens/ObligacionesAdmin';
import { ObligacionesAdminAsignadas } from '../screens/ObligacionesAdminAsignadas';
import { VisualizarSolicitudAdmin } from '../screens/VisualizarSolicitudAdmin';
import { Amortizacion } from '../screens/Amortizacion';
import { ResolucionRespuesta } from '../screens/ResolucionRespuesta';
import { FacilidadPagoAutorizadas } from '../screens/FacilidadPagoAutorizadas';
import { DetalleFacilidadPago } from '../screens/DetalleFacilidadPago';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FacilidadPagoRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/*' element={<ObligacionesUsuarios />} />
      <Route path='consulta' element={<ConsultaAdminObligaciones />} />
      <Route path='registro' element={<SolicitudFacilidadPago />} />
      <Route path='admin' element={<ObligacionesAdmin />} />
      <Route path='asignadas' element={<ObligacionesAdminAsignadas />} />
      <Route path='solicitud' element={<VisualizarSolicitudAdmin />} />
      <Route path='amortizacion' element={<Amortizacion />} />
      <Route path='resolucion' element={<ResolucionRespuesta />} />
      <Route path='autorizadas' element={<FacilidadPagoAutorizadas />} />
      <Route path='seguimiento' element={<DetalleFacilidadPago />} />
    </Routes>
  )
}
