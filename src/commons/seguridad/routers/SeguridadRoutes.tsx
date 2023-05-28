/* eslint-disable @typescript-eslint/naming-convention */
import { Route, Routes } from 'react-router-dom';
import {
  ActualizacionDatosRestringidosScreen,
  AdminUsuariosScreen,
  AdministracionPersonasScreen,
  RolesScreen
} from '../screens/';
import { Page404 } from '../../../screens/404';
import { AuditoriaScreen } from '../screens/AuditoriaScreen/AuditoriaScreen';
import { DelegacionSuperuserScreen } from '../screens/DelegacionSuperuserScreen';
import { DatosPersonalesScreen } from '../screens/DatosPersonalesScreen';
import { DatosAccesoScreen } from '../screens/DatosAccesoScreen';
import { NotificacionPage } from '../screens/NotificacionPage';


const routes = [
  { path: '/auditoria', element: <AuditoriaScreen /> },
  { path: '/roles', element: <RolesScreen /> },
  { path: '/datos_restringidos', element: <ActualizacionDatosRestringidosScreen /> },
  { path: '/administracion_usuarios', element: <AdminUsuariosScreen /> },
  { path: '/administracion_personas', element: <AdministracionPersonasScreen /> },
  { path: '/delegacion_superusuario', element: <DelegacionSuperuserScreen /> },
  { path: '/autorizacion_notificacion', element: <NotificacionPage /> },
  { path: '/datos_personales', element: <DatosPersonalesScreen /> },
  { path: '/datos_acceso', element: <DatosAccesoScreen /> },
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
