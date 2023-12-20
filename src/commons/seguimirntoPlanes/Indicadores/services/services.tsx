import { api } from '../../../../api/axios';
import type {
  IMedicion,
  ITipos,
} from '../../configuraciones/interfaces/interfaces';
import type {
  IProductos,
  Indicadores,
  IPlanes,
  IActividades,
  IProyectos,
} from '../../types/types';

// ! Indicadores
// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_indicadores = async (): Promise<Indicadores[]> => {
  const response = await api.get(`seguimiento/planes/consultar-indicadores/`);
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

export const get_actividades = async (): Promise<IActividades[]> => {
  const response = await api.get(`seguimiento/planes/consultar-actividades/`);
  return response.data.data;
};
export const get_medidor = async (): Promise<IMedicion[]> => {
  const response = await api.get(`seguimiento/planes/consultar-mediciones/`);
  return response.data.data;
};

export const get_tipos = async (): Promise<ITipos[]> => {
  const response = await api.get(`seguimiento/planes/consultar-tipos/`);
  return response.data.data;
};

export const get_proyectos = async (): Promise<IProyectos[]> => {
  const response = await api.get(`seguimiento/planes/consultar-proyectos/`);
  return response.data.data;
};

// ? ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_indicador = async (
  data: Indicadores
): Promise<Indicadores> => {
  const response = await api.post(
    `seguimiento/planes/crear-indicadores/`,
    data
  );
  return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_indicador = async (
  id_indicador: number,
  data: Indicadores
): Promise<Indicadores> => {
  const response = await api.put(
    `seguimiento/planes/actualizar-indicadores/${id_indicador}/`,
    data
  );
  return response.data;
};
