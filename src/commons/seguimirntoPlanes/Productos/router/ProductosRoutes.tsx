/* eslint-disable react/jsx-no-comment-textnodes */
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProviderProductos } from '../context/context';
import { ProductosScreen } from '../screen/ProductosScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProductosRoutes = (): ReactElement => {
  return (
    <UserProviderProductos>
        <Routes>
          <Route path="planes/*" element={<ProductosScreen />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
    </UserProviderProductos>
  );
};
