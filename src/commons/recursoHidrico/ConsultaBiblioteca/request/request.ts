import { type AxiosResponse } from 'axios';
import { api } from '../../../../api/axios';
import { type ResponseServer } from '../../../../interfaces/globalModels';
import type {
  Archivos,
  BusquedaArchivo,
  BusquedaBasica,
  CuencasInstrumentos,
  DataCarteraAforo,
  DataGeneralAforo,
  DataGeneralBombeo,
  DataGeneralLaboratorio,
  DatoSesionBombeo,
  GeneralSesionBombeo,
  IntrumentosId,
  Laboratorio,
  ParametrosId,
  // Resultadolaboratorio,
} from '../interfaces/interfaces';
import type { Pozo } from '../../configuraciones/interfaces/interfaces';
import type { ArchivosCalidadAgua } from '../../Instrumentos/interfaces/interface';

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
export const get_archivos_laboratorio = async (
  id_laboratorio: number
): Promise<ArchivosCalidadAgua[]> => {
  const response: AxiosResponse<ResponseServer<ArchivosCalidadAgua[]>> = await api.get<
    ResponseServer<ArchivosCalidadAgua[]>
  >(
    `hidrico/bibliotecas/archivos_instrumento/get-by-resultado_laboratorio/${id_laboratorio}/`
  );
  return response.data.data;
};
export const get_archivos_cartera = async (
  id_cartera: number
): Promise<ArchivosCalidadAgua[]> => {
  const response: AxiosResponse<ResponseServer<ArchivosCalidadAgua[]>> = await api.get<
    ResponseServer<ArchivosCalidadAgua[]>
  >(
    `hidrico/bibliotecas/archivos_instrumento/get-by-cartera-aforo/${id_cartera}/`
  );
  return response.data.data;
};
export const get_archivos_prueba_bombeo = async (
  id_prueba: number
): Promise<ArchivosCalidadAgua[]> => {
  const response: AxiosResponse<ResponseServer<ArchivosCalidadAgua[]>> = await api.get<
    ResponseServer<ArchivosCalidadAgua[]>
  >(
    `hidrico/bibliotecas/archivos_instrumento/get-by-prueba_bombeo/${id_prueba}/`
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
  parametro: string
): Promise<Laboratorio[]> => {
  const response: AxiosResponse<ResponseServer<Laboratorio[]>> =
    await api.get<ResponseServer<Laboratorio[]>>(
      `hidrico/bibliotecas/dato_registro_laboratorio/get-by-resultado/${id_dato_registro_laboratorio}/${parametro}/`
    );
  return response.data.data;
};
export const get_data_parametro_id = async (
  id_parametro: number,
): Promise<ParametrosId[]> => {
  const response: AxiosResponse<ResponseServer<ParametrosId[]>> =
    await api.get<ResponseServer<ParametrosId[]>>(
      `hidrico/bibliotecas/parametros_laboratorio/get-id/${id_parametro}/}`
    );
  return response.data.data;
};
export const get_data_cartera_id = async (
  id_instrumento: number,
): Promise<DataGeneralAforo[]> => {
  const response: AxiosResponse<ResponseServer<DataGeneralAforo[]>> =
    await api.get<ResponseServer<DataGeneralAforo[]>>(
      `hidrico/bibliotecas/carteras_aforo/get-by-instrumento/${id_instrumento}/`
    );
  return response.data.data;
};
export const get_data_cartera = async (
  id_cartera: number,
): Promise<DataCarteraAforo[]> => {
  const response: AxiosResponse<ResponseServer<DataCarteraAforo[]>> =
    await api.get<ResponseServer<DataCarteraAforo[]>>(
      `hidrico/bibliotecas/datos_cartera_aforos/get-by-cartera-aforos/${id_cartera}/`
    );
  return response.data.data;
};
export const get_data_bombeo_general = async (
  id_instrumento: number,
): Promise<DataGeneralBombeo[]> => {
  const response: AxiosResponse<ResponseServer<DataGeneralBombeo[]>> =
    await api.get<ResponseServer<DataGeneralBombeo[]>>(
      `hidrico/bibliotecas/pruebas_bombeo/get-by-instrumento/${id_instrumento}/`
    );
  return response.data.data;
};
export const get_data_sesion_bombeo_general = async (
  id_prueba_bombeo: number,
): Promise<GeneralSesionBombeo[]> => {
  const response: AxiosResponse<ResponseServer<GeneralSesionBombeo[]>> =
    await api.get<ResponseServer<GeneralSesionBombeo[]>>(
      `hidrico/bibliotecas/sesiones_prueba_bombeo/get-by-prueba-bombeo/${id_prueba_bombeo}/`
    );
  return response.data.data;
};
export const get_data_sesion_bombeo = async (
  id_sesion_prueba_bombeo: number,
): Promise<DatoSesionBombeo[]> => {
  const response: AxiosResponse<ResponseServer<DatoSesionBombeo[]>> =
    await api.get<ResponseServer<DatoSesionBombeo[]>>(
      `hidrico/bibliotecas/datos_sesiones_prueba_bombeo/get-by-sesion/${id_sesion_prueba_bombeo}/`
    );
  return response.data.data;
};