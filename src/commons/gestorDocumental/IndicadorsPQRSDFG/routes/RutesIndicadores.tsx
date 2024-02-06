import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { PantallaPindicadores } from '../screens/PantallaPindicadores';
import { PorcentajeProvider } from '../context/porcentasjesGraficas';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RutesIndicadores = (): ReactElement => {
  return (
    <PorcentajeProvider>
      <Routes>
        <Route
          path="/*"
          element={<PantallaPindicadores/>}
        />
        {/* <Route path="/*" element={<Page404 />} /> */}
      </Routes>
      </PorcentajeProvider>
  );
};