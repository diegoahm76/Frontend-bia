import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { PorhMainScreen } from '../screen/PorhMainScreen/PorhMainScreen';
import { UserProvider } from '../context/contextData';
import { AvanceScreen } from '../screen/AvencesScreen/AvancesScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PorhRoutes = (): ReactElement => {
  return (
    <UserProvider>
    <Routes>
      <Route path="contenido_programatico/*" element={<PorhMainScreen/>} />
      <Route path="avances_proyectos/*" element={<AvanceScreen/>}/>
      <Route path="/*" element={<Page404 />} />
    </Routes>
    </UserProvider>
  );
};
