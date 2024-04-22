import { api } from '../../../../api/axios';
import type { IProgramas } from '../../types/types';

// ! Programa
// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_programa_id = async (
  id_eje: number
): Promise<IProgramas[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-programas-id-eje-estrategico/${id_eje}/`
  );
  return response.data.data;
};

// ? ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_programa = async (
  data: IProgramas
): Promise<IProgramas> => {
  const response = await api.post(
    `seguimiento/planes/crear-programas/`,
    data
  );
  return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_programa = async (
  id_eje: number,
  data: IProgramas
): Promise<IProgramas> => {
  const response = await api.put(
    `seguimiento/planes/actualizar-programas/${id_eje}/`,
    data
  );
  return response.data;
};
