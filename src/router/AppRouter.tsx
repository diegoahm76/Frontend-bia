import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../commons/auth/routes/AuthRoutes';
import { HomeRoutes } from '../commons/home/routes/HomeRoutes';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Login */}
      <Route path="auth/*" element={<AuthRoutes />} />
      {/* Dashboard */}
      <Route path="/*" element={<HomeRoutes />} />
    </Routes>
  );
};
