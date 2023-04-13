  import { type Dispatch } from 'react';
  import { roles_request } from '../request/seguridadRequest';
  import { set_roles } from './seguridadSlice';

export const get_roles: () => any = () => {
  return async (dispatch: Dispatch<any>) => {
    const data = await roles_request();
    dispatch(set_roles(data));
  };  
};
