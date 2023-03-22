import { Route, Routes } from 'react-router-dom';
import { PlantasInsumosScreen  } from '../screens/PlantasInsumosScreen';
import { AprobacionSolicitudCScreen  } from '../screens/coordinador/AprobacionSolicitudScreen';
import { SolicitudesPendientesCScreen  } from '../screens/coordinador/SolicitudesPendientesScreen';
import { AprobacionSolicitudScreen  } from '../screens/funcionario/AprobacionSolicitudScreen';
import { SolicitudesPendientesScreen  } from '../screens/funcionario/SolicitudesPendientesScreen';
import { Page404 } from '../../../../screens/404';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SolicitudMaterialRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="plantas_insumos" element={<PlantasInsumosScreen/>} />
      <Route path="coordinador/*">
          <Route path="solicitudes_pendientes/*" element={<SolicitudesPendientesCScreen />} />
          <Route path="aprobar_solicitud/*" element={<AprobacionSolicitudCScreen />} />
        </Route>
        <Route path="funcionario/*">
          <Route path="solicitudes_pendientes/*" element={<SolicitudesPendientesScreen />} />
          <Route path="aprobar_solicitud/*" element={<AprobacionSolicitudScreen />} />
        </Route>
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
