import { api } from '../../../../api/axios';
import type { IFuentes } from '../../types/types';

// ! Fuentes de financiacion
// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_fuente_financiancion = async (): Promise<IFuentes[]> => {
  const response = await api.get(
    `seguimiento-planes/consultar-fuentes-financiacion/`
  );
  return response.data.data;
};

export const get_fuente_financiancion_by_id = async (
  id_fuente: number
): Promise<IFuentes> => {
  const response = await api.get(
    `seguimiento-planes/consultar-fuentes-financiacion/${id_fuente}/`
  );
  return response.data;
}

// ? ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_fuentes_fiananciacion = async (
  data: IFuentes
): Promise<IFuentes> => {
  const response = await api.post(
    `seguimiento-planes/crear-fuentes-financiacion/`,
    data
  );
  return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_fuentes_fiananciacion = async (
  id_fuente: number,
  data: IFuentes
): Promise<IFuentes> => {
  const response = await api.put(
    `seguimiento-planes/actualizar-fuentes-financiacion/${id_fuente}/`,
    data
  );
  return response.data;
};
