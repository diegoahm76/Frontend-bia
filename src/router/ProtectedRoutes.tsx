import { Route, Routes } from 'react-router-dom';
import { ConfiguracionRoutes } from '../commons/almacen/configuracion/routes/ConfiguracionRoutes';
import { AlmacenRoutes } from '../commons/almacen/router/AlmacenRoutes';
import { OrganigramaRoutes } from '../commons/gestorDocumental/organigrama/routes/OrganigramaRoutes';
import { HomeRoutes } from '../commons/home/routes/HomeRoutes';
import { SeguridadRoutes } from '../commons/seguridad/routers/SeguridadRoutes';
import { OrganigramaRoutes } from '../commons/gestorDocumental/organigrama/routes/OrganigramaRoutes';
import { CcdRoutes } from '../commons/gestorDocumental/ccd/routes/CcdRoutes';
import { TcaRoutes } from '../commons/gestorDocumental/tca/routes/TcaRoutes';
import { TrdRoutes } from '../commons/gestorDocumental/trd/routes/TrdRoutes';
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
        <Route path="gestor_documental/*">
          <Route path="organigrama/*" element={<OrganigramaRoutes />} />
          <Route path="ccd/*" element={<CcdRoutes />} />
          <Route path="trd/*" element={<TrdRoutes />} />
          <Route path="tca/*" element={<TcaRoutes />} />
        </Route>
        {/* Almacen */}
        <Route path='almacen/*' element={<AlmacenRoutes />} />
      </Route>
    </Routes>
  );
};
