import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { AccionesCorrectivasScreen } from '../../SeguimientoAccionesCorrectivas/screen/SeguimientoAccionesCorrectivasScreen';
import { UserProviderAccionCorrectiva } from '../../SeguimientoAccionesCorrectivas/context/context';
import { GestionAccionesCorrectivas } from '../screen/GestionAccionesCorrectivas';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeguimientoControlRoutes = (): ReactElement => {
  return (
    <UserProviderAccionCorrectiva>
    <Routes>
      <Route path="acciones_correctivas/*" element={<AccionesCorrectivasScreen/>} />
      <Route path="gestionar_acciones_correctivas/*" element={<GestionAccionesCorrectivas/>} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
    </UserProviderAccionCorrectiva>
  );
};
