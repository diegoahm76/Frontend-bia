  import { type Dispatch } from 'react';
  import { roles_request, users_request, persons_request } from '../request/seguridadRequest';
  import { set_roles, set_users, set_persons } from './seguridadSlice';

export const get_roles: () => any = () => {
  return async (dispatch: Dispatch<any>) => {
    const data = await roles_request();
    dispatch(set_roles(data));
  };  
};

export const get_users: (
  nombre_de_usuario: string
) => any = (nombre_de_usuario: string) => {
  return async (dispatch: Dispatch<any>) => {
    const resp = await users_request(nombre_de_usuario);
    // podemos enviar mensaje de error al dispatch
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    // if (!(resp.ok)) {
    //   // Agregar dispatch de error
    //   dispatch(logout({ error_message: resp.error_message }));
    //   return;
    // }
    console.log(resp.data);

    dispatch(set_users(resp.data));
  };
};

export const get_persons: (
  tipo_documento: string,
  numero_documento: number,
  primer_nombre: string,
  primer_apellido: string,
) => any = (  tipo_documento: string,
  numero_documento: number,
  primer_nombre: string,
  primer_apellido: string,
) => {
  return async (dispatch: Dispatch<any>) => {
    const resp = await persons_request(
      tipo_documento, 
      numero_documento,
      primer_nombre,
      primer_apellido,
    );

    // podemos enviar mensaje de error al dispatch
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    // if (!(resp.ok)) {
    //   // Agregar dispatch de error
    //   dispatch(logout({ error_message: resp.error_message }));
    //   return;
    // }

    console.log(resp.data);
    dispatch(set_persons(resp.data));
  };
};
