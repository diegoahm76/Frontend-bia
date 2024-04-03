import { api } from '../../../../api/axios';
import type { IPlanes } from '../../types/types';
import type { IPlan } from '../types/types';
// !  Consultar Planes

// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_consulta_plan = async (id_plan: number): Promise<IPlan[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-planes-total-id/${id_plan}`
  );
  console.log('response', response);
  return response.data.data;
};

export const get_planes = async (): Promise<IPlanes[]> => {
  const response = await api.get(`seguimiento/planes/consultar-planes/`);
  return response.data.data;
};
