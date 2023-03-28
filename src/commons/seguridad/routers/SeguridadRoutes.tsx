import { Route, Routes } from 'react-router-dom';
import { AdminUsuariosScreen } from '../screens/AdminUsuariosScreen';
import AuditoriaScreen from '../screens/AuditoriaScreen';
import { RolesScreen } from '../screens/RolesScreen';
import { Page404 } from '../../../screens/404';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeguridadRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/administrar_usuarios" element={<AdminUsuariosScreen />} />
      <Route path="/auditoria" element={<AuditoriaScreen />} />
      <Route path="/roles" element={<RolesScreen />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
