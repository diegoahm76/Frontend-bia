import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { OrganigramaScreen } from '../screens/OrganigramaScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const OrganigramaRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="crear/*" element={<OrganigramaScreen />} />
      <Route
        path="cambio_organigrama_actual/*"
        element={<OrganigramaScreen />}
      />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
