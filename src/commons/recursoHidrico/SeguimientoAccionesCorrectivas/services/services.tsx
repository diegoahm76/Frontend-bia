import { api } from '../../../../api/axios';
import { IAccionCorrectiva } from '../interfaces/types';

// ! Eje estrategico

// ? ----------------------------------------------- [ GET ] -----------------------------------------------

export const get_busqueda_tramites = async (
  page: number,
  nombre_proyecto?: string,
  numero_expediente?: string,
): Promise<any> => {
  let url = `hidrico/bibliotecas/busqueda_tramites/?page=${page}&page_size=10`
  if (nombre_proyecto) url += `&nombre_proyecto=${nombre_proyecto}`
  if (numero_expediente) url += `&numero_expediente=${numero_expediente}`
  const response = await api.get(url);
  console.log(response.data)
  return response.data;
};

export const get_acciones_correctivas_id_tramite = async (
  id_tramite: number
): Promise<IAccionCorrectiva[]> => {
  const response = await api.get(
    `hidrico/bibliotecas/acciones_correctivas/get-by-id-tramite/${id_tramite}/`
  );
  return response.data.data;
};

// ? ----------------------------------------------- [ POST ] -----------------------------------------------

export const post_accion_correctiva = async (
  data: any
): Promise<any> => {
  const response = await api.post(
    `hidrico/bibliotecas/acciones_correctivas/create/`,
    data
  );
  return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------

export const put_accion_correctiva = async (
  id_accion: number,
  data: any
): Promise<any> => {
  const response = await api.put(
    `hidrico/bibliotecas/acciones_correctivas/update/${id_accion}/`,
    data
  );
  return response.data;
};