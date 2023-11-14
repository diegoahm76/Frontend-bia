import { api } from '../../../../api/axios';
import type { IProyectos, IProductos } from '../../types/types';

// ! proyecto
// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_producto_id = async (
  id_proyecto: number
): Promise<IProductos[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-productos-id-proyectos/${id_proyecto}/`
  );
  return response.data.data;
};

export const get_proyectos = async (): Promise<IProyectos[]> => {
  const response = await api.get(`seguimiento/planes/consultar-proyectos/`);
  return response.data.data;
};

// ? ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_producto = async (data: IProductos): Promise<IProductos> => {
  const response = await api.post(`seguimiento/planes/crear-productos/`, data);
  return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_producto = async (
  id_producto: number,
  data: IProductos
): Promise<IProductos> => {
  const response = await api.put(
    `seguimiento/planes/actualizar-productos/${id_producto}/`,
    data
  );
  return response.data;
};
