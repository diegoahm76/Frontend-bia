import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { HistorialDatos } from '../components/HistorialDatos';
import {
  IndexEstacionesScreen,
  GeolocalizacionScreen,
  AlertasScreen,
  AdministradorDeEstaciones,
  UsuariosScreen,
  DashboardScreen,
} from '../screens';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EstacionesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="index_estaciones/" element={<IndexEstacionesScreen />} />

      {/* Partes Interesadas Estaciones */}
      <Route path="geolocalizacion/*" element={<GeolocalizacionScreen />} />

      {/* Configuracion Alerta persona */}
      <Route path="alertas/*" element={<AlertasScreen />} />

      {/* Estaciones */}
      <Route path="estacion/*" element={<AdministradorDeEstaciones />} />

      {/* Geolocalizacion Estaciones */}
      <Route path="usuarios/*" element={<UsuariosScreen />} />
      {/* Dashboard Estaciones */}
      <Route path="dashboard/*" element={<DashboardScreen />} />
      {/* Historial */}
      <Route path="historial/*" element={<HistorialDatos />} />

      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
