import { type Dispatch } from 'react';
import { login_post, permissions_request } from '../request/authRequest';
import {
  checking_credentials,
  login,
  logout,
  set_permissions,
} from './authSlice';

export const checking_authentication: (
  email: string,
  password: string
) => any = (email: string, password: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(checking_credentials());

    const { ok, data, error_message } = await login_post({ email, password });
    if (!ok) {
      dispatch(logout({ error_message }));
      return;
    }

    dispatch(login(data));
  };
};

export const get_persmisions_user: (
  id_usuario: number,
  tipo_entorno: string
) => any = (id_usuario: number, tipo_entorno: string) => {
  return async (dispatch: Dispatch<any>) => {
    const resp = await permissions_request(id_usuario, tipo_entorno);
    // podemos enviar mensaje de error al dispatch
    if (!resp.ok) {
      // Agregar dispatch de error
      dispatch(logout({ error_message: resp.error_message }));
      return;
    }

    dispatch(set_permissions(resp.data));
  };
};
