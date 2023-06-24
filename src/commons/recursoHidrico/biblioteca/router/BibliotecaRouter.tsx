import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { BibliotecaScreen } from '../screen/BibliotecaScreen';
import { UserProvider } from '../context/contextData';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BibliotecaRouter = (): ReactElement => {
  return (
    <UserProvider>
      <Routes>
        <Route
          path="registro_secion_sub_seccion/*"
          element={<BibliotecaScreen />}
        />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </UserProvider>
  );
};
