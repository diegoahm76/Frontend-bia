import { Route, Routes } from 'react-router';
import { Page404 } from '../../../screens/404';
import { LiquidacionTUAScreen } from '../screens/LiquidacionTUAScreen';
import { RecaudoScreen } from '../screens/RecaudoScreen';
import { ConstructorLiquidacionScreen } from '../screens/ConstructorLiquidacionScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecaudoRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="datos/*" element={<RecaudoScreen />} />
      <Route path="liquidacion_tua/*" element={<LiquidacionTUAScreen />} />
      <Route path="constructor_liquidacion/*" element={<ConstructorLiquidacionScreen />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
