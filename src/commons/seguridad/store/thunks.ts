  import { type Dispatch } from 'react';
  import { roles_request, superuser_request } from '../request/seguridadRequest';
  import { delegate_superuser_role, set_roles } from './seguridadSlice';

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
    console.log(data);
  }
}
