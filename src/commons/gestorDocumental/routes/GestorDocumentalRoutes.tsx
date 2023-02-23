import { Route, Routes, Navigate } from 'react-router-dom';
import { TrdScreen } from '../screens/TrdScreen';
import { CrearOrganigramaScreen } from '../screens/CrearOrganigramaScreen';
import { EdicionOrganigramaScreen } from '../screens/EdicionOrganigramaScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GestorDocumentalRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="organigrama">
        <Route path="trd" element={<TrdScreen />} />
        <Route path="crear-organigrama" element={<CrearOrganigramaScreen />} />
        <Route
          path="editar-organigrama"
          element={<EdicionOrganigramaScreen />}
        />
      </Route>

      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
