import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginScreen, RegisterScreen} from '../screens';
import { RecuperarContraseñaScreen } from '../screens/RecuperarContraseñaScreen';
import {DesbloqueoDeUsuarioScreen } from '../screens/DesbloqueoDeUsuarioScreen';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/recuperar_contrasena" element={<RecuperarContraseñaScreen />} />
      <Route path="/desbloqueo_usuario" element={<DesbloqueoDeUsuarioScreen/>} />
      <Route path="/*" element={<Navigate to={'/auth/login'} />} />
    </Routes>
  );
};
