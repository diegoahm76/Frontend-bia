import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
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
      <Route path="index_estaciones/" element={<IndexEstacionesScreen />} />

      {/* Partes Interesadas Estaciones */}
      <Route path="geolocalizacion/*" element={<GeolocalizacionScreen />} />

      {/* Configuracion Alerta persona */}
      <Route path="alertas/*" element={<AlertasScreen />} />

      {/* Estaciones */}
      <Route path="estacion/*" element={<AdministradorDeEstaciones />} />

      {/* Geolocalizacion Estaciones */}
      <Route path="usuarios/*" element={<UsuariosScreen />} />

      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
