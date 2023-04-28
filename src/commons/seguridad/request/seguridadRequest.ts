import { api } from '../../../api/axios';
import type { ResponseServer } from '../../../interfaces/globalModels';
import type { PermisosRol, RolCreated, Roles } from '../interfaces';
import type { AxiosResponse } from 'axios';

export const roles_request = async (): Promise<AxiosResponse<Roles[]>> => {
  return await api.get<Roles[]>('roles/get-list/');
};

export const delete_request = async (id_rol: number): Promise<any> => {
  return await api.delete(`roles/delete/${id_rol}`);
};

export const get_permisos_by_modulos = async (): Promise<
  AxiosResponse<ResponseServer<Roles[]>>
> => {
  return await api.get<ResponseServer<Roles[]>>(
    'permisos/permisos-modulos/get-list/'
  );
};

export const create_rol = async (
  rol: RolCreated
): Promise<AxiosResponse<RolCreated>> => {
  return await api.post<RolCreated>('roles/create/', rol);
};

export const create_permiso_rol = async (
  permisos: PermisosRol[]
): Promise<AxiosResponse<PermisosRol[]>> => {
  return await api.post<PermisosRol[]>(
    'permisos/permisos-modulos-rol/create/',
    permisos
  );
};
