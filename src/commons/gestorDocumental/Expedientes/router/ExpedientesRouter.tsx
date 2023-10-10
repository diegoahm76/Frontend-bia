import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProvider } from '../CierreExpedientes/context/context';
import { CierreExpedientesDocumentalesScreen } from '../CierreExpedientes/screen/CierreExpedientesScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ExpedientesRoutes = (): ReactElement => {
  return (
    <UserProvider>
      <Routes>
        <Route
          path="cierre_expedientes/*"
          element={<CierreExpedientesDocumentalesScreen />}
        />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </UserProvider>
  );
};
