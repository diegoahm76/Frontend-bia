import { api } from '../../../../api/axios';
import type { IProgramas, ISubprogramas } from '../../types/types';

// ! Subprogramas
// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_subprograma_id = async (
  id_programa: number
): Promise<ISubprogramas[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-subprogramas-id-programa/${id_programa}/`
  );
  return response.data.data;
};

export const get_programas = async (): Promise<IProgramas[]> => {
  const response = await api.get(`seguimiento/planes/consultar-programas/`);
  return response.data.data;
};

// ? ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_subprograma = async (
  data: ISubprogramas
): Promise<ISubprogramas> => {
  const response = await api.post(`seguimiento/planes/crear-subprogramas/`, data);
  return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_subprograma = async (
  id_subprograma: number,
  data: ISubprogramas
): Promise<ISubprogramas> => {
  const response = await api.put(
    `seguimiento/planes/actualizar-subprogramas/${id_subprograma}/`,
    data
  );
  return response.data;
};
