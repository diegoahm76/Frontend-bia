  import { type Dispatch } from 'react';
  import { roles_request, superuser_request } from '../request/seguridadRequest';
  import { delegate_superuser_role, set_roles } from './seguridadSlice';
  import { control_error, control_success } from '../../../helpers';

export const get_roles: () => any = () => {
  return async (dispatch: Dispatch<any>) => {
    const data = await roles_request();
    dispatch(set_roles(data));
  };  
};

export const create_super_user: (id_persona: number) => (dispatch: Dispatch<any>) => Promise<void> = (id_persona:number) => {
  return async(dispatch: Dispatch<any>) => {
    const data = await superuser_request(id_persona);
    dispatch(delegate_superuser_role(data))
    if (data === undefined) {
      control_error("Esta persona no tiene un usuario interno, por lo tanto no puede asignarle este rol")
    } else {
      control_success('Delegación y notificación exitosa')
    }
    console.log(data);
  }
}
