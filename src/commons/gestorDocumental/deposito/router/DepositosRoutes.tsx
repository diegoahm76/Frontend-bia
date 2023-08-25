import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import DepositoScreen from '../screens/depositoScreen';
import { EstantesScreen } from '../Estantes/screens/EstantesScreen';
import { UserProvider } from '../Estantes/context/context';
import AdministrarBandejaScreen from '../AdministracionBandeja/screens/administracionBandejaScreen';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const DepositosRoutes = (): ReactElement => {
  return (
    <UserProvider>
      <Routes>
        <Route path="depositos/*" element={<DepositoScreen />} />
        <Route path="estantes/*" element={<EstantesScreen />} />
        <Route path="administrar_bandeja/*" element={<AdministrarBandejaScreen />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </UserProvider>
  );
};
