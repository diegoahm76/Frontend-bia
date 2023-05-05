import { Route, Routes } from 'react-router-dom';
import {
  ActualizacionDatosRestringidosScreen,
  AdminUsuariosScreen,
  AdministracionPersonasScreen,
  RolesScreen,
} from '../screens/';
import { Page404 } from '../../../screens/404';
import AuditoriaScreen from '../screens/AuditoriaScreen';
import { DelegacionSuperuserScreen } from '../screens/DelegacionSuperuserScreen';
import { DatosPersonalesScreen } from '../screens/DatosPersonalesScreen';
import { DatosAccesoScreen } from '../screens/DatosAccesoScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeguridadRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/auditoria" element={<AuditoriaScreen />} />
      <Route path="/roles" element={<RolesScreen />} />
      <Route
        path="/datos_restringidos"
        element={<ActualizacionDatosRestringidosScreen />}
      />
      <Route
        path="/administracion_usuarios"
        element={<AdminUsuariosScreen />}
      />
      <Route
        path="/administracion_personas"
        element={<AdministracionPersonasScreen />}
      />
      <Route
        path="/delegacion_superusuario"
        element={<DelegacionSuperuserScreen />}
      />
      <Route path="/datos_personales" element={<DatosPersonalesScreen />} />
      <Route path="/datos_acceso" element={<DatosAccesoScreen />} />

      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
