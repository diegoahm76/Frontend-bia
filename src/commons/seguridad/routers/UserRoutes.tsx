/* eslint-disable @typescript-eslint/naming-convention */
import { Route, Routes } from 'react-router-dom';

import { Page404 } from '../../../screens/404';
import { DatosPersonalesScreen } from '../screens/DatosPersonalesScreen';
import { DatosAccesoScreen } from '../screens/DatosAccesoScreen';
import { NotificacionPage } from '../screens/NotificacionPage';
import { IndicesElectronicos } from '../screens/IndicesElectronicos/IndicesElectronicos';
import { BiaGpt } from '../screens/BiaGpt/BiaGpt';

const routes = [
  { path: '/autorizacion_notificacion', element: <NotificacionPage /> },
  { path: '/datos_personales', element: <DatosPersonalesScreen /> },
  { path: '/datos_acceso', element: <DatosAccesoScreen /> },
  {
    path: '/chat/bia_gpt',
    element: <BiaGpt />,
  },

  { path: '/indices_electronicos', element: <IndicesElectronicos /> },
];
export const UserRoutes: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
