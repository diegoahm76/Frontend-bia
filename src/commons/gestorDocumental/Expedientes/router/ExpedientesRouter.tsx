import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import CierreExpedientesScreen from '../cierreExpediente/screen/CierreExpedientesScreen';
import { UserProvider } from '../../deposito/Estantes/context/context';
import { AperturaExpedientesScreen } from '../aperturaExpedientes/screens/AperturaExpedientesScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ExpedientesRoutes = (): ReactElement => {
  return (
    <UserProvider>
      <Routes>
        <Route
          path="cierre_expedientes/*"
          element={<CierreExpedientesScreen />}
        />
        <Route
          path="apertura_expedientes/*"
          element={<AperturaExpedientesScreen />}
        />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </UserProvider>
  );
};
