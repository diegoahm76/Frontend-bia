/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProviderConsultarPlanes } from '../context/context';
import { ConsultasScreen } from '../screen/ConsultasScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultasRoutes = (): ReactElement => {
  return (
    <UserProviderConsultarPlanes>
      <Routes>
        <Route path="consultar/*" element={<ConsultasScreen />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </UserProviderConsultarPlanes>
  );
};
