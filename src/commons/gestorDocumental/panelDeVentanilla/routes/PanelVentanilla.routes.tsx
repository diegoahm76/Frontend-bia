import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { MainViewPanelVentanilla } from '../screen/MainViewPanelVentanilla';
import { AsignacionUsuarioScreen } from '../module/entrega99/screen/AsignacionUsuarioScreen';
import { PanelVentanillaProvider } from '../context/PanelVentanillaContext';
import { ModalAndLoadingProvider } from '../../../../context/GeneralContext';
import { VistaPqr } from '../module/entrega98/components/vistaPqr/VistaPqr';
import { VistaComplemento } from '../module/entrega98/components/vistaComplemento/VistaComplemento';

const routes = [
  {
    path: '',
    name: '',
    component: () => <MainViewPanelVentanilla />,
  },
  {
    path: 'asignar_a_usario/',
    component: () => <AsignacionUsuarioScreen />,
  },
  {
    path: 'asignar_a_grupo/',
    component: () => <>Módulo de asignación a grupo</>,
  },
  {
    path: 'pqr_info/:id',
    component: () => <VistaPqr />,
  },
  {
    path: 'complemento_info/:id',
    component: () => <VistaComplemento />,
  },
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PanelVentanillaRoutes: React.FC = () => {
  return (
    <ModalAndLoadingProvider>
      <PanelVentanillaProvider>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={`${route.path}/${route.path === '/' ? '' : '*'}`}
              // path={route.path}
              element={route.component()}
            />
          ))}
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </PanelVentanillaProvider>
    </ModalAndLoadingProvider>
  );
};
