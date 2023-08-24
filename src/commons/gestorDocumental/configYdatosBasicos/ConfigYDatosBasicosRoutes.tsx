/* eslint-disable @typescript-eslint/naming-convention */

//* libraries or frameworks
import { type FC } from 'react';
import { Route, Routes } from 'react-router-dom';

//* Components
import { Page404 } from '../../../screens/404';
import { AdmnistrarFormatos } from '../trd/components/CreacionDeFormatos/BusquedaFormatos/BusquedaFormatos';
import { DepositosRoutes } from '../deposito/router/DepositosRoutes';

interface RouteType {
  path: string;
  element: () => JSX.Element;
}

export const ConfigYDatosBasicosRoutes: FC = (): JSX.Element => {
  const routes: RouteType[] = [
    {
      path: '/admin-tipologias-documentales',
      element: () => <>modulo de administracion de TIPOLOGIAS documentales</>
    },
    {
      path: '/admin-formatos-documentales',
      element: () => <AdmnistrarFormatos />
    },
    {
      path: '/*',
      element: () => <Page404 />
    },
    {
      path: '/archivo/*',
      element: () => <DepositosRoutes />
    },
  ];

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element()} />
      ))}
    </Routes>
  );
};
