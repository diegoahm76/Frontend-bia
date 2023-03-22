import { Route, Routes } from 'react-router';
import { Page404 } from '../../../screens/404';
import { ConfiguracionRoutes } from '../configuracion/routes/ConfiguracionRoutes';
import { DistribucionRoutes } from '../distribucion/routes/DistribucionRoutes';
import { GestorViveroRoutes } from '../gestorVivero/routes/GestorViveroRoutes';
import { MaterialVegetalRoutes } from '../materialVegetal/routes/MaterialVegetalRoutes';
import { NotificacionRoutes } from '../notificacion/routes/NotificacionRoutes';
import { ProduccionRoutes } from '../produccion/routes/ProduccionRoutes';
import { ReporteRoutes } from '../reporte/routes/ReporteRoutes';
import { SolicitudMaterialRoutes } from '../solicitudMaterial/routes/SolucitudMaterialRoutes';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConservacionRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="gestor_vivero/*" element={<GestorViveroRoutes />} />
      <Route path="configuracion/*" element={<ConfiguracionRoutes />} />
      <Route path="distribucion/*" element={<DistribucionRoutes />} />
      <Route path="material_vegetal/*" element={<MaterialVegetalRoutes />} />
      <Route path="notificaciones_alertas/*" element={<NotificacionRoutes />} />
      <Route path="produccion/*" element={<ProduccionRoutes />} />
      <Route path="reportes/*" element={<ReporteRoutes />} />
      <Route
        path="solicitud-material/*"
        element={<SolicitudMaterialRoutes />}
      />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
