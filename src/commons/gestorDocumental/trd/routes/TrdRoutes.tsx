import { Route, Routes, Navigate } from 'react-router-dom';
import { TrdScreen } from '../screens/TrdScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TrdRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="trd" element={<TrdScreen />} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
