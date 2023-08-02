/* eslint-disable @typescript-eslint/naming-convention */
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../../screens/404';
import { OrganigramaScreen } from '../../../../gestorDocumental/organigrama/screens/OrganigramaScreen';
import { TrasladoMasivoUnidadOrganizacional } from '../screens/TrasladoMasivoUnidadOrganizacional/screens/TrasladoMasivoUnidadOrganizacional';

const routes = [
  { path: '/traslado_masivo_unidad_por_entidad', element: <TrasladoMasivoUnidadOrganizacional/> },
  { path: '/traslado_masivo_unidad_a_unidad', element: <>Traslado masivo de unidad a unidad</> },
  { path: '/cambio_organigrama_actual', element: <OrganigramaScreen /> },
];

export const ProcesosRoutes: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};