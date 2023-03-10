import { Route, Routes, Navigate } from 'react-router-dom';
import { SeguridadScreen } from '../screens/SeguridadScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeguridadRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SeguridadScreen />} />

      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
