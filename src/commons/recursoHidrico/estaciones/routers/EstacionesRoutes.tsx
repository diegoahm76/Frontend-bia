import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import {
  IndexEstacionesScreen,
  GeolocalizacionScreen,
  AdministradorDeEstaciones,
  UsuariosScreen,
  ReportesScreen,
  DashboardScreen,
  AnaliticaScreen,
} from '../screens';
import { HistorialEquipos } from '../components/HistorialEquipos';
import { HistorialAlertas } from '../components/HistorialAlertas';
import { ParametrosReferencia } from '../components/ParametrosReferencia';
import { HistorialDeDatos } from '../components/HistorialDeDatos';
import { ConfiguracionAlarma } from '../components/ConfiguracionAlarma';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EstacionesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="index_estaciones/" element={<IndexEstacionesScreen />} />

      {/* Partes Interesadas Estaciones */}
      <Route path="geolocalizacion/*" element={<GeolocalizacionScreen />} />

      {/* Estaciones */}
      <Route path="estacion/*" element={<AdministradorDeEstaciones />} />

      {/* Usuarios Estaciones */}
      <Route path="usuarios/*" element={<UsuariosScreen />} />

      {/* Geolocalizacion Estaciones */}
      <Route path="reportes/*" element={<ReportesScreen />} />

      {/* Dashboard Estaciones */}
      <Route path="dashboard/*" element={<DashboardScreen />} />

      {/* Analitica Estaciones */}
      <Route path="analitica/*" element={<AnaliticaScreen />} />

      {/* Historial_Datos   */}
      <Route path="historial_datos/*" element={<HistorialDeDatos />} />

      {/* historial_equipos   */}
      <Route path="historial_equipos/*" element={<HistorialEquipos />} />

      {/* historial_alertas   */}
      <Route path="historial_alertas/*" element={<HistorialAlertas />} />

      {/* ParametrosReferencia   */}
      <Route path="parametros_referencia/*" element={<ParametrosReferencia />} />

      {/* Configuracion_alarma   */}
      <Route path="configuracion_alarma/*" element={<ConfiguracionAlarma />} />

      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
