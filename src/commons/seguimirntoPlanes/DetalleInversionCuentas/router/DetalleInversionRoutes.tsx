/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProviderDetalleInversion } from '../context/context';
import { DetalleInversionScreen } from '../screen/DetalleInversionScreen';
import { UserProviderIndicador } from '../../Indicadores/context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DetalleInversionRoutes = (): ReactElement => {
  return (
    <UserProviderDetalleInversion>
      <UserProviderIndicador>
        <Routes>
          <Route path="cuentas/*" element={<DetalleInversionScreen />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </UserProviderIndicador>
    </UserProviderDetalleInversion>
  );
};
