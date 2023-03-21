import { api } from '../../../api/axios';
import type {
  ResponseAuth,
  LoginUser,
  IUserInfo,
  InfoPersona,
  Permisos,
  IPerson
} from '../interfaces/authModels';
import type {
  Paises,
  TipoDocumento,
  TipoPersona,
  ResponseServer,
  ResponseThunks
} from '../../../interfaces/globalModels';
import { type AxiosResponse, type AxiosError } from 'axios';
import { control_error } from '../../../helpers/controlError';

export const login_post = async (
  loginUser: LoginUser
): Promise<ResponseThunks<IUserInfo>> => {
  try {
    const {
      data: { userinfo }
    } = await api.post<ResponseAuth>('users/login/', loginUser);

    return {
      ok: true,
      data: { ...userinfo }
    };
  } catch (error: any) {
    console.error(error);
    const {
      response: { data }
    } = error;

    return {
      ok: false,
      error_message: data.detail
    };
  }
};

export const permissions_request = async (
  id_usuario: number,
  tipo_entorno: string
): Promise<ResponseThunks<Permisos[]>> => {
  try {
    const {
      data: { data }
    } = await api.get<ResponseServer<Permisos[]>>(
      `permisos/permisos-rol/get-by-entorno/?id_usuario=${id_usuario}&tipo_entorno=${tipo_entorno}`
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

export const get_tipo_persona = async (): Promise<
  AxiosResponse<ResponseServer<TipoPersona[]>>
> => {
  return await api.get<ResponseServer<TipoPersona[]>>('listas/tipo-persona/');
};

export const get_tipo_documento = async (): Promise<
  AxiosResponse<ResponseServer<TipoDocumento[]>>
> => {
  return await api.get<ResponseServer<TipoDocumento[]>>(
    'listas/tipo-documento/'
  );
};

export const get_paises = async (): Promise<
  AxiosResponse<ResponseServer<Paises[]>>
> => {
  return await api.get<ResponseServer<Paises[]>>('listas/paises/');
};

export const get_person_by_document = async (
  tipo_documento: string,
  numero_documento: string
): Promise<AxiosResponse<ResponseServer<InfoPersona>>> => {
  return await api.get(
    `personas/get-personas-by-document/${tipo_documento}/${numero_documento}`
  );
};

export const crear_persona_natural = async (
  data: IPerson
): Promise<ResponseServer<any>> => {
  return await api.post('personas/persona-natural/create/', data);
};
