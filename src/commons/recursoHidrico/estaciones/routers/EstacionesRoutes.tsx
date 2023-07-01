import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import {
  IndexEstacionesScreen,
  GeolocalizacionScreen,
  AlertasScreen,
  AdministradorDeEstaciones,
  UsuariosScreen,
  ReportesScreen,
  DashboardScreen,
  AnaliticaScreen,
} from '../screens';
import { HistorialDatos } from '../screens/HistorialScreen';
import { HistorialEquipos } from '../components/HistorialEquipos';
import { HistorialAlertas } from '../components/HistorialAlertas';

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

      {/* Usuarios Estaciones */}
      <Route path="usuarios/*" element={<UsuariosScreen />} />

      {/* Historial Estaciones */}
      <Route path="historial/*" element={<HistorialDatos />} />

      {/* Geolocalizacion Estaciones */}
      <Route path="reportes/*" element={<ReportesScreen />} />

      {/* Dashboard Estaciones */}
      <Route path="dashboard/*" element={<DashboardScreen />} />

      {/* Analitica Estaciones */}
      <Route path="analitica/*" element={<AnaliticaScreen />} />

      {/* historial_equipos   */}
      <Route path="historial_equipos/*" element={<HistorialEquipos />} />

      {/* historial_alertas   */}
      <Route path="historial_alertas/*" element={<HistorialAlertas />} />

      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
