
// ! Rubro

import { api } from "../../../../../api/axios";
import type{ IRubro } from "../../../types/types";

// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_rubros = async (): Promise<IRubro[]> => {
  const response = await api.get(`seguimiento/planes/consultar-rubros/`);
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