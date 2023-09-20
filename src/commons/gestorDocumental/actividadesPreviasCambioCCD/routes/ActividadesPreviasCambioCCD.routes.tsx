/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react'
import { Page404 } from '../../../../screens/404';
import { Route, Routes } from 'react-router-dom';

interface RouteType {
  path: string;
  element: () => JSX.Element;
}
export const ActividadesPreviasCambioCCDRoutes = () => {
  const routes: RouteType[] = [
    {
      path: '/homologacion_secciones_persistentes',
      element: () => <>
        <div>homologacion_secciones_persistentes</div>
      </>
    },
    {
      path: '/asignaciones_unidades_responsables',
      element: () => <>
        <div>asignaciones_unidades_responsables_ccd</div>
      </>
    },
    {
      path: '/delegacion_oficinas_responsables_expedientes',
      element: () => <>
        <div>delegacion_oficinas_responsables_expedientes_ccd</div>
      </>
    },
    {
      path: '/*',
      element: () => <Page404 />
    },
  ];
  return (
    <Routes>
    {routes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element()} />
    ))}
    </Routes>
  )
}
