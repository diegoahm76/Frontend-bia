import { api } from '../../../../api/axios';
import type { IProductos, IActividades, IPlanes } from '../../types/types';

// ! Actividades
// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_actividades_id = async (
  id_producto: number
): Promise<IActividades[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-actividades-id-productos/${id_producto}/`
  );
  return response.data.data;
};

export const get_actividades_id_plan = async (
  id_plan: number
): Promise<IActividades[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-actividades-id-plan/${id_plan}/`
  );
  return response.data.data;
};

export const get_productos = async (): Promise<IProductos[]> => {
  const response = await api.get(`seguimiento/planes/consultar-productos/`);
  return response.data.data;
};

export const get_planes = async (): Promise<IPlanes[]> => {
  const response = await api.get(`seguimiento/planes/consultar-planes/`);
  return response.data.data;
};

// ? ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_actividad = async (
  data: IActividades
): Promise<IActividades> => {
  const response = await api.post(
    `seguimiento/planes/crear-actividades/`,
    data
  );
  return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_actividad = async (
  id_actividad: number,
  data: IActividades
): Promise<IActividades> => {
  const response = await api.put(
    `seguimiento/planes/actualizar-actividades/${id_actividad}/`,
    data
  );
  return response.data;
};
