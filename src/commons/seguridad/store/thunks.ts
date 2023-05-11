import { type Dispatch } from 'react';
import {
  persons_request,
  roles_request,
  superuser_request,
  user_request,
  users_request,
} from '../request/seguridadRequest';
import {
  delegate_superuser_role,
  set_data_legal_person,
  set_persons,
  set_roles,
  set_user_info,
  set_users,
} from './seguridadSlice';
import { control_error, control_success } from '../../../helpers';
import { consultar_datos_persona } from '../request/Request';

export const get_roles: () => any = () => {
  return async (dispatch: Dispatch<any>) => {
    const data = await roles_request();
    dispatch(set_roles(data.data));
  };
};

export const create_super_user: (
  id_persona: number
) => (dispatch: Dispatch<any>) => Promise<void> = (id_persona: number) => {
  return async (dispatch: Dispatch<any>) => {
    const data = await superuser_request(id_persona);
    dispatch(delegate_superuser_role(data));
    if (data === undefined) {
      control_error(
        'Esta persona no tiene un usuario interno, por lo tanto no puede asignarle este rol'
      );
    } else {
      control_success('Delegación y notificación exitosa');
    }
  };
};

export const get_users: (nombre_de_usuario: string) => any = (
  nombre_de_usuario: string
) => {
  return async (dispatch: Dispatch<any>) => {
    const resp = await users_request(nombre_de_usuario);
    dispatch(set_users(resp.data));
  };
};

export const get_persons: (
  tipo_documento: string,
  numero_documento: string,
  primer_nombre: string,
  primer_apellido: string
) => any = (
  tipo_documento: string,
  numero_documento: string,
  primer_nombre: string,
  primer_apellido: string
) => {
  return async (dispatch: Dispatch<any>) => {
    const resp = await persons_request(
      tipo_documento,
      numero_documento,
      primer_nombre,
      primer_apellido
    );
    dispatch(set_persons(resp.data));
  };
};

export const get_data_user: (id: number) => any = (id: number) => {
  return async (dispatch: Dispatch<any>) => {
    const { data } = await user_request(id);
    dispatch(set_user_info(data.data));
  };
};

export const get_data_legal_person = (id_person: number) => {
  return async (dispatch: Dispatch<any>) => {
    const resp = await consultar_datos_persona(id_person);
    dispatch(set_data_legal_person(resp));
    console.log(resp);
  };
};
