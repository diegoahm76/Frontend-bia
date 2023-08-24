import { Route, Routes } from 'react-router';
import { Page404 } from '../../../screens/404';
import { LiquidacionTUAScreen } from '../screens/LiquidacionTUAScreen';
import { RecaudoScreen } from '../screens/RecaudoScreen';
import { ProcesoLiquidacionScreen } from '../screens/ProcesoLiquidacionScreen';
import { EstadosProcesoScreen } from '../screens/EstadosProcesoScreen';
import { FlujoProcesosScreen } from '../screens/FlujoProcesosScreen';
import { GestionCarteraScreen } from '../screens/GestionCarteraScreen';
import { VisorProcesosScreen } from '../screens/VisorProcesosScreen';
import { HistorialProceso } from '../screens/HistorialProcesoScreen';
import { FacilidadPagoRoutes } from '../facilidadPago/routes/FacilidadPagoRoutes';
import { ReportesRoutes } from '../reportes/routes/ReportesRoutes';
import { LiquidacionScreen } from '../screens/LiquidacionScreen';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecaudoRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="datos/*" element={<RecaudoScreen />} />
      <Route path="liquidacion/*" element={<LiquidacionScreen />} />
      <Route path="liquidacion_tua/*" element={<LiquidacionTUAScreen />} />
      <Route path="proceso_liquidacion/*" element={<ProcesoLiquidacionScreen />} />
      <Route path="estados_proceso/*" element={<EstadosProcesoScreen />} />
      <Route path="flujo_proceso/*" element={<FlujoProcesosScreen />} />
      <Route path="gestion_cartera/*" element={<GestionCarteraScreen />} />
      <Route path="visor_procesos/*" element={<VisorProcesosScreen />} />
      <Route path="historial_proceso/*" element={<HistorialProceso />} />
      <Route path="facilidades_pago/*" element={<FacilidadPagoRoutes />} />
      <Route path="reportes/*" element={<ReportesRoutes />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
