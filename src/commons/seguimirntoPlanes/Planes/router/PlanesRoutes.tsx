/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { PlanesScreen } from '../screen/PlanesScreen';
import { UserProviderPlanes } from '../context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PlanesRoutes = (): ReactElement => {
  return (
    <UserProviderPlanes>
      <Routes>
        <Route path="planes/*" element={<PlanesScreen />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </UserProviderPlanes>
  );
};
