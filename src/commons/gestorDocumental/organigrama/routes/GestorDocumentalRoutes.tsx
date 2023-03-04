import { Route, Routes, Navigate } from 'react-router-dom';
import { TrdScreen } from '../screens/TrdScreen';
import { CcdScreen } from '../screens/CcdScreen';
import { CrearOrganigramaScreen } from '../screens/CrearOrganigramaScreen';
import { EditarOrganigramaScreen } from '../screens/EditarOrganigramaScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GestorDocumentalRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="organigrama">
        <Route path="ccd" />
        <Route path="crear-organigrama" element={<CrearOrganigramaScreen />} />
        <Route
          path="editar-organigrama"
          element={<EditarOrganigramaScreen />}
        />
      </Route>
      <Route path="ccd" element={<CcdScreen />} />
      <Route path="trd" element={<TrdScreen />} />

      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
