import { Route, Routes } from 'react-router-dom';
import { ObligacionesUsuarios } from '../screens/ObligacionesUsuario';
import { ConsultaObligacionesFuncionario } from '../screens/ConsultaObligacionesFuncionario';
import { RegistroFacilidadPago } from '../screens/RegistroFacilidadPago';
import { FacilidadesPagoAdmin } from '../screens/FacilidadesPagoAdmin';
import { FacilidadesPagoFuncionario } from '../screens/FacilidadesPagoFuncionario';
import { ConsultaFacilidadFuncionario } from '../screens/ConsultaFacilidadFuncionario';
import { Amortizacion } from '../screens/Amortizacion';
import { ResolucionRespuesta } from '../screens/ResolucionRespuesta';
import { FacilidadesPagoUsuario } from '../screens/FacilidadesPagoUsuario';
import { ConsultaFacilidadUsuario } from '../screens/ConsultaFacilidadUsuario';
import { ReciboPago } from '../screens/ReciboPago';
import { IncumplimientoFacilidadPago } from '../screens/IncumplimientoFacilidadPago';
import { ReposicionUsuario } from '../screens/ReposicionUsuario';
import { ReposicionFuncionario } from '../screens/ReposicionFuncionario';
import { NotificacionesRoutes } from '../notificaciones/routes/NotificacionesRoutes';
import { ConceptoPago } from '../screens/ConceptoPago';
import { AmortizacionModalPlanPagos } from '../screens/AmortizacionModalPlanPagos/AmortizacionModalPlanPagos';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FacilidadPagoRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/*' element={<ObligacionesUsuarios />} />
      <Route path='consulta' element={<ConsultaObligacionesFuncionario />} />
      <Route path='registro' element={<RegistroFacilidadPago />} />
      <Route path='admin' element={<FacilidadesPagoAdmin />} />
      <Route path='asignadas' element={<FacilidadesPagoFuncionario />} />
      <Route path='solicitud' element={<ConsultaFacilidadFuncionario />} />
      <Route path='amortizacion' element={<Amortizacion />} />
      <Route path='pruebaxxx' element={<AmortizacionModalPlanPagos/>} />
      <Route path='resolucion' element={<ResolucionRespuesta />} />
      <Route path='autorizadas' element={<FacilidadesPagoUsuario />} />
      <Route path='seguimiento' element={<ConsultaFacilidadUsuario />} />
      <Route path='recibo' element={<ReciboPago />} />
      <Route path='incumplimiento' element={<IncumplimientoFacilidadPago />} />
      <Route path='reposicion_externa' element={<ReposicionUsuario />} />
      <Route path='reposicion_interna' element={<ReposicionFuncionario />} />
      <Route path='notificaciones/*' element={<NotificacionesRoutes />} />
      <Route path='Concepto_Pago' element={<ConceptoPago />} />

    </Routes>
  )
}
