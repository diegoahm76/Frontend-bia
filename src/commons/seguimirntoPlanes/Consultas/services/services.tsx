import { api } from '../../../../api/axios';
import type { IPlan } from '../types/types';
// !  Consultar Planes

// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_consulta_plan = async (): Promise<IPlan[]> => {
  const response = await api.get(`seguimiento/planes/consultar-planes-total/`);
  console.log('response', response);
  return response.data.data;
};
