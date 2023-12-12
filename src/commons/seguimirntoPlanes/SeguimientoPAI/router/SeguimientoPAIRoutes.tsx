/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProviderSeguimientoPAI } from '../context/context';
import { SeguimientoPAIScreen } from '../screen/SeguimientoPAIScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeguimientoPAIRoutes = (): ReactElement => {
  return (
    <UserProviderSeguimientoPAI>
      <Routes>
        <Route path="pai/*" element={<SeguimientoPAIScreen />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </UserProviderSeguimientoPAI>
  );
};
