import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { InstrumentosScreen } from '../screen/InstrumentosScreen';
import { UserProvider } from '../context/contextData';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InstrumentosRoutes = (): ReactElement => {
  return (
    <UserProvider>
      <Routes>
        <Route
          path="registro/*"
          element={<InstrumentosScreen />}
        />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </UserProvider>
  );
};
