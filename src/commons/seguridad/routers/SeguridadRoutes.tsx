/* eslint-disable @typescript-eslint/naming-convention */
import { Route, Routes } from 'react-router-dom';
import {
  AdministracionPersonasScreen,
  RolesScreen
} from '../screens/';
import { Page404 } from '../../../screens/404';
import { AuditoriaScreen } from '../screens/AuditoriaScreen/AuditoriaScreen';
import { DelegacionSuperuserScreen } from '../screens/DelegacionSuperuserScreen';

const routes = [
  { path: '/auditoria', element: <AuditoriaScreen /> },
  { path: '/roles', element: <RolesScreen /> },
  { path: '/administracion_personas', element: <AdministracionPersonasScreen /> },
  { path: '/delegacion_superusuario', element: <DelegacionSuperuserScreen /> }

];
export const SeguridadRoutes: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
