import { Route, Routes, Navigate } from 'react-router-dom';
import { IndexEstacionesScreen, GeolocalizacionScreen } from '../screens';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecursoHidricoRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexEstacionesScreen />} />
      <Route path="geolocalizacion" element={<GeolocalizacionScreen />} />

      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};