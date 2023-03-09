import { Route, Routes, Navigate } from 'react-router-dom';
import { RecursoHidricoScreen } from '../screens/RecursoHdricoScreen';
import { IndexEstacionesScreen, GeolocalizacionScreen, UsuariosScreen } from '../estaciones/screens';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecursoHidricoRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Estaciones */}
      <Route path="estaciones/*" element={<IndexEstacionesScreen />} />

      {/* Partes Interesadas Estaciones */}
      <Route path="geolocalizacion/*" element={<GeolocalizacionScreen/>} />

      {/* Geolocalizacion Estaciones */}
      <Route path="usuarios/*" element={<UsuariosScreen/>} />

      <Route path="/" element={<RecursoHidricoScreen />} />

      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
