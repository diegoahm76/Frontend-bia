/* eslint-disable @typescript-eslint/naming-convention */
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../screens/404';
import { VinculacionColaboradoresRoutes } from '../../seguridad/screens/vinculacionColaboradores/routes/VinculacionColaboradores';
import { NotificacionPage } from '../../seguridad/screens/NotificacionPage';
import {
  ActualizacionDatosRestringidosScreen,
  AdminUsuariosScreen,
} from '../../seguridad/screens';
import { ProcesosRoutes } from '../modules/procesos/routes/ProcesosRoutes';
import { ConfiguracionEntidad } from '../../seguridad/components/ConfiguracionEntidad/screens/configuracionEntidad';
import { CorporativoRoutes } from '../modules/corporativo/routes/CorporativoRoutes';
import { PantallaPrincipalAlertas } from '../modules/Alertas/screens/pantallaPrincipal';
import { ModalProviderLideres } from '../modules/corporativo/screens/LideresXUnidadOrg/context/ModalContextLideres';
import { Sucursal } from '../../seguridad/components/SucursalEntidad/Sucursal';
import { NotificacionesRoutes } from '../modules/notificaciones/routes/NotificacionesRoutes';
import { NotificacionesRoutes as CorrespondenciaRoutes } from '../modules/correspondencia/routes/NotificacionesRoutes';

const routes = [
  {
    path: '/datos_restringidos',
    element: <ActualizacionDatosRestringidosScreen />,
  },
  { path: '/administracion_personas', element: <AdminUsuariosScreen /> },
  { path: '/autorizacion_notificacion', element: <NotificacionPage /> },
  { path: '/configuracion_entidad', element: <ConfiguracionEntidad /> },
  { path: '/bandeja_alertas', element: <PantallaPrincipalAlertas /> },
  { path: '/sucursal_entidad', element: <Sucursal /> },
];
export const TransversalRoutes: React.FC = () => {
  return (
    <ModalProviderLideres>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route
          path="vinculacion_colaboradores/*"
          element={<VinculacionColaboradoresRoutes />}
        />
        <Route path="procesos/*" element={<ProcesosRoutes />} />
        <Route path="corporativo/*" element={<CorporativoRoutes />} />
        <Route path="notificaciones/*" element={<NotificacionesRoutes />} />
        <Route path="correspondencia/*" element={<CorrespondenciaRoutes />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </ModalProviderLideres>
  );
};
