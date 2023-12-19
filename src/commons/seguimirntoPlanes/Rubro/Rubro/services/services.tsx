// ! Rubro

import { api } from '../../../../../api/axios';
import type {
  IActividades,
  IProductos,
  IProgramas,
  IProyectos,
  IRubro,
} from '../../../types/types';

// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_rubros = async (): Promise<IRubro[]> => {
  const response = await api.get(`seguimiento/planes/consultar-rubros/`);
  return response.data.data;
};

export const get_programas = async (): Promise<IProgramas[]> => {
  const response = await api.get(`seguimiento/planes/consultar-programas/`);
  return response.data.data;
};

export const get_proyectos_id_programa = async (
  id_programa: number
): Promise<IProyectos[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-proyectos-id-programas/${id_programa}/`
  );
  return response.data.data;
};

export const get_producto_id_proyecto = async (
  id_proyecto: number
): Promise<IProductos[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-productos-id-proyectos/${id_proyecto}/`
  );
  return response.data.data;
};

export const get_actividades_id_producto = async (
  id_producto: number
): Promise<IActividades[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-actividades-id-productos/${id_producto}/`
  );
  return response.data.data;
};

// ? ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_rubro = async (data: IRubro): Promise<IRubro> => {
  const response = await api.post(`seguimiento/planes/crear-rubros/`, data);
  return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_rubro = async (
  id_rubro: number,
  data: IRubro
): Promise<IRubro> => {
  const response = await api.put(
    `seguimiento/planes/actualizar-rubros/${id_rubro}/`,
    data
  );
  return response.data;
};
