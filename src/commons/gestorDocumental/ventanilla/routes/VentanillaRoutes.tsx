import { Route, Routes, Navigate } from 'react-router-dom';
import { CrearPersonaScreen } from '../screens/CrearPersonaScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VentanillaRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/creacion_persona" element={<CrearPersonaScreen />} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
