import { type Dispatch } from 'react';
import { api } from '../../../api/axios';
import { login_post, permissions_request } from '../request/authRequest';
import { type UserData } from '../interfaces/authModels';
import {
  change_entorno,
  checking_credentials,
  login,
  logout,
  open_dialog_entorno,
  open_dialog_representado,
  setRepresentacionLegal,
  set_authenticated,
  set_is_loading,
  set_permissions,
} from './authSlice';
import { RecentActorsOutlined } from '@mui/icons-material';
import { set_type_applicant } from '../../gestorDocumental/PQRSDF/store/slice/pqrsdfSlice';

export const checking_authentication: (
  nombre_de_usuario: string,
  password: string
) => any = (nombre_de_usuario: string, password: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(checking_credentials());

    const user_data = {
      nombre_de_usuario: nombre_de_usuario.trim(),
      password: password.trim(),
    };

    const { ok, data, error_message, is_blocked } = await login_post(user_data);
    // Se limpia los permisos que vienen del back
    if (data?.permisos !== undefined) {
      data.permisos.length = 0;
    }

    if (!ok) {
      dispatch(logout({ error_message, is_blocked }));
      return;
    }

    const { tokens } = data?.userinfo as UserData;

    sessionStorage.setItem('token', tokens.access);
    // Se establece el token en el header de las peticiones
    api.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${tokens.access}`;
        return config;
      },
      async (error) => {
        console.log(error);
        console.log('error en el interceptor');
      }
    );

    // Validamos el tipo de persona y usario para mostrar u ocultar el dialog de entornos
    if (data?.userinfo.tipo_persona === 'J') {
      dispatch(get_persmisions_user(data?.userinfo.id_usuario, 'C'));
      setTimeout(() => {
        // dispatch(open_dialog_representado());
        dispatch(set_authenticated());
      }, 1000);
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
      dispatch(get_persmisions_user(data?.userinfo.id_usuario, 'C'));
      dispatch(open_dialog_representado());
    }

    // Enviamos los datos del usuario al store del login
    dispatch(login(data));
  };
};

export const checking_anonimous_authentication: (
  nombre_de_usuario: string,
  password: string
) => any = (nombre_de_usuario: string, password: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(checking_credentials());

    const { ok, data, error_message, is_blocked } = await login_post({
      nombre_de_usuario,
      password,
    });
    // Se limpia los permisos que vienen del back
    if (data?.permisos !== undefined) {
      data.permisos.length = 0;
    }

    if (!ok) {
      // dispatch(logout({ error_message, is_blocked }));
      return;
    }

    const { tokens } = data?.userinfo as UserData;

    sessionStorage.setItem('token', tokens.access);
    // Se establece el token en el header de las peticiones
    api.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${tokens.access}`;
        return config;
      },
      async (error) => {
        console.log(error);
        console.log('error en el interceptor');
      }
    );

    dispatch(get_persmisions_user(data?.userinfo.id_usuario ?? 0, 'C'));

    // dispatch(set_authenticated());

    // Enviamos los datos del usuario al store del login
    console.log(data);
    dispatch(login(data));
    dispatch(
      setRepresentacionLegal({
        cod_relacion_con_el_titular: 'MP',
        tipo_sesion: 'E',
      })
    );
  };
};

export const get_persmisions_user: (
  id_usuario: number,
  tipo_entorno: string
) => any = (id_usuario: number, tipo_entorno: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(set_is_loading?.(true));
    const resp = await permissions_request(id_usuario, tipo_entorno);
    if (!resp.ok) {
      dispatch(logout({ error_message: resp.error_message }));
      return;
    }
    const permissions = resp.data?.map((e) => {
      return {
        ...e,
        hola: 'hola',
        expanded: false,
        menus: e.menus?.map((i) => {
          return {
            ...i,
            expanded: false,
            submenus: i.submenus?.map((o) => {
              return {
                ...o,
                expanded: false,
                submenus: o.submenus?.map((s) => {
                  return {
                    ...s,
                    expanded: false,
                    modulos: s.modulos?.map((m) => {
                      return {
                        ...m,
                        expanded: false,
                      };
                    }),
                    submenus: s.submenus?.map((m) => {
                      return {
                        ...m,
                        expanded: false,
                        modulos: m.modulos?.map((m) => {
                          return {
                            ...m,
                            expanded: false,
                          };
                        }),
                      };
                    }),
                  };
                }),
                modulos: o.modulos?.map((m) => {
                  return {
                    ...m,
                    expanded: false,
                  };
                }),
              };
            }),
          };
        }),
      };
    });
    dispatch(set_permissions(permissions));
    dispatch(change_entorno(tipo_entorno));
  };
};
