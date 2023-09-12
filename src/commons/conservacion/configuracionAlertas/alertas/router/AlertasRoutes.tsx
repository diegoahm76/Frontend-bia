import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../../screens/404';
import { ConfiguracionAlertasScreen } from '../screen/ConfiguracionAlertasScreen';
import { UserProvider } from '../context/contextData';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AlertasConservacionRoutes = (): ReactElement => {
  return (
    <UserProvider>
      <Routes>
        <Route
          path="configuracion_alertas/*"
          element={<ConfiguracionAlertasScreen />}
        />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </UserProvider>
  );
};
