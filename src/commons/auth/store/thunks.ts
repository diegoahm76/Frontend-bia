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
    //* fixed rendered menu
    const permissions = resp.data?.map((e) => {
  return {
    ...e,
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
                    expanded: false
                  };
                }),
                submenus: s.submenus?.map((m) => {
                  return {
                    ...m,
                    expanded: false
                  };
                })
              };
            }),
            modulos: o.modulos?.map((m) => {
              return {
                ...m,
                expanded: false
              };
            })
          };
        })
      };
    })
  };
});

dispatch(set_permissions(permissions));

    /* dispatch(
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
    ); */
  };
};

/* Ambos fragmentos de código tienen el mismo propósito, que es establecer la propiedad expanded en false para cada objeto en una estructura de datos anidada. Sin embargo, hay una diferencia importante en cómo se realiza esto.

En el primer fragmento de código, se utiliza la sintaxis de objeto extendido (...) para crear una copia de cada objeto en la estructura de datos anidada y establecer la propiedad expanded en false. Esto se hace de manera recursiva utilizando la función map() para recorrer cada nivel de la estructura de datos anidada. El resultado final es una nueva estructura de datos anidada con las mismas propiedades que la original, pero con la propiedad expanded establecida en false.

En el segundo fragmento de código, se modifica directamente la estructura de datos anidada original utilizando la sintaxis de asignación (=) para establecer la propiedad expanded en false. Esto también se hace de manera recursiva utilizando la función map(). Sin embargo, en lugar de crear una nueva estructura de datos anidada, se modifica la estructura de datos original.

La principal diferencia entre estos dos enfoques es que el primer enfoque crea una nueva estructura de datos anidada, mientras que el segundo enfoque modifica la estructura de datos original. En general, es una buena práctica evitar modificar la estructura de datos original, ya que esto puede tener efectos secundarios no deseados en otras partes del código que dependen de la estructura de datos original. Por lo tanto, el primer enfoque es generalmente preferible al segundo enfoque */
