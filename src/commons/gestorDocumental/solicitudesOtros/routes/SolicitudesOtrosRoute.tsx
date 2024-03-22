import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { SolicitudesOtroScreen } from '../screen/SolicitudesOtros';
import { CrearOtroScreen } from '../screen/CrearOtros';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SolicitudesOtrosRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SolicitudesOtroScreen />} />
      <Route path="crear/:id?" element={<CrearOtroScreen />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
