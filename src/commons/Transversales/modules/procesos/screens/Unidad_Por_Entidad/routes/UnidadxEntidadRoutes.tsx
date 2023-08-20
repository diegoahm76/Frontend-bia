/* eslint-disable @typescript-eslint/naming-convention */
import { Route, Routes } from 'react-router-dom';
import { type FC } from 'react';
import { Page404 } from '../../../../../../../screens/404';
import { ScreenUxE } from '../screen/ScreenUxE';

const routes = [
  { path: '/', element: <ScreenUxE /> },
  { path: '/validaciones', element: <>Validaciones</> }
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
