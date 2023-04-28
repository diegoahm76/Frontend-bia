import { api } from '../../../api/axios';
import type {
  DataAadminUser,
  Roles,
  Users,
  UserCreate,
SuperUser
} from '../interfaces';
import type {
  ResponseServer,
  ResponseThunks
} from '../../../interfaces/globalModels';
import { type AxiosError, type AxiosResponse } from 'axios';
import { control_error } from '../../../helpers/controlError';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const roles_request = async () => {
  try {
    const {
      data
    } = await api.get<ResponseServer<Roles[]>>('roles/get-list/');
    return data;
  } catch (error: any) {
    const { response } = error as AxiosError<AxiosResponse>;

    const { data } = response as unknown as ResponseThunks;
    control_error(data.detail);
  }
};

// busqueda de usuarios por nombre
export const users_request = async (
  nombre_de_usuario: string
): Promise<ResponseThunks<Users[]>> => {
  try {
    const {
      data: { data }
    } = await api.get<ResponseServer<Users[]>>(
      `users/get-user-by-nombre-de-usuario/?nombre_de_usuario=${nombre_de_usuario}`
    );
    return {
      ok: true,
      data
    };
  } catch (error: any) {
    const { response } = error as AxiosError<AxiosResponse>;
    const { data } = response as unknown as ResponseThunks;
    control_error(data.detail);
    return {
      ok: false,
      error_message: data.detail
    };
  }
};

// Busqueda avanzada de personas por varios parametros
export const persons_request = async (
  tipo_documento: string,
  numero_documento: string,
  primer_nombre: string,
  primer_apellido: string,
): Promise<ResponseThunks<Users[]>> => {
  try {
    const {
      data: { data }
    } = await api.get<ResponseServer<Users[]>>(
      `personas/get-personas-filters-admin-user/?tipo_documento=${tipo_documento}&numero_documento=${numero_documento}&primer_nombre=${primer_nombre}&primer_apellido=${primer_apellido}&razon_social&nombre_comercial`
    );
    return {
      ok: true,
      data
    };
  } catch (error: any) {
    const { response } = error as AxiosError<AxiosResponse>;
    const { data } = response as unknown as ResponseThunks;
    control_error(data.detail);
    return {
      ok: false,
      error_message: data.detail
    };
  }
};

// Trae todos los datos de un usuario
export const user_request = async (
  id_usuario: number
): Promise<AxiosResponse<ResponseServer<Users>>> => {
  return await api.get(`users/get-by-pk/${id_usuario}`);
};
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const superuser_request = async(id_persona: number) => {
  try {
    const { data } = await api.post<ResponseServer<SuperUser[]>>(`users/delegate-rol-super-usuario/${id_persona}/`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}


export const crear_user_admin_user = async (
  data: DataAadminUser
): Promise<AxiosResponse<UserCreate>> => {
  return await api.post('users/register/', data);
};

export const update_user_admin_user = async (
  id_usuario: number,
  data: DataAadminUser,
): Promise<AxiosResponse<UserCreate>> => {
  return await api.patch(`users/update/${id_usuario}}/`, data);
};
