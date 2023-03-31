import { Route, Routes } from 'react-router-dom';
import { LoginScreen, RegisterScreen } from '../screens';
import { RecuperarContrasenaScreen } from '../screens/RecuperarContrasenaScreen';
import { DesbloqueoDeUsuarioScreen } from '../screens/DesbloqueoDeUsuarioScreen';
import { ConfirmarCuentaScreen } from '../screens/ConfirmarCuentaScreen';
import { CambiarContrasenaScreen } from '../screens/CambiarContrasenaScreen';

import { Page404 } from '../../../screens/404';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth" />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route
        path="/recuperar_contrasena"
        element={<RecuperarContrasenaScreen />}
      />
      <Route path="/cambiar_contrasena" element={<CambiarContrasenaScreen />} />
      <Route
        path="/desbloqueo_usuario"
        element={<DesbloqueoDeUsuarioScreen />}
      />
      <Route path="/activacion_cuenta" element={<ConfirmarCuentaScreen />} />

      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
