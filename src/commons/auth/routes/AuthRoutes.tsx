/* eslint-disable @typescript-eslint/naming-convention */
/* import { Route, Routes } from 'react-router-dom';
import { LoginScreen, RegisterScreen } from '../screens';
import { RecuperarContrasenaScreen } from '../screens/RecuperarContrasenaScreen';
import { DesbloqueoDeUsuarioScreen } from '../screens/DesbloqueoDeUsuarioScreen';
import { ConfirmarCuentaScreen } from '../screens/ConfirmarCuentaScreen';
import { CambiarContrasenaScreen } from '../screens/CambiarContrasenaScreen';
import { RecuperarUsuario } from '../screens/RecuperarUsuarioScreen';

import { Page404 } from '../../../screens/404';

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
      <Route path="/recuperar_usuario" element={<RecuperarUsuario />} />
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
*/

import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Page404 } from '../../../screens/404';
import { Loader } from '../../../utils/Loader/Loader';
import { PagosEnLineaScreen } from '../screens/PagosEnLineaScreen';

const LoginScreen = lazy(async () => {
  const module = await import('../screens/LoginScreen');
  return { default: module.LoginScreen };
});

const RegisterScreen = lazy(async () => {
  const module = await import('../screens/RegisterScreen');
  return { default: module.RegisterScreen };
});

const RecuperarContrasenaScreen = lazy(async () => {
  const module = await import('../screens/RecuperarContrasenaScreen');
  return { default: module.RecuperarContrasenaScreen };
});

const DesbloqueoDeUsuarioScreen = lazy(async () => {
  const module = await import('../screens/DesbloqueoDeUsuarioScreen');
  return { default: module.DesbloqueoDeUsuarioScreen };
});

const ConfirmarCuentaScreen = lazy(async () => {
  const module = await import('../screens/ConfirmarCuentaScreen');
  return { default: module.ConfirmarCuentaScreen };
});

const CambiarContrasenaScreen = lazy(async () => {
  const module = await import('../screens/CambiarContrasenaScreen');
  return { default: module.CambiarContrasenaScreen };
});

const RecuperarUsuario = lazy(async () => {
  const module = await import('../screens/RecuperarUsuarioScreen');
  return { default: module.RecuperarUsuario };
});

const CrearPqrsdfScreen = lazy(async () => {
  const module = await import(
    '../../gestorDocumental/PQRSDF/screens/CrearPqrsdfScreen'
  );
  return { default: module.CrearPqrsdfScreen };
});
export const AuthRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/auth" />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route
          path="/recuperar_contrasena"
          element={<RecuperarContrasenaScreen />}
        />
        <Route path="/recuperar_usuario" element={<RecuperarUsuario />} />
        <Route
          path="/cambiar_contrasena"
          element={<CambiarContrasenaScreen />}
        />
        <Route
          path="/desbloqueo_usuario"
          element={<DesbloqueoDeUsuarioScreen />}
        />
        <Route path="/crear_pqrsdf" element={<CrearPqrsdfScreen />} />
        <Route path="/pagos_online" element={<PagosEnLineaScreen />} />
        <Route path="/activacion_cuenta" element={<ConfirmarCuentaScreen />} />

        <Route path="/*" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
};
