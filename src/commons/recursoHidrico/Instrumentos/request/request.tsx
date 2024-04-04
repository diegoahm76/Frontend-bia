/* eslint-disable @typescript-eslint/naming-convention */
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
  datos: FormData,
  archivo: any
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
          id_resultado_laboratorio: form.id_resultado_laboratorio,
          id_registro_laboratorio: form.id_registro_laboratorio,
          id_parametro: form.id_parametro,
          metodo: form.metodo,
          resultado: form.resultado,
          fecha_analisis: dayjs(form.fecha_analisis).format('YYYY-MM-DD'),
        },
  ];

  const filtered_array = new_array.filter((item: any) => item);

  const response = await api.post(
    'hidrico/bibliotecas/resultados_laboratorio/create/',
    {
      ...form,
      id_resultado_laboratorio: form.id_resultado_laboratorio,
      id_registro_laboratorio: form.id_registro_laboratorio,
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
  if (
    archivo.length > 0 &&
    archivo[0] !== null &&
    response.data.data.resultados_laboratorio.id_resultado_laboratorio
  ) {
    const id_resultado_laboratorio =
      response.data.data.resultados_laboratorio.id_resultado_laboratorio;
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
    return response.data;
  }
};

export const put_resultado_laboratorio = async (
  form: any,
  rows_registro_laboratorio: any,
  datos: FormData,
  archivo: any
): Promise<any> => {
  const id_resultado_laboratorio = form.id_resultado_laboratorio;
  const new_array = [
    ...rows_registro_laboratorio,

    form.id_parametro === null ||
    form.metodo === '' ||
    form.resultado === '' ||
    form.fecha_analisis === '' ||
    form.id_registro_laboratorio === null // Agregar una verificación adicional para asegurarse de que el id_registro_laboratorio no sea nulo
      ? null
      : {
          id_dato_registro_laboratorio: form.id_dato_registro_laboratorio,
          id_registro_laboratorio: form.id_registro_laboratorio,
          id_parametro: form.id_parametro,
          metodo: form.metodo,
          resultado: form.resultado,
          fecha_analisis: dayjs(form.fecha_analisis).format('YYYY-MM-DD'),
        },
  ];

  const filtered_array = new_array.filter((item: any) => item);

  const response = await api.put(
    `hidrico/bibliotecas/resultados_laboratorio/update/${
      id_resultado_laboratorio as number
    }/`,
    {
      ...form,
      id_dato_registro_laboratorio: form.id_dato_registro_laboratorio,
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
  if (archivo.length > 0 && archivo[0] !== null && id_resultado_laboratorio) {
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
    return response.data;
  }
};

export const post_resultado_aforo = async (
  form: any,
  rows_registro_aforo: any,
  datos: FormData,
  archivo: any
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

  const filtered_array = new_array.filter((item: any) => item);

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

  if (
    archivo.length > 0 &&
    archivo[0] !== null &&
    response?.data?.data?.cartera_aforo?.data?.id_cartera_aforos
  ) {
    const id_cartera_aforos =
      response?.data?.data?.cartera_aforo?.data?.id_cartera_aforos;

    // Append id_cartera_aforos to datos
    datos.append('id_cartera_aforo', id_cartera_aforos);

    const response_archivos = await api.post(
      `hidrico/bibliotecas/archivos_instrumento/create/`,
      datos
    );

    return {
      reponse_general: response.data,
      response_archivos: response_archivos.data,
    };
  } else {
    return {
      reponse_general: response.data,
    };
  }
};
export const put_resultado_aforo_select = async (
  form: any,
  rows_registro_aforo: any,
  datos: FormData,
  archivos: any
): Promise<any> => {
  const id_cartera_aforos = form.id_cartera_aforos;
  //  console.log('')(archivos, 'archivos');
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
          id_dato_cartera_aforos: form.id_dato_cartera_aforos,
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

  const filtered_array = new_array.filter((item: any) => item);

  const response = await api.put(
    `hidrico/bibliotecas/carteras_aforo/update/${id_cartera_aforos as number}/`,
    {
      ...form,
      id_cartera_aforos: form.id_cartera_aforos,
      id_instrumento: form.id_instrumento,
      id_dato_cartera_aforos: form.id_dato_cartera_aforos,
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

  if (archivos.length > 0 && archivos[0] !== null && id_cartera_aforos) {
    // const id_cartera_aforos = form.id_cartera_aforos;
    //  console.log('')(archivos, 'archivos');
    //  console.log('')(id_cartera_aforos, 'id_cartera_aforos');

    // Append id_cartera_aforos to datos
    datos.append('id_cartera_aforo', id_cartera_aforos);

    const response_archivos = await api.post(
      `hidrico/bibliotecas/archivos_instrumento/create/`,
      datos
    );

    return {
      reponse_general: response.data,
      response_archivos: response_archivos.data,
    };
  } else {
    return {
      reponse_general: response.data,
    };
  }
};

export const post_prueba_bombeo = async (
  form: any,
  secciones_prueba_bombeo: any,
  datos_prueba_bombeo: any,
  datos: FormData,
  archivo: any
): Promise<any> => {
  // Crear un nuevo array con los datos de la prueba de bombeo
  const new_array = secciones_prueba_bombeo.map((seccion: any) => ({
    id_sesion_prueba_bombeo: seccion.id_sesion_prueba_bombeo,
    hora_inicio: seccion.hora_inicio,
    cod_tipo_sesion: seccion.cod_tipo_sesion,
    datos_prueba_bombeo: datos_prueba_bombeo.map((dato: any) => ({
      tiempo_transcurrido: Number(dato.tiempo_transcurrido),
      nivel: Number(dato.nivel),
      resultado: Number(dato.resultado),
      caudal: Number(dato.caudal),
    })),
  }));

  // Validation before request
  const validated_array = new_array.filter(
    (item: any) =>
      item.id_sesion_prueba_bombeo !== null &&
      item.hora_inicio !== null &&
      item.cod_tipo_sesion !== '' &&
      item.datos_prueba_bombeo.every(
        (dato: any) =>
          dato.tiempo_transcurrido !== '' &&
          dato.nivel !== '' &&
          dato.resultado !== '' &&
          dato.caudal !== ''
      )
  );

  // API call
  const response = await api.post(
    'hidrico/bibliotecas/pruebas_bombeo/create/',
    {
      ...form,
      id_prueba_bombeo: form.id_prueba_bombeo,
      id_instrumento: form.id_instrumento,
      id_pozo: form.id_pozo,
      descripcion: form.descripcion,
      cod_tipo_sesion: form.cod_tipo_sesion,
      latitud: form.latitud,
      longitud: form.longitud,
      fecha_prueba_bombeo: dayjs(form.fecha_prueba_bombeo).format('YYYY-MM-DD'),
      ubicacion_prueba: form.ubicacion_prueba,
      secciones_prueba_bombeo: validated_array,
    }
  );

  // If there's an attached file, make another post request
  if (
    archivo.length > 0 &&
    archivo[0] !== null &&
    response?.data?.data?.prueba_bombeo?.data?.id_prueba_bombeo
  ) {
    const id_prueba_bombeo =
      response?.data?.data?.prueba_bombeo?.data?.id_prueba_bombeo;

    // Append id_prueba_bombeo to datos
    datos.append('id_prueba_bombeo', id_prueba_bombeo);

    const response_archivos = await api.post(
      `hidrico/bibliotecas/archivos_instrumento/create/`,
      datos
    );

    return {
      reponse_general: response.data,
      response_archivos: response_archivos.data,
    };
  } else {
    return {
      reponse_general: response.data,
    };
  }
};

export const get_cuenca_id = async (
  id_cuenca: number
): Promise<CuencasId[]> => {
  const response: AxiosResponse<ResponseServer<CuencasId[]>> = await api.get<
    ResponseServer<CuencasId[]>
  >(`hidrico/bibliotecas/cuencas/get-id/${id_cuenca}/`);
  return response.data.data;
};

export const post_archivos = async (datos: FormData): Promise<any> => {
  const response_archivos = await api.post(
    `hidrico/bibliotecas/archivos_instrumento/create/`,
    datos
  );
  return response_archivos.data;
};

export const put_archivos = async (
  id_archivo: number,
  nombre_archivo: string
): Promise<any> => {
  const response = await api.put(
    `hidrico/bibliotecas/archivos_instrumento/update/${id_archivo}/`,
    {
      nombre_archivo,
    }
  );
  return response.data;
};
export const put_general_bombeo = async (
  id_prueba_bombeo: number,
  datos: any
): Promise<any> => {
  //  console.log('')(datos, 'datos');
  const dataGeneral = {
    ...datos,
  };
  const response = await api.put(
    `hidrico/bibliotecas/pruebas_bombeo/update/${id_prueba_bombeo}/`,
    dataGeneral
  );
  return response.data;
};
export const put_sesion_bombeo = async (
  id_sesion: number,
  datos: any
): Promise<any> => {
  const response = await api.put(
    `hidrico/bibliotecas/sesiones_prueba_bombeo/update/${id_sesion}/`,
    datos
  );
  return response.data;
};
export const put_datos_sesion_bombeo = async (
  id_dato_sesion: number,
  datos: any
): Promise<any> => {
  const response = await api.put(
    `hidrico/bibliotecas/datos_sesiones_prueba_bombeo/update/${id_dato_sesion}/`,
    datos
  );
  return response.data;
};

// * <---------------------  DELETE --------------------->

// ? instrumentos
export const delete_instrumeto = async (
  id_instrumento: number
): Promise<any> => {
  const response = await api.delete(
    `hidrico/bibliotecas/instrumentos/delete/${id_instrumento}/`
  );
  return response.data;
};
// ? Carteras de aforo
export const delete_cartera_aforo = async (
  id_cartera_aforo: number
): Promise<any> => {
  const response = await api.delete(
    `hidrico/bibliotecas/cartera_aforos/delete/${id_cartera_aforo}/`
  );
  return response.data;
};
export const delete_dato_cartera_aforo = async (
  id_dato_cartera_aforo: number
): Promise<any> => {
  const response = await api.delete(
    `hidrico/bibliotecas/cartera_aforos/delete/${id_dato_cartera_aforo}/`
  );
  return response.data;
};
// ? pruebas de bombeo y sesiones
export const delete_prueba_bombeo = async (
  id_prueba_bombeo: number
): Promise<any> => {
  const response = await api.delete(
    `hidrico/bibliotecas/pruebas_bombeo/delete/${id_prueba_bombeo}/`
  );
  return response.data;
};
export const delete_sesion_prueba_bombeo = async (
  id_sesion_prueba_bombeo: number
): Promise<any> => {
  const response = await api.delete(
    `hidrico/bibliotecas/sesiones_prueba_bombeo/delete/${id_sesion_prueba_bombeo}/`
  );
  return response.data;
};
export const delete_dato_sesion_prueba_bombeo = async (
  id_dato_sesion_prueba_bombeo: number
): Promise<any> => {
  const response = await api.delete(
    `hidrico/bibliotecas/datos_sesiones_prueba_bombeo/delete/${id_dato_sesion_prueba_bombeo}/`
  );
  return response.data;
};
// ? resultados de laboratorio
export const delete_resultado_laboratorio = async (
  id_resultado_laboratorio: number
): Promise<any> => {
  const response = await api.delete(
    `hidrico/bibliotecas/resultados_laboratorio/delete/${id_resultado_laboratorio}/`
  );
  return response.data;
};
export const delete_dato_registro_laboratorio = async (
  id_dato_registro_laboratorio: number
): Promise<any> => {
  const response = await api.delete(
    `hidrico/bibliotecas/dato_registro_laboratorio/delete/${id_dato_registro_laboratorio}/`
  );
  return response.data;
};
