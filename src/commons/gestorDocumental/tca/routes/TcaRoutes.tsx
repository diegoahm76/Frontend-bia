/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/naming-convention */
import { Route, Routes } from 'react-router-dom';
import { TcaScreen } from '../screens/MainScreen/TcaScreen';
import { Page404 } from '../../../../screens/404';
import { AdminTcaScreen } from '../screens/SecondScreenAdminTca/AdminTcaScreen';

const routes = [
  {
    path: '/',
    element: <TcaScreen />
  },
  {
    path: '/administrar-tca',
    element: <AdminTcaScreen />
  },
  {
    path: '*',
    element: <Page404 />
  }
];

{
  /* añadir el modal provider para el tema de los modales usados dentro de este modulo  */
}
export const TcaRoutes: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
