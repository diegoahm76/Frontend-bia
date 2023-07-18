/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import dayjs from "dayjs";
import { api } from "../../../../api/axios";
import type { ResponseServer } from "../../../../interfaces/globalModels";
import type { AxiosResponse } from "axios";
import type { BusquedaAvanzada, BusquedaPorhI, InfoPorh } from "../Interfaces/interfaces";


export const get_data_id = async (id: number, set_data: any, url: string): Promise<any[]> => {
  const { data } = await api.get<ResponseServer<any[]>>(
    `hidrico/programas/${url}/${id}/`
  );
  set_data(data.data);
  return data.data;
};

export const eliminar_id = async (id: number, url: string): Promise<any> => {
  return await api.delete(`hidrico/programas/${url}/${id}/`);
};

// post 
export const post_programa = async (
  form: any,
  proyectos: any,
): Promise<any> => {

  const response = await api.post(
    'hidrico/programas/programa/recurso/hidrico/create/',
    {
      ...form,
      id_instrumento: form.id_instrumento,
      id_programa: form.id_programa,
      nombre: form.nombre_programa,
      fecha_inicio: dayjs(form.fecha_inicio).format('YYYY-MM-DD'),
      fecha_fin: dayjs(form.fecha_fin).format('YYYY-MM-DD'),
      proyectos
    }
  );

  return response.data;
};

export const post_actividades = async (
  form: any,
  rows_actividades: any[]
): Promise<any> => {
  const actividad = [
    ...rows_actividades,
    form.descripcion === '' ? null : {
      nombre: form.descripcion,
    }
  ];

  const filtered_array = actividad.filter((item: any) => item !== null);

  const proyecto = form.nombre ? [{
    id_proyecto: form.id_proyecto,
    actividades: filtered_array,
  }] : [];

  const response = await api.post(
    'hidrico/programas/programa/recurso/hidrico/create/',
    {
      id_programa: form.id_programa,
      proyectos: proyecto,
    }
  );

  return response.data;
}

export const editar_programa = async (
  id_programa: number,
  datos: any
): Promise<any> => {
  const response = await api.put(
    `hidrico/programas/actualizar/programa/${id_programa}/`,
    {
      ...datos,
      id_instrumento: datos.id_instrumento,
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

export const search_avanzada_porh = async ({
  nombre_PORH,
}: BusquedaAvanzada): Promise<AxiosResponse<ResponseServer<BusquedaPorhI[]>>> => {
  const url = `hidrico/programas/programasporh/get-busqueda-avanzada/?nombre=${String(nombre_PORH ?? '')}`;
  return await api.get<ResponseServer<BusquedaPorhI[]>>(url);
};



