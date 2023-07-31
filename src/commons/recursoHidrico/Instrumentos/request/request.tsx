/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type AxiosResponse } from 'axios';
import { api } from '../../../../api/axios';
import { type ResponseServer } from '../../../../interfaces/globalModels';
import type {
  BusquedaInstrumentos,
  CuencasId,
  IpropsInstrumentos,
} from '../interfaces/interface';
import type {
  Parametros,
  Pozo,
} from '../../configuraciones/interfaces/interfaces';
import dayjs from 'dayjs';

export const search_seccion_subseccion = async ({
  nombre_seccion,
  nombre_subseccion,
}: any): Promise<AxiosResponse<ResponseServer<any[]>>> => {
  const url = `hidrico/bibliotecas/subsecciones/get-busqueda-avanzada/?nombre_seccion=${String(
    nombre_seccion ?? ''
  )}&nombre_subseccion=${String(nombre_subseccion ?? '')}`;
  return await api.get<ResponseServer<any[]>>(url);
};
// agregar instrumento
export const agregar_instrumento = async (datos: FormData): Promise<any> => {
  const response = await api.post(
    `hidrico/bibliotecas/instrumentos/create/`,
    datos
  );
  return response.data;
};

// editar instrumento

export const editar_instrumento = async (
  id_instrumento: number,
  datos: FormData
): Promise<any> => {
  const response = await api.put(
    `hidrico/bibliotecas/instrumentos/update/${id_instrumento}/`,
    datos
  );
  return response.data;
};
export const search_instrumento = async ({
  nombre_seccion,
  nombre_subseccion,
  nombre_instrumento,
}: IpropsInstrumentos): Promise<
  AxiosResponse<ResponseServer<BusquedaInstrumentos[]>>
> => {
  const url = `hidrico/bibliotecas/instrumentos/get-busqueda-avanzada/?nombre_seccion=${String(
    nombre_seccion ?? ''
  )}&nombre_subseccion=${String(
    nombre_subseccion ?? ''
  )}&nombre_instrumento=${String(nombre_instrumento ?? '')}`;
  return await api.get<ResponseServer<BusquedaInstrumentos[]>>(url);
};
export const get_pozo_id = async (id_pozo: number): Promise<Pozo[]> => {
  const response = await api.get(
    `/hidrico/bibliotecas/pozos/get-id/${id_pozo}`
  );
  const data = response.data.data;
  return data ?? [];
};

export const get_parametros_laboratorio = async (
  cod_tipo_parametro: string
): Promise<Parametros[]> => {
  const response = await api.get(
    `/hidrico/bibliotecas/parametros_laboratorio/get/?activo=True&cod_tipo_parametro=${cod_tipo_parametro}`
  );
  const data = response.data.data;
  return data ?? [];
};

export const post_resultado_laboratorio = async (
  form: any,
  rows_registro_laboratorio: any,
  datos: FormData
): Promise<any> => {
  const new_array = [
    ...rows_registro_laboratorio,

    form.id_registro_laboratorio === null ||
    form.id_parametro === null ||
    form.metodo === '' ||
    form.resultado === '' ||
    form.fecha_analisis === ''
      ? null
      : {
          id_registro_laboratorio: form.id_registro_laboratorio,
          id_parametro: form.id_parametro,
          metodo: form.metodo,
          resultado: form.resultado,
          fecha_analisis: dayjs(form.fecha_analisis).format('YYYY-MM-DD'),
        },
  ];

  const filtered_array = new_array.filter((item: any) => item !== null);

  const response = await api.post(
    'hidrico/bibliotecas/resultados_laboratorio/create/',
    {
      ...form,
      id_resultado_laboratorio: form.id_resultado_laboratorio,
      id_instrumento: form.id_instrumento,
      id_cuenca: form.id_cuenca,
      id_pozo: form.id_pozo,
      descripcion: form.descripcion,
      lugar_muestra: form.lugar_muestra,
      cod_clase_muestra: form.cod_clase_muestra,
      fecha_analisis: dayjs(form.fecha_analisis).format('YYYY-MM-DD'),
      fecha_toma_muestra: dayjs(form.fecha_toma_muestra).format('YYYY-MM-DD'),
      fecha_resultados_lab: dayjs(form.fecha_resultados_lab).format(
        'YYYY-MM-DD'
      ),
      fecha_envio_lab: dayjs(form.fecha_envio_lab).format('YYYY-MM-DD'),
      latitud: form.latitud,
      longitud: form.longitud,
      datos_registro_laboratorio:
        rows_registro_laboratorio.length === 0 ? [] : filtered_array,
    }
  );
  console.log(
    response.data.data.resultados_laboratorio.id_resultado_laboratorio
  );

  // const dispatch = useAppDispatch();

  // Verify that all properties exist
  if (response.data.data.resultados_laboratorio.id_resultado_laboratorio) {
    const id_resultado_laboratorio =
      response.data.data.resultados_laboratorio.id_resultado_laboratorio;

    // dispatch(set_currente_id_resultado_laboratorio(id_resultado_laboratorio));

    // Append id_resultado_laboratorio to datos
    datos.append('id_resultado_laboratorio', id_resultado_laboratorio);

    const response_archivos = await api.post(
      `hidrico/bibliotecas/archivos_instrumento/create/`,
      datos
    );

    return {
      reponse_general: response.data,
      response_archivos: response_archivos.data,
    };
  } else {
    throw new Error('id_resultado_laboratorio is missing in the response');
  }
};

