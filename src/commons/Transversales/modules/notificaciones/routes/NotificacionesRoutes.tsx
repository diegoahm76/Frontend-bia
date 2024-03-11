import { Route, Routes, Navigate } from 'react-router-dom';
import { PanelSolicitudNotificacionScreen } from '../screens/PanelSolicitudNotificacionScreen';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NotificacionesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="panel_notificaciones"
        element={<PanelSolicitudNotificacionScreen />}
      />

      {/* <Route path="solicitud_pqrsdf" element={<SolicitudPqrsdfScreen />} />
      <Route path="crear_pqrsdf/:id?" element={<CrearPqrsdfScreen />} />
      <Route path="imprimir_radicado" element={<ImpresionRadicadoScreen />} /> */}

      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
