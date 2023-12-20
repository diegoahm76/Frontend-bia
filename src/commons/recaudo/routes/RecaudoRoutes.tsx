import { Route, Routes } from 'react-router';
import { Page404 } from '../../../screens/404';
import { LiquidacionTUAScreen } from '../screens/LiquidacionTUAScreen';
import { RecaudoScreen } from '../screens/RecaudoScreen';
import { ConstructorLiquidacionScreen } from '../screens/ConstructorLiquidacionScreen';
import { ProcesoLiquidacionScreen } from '../screens/ProcesoLiquidacionScreen';
import { EstadosProcesoScreen } from '../screens/EstadosProcesoScreen';
import { FlujoProcesosScreen } from '../screens/FlujoProcesosScreen';
import { GestionCarteraScreen } from '../screens/GestionCarteraScreen';
import { VisorProcesosScreen } from '../screens/VisorProcesosScreen';
import { HistorialProceso } from '../screens/HistorialProcesoScreen';
import { FacilidadPagoRoutes } from '../facilidadPago/routes/FacilidadPagoRoutes';
import { ReportesRoutes } from '../reportes/routes/ReportesRoutes';
import { LiquidacionScreen } from '../screens/LiquidacionScreen';
import ConfiguracionAlertasScreen from '../alertas/screens/ConfiguracionAlertaScreen';
import { Facturacion } from '../screens/Facturacion';
import { SupEtapasProceso } from '../screens/SupEtapasProceso';
import { AutodeclaracionFormulario } from '../screens/AutodeclaracionFormulario';



// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecaudoRoutes: React.FC = () => {
  return (
    <Routes>
      {/* <Route path="datos/*" element={<RecaudoScreen />} /> */}
      <Route path="liquidacion/*" element={<LiquidacionScreen />} />
      <Route path="liquidacion_tua/*" element={<LiquidacionTUAScreen />} />
      <Route path="constructor_liquidacion/*" element={<ConstructorLiquidacionScreen />} />
      <Route path="proceso_liquidacion/*" element={<ProcesoLiquidacionScreen />} />
      <Route path="estados_proceso/*" element={<EstadosProcesoScreen />} />
      {/* <Route path="flujo_proceso/*" element={<FlujoProcesosScreen />} /> */}
      <Route path="gestion_cartera/*" element={<GestionCarteraScreen />} />
      <Route path="visor_procesos/*" element={<VisorProcesosScreen />} />
      <Route path="historial_proceso/*" element={<HistorialProceso />} />
      <Route path="facilidades_pago/*" element={<FacilidadPagoRoutes />} />
      <Route path="reportes/*" element={<ReportesRoutes />} />
      <Route path="alertas/*" element={<ConfiguracionAlertasScreen />} />
      <Route path="facturacion/*" element={<Facturacion/>} />
      <Route path="Sup_Etapas/*" element={<SupEtapasProceso />} />
      <Route path="Autodeclaracion_formulatio/*" element={<AutodeclaracionFormulario/>} />

      
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
