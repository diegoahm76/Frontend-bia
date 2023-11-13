import { Route, Routes } from 'react-router-dom';
import { PlanesRoutes } from '../Planes/router/PlanesRoutes';
import { Page404 } from '../../../screens/404';
import { ConfiguracionesBasicasRoutes } from '../configuraciones/Routes/ConfiguracionesBasicasRoutes';
import { EjeEstretegicoRoutes } from '../EjeEstrategico/router/EjeEstretegicoRoutes';
import { ObjetivosRoutes } from '../Objetivos/router/ObjetivosRoutes';
import { ProgramasRoutes } from '../Programas/router/ProgramasRoutes';
import { ProyectosRoutes } from '../Proyectos/router/ProyectosRoutes';

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
  {
    path: 'objetivos/',
    name: 'objetivos',
    component: () => <ObjetivosRoutes />,
  },
  {
    path: 'programas/',
    name: 'programas',
    component: () => <ProgramasRoutes />,
  },
  {
    path: 'proyectos/',
    name: 'proyectos',
    component: () => <ProyectosRoutes />,
  },
  {
    path: '/*',
    name: '404',
    component: () => <Page404 />,
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
