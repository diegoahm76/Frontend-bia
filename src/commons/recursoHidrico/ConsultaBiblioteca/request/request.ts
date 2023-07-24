import { type AxiosResponse } from 'axios';
import { api } from '../../../../api/axios';
import { type ResponseServer } from '../../../../interfaces/globalModels';
import type {
  Archivos,
  BusquedaArchivo,
  BusquedaBasica,
  CuencasInstrumentos,
  DataGeneralLaboratorio,
  IntrumentosId,
  ParametrosId,
  Resultadolaboratorio,
} from '../interfaces/interfaces';
import type { Pozo } from '../../configuraciones/interfaces/interfaces';

export const search_instrumento = async ({
  nombre_seccion,
  nombre_subseccion,
  nombre_instrumento,
  nombre_archivo,
}: any): Promise<AxiosResponse<ResponseServer<BusquedaArchivo[]>>> => {
  const url = `hidrico/bibliotecas/archivosInstrumento/get-busqueda-avanzada/?nombre_seccion=${String(
    nombre_seccion ?? ''
  )}&nombre_subseccion=${String(
    nombre_subseccion ?? ''
  )}&nombre_instrumento=${String(
    nombre_instrumento ?? ''
  )}&nombre_archivo=${String(nombre_archivo ?? '')}`;
  return await api.get<ResponseServer<BusquedaArchivo[]>>(url);
};

export const get_data_cuenca_instrumentos = async (
  id_instrumento: number
): Promise<CuencasInstrumentos[]> => {
  const response: AxiosResponse<ResponseServer<CuencasInstrumentos[]>> =
    await api.get<ResponseServer<CuencasInstrumentos[]>>(
      `hidrico/bibliotecas/cuencas/get-cuencas-instrumento/${id_instrumento}/`
    );
  return response.data.data;
};
export const get_data_pozo_id = async (id_pozo: number): Promise<Pozo[]> => {
  const response: AxiosResponse<ResponseServer<Pozo[]>> = await api.get<
    ResponseServer<Pozo[]>
  >(`hidrico/bibliotecas/pozos/get-id/${id_pozo}/`);
  return response.data.data;
};

export const get_archivos = async (
  id_instrumento: number
): Promise<Archivos[]> => {
  const response: AxiosResponse<ResponseServer<Archivos[]>> = await api.get<
    ResponseServer<Archivos[]>
  >(
    `hidrico/bibliotecas/ArchivosInstrumento/get-ArchivosInstrumento-instrumento/${id_instrumento}/`
  );
  return response.data.data;
};

export const get_instrumento_id = async (
  id_instrumento: number
): Promise<AxiosResponse<ResponseServer<IntrumentosId[]>>> => {
  const url = `hidrico/bibliotecas/instrumentos/get-instrumento-id/${id_instrumento}/`;
  return await api.get<ResponseServer<IntrumentosId[]>>(url);
};

export const get_busqueda_basica = async (
  id_seccion: number,
  id_subseccion: number
): Promise<BusquedaBasica[]> => {
  const response: AxiosResponse<ResponseServer<BusquedaBasica[]>> =
    await api.get<ResponseServer<BusquedaBasica[]>>(
      `hidrico/bibliotecas/instrumentos/get-instrumento-cuencas/${id_seccion}/${id_subseccion}/`
    );
  return response.data.data;
};

export const get_data_laboratorio_id = async (
  id_instrumento: number,
): Promise<DataGeneralLaboratorio[]> => {
  const response: AxiosResponse<ResponseServer<DataGeneralLaboratorio[]>> =
    await api.get<ResponseServer<DataGeneralLaboratorio[]>>(
      `hidrico/bibliotecas/resultados_laboratorio/get-by-instrumento/${id_instrumento}/`
    );
  return response.data.data;
};
export const get_data_resulatado_laboratorio_id = async (
  id_dato_registro_laboratorio: number,
  tipo_parametro: string,
): Promise<Resultadolaboratorio[]> => {
  const response: AxiosResponse<ResponseServer<Resultadolaboratorio[]>> =
    await api.get<ResponseServer<Resultadolaboratorio[]>>(
      `hidrico/bibliotecas/dato_registro_laboratorio/get-by-resultado/${id_dato_registro_laboratorio}/${tipo_parametro}/}`
    );
  return response.data.data;
};
export const get_data_resulatado_pozo_id = async (
  id_pozo: number,
): Promise<ParametrosId[]> => {
  const response: AxiosResponse<ResponseServer<ParametrosId[]>> =
    await api.get<ResponseServer<ParametrosId[]>>(
      `hidrico/bibliotecas/pozos/get-id/${id_pozo}/}`
    );
  return response.data.data;
};