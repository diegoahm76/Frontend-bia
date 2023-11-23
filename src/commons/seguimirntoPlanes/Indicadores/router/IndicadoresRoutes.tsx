/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProviderIndicador } from '../context/context';
import { IndicadoresScreen } from '../screen/IndicadoresScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const IndicadoresRoutes = (): ReactElement => {
  return (
    <UserProviderIndicador>
        <Routes>
          <Route path="planes/*" element={<IndicadoresScreen />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
    </UserProviderIndicador>
  );
};
