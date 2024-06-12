import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { MainViewPanelVentanilla } from '../screen/MainViewPanelVentanilla';
import { AsignacionUsuarioScreen } from '../module/entrega99/screen/AsignacionUsuarioScreen';
import { PanelVentanillaProvider } from '../context/PanelVentanillaContext';
import { ModalAndLoadingProvider } from '../../../../context/GeneralContext';
import { VistaPqr } from '../module/entrega98_101/components/vistaPqr/VistaPqr';
import { VistaComplemento } from '../module/entrega98_101/components/vistaComplemento/VistaComplemento';
import { MainAsigGrupoScreen } from '../module/entrega102/screen/MainAsigGrupoScreen';
import { AsignacionGrupoProvider } from '../module/entrega102/context/AsignacionGrupoContext';
import { SolicitudAlUsuarioProvider } from '../module/entrega99/context/SolicitudUsarioContext';
import { MainAsigGrupoOpaScreen } from '../module/entrega122GrupoOpa/screen/MainAsigGrupoOpaScreen';
import { AsignacionGrupoOpaProvider } from '../module/entrega122GrupoOpa/context/AsignacionGrupoOpaContext';
import { AsignacionGrupoTramiteProvider } from '../module/entrega125GrupoTramite/context/AsignacionGrupoTramiteContext';
import { MainAsigGrupoTramiteScreen } from '../module/entrega125GrupoTramite/screen/MainAsigGrupoTramiteScreen';
import { ExpeAutoDeInicioTram } from '../module/expedientes/expeAutoInicioTramite/screen/ExpeAutoInicioTra';
import { AutoInicioProvider } from '../module/expedientes/expeAutoInicioTramite/context/ExpedienteContext';

const routes = [
  {
    path: '',
    name: '',
    component: () => <MainViewPanelVentanilla />,
  },
  {
    path: 'asignar_a_usario/',
    component: () => (
      <>
        <SolicitudAlUsuarioProvider>
          <AsignacionUsuarioScreen />
        </SolicitudAlUsuarioProvider>
      </>
    ),
  },
  {
    path: 'asignar_a_grupo/',
    component: () => (
      <>
        <AsignacionGrupoProvider>
          <MainAsigGrupoScreen />
        </AsignacionGrupoProvider>
      </>
    ),
  },
  {
    path: 'asignar_a_grupo_tramite_opa/',
    component: () => (
      <>
        <AsignacionGrupoOpaProvider>
          <MainAsigGrupoOpaScreen />
        </AsignacionGrupoOpaProvider>
      </>
    ),
  },
  {
    path: 'asignar_tramite_a_unidad/',
    component: () => (
      <>
        <AsignacionGrupoTramiteProvider>
          <MainAsigGrupoTramiteScreen />
        </AsignacionGrupoTramiteProvider>
      </>
    ),
  },

  //* van a venit posteriorment los modulos que desprenden de trámites y servicios y otros

  {
    path: 'pqr_info/:id',
    component: () => <VistaPqr />,
  },
  {
    path: 'complemento_info/:id',
    component: () => <VistaComplemento />,
  },
  {
    path: 'expediente_auto_inicio_tramite/',
    component: () => (
      <AutoInicioProvider>
        <ExpeAutoDeInicioTram />
      </AutoInicioProvider>
    ),
  },

  // tramite
  {
    path: '---',
    component: () => <></>,
  },
  // opa
  {
    path: '---',
    component: () => <></>,
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
