import { Route, Routes } from 'react-router-dom';
import { HomeRoutes } from '../commons/home/routes/HomeRoutes';
import { SeguridadRoutes } from '../commons/seguridad/routers/SeguridadRoutes';
import { GestorDocumentalRoutes } from '../commons/gestorDocumental/routes/GestorDocumentalRoutes';
import { MainLayout } from '../layouts/MainLayout';
import { AlmacenRoutes } from '../commons/almacen/routes/AlmacenRoutes';
import { ConservacionRoutes } from '../commons/conservacion/routes/ConservacionRoutes';
import { RecaudoRoutes } from '../commons/recaudo/routes/RecaudoRoutes';
import { RecursoHidricoRoutes } from '../commons/recursoHidrico/routers/RecursoHidricoRoutes';

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
        {/* Almacen */}
        <Route path="almacen/*" element={<AlmacenRoutes />} />
        {/* Conservación */}
        <Route path="conservacion/*" element={<ConservacionRoutes />} />
        {/* Recurso Hidrico */}
        <Route path="recurso_hidrico/*" element={<RecursoHidricoRoutes />} />
        {/* Almacen */}
        <Route path="almacen/*" element={<AlmacenRoutes />} />
        {/* Recaudo */}
        <Route path="recaudo/*" element={<RecaudoRoutes />} />
      </Route>
    </Routes>
  );
};
