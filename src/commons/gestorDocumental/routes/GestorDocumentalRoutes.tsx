import { Route, Routes } from 'react-router-dom';
import { OrganigramaRoutes } from '../organigrama/routes/OrganigramaRoutes';
import { CcdRoutes } from '../ccd/routes/CcdRoutes';
import { TrdRoutes } from '../trd/routes/TrdRoutes';
import { TcaRoutes } from '../tca/routes/TcaRoutes';
import { Page404 } from '../../../screens/404';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GestorDocumentalRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="organigrama/*" element={<OrganigramaRoutes />} />
      <Route path="ccd/*" element={<CcdRoutes />} />
      <Route path="trd/*" element={<TrdRoutes />} />
      <Route path="tca/*" element={<TcaRoutes />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
