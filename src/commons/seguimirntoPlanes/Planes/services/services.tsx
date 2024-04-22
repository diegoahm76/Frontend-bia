import { api } from '../../../../api/axios';
import type { IPlanes } from '../../types/types';

// ! Planes

// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_planes = async (): Promise<IPlanes[]> => {
  const response = await api.get(`seguimiento/planes/consultar-planes/`);
  return response.data.data;
};

export const get_planes_pgar = async (): Promise<IPlanes[]> => {
  const response = await api.get(`seguimiento/planes/consultar-planesPGAR/`);
  return response.data.data;
};

// ? ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_planes = async (data: IPlanes): Promise<IPlanes> => {
  const response = await api.post(`seguimiento/planes/crear-planes/`, data);
  return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_planes = async (
  id_plan: number,
  data: IPlanes
): Promise<IPlanes> => {
  const response = await api.put(
    `seguimiento/planes/actualizar-planes/${id_plan}/`,
    data
  );
  return response.data;
};