import { type AxiosResponse } from 'axios';
import { select_adapter } from '../adapters/globalAdapters';
import { api } from '../api/axios';
import type { ResponseServer, IList } from '../interfaces/globalModels';

export const get_direcciones = async (): Promise<any> => {
  return await api.get('choices/direcciones/');
};

export const get_tipo_persona = async (): Promise<
  AxiosResponse<ResponseServer<IList[]>>
> => {
  return await api.get<ResponseServer<IList[]>>('listas/tipo-persona/');
};

export const get_tipo_documento = async (): Promise<
  AxiosResponse<ResponseServer<IList[]>>
> => {
  return await api.get<ResponseServer<IList[]>>('listas/tipo-documento/');
};

export const get_paises = async (): Promise<
  AxiosResponse<ResponseServer<IList[]>>
> => {
  return await api.get<ResponseServer<IList[]>>('listas/paises/');
};

export const get_departamentos = async (
  pais: string
): Promise<AxiosResponse<ResponseServer<IList[]>>> => {
  return await api.get<ResponseServer<IList[]>>(
    `listas/departamentos/?pais=${pais}`
  );
};

export const get_ciudades = async (
  codigo_departamento: string
): Promise<AxiosResponse<ResponseServer<IList[]>>> => {
  return await api.get<ResponseServer<IList[]>>(
    `listas/municipios/?cod_departamento=${codigo_departamento}`
  );
};

export const get_generos = async (): Promise<IList[]> => {
  const { data } = await api.get<[[string, string]]>(`choices/sexo/`);
  return select_adapter(data);
};

export const get_estado_civil = async (): Promise<
  AxiosResponse<ResponseServer<IList[]>>
> => {
  return await api.get<ResponseServer<IList[]>>(`listas/estado-civil/`);
};

export const get_naturaleza_emp = async (): Promise<
  AxiosResponse<ResponseServer<IList[]>>
> => {
  return await api.get<ResponseServer<IList[]>>(
    `listas/cod-naturaleza-empresa/`
  );
};
