import { type Dispatch } from 'react';
import { login_post, permissions_request } from '../request/authRequest';
import {
  checking_credentials,
  login,
  logout,
  open_dialog_entorno,
  set_authenticated,
  set_permissions
} from './authSlice';

export const checking_authentication: (
  nombre_de_usuario: string,
  password: string
) => any = (nombre_de_usuario: string, password: string) => {
  return async (dispatch: Dispatch<any>) => {
    
    dispatch(checking_credentials());

    const { ok, data, error_message } = await login_post({
      nombre_de_usuario,
      password
    });
    if (!ok) {
      dispatch(logout({ error_message }));
      return;
    }

    if (
      data?.userinfo.tipo_persona === 'J' ||
      (data?.userinfo.tipo_persona === 'N' &&
        data?.userinfo.tipo_usuario === 'E')
    ) {
      dispatch(get_persmisions_user(data?.userinfo.id_usuario, 'C'));
      dispatch(set_authenticated());
    } else if (
      data?.userinfo.tipo_persona === 'N' &&
      data?.userinfo.tipo_usuario === 'I'
    ) {
      // para este caso mostramos el dialog
      dispatch(open_dialog_entorno());
    }

    // if(data)

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
