import { type AxiosResponse } from 'axios';
import { api } from '../../../../api/axios';
import { type ResponseServer } from '../../../../interfaces/globalModels';

export const search_seccion_subseccion = async ({
  nombre_seccion,
  nombre_subseccion,
}: any): Promise<AxiosResponse<ResponseServer<any[]>>> => {
  const url = `hidrico/bibliotecas/subsecciones/get-busqueda-avanzada/?nombre_seccion=${String(
    nombre_seccion ?? ''
  )}&nombre_subseccion=${String(nombre_subseccion ?? '')}`;
  return await api.get<ResponseServer<any[]>>(url);
};
export const agregar_instrumento = async (datos: FormData): Promise<any> => {
  const response = await api.post(
    `hidrico/bibliotecas/instrumentos/create/`,
    datos
  );
  return response.data;
};
