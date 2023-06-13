import { Route, Routes } from 'react-router-dom';

import { SolicitudesPendientesCScreen } from '../screens/funcionario/SolicitudesPendientesScreen';
import { SolicitudesPendientesScreen } from '../screens/coordinador/SolicitudesPendientesScreen';
import { Page404 } from '../../../../screens/404';
import SolicitudViveroScreen from '../screens/SolicitudViveroScreen';
import AprobacionSolicitudCoordinadorScreen from '../screens/funcionario/AprobacionSolicitudScreen';
import { AprobacionSolicitudScreen } from '../screens/coordinador/AprobacionSolicitudScreen';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SolicitudMaterialRoutes: React.FC = () => {
  return (

    <Routes>
      <Route path="solicitudes" element={<SolicitudViveroScreen />} />
      <Route path="coordinador/*">
        <Route path="solicitudes_pendientes/*" element={<SolicitudesPendientesCScreen />} />
        <Route path="aprobar_solicitud/*" element={<AprobacionSolicitudCoordinadorScreen />} />
      </Route>
      <Route path="funcionario/*">
        <Route path="solicitudes_pendientes/*" element={<SolicitudesPendientesScreen />} />
        <Route path="aprobar_solicitud/*" element={<AprobacionSolicitudScreen />} />
      </Route>
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
