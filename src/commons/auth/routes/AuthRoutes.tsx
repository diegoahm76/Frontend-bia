import { Route, Routes } from 'react-router-dom';
import { LoginScreen, RegisterScreen } from '../screens';
import { Page404 } from '../../../screens/404';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth" />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
