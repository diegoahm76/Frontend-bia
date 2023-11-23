/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProviderActividades } from '../context/context';
import { ActividadesScreen } from '../screen/ActividadesScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ActividadesRoutes = (): ReactElement => {
  return (
    <UserProviderActividades>
        <Routes>
          <Route path="planes/*" element={<ActividadesScreen />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
    </UserProviderActividades>
  );
};
