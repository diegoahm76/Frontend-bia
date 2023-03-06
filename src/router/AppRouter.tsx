import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../commons/auth/routes/AuthRoutes';
import { OrganigramaRoutes } from '../commons/gestorDocumental/organigrama/routes/OrganigramaRoutes';
import { CcdRoutes } from '../commons/gestorDocumental/ccd/routes/CcdRoutes';
import { TrdRoutes } from '../commons/gestorDocumental/trd/routes/TrdRoutes';
import { TcaRoutes } from '../commons/gestorDocumental/tca/routes/TcaRoutes';
import { HomeRoutes } from '../commons/home/routes/HomeRoutes';
import { MainLayout } from '../layouts/MainLayout';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Login */}
      <Route path="auth/*" element={<AuthRoutes />} />
      {/* Dashboard */}
      <Route path="dashboard/" element={<MainLayout />}>
        <Route path="gestor-documental/*">
          <Route path="organigrama/*" element={<OrganigramaRoutes />}></Route>
          <Route path="ccd/*" element={<CcdRoutes />}></Route>
          <Route path="trd/*" element={<TrdRoutes />}></Route>
          <Route path="tca/*" element={<TcaRoutes />}></Route>
        </Route>
      </Route>
      <Route path="/*" element={<HomeRoutes />} />
    </Routes>
  );
};
