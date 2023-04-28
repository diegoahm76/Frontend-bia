import { type Dispatch } from 'react';
import { superuser_request } from '../request/seguridadRequest';
import { delegate_superuser_role } from './seguridadSlice';

export const create_super_user: (
  id_persona: number
) => (dispatch: Dispatch<any>) => Promise<void> = (id_persona: number) => {
  return async (dispatch: Dispatch<any>) => {
    const data = await superuser_request(id_persona);
    dispatch(delegate_superuser_role(data));
  };
};
