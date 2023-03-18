import { Route, Routes, Navigate } from 'react-router-dom';
import { IndexEstacionesScreen } from '../estaciones/screens';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecursoHidricoRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Estaciones */}
      <Route path="estaciones/*" element={<IndexEstacionesScreen />} />

      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
