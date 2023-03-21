import { Route, Routes } from 'react-router-dom';
import { AdminPersonasScreen } from '../screen/AdminPersonasScreen';
import { AuditoriaScreen } from '../screen/AuditoriaScreen';
import { RolScreen } from '../screen/RolScreen';
import { Page404 } from '../../../screens/404';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeguridadRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/administrador_de_personas"
        element={<AdminPersonasScreen />}
      />
      <Route path="auditoria" element={<AuditoriaScreen />} />
      <Route path="roles" element={<RolScreen />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
