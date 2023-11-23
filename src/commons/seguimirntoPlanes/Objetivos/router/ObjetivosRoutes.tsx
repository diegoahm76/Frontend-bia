/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProviderObjetivo } from '../context/context';
import { UserProviderPlanes } from '../../Planes/context/context';
import { ObjetivosScreen } from '../screen/ObjetivosScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ObjetivosRoutes = (): ReactElement => {
  return (
    <UserProviderObjetivo>
      <UserProviderPlanes>
        <Routes>
          <Route path="planes/*" element={<ObjetivosScreen />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </UserProviderPlanes>
    </UserProviderObjetivo>
  );
};
