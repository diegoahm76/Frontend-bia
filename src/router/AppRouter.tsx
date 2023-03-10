import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { type AuthSlice } from '../commons/auth/interfaces';
import { AuthRoutes } from '../commons/auth/routes/AuthRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { ProtectedRoutes } from './ProtectedRoutes';
import { PublicRoutes } from './PublicRoutes';
import { CheckingAuth } from '../commons/auth/components/CheckingAuth';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AppRouter: React.FC = () => {
  const { status } = useSelector((state: AuthSlice) => state.auth);

  if (status === 'checking') {
    return <CheckingAuth />;
  }

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

      <Route path="/*" element={<Navigate to="auth/login" />} />
    </Routes>
  );
};
