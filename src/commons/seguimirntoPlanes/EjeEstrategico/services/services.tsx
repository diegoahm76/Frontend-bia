import { api } from '../../../../api/axios';
import type{ TiposEjes } from '../../configuraciones/interfaces/interfaces';
import type { IEjeEstrategico } from '../../types/types';

// ! Eje estrategico

// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_eje_estrategico_id = async (
  id_plan: number
): Promise<IEjeEstrategico[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-ejes-estrategicos-id-planes/${id_plan}/`
  );
  return response.data.data;
};

export const get_eje_estrategico_id_obj = async (
  id_obj: number
): Promise<IEjeEstrategico[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-ejes-estrategicos-id-objetivo/${id_obj}/`
  );
  return response.data.data;
};

export const get_eje_estrategico = async (
): Promise<IEjeEstrategico[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-ejes-estrategicos/`
  );
  return response.data.data;
};
export const get_tipos_eje = async (): Promise<TiposEjes[]> => {
  const response = await api.get(`/seguimiento/planes/consultar-tipos-ejes/`);
  const data = response.data.data;
  return data ?? [];
};

// ? ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_eje_estrategico = async (
  data: IEjeEstrategico
): Promise<IEjeEstrategico> => {
  const response = await api.post(
    `seguimiento/planes/crear-ejes-estrategicos/`,
    data
  );
  return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_eje_estrategico = async (
  id_eje: number,
  data: IEjeEstrategico
): Promise<IEjeEstrategico> => {
  const response = await api.put(
    `seguimiento/planes/actualizar-ejes-estrategicos/${id_eje}/`,
    data
  );
  return response.data;
};
