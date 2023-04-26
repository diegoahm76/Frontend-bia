import { Route, Routes } from 'react-router-dom';
import {
  ActualizacionDatosRestringidosScreen,
  AdminUsuariosScreen,
  AdministracionPersonas,
  RolesScreen
} from '../screens/';
import { Page404 } from '../../../screens/404';
import AuditoriaScreen from '../screens/AuditoriaScreen';
import { DelegacionSuperuserScreen } from '../screens/DelegacionSuperuserScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeguridadRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/administrar_usuarios" element={<AdminUsuariosScreen />} />
      <Route path="/auditoria" element={<AuditoriaScreen />} />
      <Route path="/roles" element={<RolesScreen />} />
      <Route path="/datos_restringidos" element={<ActualizacionDatosRestringidosScreen />} />
      <Route
        path="/administrador_personas"
        element={<AdministracionPersonas />}
      />
      <Route path="/delegacion_superusuario" element={<DelegacionSuperuserScreen />}/>
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
