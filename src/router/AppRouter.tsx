import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../commons/auth/routes/AuthRoutes';
import { GestorDocumentalRoutes } from '../commons/gestorDocumental/routes/GestorDocumentalRoutes';
import { HomeRoutes } from '../commons/home/routes/HomeRoutes';
import { SeguridadRoutes } from '../commons/seguridad/routers/SeguridadRoutes';
import { MainLayout } from '../layouts/MainLayout';
import { ConfiguracionRoutes } from '../commons/almacen/configuracion/routes/ConfiguracionRoutes';
import {EntradaysalidArticulosRoutes} from '../commons/almacen/entradaysalidaArticulos/routes/EntradaysalidaArticulosRoutes';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Login */}
      <Route path="auth/*" element={<AuthRoutes />} />
      {/* Dashboard */}
      <Route path="/*" element={<HomeRoutes />} />

      {/* Seguridad */}
      <Route path="/seguridad" element={<SeguridadRoutes />} />

      <Route path="dashboard/" element={<MainLayout />}>
        <Route
          path="gestor-documental/*"
          element={<GestorDocumentalRoutes />}
        />
        <Route path="almacen/*">
          <Route path="configuracion/*" 
          element={<ConfiguracionRoutes />} />
        </Route>
        <Route path="almacen/*">
          <Route path="entradaysalidaArticulos/*" 
          element={<EntradaysalidArticulosRoutes />} />
        </Route>
      </Route>
      <Route path="seguridad/" element={<MainLayout />}>
        <Route path="rol/*" element={<SeguridadRoutes />} />
      </Route>
    </Routes>
  );
};
