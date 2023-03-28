import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { SolicitudBienesConsumoScreen  } from '../screens/SolicitudBienesConsumoScreen';
import { AprobacionSolicitudesBienesScreen  } from '../screens/AprobacionSolicitudesBienesScreen';
import { SolicitudBienesConsumoViverosScreen  } from '../screens/SolicitudBienesConsumoViverosScreen';
import { AprobacionSolicitudesConsumoViveroScreen  } from '../screens/AprobacionSolicitudesConsumoViveroScreen';
;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegistroSolicitudesAlmacenRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="solicitud_bienes_consumo" element={<SolicitudBienesConsumoScreen/>} />
      <Route path="aprobacion_solicitud_bienes" element={<AprobacionSolicitudesBienesScreen/>} />
      <Route path="solicitud_bienes_consumo_viveros" element={<SolicitudBienesConsumoViverosScreen/>} />
      <Route path="aprobacion_solicitud_consumo_vivero" element={<AprobacionSolicitudesConsumoViveroScreen/>} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
