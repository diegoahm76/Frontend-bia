import { Route, Routes, Navigate } from 'react-router-dom';
import { SolicitudPqrsdfScreen } from '../screens/SolicitudPqrsdfScreen';
import { CrearPqrsdfScreen } from '../screens/CrearPqrsdfScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PqrsdfRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="solicitud_pqrsdf" element={<SolicitudPqrsdfScreen />} />
      <Route path="crear_pqrsdf" element={<CrearPqrsdfScreen />} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
