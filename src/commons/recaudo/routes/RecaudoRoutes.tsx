import { Route, Routes } from 'react-router';
import { Page404 } from '../../../screens/404';
import { LiquidacionTUAScreen } from '../screens/LiquidacionTUAScreen';
import { RecaudoScreen } from '../screens/RecaudoScreen';
import { ConstructorLiquidacionScreen } from '../screens/ConstructorLiquidacionScreen';
import { ProcesoLiquidacionScreen } from '../screens/ProcesoLiquidacionScreen';
import { EstadosProcesoScreen } from '../screens/EstadosProcesoScreen';
import { FlujoProcesosScreen } from '../screens/FlujoProcesosScreen';
import { GestionCarteraScreen } from '../screens/GestionCarteraScreen';
import { LiquidacionScreen } from '../screens/LiquidacionScreen';
// import { LiquidacionScreen } from '../screens/LiquidacionScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecaudoRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="datos/*" element={<RecaudoScreen />} />
      <Route path="liquidacion_tua/*" element={<LiquidacionTUAScreen />} />
      <Route path="constructor_liquidacion/*" element={<ConstructorLiquidacionScreen />} />
      <Route path="proceso_liquidacion/*" element={<ProcesoLiquidacionScreen />} />
      <Route path="estados_proceso/*" element={<EstadosProcesoScreen />} />
      <Route path="flujo_proceso/*" element={<FlujoProcesosScreen />} />
      <Route path="gestion_cartera/*" element={<GestionCarteraScreen />} />
      <Route path="liquidacion/*" element={<LiquidacionScreen />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
