/* eslint-disable @typescript-eslint/naming-convention */
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../screens/404';
import { VinculacionColaboradoresRoutes } from '../../seguridad/screens/vinculacionColaboradores/routes/VinculacionColaboradores';
import { NotificacionPage } from '../../seguridad/screens/NotificacionPage';
import { ActualizacionDatosRestringidosScreen, AdminUsuariosScreen } from '../../seguridad/screens';
import { ProcesosRoutes } from '../modules/procesos/routes/ProcesosRoutes';


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
      <Route path="procesos/*" element={<ProcesosRoutes />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
