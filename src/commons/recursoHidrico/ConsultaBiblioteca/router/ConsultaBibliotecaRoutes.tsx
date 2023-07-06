import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProvider } from '../context/contextData';
import { ConsultaBibliotecaSreen } from '../screen/ConsultaBibliotecaSreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultaBibliotecaRoutes = (): ReactElement => {
  return (
    <UserProvider>
      <Routes>
        <Route path="biblioteca/*" element={<ConsultaBibliotecaSreen />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </UserProvider>
  );
};
