import { Route, Routes, Navigate } from 'react-router-dom';
import { SolicitudPqrsdfScreen } from '../screens/SolicitudPqrsdfScreen';
import { CrearPqrsdfScreen } from '../screens/CrearPqrsdfScreen';
import { ImpresionRadicadoScreen } from '../screens/ImpresionRadicadoScreen';
import { SolicitudUsuarioScreen } from '../componentes/respuestaSolicitudUsuario/screen/SolicitudUsuarioScreen';
import { ResSolicitudUsuarioProvider } from '../componentes/respuestaSolicitudUsuario/context/ResSolicitudUsarioContext';
import { ResProvider } from '../componentes/respuestaSolicitudUsuario/context/ResContext';
import { MainResReqPqrsdfScreen } from '../componentes/respuestaRequerimientoPQRSDF/screen/MainResReqPqrsdfScreen';
import { BandejaTareasProvider } from '../../bandejaDeTareas/mainModule/context/BandejaTareasContext';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PqrsdfRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="solicitud_pqrsdf" element={<SolicitudPqrsdfScreen />} />
      <Route path="crear_pqrsdf/:id?" element={<CrearPqrsdfScreen />} />
      <Route path="imprimir_radicado" element={<ImpresionRadicadoScreen />} />
      <Route
        path="respuesta_pqrsdf"
        element={
          <ResProvider>
            <ResSolicitudUsuarioProvider>
              <SolicitudUsuarioScreen />
            </ResSolicitudUsuarioProvider>
          </ResProvider>
        }
      />
      <Route
        path="responder_solicitud/:id?"
        element={
          <BandejaTareasProvider>
            <MainResReqPqrsdfScreen />
          </BandejaTareasProvider>
        }
      />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
