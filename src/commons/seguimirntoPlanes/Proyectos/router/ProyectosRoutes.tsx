/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProviderProyectos } from '../context/context';
import { ProyectosScreen } from '../screen/ProyectosScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProyectosRoutes = (): ReactElement => {
  return (
    <UserProviderProyectos>
        <Routes>
          <Route path="planes/*" element={<ProyectosScreen />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
    </UserProviderProyectos>
  );
};
