import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { PGARScreen } from '../screen/PGARScreen';
// import { UserProvider } from '../context/contextData';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PGARRoutes = (): ReactElement => {
  return (
    // <UserProvider>
      <Routes>
        <Route
          path="informacion/*"
          element={<PGARScreen />}
        />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    // </UserProvider>
  );
};
