import { AxiosResponse } from 'axios';
import { api } from '../../../../api/axios';
import type {
  IMedicion,
  ITipos,
} from '../../configuraciones/interfaces/interfaces';
import type {
  IProductos,
  Indicadores,
  IPlanes,
  IActividades,
  IProyectos,
} from '../../types/types';
import { ResponseServer } from '../../../../interfaces/globalModels';
import {
  IBusquedaAvanzadaActividad,
  IBusquedaIndicador,
} from '../components/Programas/BusquedaAvanzada/types';
import { IBusquedaMetas } from '../../MetasPorIndicador/components/Indicadores/BusquedaAvanzada/types';

// ! Indicadores
// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_indicadores = async (): Promise<Indicadores[]> => {
  const response = await api.get(`seguimiento/planes/consultar-indicadores/`);
  return response.data.data;
};

export const get_productos = async (): Promise<IProductos[]> => {
  const response = await api.get(`seguimiento/planes/consultar-productos/`);
  return response.data.data;
};

export const get_planes = async (): Promise<IPlanes[]> => {
  const response = await api.get(`seguimiento/planes/consultar-planes/`);
  return response.data.data;
};

export const get_actividades = async (): Promise<IActividades[]> => {
  const response = await api.get(`seguimiento/planes/consultar-actividades/`);
  return response.data.data;
};
export const get_medidor = async (): Promise<IMedicion[]> => {
  const response = await api.get(`seguimiento/planes/consultar-mediciones/`);
  return response.data.data;
};

export const get_tipos = async (): Promise<ITipos[]> => {
  const response = await api.get(`seguimiento/planes/consultar-tipos/`);
  return response.data.data;
};

export const get_proyectos = async (): Promise<IProyectos[]> => {
  const response = await api.get(`seguimiento/planes/consultar-proyectos/`);
  return response.data.data;
};

// Busqueda avanzada Proyectos

export const search_actividades = async ({
  nombre_programa,
  nombre_plan,
  nombre_proyecto,
  nombre_producto,
  nombre_actividad,
}: any): Promise<
  AxiosResponse<ResponseServer<IBusquedaAvanzadaActividad[]>>
> => {
  const url = `seguimiento/planes/busqueda-avanzada-actividades/?nombre_programa=${String(
    nombre_programa ?? ''
  )}&nombre_plan=${String(nombre_plan ?? '')}&nombre_proyecto=${String(
    nombre_proyecto ?? ''
  )}&nombre_producto=${String(nombre_producto ?? '')}&nombre_actividad=${String(
    nombre_actividad ?? ''
  )}`;
  return await api.get<ResponseServer<IBusquedaAvanzadaActividad[]>>(url);
};

// busqueda avanzada indicadores

export const search_indicadores = async ({
  nombre_programa,
  nombre_plan,
  nombre_proyecto,
  nombre_producto,
  nombre_actividad,
  nombre_indicador,
}: any): Promise<AxiosResponse<ResponseServer<IBusquedaIndicador[]>>> => {
  const url = `seguimiento/planes/busqueda-avanzada-indicadores/?nombre_programa=${String(
    nombre_programa ?? ''
  )}&nombre_plan=${String(nombre_plan ?? '')}&nombre_proyecto=${String(
    nombre_proyecto ?? ''
  )}&nombre_producto=${String(nombre_producto ?? '')}&nombre_actividad=${String(
    nombre_actividad ?? ''
  )}&nombre_indicador=${String(nombre_indicador ?? '')}`;
  return await api.get<ResponseServer<IBusquedaIndicador[]>>(url);
};

// busqueda avanzada metas

export const search_metas = async ({
  nombre_programa,
  nombre_plan,
  nombre_proyecto,
  nombre_producto,
  nombre_actividad,
  nombre_indicador,
  nombre_meta,
}: any): Promise<AxiosResponse<ResponseServer<IBusquedaMetas[]>>> => {
  const url = `seguimiento/planes/busqueda-avanzada-metas/?nombre_programa=${String(
    nombre_programa ?? ''
  )}&nombre_plan=${String(nombre_plan ?? '')}&nombre_proyecto=${String(
    nombre_proyecto ?? ''
  )}&nombre_producto=${String(nombre_producto ?? '')}&nombre_actividad=${String(
    nombre_actividad ?? ''
  )}&nombre_indicador=${String(nombre_indicador ?? '')}&nombre_meta=${String(
    nombre_meta ?? ''
  )}`;
  return await api.get<ResponseServer<IBusquedaMetas[]>>(url);
};

// ? ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_indicador = async (
  data: Indicadores
): Promise<Indicadores> => {
  const response = await api.post(
    `seguimiento/planes/crear-indicadores/`,
    data
  );
  return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_indicador = async (
  id_indicador: number,
  data: Indicadores
): Promise<Indicadores> => {
  const response = await api.put(
    `seguimiento/planes/actualizar-indicadores/${id_indicador}/`,
    data
  );
  return response.data;
};
