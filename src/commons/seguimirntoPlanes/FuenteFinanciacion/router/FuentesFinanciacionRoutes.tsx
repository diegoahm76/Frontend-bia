/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProviderFuentesFinanciacion } from '../context/context';
import { FuentesScreen } from '../screen/FuentesScreen';
import { UserProviderIndicador } from '../../Indicadores/context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FuentesRoutes = (): ReactElement => {
  return (
    <UserProviderFuentesFinanciacion>
      <UserProviderIndicador>
        <Routes>
          <Route path="poai/*" element={<FuentesScreen />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </UserProviderIndicador>
    </UserProviderFuentesFinanciacion>
  );
};
