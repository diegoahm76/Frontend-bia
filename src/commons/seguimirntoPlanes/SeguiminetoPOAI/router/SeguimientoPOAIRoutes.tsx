/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProviderIndicador } from '../../Indicadores/context/context';
import { SeguimientoPOAIScreen } from '../screen/SeguimientoPOAIScreen';
import { UserProviderSeguimientoPOAI } from '../context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeguimientoPOAIRoutes = (): ReactElement => {
  return (
    <UserProviderSeguimientoPOAI>
      <UserProviderIndicador>
        <Routes>
          <Route path="poai/*" element={<SeguimientoPOAIScreen />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </UserProviderIndicador>
    </UserProviderSeguimientoPOAI>
  );
};
