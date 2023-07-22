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
export const post_seccion_subscción = async (
  form: any,
  rows_resgister_subseccion: any
): Promise<any> => {
  const new_array = [
    ...rows_resgister_subseccion,

    form.nombre_subseccion === '' || form.descripcion_subseccion === ''
      ? null
      : {
          nombre: form.nombre_subseccion,
          descripcion: form.descripcion_subseccion,
        },
  ];

  const filtered_array = new_array.filter((item: any) => item !== null);

  const response = await api.post(
    'hidrico/bibliotecas/secciones-subsecciones/create/',
    {
      ...form,
      id_seccion: form.id_seccion,
      nombre: form.nombre_seccion,
      descripcion: form.descripcion_seccion,
      fecha_creacion: form.fecha_creacion,
      subsecciones:
        rows_resgister_subseccion.length === 0 ? [] : filtered_array,
    }
  );

  return response.data;
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
