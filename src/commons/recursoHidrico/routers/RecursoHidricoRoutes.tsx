import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../screens/404';
import { EstacionesRoutes } from '../estaciones/routers/EstacionesRoutes';
// import { IndexEstacionesScreen } from '../estaciones/screens';
import { PorhRoutes } from './../PORH/router/PorhRoutes';
import { AvancesRoutes } from '../Avances/router/AvancesRoutes';
import { BibliotecaRouter } from '../biblioteca/router/BibliotecaRouter';
import { AlertasRoutes } from '../alertas/router/AlertasRoutes';
import { ConsultaBibliotecaRoutes } from '../ConsultaBiblioteca/router/ConsultaBibliotecaRoutes';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecursoHidricoRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Estaciones */}
      {/* <Route path="index_estaciones/*" element={<IndexEstacionesScreen />} /> */}
      <Route path="estaciones/*" element={<EstacionesRoutes />} />
      <Route path="porh/*" element={<PorhRoutes />} />
      <Route path="proyectos/*" element={<AvancesRoutes />} />
      <Route path="biblioteca/*" element={<BibliotecaRouter />} />
      <Route path="alertas/*" element={<AlertasRoutes />} />
      <Route path="consulta/*" element={<ConsultaBibliotecaRoutes />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
