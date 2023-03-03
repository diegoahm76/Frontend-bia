import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../commons/auth/routes/AuthRoutes';
import { GestorDocumentalRoutes } from '../commons/gestorDocumental/routes/GestorDocumentalRoutes';
import { HomeRoutes } from '../commons/home/routes/HomeRoutes';
import { MainLayout } from '../layouts/MainLayout';
import { SeguridadRoutes } from '../commons/seguridad/routers/SeguridadRoutes';

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
      </Route>
    </Routes>
  );
};
