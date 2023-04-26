import { api } from '../../../api/axios';
import type { Roles } from '../interfaces';
import type { AxiosResponse } from 'axios';

export const roles_request = async (): Promise<AxiosResponse<Roles[]>> => {
  return await api.get<Roles[]>('roles/get-list/');
};

export const delete_request = async (id_rol: number): Promise<any> => {
  return await api.delete(`roles/delete/${id_rol}`)
}
