/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProviderMetas } from '../context/context';
import { MetasScreen } from '../screen/MetasScreen';
import { UserProviderIndicador } from '../../Indicadores/context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MetasRoutes = (): ReactElement => {
  return (
    <UserProviderMetas>
      <UserProviderIndicador>
        <Routes>
          <Route path="indicador/*" element={<MetasScreen />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </UserProviderIndicador>
    </UserProviderMetas>
  );
};
