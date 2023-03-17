import { Route, Routes, Navigate } from 'react-router-dom';
import { PlantasInsumosScreen  } from '../screens/PlantasInsumosScreen';
import { AprobacionSolicitudCScreen  } from '../screens/coordinador/AprobacionSolicitudScreen';
import { SolicitudesPendientesCScreen  } from '../screens/coordinador/SolicitudesPendientesScreen';
import { AprobacionSolicitudScreen  } from '../screens/funcionario/AprobacionSolicitudScreen';
import { SolicitudesPendientesScreen  } from '../screens/funcionario/SolicitudesPendientesScreen';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SolicitudMaterialRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="plantas-insumos" element={<PlantasInsumosScreen/>} />
      <Route path="coordinador/*">
          <Route path="solicitudes-pendientes/*" element={<SolicitudesPendientesCScreen />} />
          <Route path="aprobar-solicitud/*" element={<AprobacionSolicitudCScreen />} />
        </Route>
        <Route path="funcionario/*">
          <Route path="solicitudes-pendientes/*" element={<SolicitudesPendientesScreen />} />
          <Route path="aprobar-solicitud/*" element={<AprobacionSolicitudScreen />} />
        </Route>
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
