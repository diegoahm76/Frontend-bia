/* eslint-disable @typescript-eslint/naming-convention */
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../../screens/404';
import { LideresXUnidadOrganizacionalMainScreen } from '../screens/LideresXUnidadOrg/screens/LideresXUnidadOrganizacionalMainScreen';

const routes = [
  {
    path: '/lideres_unidad_organizacional',
    element: <LideresXUnidadOrganizacionalMainScreen />
  }
];

export const CorporativoRoutes: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
