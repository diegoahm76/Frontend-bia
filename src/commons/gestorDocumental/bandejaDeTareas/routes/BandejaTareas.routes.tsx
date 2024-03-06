import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { ModalAndLoadingProvider } from '../../../../context/GeneralContext';
import { MainViewBandejaTareas } from '../screen/MainViewBandejaTareas';
import { RequerimientoUsuarioScreen } from '../modules/requerimientosUsuario/screen/RequerimientoUsuarioScreen';
import { BandejaTareasProvider } from '../mainModule/context/BandejaTareasContext';
import { VistaTareaPqrsdf } from '../mainModule/bandejaDeTareas/components/bandejaDeTareas/components/vistaAtoms/VistaTareaPqrsdf';
import { RequerimientoAlUsuarioProvider } from '../modules/requerimientosUsuario/context/RequerimientoUsarioContext';
import { ReasignacionProvider } from '../modules/reasignaciones/context/ReasignacionContext';
import { MainReasignacionesScreen } from '../modules/reasignaciones/screen/MainReasignacionesScreen';
import { VistaComplementoTarea } from '../mainModule/bandejaDeTareas/components/bandejaDeTareas/components/vistaAtoms/VistaComplementoTarea';
import { MainScreenSeguimientoTarea } from '../modules/seguimientoTarea/screen/MainScreenSeguimientoTarea';
import { VistaTareasOtros } from '../mainModule/bandejaDeTareas/components/bandejaDeTareas/components/vistaAtoms/otros/VistaTareasOtros';
import { VistaTareasTramites } from '../mainModule/bandejaDeTareas/components/bandejaDeTareas/components/vistaAtoms/tramites/VistaTareaTramites';
import { VistaTareasOpas } from '../mainModule/bandejaDeTareas/components/bandejaDeTareas/components/vistaAtoms/opas/VistaTareasOpas';

const routes = [
  {
    path: '',
    name: '',
    component: () => <MainViewBandejaTareas />,
  },
  {
    path: 'requerimiento_a_usuario/',
    component: () => (
      <RequerimientoAlUsuarioProvider>
        <RequerimientoUsuarioScreen />
      </RequerimientoAlUsuarioProvider>
    ),
  },

  //* pendiente re asignaciones
  //* pendiente ruta a respuesta de pqrsdf
  {
    path: 'reasignacion_tarea/',
    component: () => (
      <>
        <ReasignacionProvider>
          <MainReasignacionesScreen />
        </ReasignacionProvider>
      </>
    ),
  },
  {
    path: 'seguimiento_tarea/',
    component: () => (
      <>
        <MainScreenSeguimientoTarea />
      </>
    ),
  },

  //* van a venit posteriorment los modulos que desprenden de trámites y servicios y otros
  {
    path: 'info_tarea/:id_PQRSDF',
    component: () => <VistaTareaPqrsdf />,
  },
  {
    path: 'info_complemento/:id_complemento_usu_pqr',
    component: () => <VistaComplementoTarea />,
  },

  // tarea de solicitude de otros
  {
    path: 'info_tarea_otros/:id_OTROS',
    component: () => <VistaTareasOtros />,
  },
  {
    path: 'info_tarea_tramite/:id_tramite',
    component: () => <VistaTareasTramites />,
  },
  {
    path: 'info_tarea_complemento_tramite/:idComplementoUsu_PQR',
    component: () => <VistaTareasTramites />,
  },
  {
    path: 'info_tarea_opas/:id_tramite',
    component: () => <VistaTareasOpas />,
  },


  //* respuesta y requerimiento opas
  {
    path: 'requerimiento_a_usuario_opas/',
    component: () => (
      <>
        <>Requirimiento opas</>
      </>
    ),
  },
  {
    path: 'respuesta_opas/',
    component: () => (
      <>
        <>Respuesta opas</>
      </>
    ),
  },
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BandejaTareasRoutes: React.FC = () => {
  return (
    <ModalAndLoadingProvider>
      <BandejaTareasProvider>
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
      </BandejaTareasProvider>
    </ModalAndLoadingProvider>
  );
};
