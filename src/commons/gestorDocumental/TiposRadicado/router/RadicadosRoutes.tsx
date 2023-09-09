import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { Siguiente } from '../screens/Siguiente';
import { Actual } from '../screens/Actual';
import { UserProvider } from '../context/context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RadicadosRoutes = (): ReactElement => {
  return (
    <UserProvider>
      <Routes>
        <Route path="actual/*" element={<Actual />} />
        <Route path="siguiente/*" element={<Siguiente />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </UserProvider>
  );
};
