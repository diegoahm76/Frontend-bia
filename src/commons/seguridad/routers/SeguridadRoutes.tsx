import { Route, Routes } from 'react-router-dom';
import {
  AdminUsuariosScreen,
  AdministracionPersonas,
  RolesScreen,
} from '../screens/';
import { Page404 } from '../../../screens/404';
import AuditoriaScreen from '../screens/AuditoriaScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeguridadRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/administrar_usuarios" element={<AdminUsuariosScreen />} />
      <Route path="/auditoria" element={<AuditoriaScreen />} />
      <Route path="/roles" element={<RolesScreen />} />
      <Route
        path="/administrador_personas"
        element={<AdministracionPersonas />}
      />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
