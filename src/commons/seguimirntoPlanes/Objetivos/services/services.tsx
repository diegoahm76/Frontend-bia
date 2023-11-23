import { api } from '../../../../api/axios';
import type { IObjetivo } from '../../types/types';

// ! Objetivo
// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_objetivo_id = async (
  id_plan: number
): Promise<IObjetivo[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-objetivos-id-planes/${id_plan}/`
  );
  return response.data.data;
};

// ? ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_objetivo = async (
  data: IObjetivo
): Promise<IObjetivo> => {
  const response = await api.post(
    `seguimiento/planes/crear-objetivos/`,
    data
  );
  return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_objetivo = async (
  id_eje: number,
  data: IObjetivo
): Promise<IObjetivo> => {
  const response = await api.put(
    `seguimiento/planes/actualizar-objetivos/${id_eje}/`,
    data
  );
  return response.data;
};
