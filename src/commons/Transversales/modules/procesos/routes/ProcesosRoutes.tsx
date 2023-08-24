/* eslint-disable @typescript-eslint/naming-convention */
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../../screens/404';
// import { OrganigramaScreen } from '../../../../gestorDocumental/organigrama/screens/OrganigramaScreen';
import { Unidad_A_Unidad } from '../screens/Unidad_A_Unidad/screen/Unidad_A_Unidad';
import { ContextUnidadxEntidadProvider } from '../screens/Unidad_Por_Entidad/context/ContextUnidadxEntidad';
import { type FC } from 'react';
import { U_X_E_Screen } from '../screens/Unidad_Por_Entidad/screen/sinValidaciones/U_X_E_Screen';
import DialogElegirOrganigramaActual from '../../../../gestorDocumental/organigrama/componentes/DialogElegirOrganigramaActual/DialogElegirOrganigramaActual';

const routes = [
  {
    path: '/traslado_masivo_unidad_organizacional/',
    element: <U_X_E_Screen />
  },
  { path: '/traslado_masivo_unidad_a_unidad/', element: <Unidad_A_Unidad /> },
  // { path: '/cambio_organigrama_actual', element: <OrganigramaScreen /> },
  {
    path: '/cambio-organigrama-actual',
    element: <DialogElegirOrganigramaActual />
  }
];

export const ProcesosRoutes: FC = () => {
  return (
    <ContextUnidadxEntidadProvider>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </ContextUnidadxEntidadProvider>
  );
};
