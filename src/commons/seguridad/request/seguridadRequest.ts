import { api } from '../../../api/axios';
import type {
Roles,
Users
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

// https://backend-bia-beta-production.up.railway.app/api/users/get-user-by-nombre-de-usuario/?nombre_de_usuario=PruebAnatural2820
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

// 
export const persons_request = async (
  tipo_documento: string,
  numero_documento: number,
  primer_nombre: string,
  primer_apellido: string,
): Promise<ResponseThunks<Users[]>> => {
  try {
    const {
      data: { data }
    } = await api.get<ResponseServer<Users[]>>(
      `personas/get-personas-filters/?tipo_documento=${tipo_documento}&numero_documento=${numero_documento}&primer_nombre=${primer_nombre}&primer_apellido=${primer_apellido}&razon_social&nombre_comercial`
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

