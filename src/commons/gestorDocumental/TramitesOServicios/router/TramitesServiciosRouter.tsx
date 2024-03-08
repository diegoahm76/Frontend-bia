import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProvider } from '../../deposito/Estantes/context/context';
import { TramitesOServiciosScreen } from '../screens/TramitesOServiciosScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TramitesServiciosRouter = (): ReactElement => {
  return (
    <UserProvider>
      <Routes>
        <Route
          path="tramites_o_servicios/*"
          element={<TramitesOServiciosScreen />}
        />
        <Route
          path="respuesta_requerimiento_opa/*"
          element={<>Respuesta de requerimiento de una opa</>}
        />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </UserProvider>
  );
};