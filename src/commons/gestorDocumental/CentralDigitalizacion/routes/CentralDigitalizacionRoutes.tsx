import { Route, Routes, Navigate } from 'react-router-dom';
import { SolicitudesPendientesScreen } from '../screens/SolicitudesPendientesScreen';
import { CrearPqrsdfScreen } from '../screens/CrearPqrsdfScreen';
import { ImpresionRadicadoScreen } from '../screens/ImpresionRadicadoScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CentralDigitalizacionRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="solicitudes_pendientes"
        element={<SolicitudesPendientesScreen />}
      />
      {/* <Route path="crear_pqrsdf" element={<CrearPqrsdfScreen />} />
      <Route path="imprimir_radicado" element={<ImpresionRadicadoScreen />} /> */}
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
