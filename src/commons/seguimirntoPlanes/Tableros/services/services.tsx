import { api } from '../../../../api/axios';
import type {
  IMetaIndicador,
  IPlanes,
  IProgramas,
  IProyectos,
  IActividades,
  IProductos,
  Indicadores,
} from '../../types/types';
// !  Consultar

// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_planes = async (): Promise<IPlanes[]> => {
  const response = await api.get(`seguimiento/planes/consultar-planes/`);
  return response.data.data;
};

export const get_indicadores_id_actividad = async (
  id_actividad: number
): Promise<Indicadores[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-indicadores-id-actividad/${id_actividad}/`
  );
  return response.data.data;
};
export const get_metas_tiempo = async (
  fecha_inicio: any,
  fecha_fin: any
): Promise<IMetaIndicador[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-metas-periodo/?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`
  );
  return response.data.data;
};

// proyectos recibe 3 parametros fehca_inicio, fecha_fin, id_plan

export const get_proyectos_tiempo = async (
  fecha_inicio: any,
  fecha_fin: any,
  id_plan: number
): Promise<IProyectos[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-proyectos-periodo/?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}&id_plan=${id_plan}`
  );
  return response.data.data;
};

// programas recibe 3 parametros fehca_inicio, fecha_fin, id_plan

export const get_programas_tiempo = async (
  fecha_inicio: any,
  fecha_fin: any,
  id_plan: number
): Promise<IProgramas[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-programas-periodo/?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}&id_plan=${id_plan}`
  );
  return response.data.data;
};

// productos recibe 3 parametros fehca_inicio, fecha_fin, id_plan

export const get_productos_tiempo = async (
  fecha_inicio: any,
  fecha_fin: any,
  id_plan: number
): Promise<IProductos[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-productos-periodo/?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}&id_plan=${id_plan}`
  );
  return response.data.data;
};

// actividades recibe 3 parametros fehca_inicio, fecha_fin, id_plan

export const get_actividades_tiempo = async (
  fecha_inicio: any,
  fecha_fin: any,
  id_plan: number
): Promise<IActividades[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-actividades-periodo/?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}&id_plan=${id_plan}`
  );
  return response.data.data;
};

// indicadores recibe 3 parametros fehca_inicio, fecha_fin, id_plan

export const get_indicadores_tiempo = async (
  fecha_inicio: any,
  fecha_fin: any,
  id_plan: number
): Promise<Indicadores[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-indicadores-periodo/?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}&id_plan=${id_plan}`
  );
  return response.data.data;
};

// metas recibe 3 parametros fehca_inicio, fecha_fin, id_plan

export const get_metas_tiempo_id_plan = async (
  fecha_inicio: any,
  fecha_fin: any,
  id_plan: number
): Promise<IMetaIndicador[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-metas-periodo/?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}&id_plan=${id_plan}`
  );
  return response.data.data;
};
