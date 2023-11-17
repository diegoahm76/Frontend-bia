import { api } from '../../../../api/axios';
import type { Cuenca } from '../../configuraciones/interfaces/interfaces';
import type { IFuentesFinanciacion } from '../../types/types';

// ! Fuentes de financiacion
// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_fuente_financiancion = async (
): Promise<IFuentesFinanciacion[]> => {
  const response = await api.get(
    `seguimiento-planes/consultar-fuentes-financiacion-indicadores/`
  );
  return response.data.data;
};

export const get_cuencas = async (): Promise<Cuenca[]> => {
  const response = await api.get(`hidrico/bibliotecas/cuencas/get/`);
  return response.data.data;
}

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
export const put_fuentes_fiananciacion  = async (
  id_fuente: number,
  data: IFuentesFinanciacion
): Promise<IFuentesFinanciacion> => {
  const response = await api.put(
    `seguimiento-planes/actualizar-fuentes-financiacion-indicadores/${id_fuente}/`,
    data
  );
  return response.data;
};
