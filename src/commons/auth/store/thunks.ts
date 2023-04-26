import { type Dispatch } from 'react';
import { api } from '../../../api/axios';
import { login_post, permissions_request } from '../request/authRequest';
import { type UserData } from '../interfaces/authModels';
import {
  checking_credentials,
  login,
  logout,
  open_dialog_entorno,
  open_dialog_representado,
  set_authenticated,
  set_permissions
} from './authSlice';

export const checking_authentication: (
  nombre_de_usuario: string,
  password: string
) => any = (nombre_de_usuario: string, password: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(checking_credentials());

    const { ok, data, error_message, is_blocked } = await login_post({
      nombre_de_usuario,
      password
    });
    // Se limpia los permisos que vienen del back
    if (data?.permisos !== undefined) {
      data.permisos.length = 0;
    }

    if (!ok) {
      dispatch(logout({ error_message, is_blocked }));
      return;
    }

    const { tokens } = data?.userinfo as UserData;

    localStorage.setItem('token', tokens.access);
    // Se establece el token en el header de las peticiones
    api.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${tokens.access}`;
        return config;
      },
      async (error) => {
        return await Promise.reject(error);
      }
    );

    // Validamos el tipo de persona y usario para mostrar u ocultar el dialog de entornos
    if (data?.userinfo.tipo_persona === 'J') {
      dispatch(get_persmisions_user(data?.userinfo.id_usuario, 'C'));
      dispatch(set_authenticated());
    } else if (
      data?.userinfo.tipo_persona === 'N' &&
      data?.userinfo.tipo_usuario === 'I'
    ) {
      // para este caso mostramos el dialog
      dispatch(open_dialog_entorno());

      // Agregar validacion de N y E, debe mostrar dialog de seleccion de representante sin seleccion de entorno
    } else if (
      data?.userinfo.tipo_persona === 'N' &&
      data?.userinfo.tipo_usuario === 'E'
    ) {
      dispatch(open_dialog_representado());
    }

    // Enviamos los datos del usuario al store del login
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

    dispatch(
      set_permissions(
        resp.data?.map((e) => {
          e.expanded = false;
          e.menus.map((i) => {
            i.expanded = false;
            i.modulos.map((o) => {
              o.expanded = false;
              return o;
            });
            return i;
          });
          return e;
        })
      )
    );
  };
};
