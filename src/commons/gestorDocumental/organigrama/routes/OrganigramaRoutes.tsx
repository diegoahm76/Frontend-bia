import { Route, Routes, Navigate } from 'react-router-dom';
import { OrganigramaScreen } from '../screens/OrganigramaScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const OrganigramaRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="crear" element={<OrganigramaScreen />} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
