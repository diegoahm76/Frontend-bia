import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { UserProvider } from '../context/contextData';
import { AvanceScreen } from '../screen/AvencesScreen/AvancesScreen';
import { AccionesCorrectivasScreen } from '../../SeguimientoAccionesCorrectivas/screen/SeguimientoAccionesCorrectivasScreen';
import { UserProviderAccionCorrectiva } from '../../SeguimientoAccionesCorrectivas/context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AvancesRoutes = (): ReactElement => {
  return (
    <UserProvider>
    <Routes>
      <Route path="avances/*" element={<AvanceScreen/>} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
    </UserProvider>
  );
};
