import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { InstrumentosScreen } from '../screen/InstrumentosScreen';
import { UserProvider } from '../context/contextData';
import { CarteraAforosScreen } from '../screen/CarteraAforosScreen';
import { PruebasBombeoScreen } from '../screen/PruebasBombeoScreen';
import { RegistroLaboratorio } from '../screen/RegistroLaboratorio';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InstrumentosRoutes = (): ReactElement => {
  return (
    <UserProvider>
      <Routes>
        <Route
          path="registro/*"
          element={<InstrumentosScreen />}
        />
        <Route
          path="cartera_aforo/*"
          element={<CarteraAforosScreen />}
        />
        <Route
          path="resultado_laboratorio/*"
          element={<PruebasBombeoScreen />}
        />
        <Route
          path="prueba_bombeo/*"
          element={<RegistroLaboratorio />}
        />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </UserProvider>
  );
};
