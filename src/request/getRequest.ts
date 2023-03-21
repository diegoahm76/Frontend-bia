import { type AxiosResponse } from 'axios';
import { api } from '../api/axios';
import type {
  Paises,
  ResponseServer,
  TipoDocumento,
  TipoPersona
} from '../interfaces/globalModels';

export const get_direcciones = async (): Promise<any> => {
  return await api.get('choices/direcciones/');
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
