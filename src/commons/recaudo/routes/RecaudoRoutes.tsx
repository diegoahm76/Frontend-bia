import { Route, Routes } from 'react-router';
import { Page404 } from '../../../screens/404';
import { LiquidacionTUAScreen } from '../liquidacionTUA/screens/LiquidacionTUAScreen';
import { RecaudoScreen } from '../screens/RecaudoScreen';
import { LiquidacionScreen } from '../screens/LiquidacionScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecaudoRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="datos/*" element={<RecaudoScreen />} />
      <Route path="liquidacion_tua/*" element={<LiquidacionTUAScreen />} />
      <Route path="liquidacion/*" element={<LiquidacionScreen />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
