import { api } from '../../../../api/axios';
import type { IProgramas, IProyectos } from '../../types/types';

// ! proyecto
// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_proyecto_id = async (
  id_programa: number
): Promise<IProyectos[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-proyectos-id-programas/${id_programa}/`
  );
  return response.data.data;
};

export const get_programas = async (): Promise<IProgramas[]> => {
  const response = await api.get(`seguimiento/planes/consultar-programas/`);
  return response.data.data;
};

// ? ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_proyecto = async (data: IProyectos): Promise<IProyectos> => {
  const response = await api.post(`seguimiento/planes/crear-proyectos/`, data);
  return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_proyecto = async (
  id_proyecto: number,
  data: IProyectos
): Promise<IProyectos> => {
  const response = await api.put(
    `seguimiento/planes/actualizar-proyectos/${id_proyecto}/`,
    data
  );
  return response.data;
};
