import { Route, Routes, Navigate } from 'react-router-dom';
import { SolicitudPqrsdfScreen } from '../screens/SolicitudPqrsdfScreen';
import { CrearPqrsdfScreen } from '../screens/CrearPqrsdfScreen';
import { AsignacionUsuarioScreen } from '../componentes/RespuestaSolicitudPQRSDF/screen/AsignacionUsuarioScreen';
import { RespuestaSolicitudProvider } from '../componentes/RespuestaSolicitudPQRSDF/context/RepuestaSolicitudContext';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PqrsdfRoutes: React.FC = () => {
  return (
    <RespuestaSolicitudProvider>
      <Routes>
        <Route path="solicitud_pqrsdf" element={<SolicitudPqrsdfScreen />} />
        <Route path="crear_pqrsdf" element={<CrearPqrsdfScreen />} />
        <Route path="respuesta_pqrsdf" element={<AsignacionUsuarioScreen />} />
        <Route path="/*" element={<Navigate to={'/'} />} />
      </Routes>
    </RespuestaSolicitudProvider>
  );
};
