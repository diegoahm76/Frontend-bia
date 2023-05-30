/* eslint-disable @typescript-eslint/naming-convention */
import { Route, Routes } from 'react-router-dom';
import {
  ActualizacionDatosRestringidosScreen,
  AdminUsuariosScreen,
} from '../screens';
import { Page404 } from '../../../screens/404';
import { NotificacionPage } from '../screens/NotificacionPage';


const routes = [
  { path: '/personas/datos_personales_modificacion_restringida', element: <ActualizacionDatosRestringidosScreen /> },
  { path: '/personas/administracion_personas', element: <AdminUsuariosScreen /> },
  { path: '/personas/autorizacion_notificaciones_cuentas', element: <NotificacionPage /> },
];
export const TransversalRoutes: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
