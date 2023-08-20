/* eslint-disable @typescript-eslint/naming-convention */
import { Route, Routes } from 'react-router-dom';
import { type FC } from 'react';
import { Page404 } from '../../../../../../../screens/404';
import { U_X_E_no_validations } from '../screen/sinValidaciones/U_X_E_no_validations';
import { U_X_E_si_validaciones } from '../screen/conValidaciones/U_X_E_si_validaciones';

const routes = [
  { path: '/', element: <U_X_E_no_validations /> },
  { path: '/validaciones', element: <U_X_E_si_validaciones /> }
];

export const RoutesTrasladosUxE: FC = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
