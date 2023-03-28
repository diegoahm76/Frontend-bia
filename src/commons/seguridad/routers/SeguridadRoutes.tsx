import { Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import { AdminUsuariosScreen } from '../screens/AdminUsuariosScreen';
import AuditoriaScreen from '../screens/AuditoriaScreen';
import { RolesScreen } from '../screens/RolesScreen';
=======
import { AdminPersonasScreen } from '../screen/AdminPersonasScreen';
import { AuditoriaScreen } from '../screen/AuditoriaScreen';
import { RolScreen } from '../screen/RolScreen';
>>>>>>> parent of f31f0ce (Merge branch 'develop' into LorenaMartinez)
import { Page404 } from '../../../screens/404';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeguridadRoutes: React.FC = () => {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/administrar_usuarios" element={<AdminUsuariosScreen />} />
      <Route path="/auditoria" element={<AuditoriaScreen />} />
      <Route path="/roles" element={<RolesScreen />} />
=======
      <Route
        path="/administrador_de_personas"
        element={<AdminPersonasScreen />}
      />
      <Route path="auditoria" element={<AuditoriaScreen />} />
      <Route path="roles" element={<RolScreen />} />
>>>>>>> parent of f31f0ce (Merge branch 'develop' into LorenaMartinez)
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
