import { Route, Routes } from 'react-router-dom';

import { GestorViveroRoutes } from '../commons/conservacion/gestorVivero/routes/GestorViveroRoutes';
import { ConfiguracionRoutes } from '../commons/conservacion/configuracion/routes/ConfiguracionRoutes';
import { DistribucionRoutes } from '../commons/conservacion/distribucion/routes/DistribucionRoutes';
import { MaterialVegetalRoutes } from '../commons/conservacion/materialVegetal/routes/MaterialVegetalRoutes';
import { NotificacionRoutes } from '../commons/conservacion/notificacion/routes/NotificacionRoutes';
import { ReporteRoutes } from '../commons/conservacion/reporte/routes/ReporteRoutes';
import { SolicitudMaterialRoutes } from '../commons/conservacion/solicitudMaterial/routes/SolucitudMaterialRoutes';

import { HomeRoutes } from '../commons/home/routes/HomeRoutes';
import { SeguridadRoutes } from '../commons/seguridad/routers/SeguridadRoutes';
import { GestorDocumentalRoutes } from '../commons/gestorDocumental/routes/GestorDocumentalRoutes';

import { MainLayout } from '../layouts/MainLayout';
import { EstacionesRoutes } from '../commons/recursoHidrico/estaciones/routers/EstacionesRoutes';
import { AlmacenRoutes } from '../commons/almacen/router/AlmacenRoutes';
import { ProduccionRoutes } from '../commons/conservacion/produccion/routes/ProduccionRoutes';

import { RecaudoScreen } from '../commons/recaudo/screens/RecaudoScreen';
import { LiquidacionTUAScreen } from '../commons/recaudo/liquidacionTUA/screens/LiquidacionTUAScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProtectedRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<MainLayout />}>
        {/* Dashboard */}
        <Route path="home/*" element={<HomeRoutes />} />
        {/* Seguridad */}
        <Route path="seguridad/*" element={<SeguridadRoutes />} />
        {/* conservacion */}
        <Route path="conservacion/*">
          <Route path="gestor-vivero/*" element={<GestorViveroRoutes />} />
          <Route path="configuracion/*" element={<ConfiguracionRoutes />} />
          <Route path="distribucion/*" element={<DistribucionRoutes />} />
          <Route
            path="material-vegetal/*"
            element={<MaterialVegetalRoutes />}
          />
          <Route
            path="notificaciones-alertas/*"
            element={<NotificacionRoutes />}
          />
          <Route path="produccion/*" element={<ProduccionRoutes />} />
          <Route path="reportes/*" element={<ReporteRoutes />} />
          <Route
            path="solicitud-material/*"
            element={<SolicitudMaterialRoutes />}
          />
        </Route>
        {/* Gestor documental */}
        <Route
          path="gestor_documental/*"
          element={<GestorDocumentalRoutes />}
        />

        {/* Recurso Hidrico */}
        <Route path="recurso_hidrico/*">
          <Route path="estaciones/*" element={<EstacionesRoutes />} />
        </Route>
        {/* Almacen */}
        <Route path="almacen/*" element={<AlmacenRoutes />} />
        {/* Recaudo */}
        <Route path="recaudo/*">
          <Route path="datos/*" element={<RecaudoScreen />} />
          <Route path="liquidacion_tua/*" element={<LiquidacionTUAScreen />} />
        </Route>
      </Route>
    </Routes>
  );
};
