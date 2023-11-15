/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RubrosScreen } from '../screen/RubrosScreen';
import { UserProviderRubros } from '../context/context';
import { Page404 } from '../../../../../screens/404';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RubrosRoutes = (): ReactElement => {
  return (
    <UserProviderRubros>
      <Routes>
        <Route path="planes/*" element={<RubrosScreen />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </UserProviderRubros>
  );
};
