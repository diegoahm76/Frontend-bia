import { Route, Routes } from 'react-router-dom';
import { PlanesRoutes } from '../Planes/router/PlanesRoutes';
import { Page404 } from '../../../screens/404';
import { ConfiguracionesBasicasRoutes } from '../configuraciones/Routes/ConfiguracionesBasicasRoutes';
import { EjeEstretegicoRoutes } from '../EjeEstrategico/router/EjeEstretegicoRoutes';

const routes = [
  {
    path: 'informacion/',
    name: 'informacion',
    component: () => <PlanesRoutes />,
  },
  {
    path: 'eje/',
    name: 'eje',
    component: () => <EjeEstretegicoRoutes />,
  },
  {
    path: 'configuraciones_basicas/',
    name: 'configuraciones_basicas',
    component: () => <ConfiguracionesBasicasRoutes />,
  },
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeguimientoPlanesRoutes: React.FC = () => {
  return (
    // <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={`${route.path}/${route.path === '/' ? '' : '*'}`}
          element={route.component()}
        />
      ))}
      <Route path="/*" element={<Page404 />} />
    </Routes>
    // </Suspense>
  );
};
