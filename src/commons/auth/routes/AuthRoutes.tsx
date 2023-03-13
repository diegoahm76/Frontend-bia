<<<<<<< HEAD
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginScreen, RegisterScreen} from '../screens';
import { RecuperarContraseñaScreen } from '../screens/RecuperarContraseñaScreen';
import {DesbloqueoDeUsuarioScreen } from '../screens/DesbloqueoDeUsuarioScreen';
=======
import { Route, Routes } from 'react-router-dom';
import { LoginScreen, RegisterScreen } from '../screens';
import { Page404 } from '../../../screens/404';
>>>>>>> main

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth" />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
<<<<<<< HEAD
      <Route path="/recuperar_contrasena" element={<RecuperarContraseñaScreen />} />
      <Route path="/desbloqueo_usuario" element={<DesbloqueoDeUsuarioScreen/>} />
      <Route path="/*" element={<Navigate to={'/auth/login'} />} />
=======
      <Route path="/*" element={<Page404 />} />
>>>>>>> main
    </Routes>
  );
};
