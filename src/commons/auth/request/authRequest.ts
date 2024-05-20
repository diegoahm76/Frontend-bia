import { api } from '../../../api/axios';
import type {
  ResponseAuth,
  LoginUser,
  IUserInfo,
  DataUnlockUser,
  InfoPersonaComplete,
  ChangePassword,
  RecoverPassword,
  ResponseRecover,
  DataRegisterPersonaN,
  Menu,
  User,
  DataRegisterPersonaJ,
  RecoverUser,
} from '../interfaces/authModels';
import type {
  ResponseServer,
  ResponseThunks,
} from '../../../interfaces/globalModels';
import type { AxiosResponse, AxiosError } from 'axios';
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
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { response } = error as AxiosError;
    console.error(error);
    const {
      response: { data },
    } = error as any;

    return {
      ok: false,
      error_message: data.detail,
      is_blocked: response?.status === 403,
    };
  }
};

//* get permissions
export const permissions_request = async (
  id_usuario: number,
  tipo_entorno: string
): Promise<ResponseThunks<Menu[]>> => {
  try {
    const {
      data: { data },
    } = await api.get<ResponseServer<Menu[]>>(
      `permisos/permisos-rol/get-estructura-menu/?id_usuario=${id_usuario}&tipo_entorno=${tipo_entorno}`
    );

    console.log({
      data,
    });
    return {
      ok: true,
      data,
    };
  } catch (error) {
    const { response } = error as AxiosError<AxiosResponse>;

    const { data } = response as unknown as ResponseThunks;

    control_error(data.detail);

    return {
      ok: false,
      error_message: data.detail,
    };
  }
};

export const get_info_person_by_document = async (
  id_persona: number
): Promise<AxiosResponse<ResponseServer<InfoPersonaComplete>>> => {
  return await api.get(`/personas/get-by-id/${id_persona}/`);
};

export const crear_persona_natural_and_user = async (
  data: DataRegisterPersonaN
): Promise<AxiosResponse<ResponseServer<any>>> => {
  return await api.post('personas/persona-natural-and-usuario/create/', data);
};

export const crear_persona_juridica_and_user = async (
  data: DataRegisterPersonaJ
): Promise<AxiosResponse<ResponseServer<any>>> => {
  return await api.post('personas/persona-juridica-and-usuario/create/', data);
};

export const desbloquer_usuario = async (
  desbloqueoModel: DataUnlockUser
): Promise<any> => {
  return await api.post('users/unblock/', desbloqueoModel);
};

export const verify_account = async (
  token: string
): Promise<AxiosResponse<ResponseServer<any>>> => {
  return await api.get(`users/verify/?token=${token}`);
};

export const password_reset_complete = async (
  data: ChangePassword
): Promise<AxiosResponse<ResponseServer<any>>> => {
  return await api.patch(`users/pasword-reset-complete/`, data);
};

export const password_unblock_complete = async (
  data: ChangePassword
): Promise<AxiosResponse<ResponseServer<any>>> => {
  return await api.patch(`users/password-unblock-complete/`, data);
};

export const recover_password = async (
  data: RecoverPassword
): Promise<AxiosResponse<ResponseServer<ResponseRecover>>> => {
  return await api.post('users/request-reset-email/', data);
};

export const recover_user = async (
  data: RecoverUser
): Promise<AxiosResponse<ResponseServer<ResponseRecover>>> => {
  return await api.put('users/recuperar-nombre-usuario/', data);
};

export const create_user = async (
  data: User
): Promise<AxiosResponse<ResponseServer<User>>> => {
  return await api.post<ResponseServer<User>>('users/register-externo/', data);
};
