/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProviderPrograma } from '../context/context';
import { UserProviderPlanes } from '../../Planes/context/context';
import { ProgramasScreen } from '../screen/ProgramasScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProgramasRoutes = (): ReactElement => {
  return (
    <UserProviderPrograma>
      <UserProviderPlanes>
        <Routes>
          <Route path="planes/*" element={<ProgramasScreen />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </UserProviderPlanes>
    </UserProviderPrograma>
  );
};
