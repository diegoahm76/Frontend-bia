import { Route, Routes } from 'react-router';
import { Page404 } from '../../../screens/404';
import { Facturacion } from '../screens/Facturacion';
import { RecaudoScreen } from '../screens/RecaudoScreen';
import { SupEtapasProceso } from '../screens/SupEtapasProceso';
import { LiquidacionScreen } from '../screens/LiquidacionScreen';
import { ReportesRoutes } from '../reportes/routes/ReportesRoutes';
import { HistorialProceso } from '../screens/HistorialProcesoScreen';
import { VisorProcesosScreen } from '../screens/VisorProcesosScreen';
import { FlujoProcesosScreen } from '../screens/FlujoProcesosScreen';
import { LiquidacionTUAScreen } from '../screens/LiquidacionTUAScreen';
import { EstadosProcesoScreen } from '../screens/EstadosProcesoScreen';
import { GestionCarteraScreen } from '../screens/GestionCarteraScreen';
import { HistoricoFacturacion } from '../screens/HistoricoFacturacion';
import { ProcesoLiquidacionScreen } from '../screens/ProcesoLiquidacionScreen';
import { AutodeclaracionFormulario } from '../screens/AutodeclaracionFormulario';
import { FacilidadPagoRoutes } from '../facilidadPago/routes/FacilidadPagoRoutes';
import ConfiguracionAlertasScreen from '../alertas/screens/ConfiguracionAlertaScreen';
import { ConstructorLiquidacionScreen } from '../screens/ConstructorLiquidacionScreen';
import { EtapaProcesoProvider } from '../components/GestionCartera/Context/EtapaProcesoContext';
import { AprovacionAutodeclaracion } from '../screens/AprovacionAutodeclaracion';



// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecaudoRoutes: React.FC = () => {
  return (
    <EtapaProcesoProvider >
    <Routes>
      {/* <Route path="datos/*" element={<RecaudoScreen />} /> */}
      <Route path="facturacion/*" element={<Facturacion/>} />
      <Route path="reportes/*" element={<ReportesRoutes />} />
      <Route path="Sup_Etapas/*" element={<SupEtapasProceso />} />
      <Route path="liquidacion/*" element={<LiquidacionScreen />} />
      <Route path="visor_procesos/*" element={<VisorProcesosScreen />} />
      <Route path="historial_proceso/*" element={<HistorialProceso />} />
      <Route path="alertas/*" element={<ConfiguracionAlertasScreen />} />
      <Route path="gestion_cartera/*" element={<GestionCarteraScreen />} />
      <Route path="liquidacion_tua/*" element={<LiquidacionTUAScreen />} />
      <Route path="facilidades_pago/*" element={<FacilidadPagoRoutes />} />
      <Route path="estados_proceso/*" element={<EstadosProcesoScreen />} />
      {/* <Route path="flujo_proceso/*" element={<FlujoProcesosScreen />} /> */}
      <Route path="HistoricoFacturacion/*" element={<HistoricoFacturacion />} />
      <Route path="proceso_liquidacion/*" element={<ProcesoLiquidacionScreen />} />
      <Route path="Autodeclaracion_formulario/*" element={<AutodeclaracionFormulario/>} />
      <Route path="constructor_liquidacion/*" element={<ConstructorLiquidacionScreen />} />
      <Route path="aprobacion_autodeclaracion/*" element={<AprovacionAutodeclaracion/>} />


      
      <Route path="/*" element={<Page404 />} />
    </Routes>
    </EtapaProcesoProvider>
  );
};
