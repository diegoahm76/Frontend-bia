import { Route, Routes, Navigate } from 'react-router-dom';
<<<<<<< HEAD
import { IndexEstacionesScreen, GeolocalizacionScreen } from '../screens';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecursoHidricoRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexEstacionesScreen />} />
      <Route path="geolocalizacion" element={<GeolocalizacionScreen />} />
      
=======
import { IndexEstacionesScreen, GeolocalizacionScreen, AlertasScreen, AdministradorDeEstaciones, UsuariosScreen, HistorialScreen } from '../screens';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EstacionesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexEstacionesScreen />} />

      {/* Partes Interesadas Estaciones */}
      <Route path="geolocalizacion/*" element={<GeolocalizacionScreen />} />

      {/* Configuracion Alerta persona */}
      <Route path="alertas/*" element={<AlertasScreen />} />

      {/* Estaciones */}
      <Route path="estacion/*" element={<AdministradorDeEstaciones />} />

      {/* Geolocalizacion Estaciones */}
      <Route path="usuarios/*" element={<UsuariosScreen />} />

      {/* Historial Estaciones */}
      <Route path="historial/*" element={<HistorialScreen />} />

>>>>>>> main
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};