import { api } from '../../../../api/axios';
import type {
  IMetaIndicador,
  IPlanes,
  ISeguimientoPAI,
  Indicadores,
} from '../../types/types';
// !  Consultar Metas

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

export const get_pai_tiempo = async (
  fecha_inicio: any,
  fecha_fin: any
): Promise<ISeguimientoPAI[]> => {
  const response = await api.get(
    `seguimiento-planes/consultar-seguimiento-pai-periodo/?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`
  );
  return response.data.data;
};

export const get_seguimiento_pai = async (): Promise<ISeguimientoPAI[]> => {
  const response = await api.get(
    `seguimiento-planes/consultar-seguimiento-pai/`
  );
  return response.data.data;
};
