import { Route, Routes } from 'react-router-dom';
import { GestorDocumentalRoutes } from '../commons/gestorDocumental/routes/GestorDocumentalRoutes';
import { HomeRoutes } from '../commons/home/routes/HomeRoutes';
import { SeguridadRoutes } from '../commons/seguridad/routers/SeguridadRoutes';
import { MainLayout } from '../layouts/MainLayout';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProtectedRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<MainLayout />}>
        {/* Dashboard */}
        <Route path="home/*" element={<HomeRoutes />} />
        {/* Seguridad */}
        <Route path="seguridad/*" element={<SeguridadRoutes />} />
        {/* Gestor documental */}
        <Route
          path="gestor_documental/*"
          element={<GestorDocumentalRoutes />}
        />
      </Route>
    </Routes>
  );
};
