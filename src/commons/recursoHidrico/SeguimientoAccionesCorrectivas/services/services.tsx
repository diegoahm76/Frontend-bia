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
  if (numero_expediente) url += `&nro_expediente=${numero_expediente}`
  const response = await api.get(url);
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

export const get_tipo_acciones = async (): Promise<any> => {
  const response = await api.get('hidrico/bibliotecas/tipo_acciones/get/');
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

export const post_tipo_accion = async (
  data: any
): Promise<any> => {
  const response = await api.post(
    `hidrico/bibliotecas/tipo_acciones/create/`,
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

export const put_tipo_accion = async (
  id_tipo_accion: number,
  data: any
): Promise<any> => {
  const response = await api.put(
    `hidrico/bibliotecas/tipo_acciones/update/${id_tipo_accion}/`,
    data
  );
  return response.data;
};

// ? ----------------------------------------------- [ DELETE ] -----------------------------------------------

export const delete_tipo_accion = async (
  id_accion: number
): Promise<any> => {
  const response = await api.delete(
    `hidrico/bibliotecas/acciones_correctivas/delete/${id_accion}/`
  );
  return response.data;
};

// export const delete_tipo_accion = async (
//   id_tipo_accion: number
// ): Promise<any> => {
//   const response = await api.delete(
//     `hidrico/bibliotecas/tipo_acciones/delete/${id_tipo_accion}/`
//   );
//   return response.data;
// };