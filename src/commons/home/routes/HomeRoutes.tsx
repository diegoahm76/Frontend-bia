import { Route, Routes, Navigate } from 'react-router-dom';
import { HomeScreen } from '../screens/HomeScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HomeRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />

      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
