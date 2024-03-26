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

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NotificacionesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="panel_notificaciones"
        element={<PanelSolicitudNotificacionScreen />}
      />
      <Route
        path="ver_notificacion"
        element={<VerSolicitudNotificacionScreen />}
      />
      <Route
        path="rechazar_notificacion"
        element={<RechazoSolicitudNotificacionScreen />}
      />
      <Route
        path="crear_notificacion"
        element={<CrearSolicitudNotificacionScreen />}
      />
      <Route
        path="panel_asignacion_coordinador"
        element={<PanelAsignacionCoordinadorScreen />}
      />
      <Route
        path="panel_asignacion_funcionario"
        element={<PanelAsignacionFuncionarioScreen />}
      />
      <Route path="panel_funcionario" element={<PanelFuncionarioScreen />} />
      <Route
        path="parametrizacion/tipos_notificacion"
        element={<TiposNotificacionScreen />}
      />
      <Route
        path="parametrizacion/estados_notificacion"
        element={<EstadosNotificacionScreen />}
      />
      <Route
        path="parametrizacion/causas_notificacion"
        element={<CausasNotificacionScreen />}
      />
      <Route
        path="parametrizacion/tipos_soporte"
        element={<TiposSoporteScreen />}
      />
      <Route
        path="publicar/gaceta_ambiental"
        element={<GacetaAmbientalScreen />}
      />
      <Route path="publicar/edictos" element={<PublicarEdictosScreen />} />
      <Route
        path="generador_documentos/generar"
        element={<GeneradorDocumentosScreen />}
      />

      {/* <Route path="solicitud_pqrsdf" element={<SolicitudPqrsdfScreen />} />
      <Route path="crear_pqrsdf/:id?" element={<CrearPqrsdfScreen />} />
      <Route path="imprimir_radicado" element={<ImpresionRadicadoScreen />} /> */}

      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
