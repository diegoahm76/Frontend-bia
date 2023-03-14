import { Route, Routes, Navigate } from 'react-router-dom';
import { CcdScreen } from '../screens/CcdScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CcdRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="ccd" element={<CcdScreen />} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
