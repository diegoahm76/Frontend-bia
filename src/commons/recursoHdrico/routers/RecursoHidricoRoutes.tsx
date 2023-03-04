import { Route, Routes, Navigate } from 'react-router-dom';
import { RecursoHidricoScreen } from '../screens/RecursoHdricoScreen';
import { IndexEstacionesScreen, GeolocalizacionScreen } from '../estaciones/screens';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecursoHidricoRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Estaciones */}
      <Route path="estaciones/*" element={<IndexEstacionesScreen />} />

      {/* Geolocalizacion Estaciones */}
      <Route path="geolocalizacion/*" element={<GeolocalizacionScreen/>} />

      <Route path="/" element={<RecursoHidricoScreen />} />

      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
