/* eslint-disable @typescript-eslint/naming-convention */
import { Route, Routes } from 'react-router-dom';
import {
  AdministracionPersonasScreen,
  RolesScreen
} from '../screens/';
import { Page404 } from '../../../screens/404';
import { AuditoriaScreen } from '../screens/AuditoriaScreen/AuditoriaScreen';
import { DelegacionSuperuserScreen } from '../screens/DelegacionSuperuserScreen';
import { ConfiguracionesBasicasRoutes } from '../screens/ConfiguracionesBasicas/Routes/ConfiguracionesBasicas';
import { SucursalEntidad } from '../components/SucursalEntidad/SucursalEntidad';
// import  from '../components/SucursalEntidad/SucursalEntidad';

const routes = [
  { path: '/auditoria', element: <AuditoriaScreen /> },
  { path: '/roles', element: <RolesScreen /> },
  { path: '/administracion_usuarios', element: <AdministracionPersonasScreen /> },
  { path: '/delegacion_superusuario', element: <DelegacionSuperuserScreen /> },
  { path: '/sucursal_entidad', element: <SucursalEntidad /> },

];
export const SeguridadRoutes: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      <Route path="configuraciones_basicas/*" element={<ConfiguracionesBasicasRoutes />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
