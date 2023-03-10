import { api } from '../../../api/axios';
import {
  type ResponseAuth,
  type LoginUser,
  type Permissions,
  type IUserInfo,
} from '../interfaces/authModels';
import {
  type ResponseServer,
  type ResponseThunks,
} from '../../../interfaces/globalModels';
import { type AxiosResponse, type AxiosError } from 'axios';
import { control_error } from '../../../helpers/controlError';

export const login_post = async (
  loginUser: LoginUser
): Promise<ResponseThunks<IUserInfo>> => {
  try {
    const {
      data: { userinfo },
    } = await api.post<ResponseAuth>('users/login/', loginUser);

    return {
      ok: true,
      data: { ...userinfo },
    };
  } catch (error: any) {
    console.error(error);
    const {
      response: { data },
    } = error;

    return {
      ok: false,
      error_message: data.detail,
    };
  }
};

export const permissions_request = async (
  id_usuario: number,
  tipo_entorno: string
): Promise<ResponseThunks<Permissions>> => {
  try {
    const {
      data: { data },
    } = await api.get<ResponseServer<Permissions>>(
      `permisos/permisos-rol/get-by-entorno/?id_usuario=${id_usuario}&tipo_entorno=${tipo_entorno}`
    );

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    const { response } = error as AxiosError<AxiosResponse>;

    const { data } = response as unknown as ResponseThunks;

    control_error(data.detail);

    return {
      ok: false,
      error_message: data.detail,
    };
  }
};
