/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import dayjs from "dayjs";
import { api } from "../../../../api/axios";
import type { ResponseServer } from "../../../../interfaces/globalModels";
import type { AxiosResponse } from "axios";
import type { BusquedaAvanzada, InfoPorh } from "../Interfaces/interfaces";


export const get_data_id = async (id: number, set_data: any, url: string): Promise<any[]> => {
  const { data } = await api.get<ResponseServer<any[]>>(
    `hidrico/programas/${url}/${id}/`
  );
  set_data(data.data);
  return data.data;
};

// post 
export const post_programa = async (
  form: any,
  set_data: any,
  programas: any,
  proyectos: any,
  actividades: any[]
): Promise<any> => {
  const proyecto = {
    id_proyecto: form.id_proyecto,
    nombre: form.nombre,
    vigencia_inicial: dayjs(form.vigencia_inicial).format('YYYY-MM-DD'),
    vigencia_final: dayjs(form.vigencia_final).format('YYYY-MM-DD'),
    inversion: form.inversion,
    actividades: form.descripcion ? [{ nombre: form.descripcion }] : [],
  };

  const nuevos_proyectos = [...proyectos, proyecto];

  const response = await api.post(
    'hidrico/programas/programa/recurso/hidrico/create/',
    {
      ...form,
      id_programa: form.id_programa,
      nombre: form.nombre_programa,
      fecha_inicio: dayjs(form.fecha_inicio).format('YYYY-MM-DD'),
      fecha_fin: dayjs(form.fecha_fin).format('YYYY-MM-DD'),
      proyectos: nuevos_proyectos,
    }
  );

  // set_data([...programas, response.data]);
  return response.data;
};

export const editar_programa = async (
  id_programa: number,
  datos: any
): Promise<any> => {
  const response = await api.put(
    `hidrico/programas/actualizar/programa/${id_programa}/`,
    {
      ...datos,
      nombre: datos.nombre_programa,
      fecha_inicio: dayjs(datos.fecha_inicio,).format('YYYY-MM-DD'),
      fecha_fin: dayjs(datos.fecha_fin,).format('YYYY-MM-DD'),
    }
  );
  return response.data;
};
export const editar_proyecto = async (
  id_proyecto: number,
  datos: any
): Promise<any> => {
  const response = await api.put(
    `hidrico/programas/actualizar/proyecto/${id_proyecto}/`,
    {
      ...datos,
      nombre: datos.nombre,
      vigencia_inicial: dayjs(datos.vigencia_inicial,).format('YYYY-MM-DD'),
      vigencia_final: dayjs(datos.vigencia_final,).format('YYYY-MM-DD'),
      inversion: datos.inversion,
    }
  );
  return response.data;
};

export const editar_activdad = async (
  id_actividad: number,
  datos: any
): Promise<any> => {
  const response = await api.put(
    `hidrico/programas/actualizar/actividad/${id_actividad}/`,
    {
      ...datos,
      nombre: datos.descripcion,
    }
  );
  return response.data;
};
export const search_avanzada = async ({
  nombre_proyecto,
  nombre_programa,
  nombre_PORH,
}: BusquedaAvanzada): Promise<AxiosResponse<ResponseServer<InfoPorh[]>>> => {
  const url = `hidrico/programas/get/avanzada/programas/?nombre_proyecto=${String(nombre_proyecto ?? '')}&nombre_programa=${String(nombre_programa ?? '')}&nombre_PORH=${String(nombre_PORH ?? '')}`;
  return await api.get<ResponseServer<InfoPorh[]>>(url);
};


