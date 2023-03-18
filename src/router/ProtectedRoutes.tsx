import { Route, Routes } from 'react-router-dom';
import { HomeRoutes } from '../commons/home/routes/HomeRoutes';
import { SeguridadRoutes } from '../commons/seguridad/routers/SeguridadRoutes';
import { OrganigramaRoutes } from '../commons/gestorDocumental/organigrama/routes/OrganigramaRoutes';
import { CcdRoutes } from '../commons/gestorDocumental/ccd/routes/CcdRoutes';
import { TcaRoutes } from '../commons/gestorDocumental/tca/routes/TcaRoutes';
import { TrdRoutes } from '../commons/gestorDocumental/trd/routes/TrdRoutes';
import { MainLayout } from '../layouts/MainLayout';
import { AlmacenRoutes } from '../commons/almacen/router/AlmacenRoutes';
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
        {/* conservacion */}
        <Route path="conservacion/*" element={<ConservacionRoutes />} />
        {/* Gestor documental */}
        <Route path="gestor_documental/*">
          <Route path="organigrama/*" element={<OrganigramaRoutes />} />
          <Route path="ccd/*" element={<CcdRoutes />} />
          <Route path="trd/*" element={<TrdRoutes />} />
          <Route path="tca/*" element={<TcaRoutes />} />
        </Route>
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
