import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { MainViewPanelVentanilla } from '../screen/MainViewPanelVentanilla';
import { AsignacionUsuarioScreen } from '../module/entrega99/screen/AsignacionUsuarioScreen';
// import { ExpedientesRoutes } from '../Expedientes/router/ExpedientesRouter';

const routes = [
  {
    path: '',
    name: '',
    component: () => <MainViewPanelVentanilla />,
  },
  {
    path: '/*',
    component: () => <Page404 />,
  },
  {
    path: 'asignar_a_usario/',
    component: () => <AsignacionUsuarioScreen />,
  },
  {
    path: 'asignar_a_grupo/',
    component: () => <>Módulo de asignación a grupo</>,
  },
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PanelVentanillaRoutes: React.FC = () => {
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
