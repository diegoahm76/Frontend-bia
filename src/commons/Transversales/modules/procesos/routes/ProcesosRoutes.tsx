/* eslint-disable @typescript-eslint/naming-convention */
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../../screens/404';
import { OrganigramaScreen } from '../../../../gestorDocumental/organigrama/screens/OrganigramaScreen';
import { Unidad_A_Unidad } from '../screens/Unidad_A_Unidad/screen/Unidad_A_Unidad';
import { ContextUnidadxEntidadProvider } from '../screens/Unidad_Por_Entidad/context/ContextUnidadxEntidad';
import { type FC } from 'react';
import { PruebaScreen } from '../screens/Unidad_Por_Entidad/screen/pruebaScreen';

const routes = [
  {
    path: '/traslado_masivo_unidad_organizacional',
    element: <PruebaScreen />
  },
  { path: '/traslado_masivo_unidad_a_unidad', element: <Unidad_A_Unidad /> },
  { path: '/cambio_organigrama_actual', element: <OrganigramaScreen /> }
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
