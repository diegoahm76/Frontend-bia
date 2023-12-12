/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProviderBanco } from '../context/context';
import { UserProviderIndicador } from '../../Indicadores/context/context';
import { BancosScreen } from '../screen/BancosScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BancosRoutes = (): ReactElement => {
  return (
    <UserProviderBanco>
      <UserProviderIndicador>
        <Routes>
          <Route path="proyecto/*" element={<BancosScreen />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </UserProviderIndicador>
    </UserProviderBanco>
  );
};
