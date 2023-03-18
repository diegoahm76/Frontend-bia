import { Route, Routes } from 'react-router';
import { LiquidacionTUAScreen } from '../liquidacionTUA/screens/LiquidacionTUAScreen';
import { RecaudoScreen } from '../screens/RecaudoScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecaudoRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="datos/*" element={<RecaudoScreen />} />
      <Route path="liquidacion_tua/*" element={<LiquidacionTUAScreen />} />
    </Routes>
  );
};
