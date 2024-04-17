import { api } from '../../../../api/axios';
import type { Cuenca } from '../../configuraciones/interfaces/interfaces';
import type {
  IActividades,
  IFuentesFinanciacion,
  IMetaIndicador,
  IProductos,
  IProyectos,
} from '../../types/types';

// ! Fuentes de financiacion
// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_fuente_financiancion = async (): Promise<
  IFuentesFinanciacion[]
> => {
  const response = await api.get(
    `seguimiento-planes/consultar-fuentes-financiacion-indicadores/`
  );
  return response.data.data;
};

export const get_fuente_financiancion_by_meta_id = async (
  id_meta: number
): Promise<IFuentesFinanciacion[]> => {
  const response = await api.get(
    `seguimiento-planes/consultar-fuentes-financiacion-indicadores/${id_meta}/`
  );
  return response.data.data;
};

export const get_cuencas = async (): Promise<Cuenca[]> => {
  const response = await api.get(`hidrico/bibliotecas/cuencas/get/`);
  return response.data.data;
};

export const get_proyectos = async (): Promise<IProyectos[]> => {
  const response = await api.get(`seguimiento/planes/consultar-proyectos/`);
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

export const get_metas_id_indicador = async (
  id_indicador: number
): Promise<IMetaIndicador[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-metas-id-indicadores/${id_indicador}/`
  );
  return response.data.data;
};

// ? ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_fuentes_fiananciacion = async (
  data: IFuentesFinanciacion
): Promise<IFuentesFinanciacion> => {
  const response = await api.post(
    `seguimiento-planes/crear-fuentes-financiacion-indicadores/`,
    data
  );
  return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_fuentes_fiananciacion = async (
  id_fuente: number,
  data: IFuentesFinanciacion
): Promise<IFuentesFinanciacion> => {
  const response = await api.put(
    `seguimiento-planes/actualizar-fuentes-financiacion-indicadores/${id_fuente}/`,
    data
  );
  return response.data;
};
