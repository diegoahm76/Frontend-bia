import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { ModalAndLoadingProvider } from '../../../../context/GeneralContext';
import { MainViewBandejaTareas } from '../screen/MainViewBandejaTareas';
import { RequerimientoUsuarioScreen } from '../modules/requerimientosUsuario/screen/RequerimientoUsuarioScreen';
import { BandejaTareasProvider } from '../mainModule/context/BandejaTareasContext';
/*import { AsignacionUsuarioScreen } from '../module/entrega99/screen/AsignacionUsuarioScreen';
import { PanelVentanillaProvider } from '../context/PanelVentanillaContext';
import { VistaPqr } from '../module/entrega98_101/components/vistaPqr/VistaPqr';
import { VistaComplemento } from '../module/entrega98_101/components/vistaComplemento/VistaComplemento';
import { MainAsigGrupoScreen } from '../module/entrega102/screen/MainAsigGrupoScreen';
import { AsignacionGrupoProvider } from '../module/entrega102/context/AsignacionGrupoContext';
import { SolicitudAlUsuarioProvider } from '../module/entrega99/context/SolicitudUsarioContext';*/

const routes = [
  {
    path: '',
    name: '',
    component: () => <MainViewBandejaTareas />,
  },
  {
    path: 'requerimiento_a_usuario/',
    component: () => (
      <>
        <BandejaTareasProvider>
          <RequerimientoUsuarioScreen />
        </BandejaTareasProvider>
      </>
    ),
  },
  /*
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

  //* van a venit posteriorment los modulos que desprenden de trámites y servicios y otros

  {
    path: 'pqr_info/:id',
    component: () => <VistaPqr />,
  },
  {
    path: 'complemento_info/:id',
    component: () => <VistaComplemento />,
  },*/
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BandejaTareasRoutes: React.FC = () => {
  return (
    <ModalAndLoadingProvider>
      {/* <PanelVentanillaProvider>*/}
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
      {/*  </PanelVentanillaProvider>*/}
    </ModalAndLoadingProvider>
  );
};
