/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProviderSubprogramas } from '../context/context';
import { SubprogremasScreen } from '../screen/SubprogremasScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SubProgramasRoutes = (): ReactElement => {
  return (
    <UserProviderSubprogramas>
        <Routes>
          <Route path="programas/*" element={<SubprogremasScreen />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
    </UserProviderSubprogramas>
  );  
};
