import { Route, Routes, Navigate } from 'react-router-dom';
import { PanelSolicitudNotificacionScreen } from '../screens/PanelSolicitudNotificacionScreen';
import React from 'react';
import { VerSolicitudNotificacionScreen } from '../screens/VerSolicitudNotificacionScreen';
import { RechazoSolicitudNotificacionScreen } from '../screens/RechazoSolicitudNotificacionScreen';
import { CrearSolicitudNotificacionScreen } from '../screens/CrearSolicitudNotificacionScreen';
import { PanelAsignacionCoordinadorScreen } from '../screens/PanelAsignacionCoordinadorScreen';
import { PanelAsignacionFuncionarioScreen } from '../screens/PanelAsignacionFuncionarioScreen';
import { PanelFuncionarioScreen } from '../screens/PanelFuncionarioScreen';
import { TiposNotificacionScreen } from '../screens/parametrizacion/TiposNotificacionScreen';
import { EstadosNotificacionScreen } from '../screens/parametrizacion/EstadosNotificacionScreen';
import { CausasNotificacionScreen } from '../screens/parametrizacion/CausasNotificacionScreen';
import { TiposSoporteScreen } from '../screens/parametrizacion/TiposSoporteScreen';
import { GacetaAmbientalScreen } from '../screens/GacetaAmbientalScreen';
import { PublicarEdictosScreen } from '../screens/PublicarEdictosScreen';
import { GeneradorDocumentosScreen } from '../screens/generadorDocumentos/GeneradorDocumentosScreen';
import { TiposDocumentoNotificacionScreen } from '../screens/parametrizacion/TiposDocumentoNotificacionScreen';
import { PanelAsignacionTareaFuncioanrioScreen } from '../screens/PanelAsignacionTareaFuncionarioScreen';
import { CorrespondenciaFisicaScreen } from '../screens/CorrespondenciaFisicaScreen';
import { CorreoCertificadoScreen } from '../screens/CorreoCertificadoScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NotificacionesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="panel_solicitudes_correspondencia"
        element={<PanelSolicitudNotificacionScreen />}
      />
      {/* <Route
        path="ver_solicitud_correspondencia"
        element={<VerSolicitudNotificacionScreen />}
      /> */}
      <Route
        path="rechazar_solicitud_correspondencia"
        element={<RechazoSolicitudNotificacionScreen />}
      />

      <Route
        path="panel_asignacion_coordinador"
        element={<PanelAsignacionCoordinadorScreen />}
      />
      <Route
        path="panel_asignacion_funcionario"
        element={<PanelAsignacionFuncionarioScreen />}
      />
      <Route
        path="panel_asignacion_tarea_funcionario"
        element={<PanelAsignacionTareaFuncioanrioScreen />}
      />
      <Route path="panel_funcionario" element={<PanelFuncionarioScreen />} />

      <Route
        path="gestionar_tarea_solicitud_correspondencia"
        element={<GacetaAmbientalScreen />}
      />
      <Route
        path="crear_solicitud_despacho"
        element={<CrearSolicitudNotificacionScreen />}
      />
      {/* <Route path="solicitud_pqrsdf" element={<SolicitudPqrsdfScreen />} />
      <Route path="crear_pqrsdf/:id?" element={<CrearPqrsdfScreen />} />
      <Route path="imprimir_radicado" element={<ImpresionRadicadoScreen />} /> */}

      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
