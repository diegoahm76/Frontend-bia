/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProviderAdquisiciones } from '../context/context';
import { PlanAdquisicionesScreen } from '../screen/PlanAdquisicionesScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PlanAdquisicionesRoutes = (): ReactElement => {
  return (
    <UserProviderAdquisiciones>
      <Routes>
        <Route path="adquisiciones/*" element={<PlanAdquisicionesScreen />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </UserProviderAdquisiciones>
  );
};
