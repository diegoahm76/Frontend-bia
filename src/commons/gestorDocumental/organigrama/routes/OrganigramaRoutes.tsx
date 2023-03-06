import { Route, Routes, Navigate } from 'react-router-dom';
import { CrearOrganigramaScreen } from '../screens/CrearOrganigramaScreen';
import { EditarOrganigramaScreen } from '../screens/EditarOrganigramaScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const OrganigramaRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="crear-organigrama" element={<CrearOrganigramaScreen />} />
      <Route path="editar-organigrama" element={<EditarOrganigramaScreen />} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
