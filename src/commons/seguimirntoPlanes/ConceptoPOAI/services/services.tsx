import { api } from '../../../../api/axios';
import type { IConceptoPOAI, IUnidadesActuales } from '../../types/types';

// ! Fuentes de financiacion
// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_concepto_poai = async (
): Promise<IConceptoPOAI[]> => {
  const response = await api.get(
    `seguimiento-planes/consultar-conceptos-poai/`
  );
  return response.data.data;
};

export const get_unidades_organizacionales = async (
): Promise<IUnidadesActuales[]> => {
  const response = await api.get(
    `transversal/organigrama/unidades/get-list/organigrama-actual/`
  );
  return response.data.data;
}

// ? ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_concepto_poai = async (
  data: IConceptoPOAI
): Promise<IConceptoPOAI> => {
  const response = await api.post(
    `seguimiento-planes/crear-conceptos-poai/`,
    data
  );
  return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_concepto_poai  = async (
  id_fuente: number,
  data: IConceptoPOAI
): Promise<IConceptoPOAI> => {
  const response = await api.put(
    `seguimiento-planes/actualizar-conceptos-poai/${id_fuente}/`,
    data
  );
  return response.data;
};