export const post_resultado_aforo = async (
  form: any,
  rows_registro_aforo: any,
  datos: FormData
): Promise<any> => {
  const new_array = [
    ...rows_registro_aforo,

    form.id_cartera_aforos === null ||
    form.distancia_a_la_orilla === null ||
    form.profundidad === '' ||
    form.velocidad_superficial === '' ||
    form.velocidad_profunda === '' ||
    form.transecto === '' ||
    form.profundidad_promedio === '' ||
    form.velocidad_promedio === '' ||
    form.velocidad_transecto === '' ||
    form.caudal === ''
      ? null
      : {
          id_cartera_aforos: form.id_cartera_aforos,
          distancia_a_la_orilla: form.distancia_a_la_orilla,
          profundidad: form.profundidad,
          velocidad_superficial: form.velocidad_superficial,
          velocidad_profunda: form.velocidad_profunda,
          transecto: form.transecto,
          profundidad_promedio: form.profundidad_promedio,
          velocidad_promedio: form.velocidad_promedio,
          velocidad_transecto: form.velocidad_transecto,
          caudal: form.caudal,
        },
  ];

  const filtered_array = new_array.filter((item: any) => item !== null);

  const response = await api.post(
    'hidrico/bibliotecas/carteras_aforo/create/',
    {
      ...form,
      id_cartera_aforos: form.id_cartera_aforos,
      id_instrumento: form.id_instrumento,
      id_cuenca: form.id_cuenca,
      ubicacion_aforo: form.ubicacion_aforo,
      descripcion: form.descripcion,
      latitud: form.latitud,
      longitud: form.longitud,
      fecha_aforo: dayjs(form.fecha_aforo).format('YYYY-MM-DDTHH:mm:ss'),
      cod_tipo_aforo: form.cod_tipo_aforo,
      numero_serie: form.numero_serie,
      numero_helice: form.numero_helice,
      datos_cartera_aforo:
        rows_registro_aforo.length === 0 ? [] : filtered_array,
    }
  );

  console.log(
    response?.data?.data?.cartera_aforo?.data?.id_cartera_aforos,
    'data.data.cartera_aforo'
  );
  // Verify that all properties exist
  if (response?.data?.data?.cartera_aforo?.data?.id_cartera_aforos) {
    const id_cartera_aforos =
      response?.data?.data?.cartera_aforo?.data?.id_cartera_aforos;

    // Append id_cartera_aforos to datos
    datos.append('id_cartera_aforos', id_cartera_aforos);

    const response_archivos = await api.post(
      `hidrico/bibliotecas/archivos_instrumento/create/`,
      datos
    );

    return {
      reponse_general: response.data,
      response_archivos: response_archivos.data,
    };
  } else {
    throw new Error('id_cartera_aforos is missing in the response');
  }
};

  export const get_cuenca_id = async (
    id_cuenca: number,
  ): Promise<CuencasId[]> => {
    const response: AxiosResponse<ResponseServer<CuencasId[]>> =
      await api.get<ResponseServer<CuencasId[]>>(
        `hidrico/bibliotecas/cuencas/get-id/${id_cuenca}/`
      );
    return response.data.data;
  };