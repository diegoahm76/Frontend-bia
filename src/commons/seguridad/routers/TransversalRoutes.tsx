/* eslint-disable @typescript-eslint/naming-convention */
import { Route, Routes } from 'react-router-dom';
import {
  ActualizacionDatosRestringidosScreen,
  AdminUsuariosScreen,
} from '../screens';
import { Page404 } from '../../../screens/404';
import { NotificacionPage } from '../screens/NotificacionPage';
import { VinculacionColaboradoresRoutes } from '../screens/vinculacionColaboradores/routes/VinculacionColaboradores';


const routes = [
  { path: '/datos_restringidos', element: <ActualizacionDatosRestringidosScreen /> },
  { path: '/administracion_personas', element: <AdminUsuariosScreen /> },
  { path: '/autorizacion_notificacion', element: <NotificacionPage /> },
];
export const TransversalRoutes: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      <Route path="vinculacion_colaboradores/*" element={<VinculacionColaboradoresRoutes />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
