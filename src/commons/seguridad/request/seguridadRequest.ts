import { api } from '../../../api/axios';
import type {
Roles,
User
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
): Promise<ResponseThunks<User[]>> => {
  try {
    const {
      data: { data }
    } = await api.get<ResponseServer<User[]>>(
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
): Promise<ResponseThunks<User[]>> => {
  try {
    const {
      data: { data }
    } = await api.get<ResponseServer<User[]>>(
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
  id: number
): Promise<AxiosResponse<ResponseServer<User>>> => {
  return await api.get(`users/get-by-pk/${id}`);
};
