import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../commons/auth/routes/AuthRoutes';
import { Page404 } from '../screens/404';
import { PrivateRoutes } from './PrivateRoutes';
import { ProtectedRoutes } from './ProtectedRoutes';
import { PublicRoutes } from './PublicRoutes';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Login */}
      <Route
        path="auth/*"
        element={
          <PublicRoutes>
            <AuthRoutes />
          </PublicRoutes>
        }
      />

      {/* Rutas protegidas */}
      <Route
        path="app/*"
        element={
          <PrivateRoutes>
            <ProtectedRoutes />
          </PrivateRoutes>
        }
      />

      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
