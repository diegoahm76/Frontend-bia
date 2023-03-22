import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../screens/404';
import { EstacionesRoutes } from '../estaciones/routers/EstacionesRoutes';
import { IndexEstacionesScreen } from '../estaciones/screens';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecursoHidricoRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Estaciones */}
      <Route path="index_estaciones/*" element={<IndexEstacionesScreen />} />
      <Route path="estaciones/*" element={<EstacionesRoutes />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
