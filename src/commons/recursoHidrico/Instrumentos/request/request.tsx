/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type AxiosResponse } from 'axios';
import { api } from '../../../../api/axios';
import { type ResponseServer } from '../../../../interfaces/globalModels';
import type {
  BusquedaInstrumentos,
  IpropsInstrumentos,
} from '../interfaces/interface';
import type {
  Parametros,
  Pozo,
} from '../../configuraciones/interfaces/interfaces';
import dayjs from 'dayjs';
// import { useAppDispatch } from '../../../../hooks';
// import { set_currente_id_resultado_laboratorio } from '../toolkit/slice/instrumentosSlice';

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
