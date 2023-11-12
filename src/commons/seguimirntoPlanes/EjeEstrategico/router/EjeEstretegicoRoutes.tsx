/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProviderEjeEstrategico } from '../context/context';
import { EjeEstrategicoScreen } from '../screen/EjeEstrategicoScreen';
import { UserProviderPlanes } from '../../Planes/context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EjeEstretegicoRoutes = (): ReactElement => {
  return (
    <UserProviderEjeEstrategico>
      <UserProviderPlanes>
        <Routes>
          <Route path="eje_estrategico/*" element={<EjeEstrategicoScreen />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </UserProviderPlanes>
    </UserProviderEjeEstrategico>
  );
};
