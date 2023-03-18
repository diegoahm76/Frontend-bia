import { Route, Routes, Navigate } from 'react-router-dom';
import {
  IndexEstacionesScreen,
  GeolocalizacionScreen,
  AlertasScreen,
  AdministradorDeEstaciones,
  UsuariosScreen,
} from '../screens';

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

      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
