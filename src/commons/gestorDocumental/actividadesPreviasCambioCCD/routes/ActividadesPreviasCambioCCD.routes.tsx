/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { Page404 } from '../../../../screens/404';
import { Route, Routes } from 'react-router-dom';
import { AsignacionUnidadesResponsables as AsignacionUnidadesResponsablesMainScreen } from '../modules/asignacionUnidadesResponsables/screen/AsignacionUniResp';
import { HomologacionDeSeccionesPersistentes as HomologacionDeSeccionesPersistentesMainScreen } from '../modules/homologacionDeSeccionesPersistentes/screen/HomologacionDeSeccionesPersistentes';
import { DelegacionOficinasResponsablesScreen } from '../modules/delegacionDeOficinasResponsables/screen/DelegacionOficinasResponsablesScreen';

interface RouteType {
  path: string;
  element: () => JSX.Element;
}
export const ActividadesPreviasCambioCCDRoutes = () => {
  const routes: RouteType[] = [
    {
      path: '/homologacion_secciones_persistentes',
      element: () => (
        <>
          <HomologacionDeSeccionesPersistentesMainScreen />
        </>
      ),
    },
    {
      path: '/asignaciones_unidades_responsables',
      element: () => (
        <>
          <AsignacionUnidadesResponsablesMainScreen />
        </>
      ),
    },
    {
      path: '/delegacion_oficinas_responsables_expedientes',
      element: () => (
        <>
          <DelegacionOficinasResponsablesScreen />
        </>
      ),
    },
    {
      path: '/*',
      element: () => <Page404 />,
    },
  ];
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element()} />
      ))}
    </Routes>
  );
};
