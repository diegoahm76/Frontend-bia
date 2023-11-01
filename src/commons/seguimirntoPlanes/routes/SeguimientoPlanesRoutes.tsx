import { Route, Routes } from 'react-router-dom';
import { PGARRoutes } from '../PGAR/router/PGARRoutes';
import { Page404 } from '../../../screens/404';


const routes = [
  {
    path: 'pgar/',
    name: 'pgar',
    component: () => <PGARRoutes />,
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