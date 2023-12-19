/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { ConsultarPlanesScreen } from '../screen/ConsultarPlanesScreen';
import { UserProviderConsultarPlanes } from '../context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultarPlanesRoutes = (): ReactElement => {
  return (
    <UserProviderConsultarPlanes>
      <Routes>
        <Route path="consultar/*" element={<ConsultarPlanesScreen />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </UserProviderConsultarPlanes>
  );
};
