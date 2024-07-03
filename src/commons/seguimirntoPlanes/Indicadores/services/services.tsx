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
import { IBusquedaPLanes } from '../../Planes/components/Planes/BusquedaAvanzada/types';
import { IBusquedaObjetivos, IBusquedaPlanes, IBusquedaProgramas } from '../../Programas/components/Programas/BusquedaAvanzada/types';
import { IBusquedaProyecto } from '../../Proyectos/components/Proyectos/BusquedaAvanzada/types';
import { IBusquedaProductos } from '../../Productos/components/Programas/BusquedaAvanzada/types';
import { IBusquedaFuenteIndicador } from '../../FinanciaciónIndicadores/components/Components/BusquedaAvanzada/types';
import { IBusquedaEjeEstrategico } from '../../EjeEstrategico/components/EjeEstrategico/BusquedaAvanzada/types';
import { IBusquedaSubprograma } from '../../Subprogramas/components/BusquedaAvanzada copy/types';

// ! Indicadores
// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_indicadores = async (): Promise<Indicadores[]> => {
  const response = await api.get(`seguimiento/planes/consultar-indicadores/`);
  return response.data.data;
};

// * indicadores por id producto

export const get_indicadores_id_actividad = async (
  id_actividad: number
): Promise<Indicadores[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-indicadores-id-actividad/${id_actividad}/`
  );
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
  nombre_eje,
  nombre_meta,
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

// busqueda avanzada plan, solo es por nombre plan

export const search_plan = async ({
  nombre_plan,
}: any): Promise<AxiosResponse<ResponseServer<IBusquedaPLanes[]>>> => {
  const url = `seguimiento/planes/busqueda-avanzada-planes/?nombre_plan=${String(
    nombre_plan ?? ''
  )}`;
  return await api.get<ResponseServer<IBusquedaPLanes[]>>(url);
};

// Busqueda Avanzada Programas por nombre programa y nombre plan

export const search_programas = async ({
  nombre_programa,
  nombre_eje_estrategico,
}: any): Promise<AxiosResponse<ResponseServer<IBusquedaProgramas[]>>> => {
  const url = `seguimiento/planes/busqueda-avanzada-programas/?nombre_programa=${String(
    nombre_programa ?? ''
  )}&nombre_eje=${String(nombre_eje_estrategico ?? '')}`;
  return await api.get<ResponseServer<IBusquedaProgramas[]>>(url);
};

// Busqueda Avanzada objetivos por nombre objetivo y nombre plan

export const search_objetivos = async ({
  nombre_plan,
  nombre_objetivo,
}: any): Promise<AxiosResponse<ResponseServer<IBusquedaObjetivos[]>>> => {
  const url = `seguimiento/planes/busqueda-avanzada-objetivos/?nombre_plan=${String(
    nombre_plan ?? ''
  )}&nombre_objetivo=${String(nombre_objetivo ?? '')}`;
  return await api.get<ResponseServer<IBusquedaObjetivos[]>>(url);
};

// Busqueda Avanzada planes por nombre plan y sigla plan

export const search_planes = async ({
  nombre_plan,
  sigla_plan,
}: any): Promise<AxiosResponse<ResponseServer<IBusquedaPlanes[]>>> => {
  const url = `seguimiento/planes/consultar-planesPAI/?nombre_plan=${String(
    nombre_plan ?? ''
  )}&nombre_sigla_plan=${String(sigla_plan ?? '')}`;
  return await api.get<ResponseServer<IBusquedaPlanes[]>>(url);
};

// Busqueda Avanzada proyectos por nombre plan, nombre programa y nombre proyecto

export const search_proyectos = async ({
  nombre_programa,
  nombre_plan,
  nombre_proyecto,
}: any): Promise<AxiosResponse<ResponseServer<IBusquedaProyecto[]>>> => {
  const url = `seguimiento/planes/busqueda-avanzada-proyectos/?nombre_programa=${String(
    nombre_programa ?? ''
  )}&nombre_plan=${String(nombre_plan ?? '')}&nombre_proyecto=${String(
    nombre_proyecto ?? ''
  )}`;
  return await api.get<ResponseServer<IBusquedaProyecto[]>>(url);
};

//  Busqueda Avanzada eje por nombre plan, y nombre

export const search_eje = async ({
  nombre_plan,
  nombre,
}: any): Promise<AxiosResponse<ResponseServer<IBusquedaEjeEstrategico[]>>> => {
  const url = `/seguimiento/planes/busqueda-avanzada-ejes/?nombre_plan=${String(
    nombre_plan ?? ''
  )}&nombre_eje=${String(
    nombre ?? ''
  )}`;
  return await api.get<ResponseServer<IBusquedaEjeEstrategico[]>>(url);
};

// Busqueda Avanzada subprogramas por nombre programa y nombre subprograma

export const search_subprogramas = async ({
  nombre_programa,
  nombre_subprograma,
}: any): Promise<AxiosResponse<ResponseServer<IBusquedaSubprograma[]>>> => {
  const url = `seguimiento/planes/busqueda-avanzada-subprogramas/?nombre_programa=${String(
    nombre_programa ?? ''
  )}&nombre_subprograma=${String(nombre_subprograma ?? '')}`;
  return await api.get<ResponseServer<IBusquedaSubprograma[]>>(url);
};

// Busqueda Avanzada Productos por nombre plan, nombre programa, nombre proyecto y nombre producto

export const search_productos = async ({
  nombre_programa,
  nombre_plan,
  nombre_proyecto,
  nombre_producto,
}: any): Promise<AxiosResponse<ResponseServer<IBusquedaProductos[]>>> => {
  const url = `seguimiento/planes/busqueda-avanzada-productos/?nombre_programa=${String(
    nombre_programa ?? ''
  )}&nombre_plan=${String(nombre_plan ?? '')}&nombre_proyecto=${String(
    nombre_proyecto ?? ''
  )}&nombre_producto=${String(nombre_producto ?? '')}`;
  return await api.get<ResponseServer<IBusquedaProductos[]>>(url);
};

// IBusquedaFuenteIndicador
// Busqueda avanzada de fuentes de financiacion indicadores por nombre fuente, nombre proyecto, nombre producto, nombre actividad, nombre indicador

export const search_fuentes_indicadores = async ({
  nombre_fuente,
  nombre_proyecto,
  nombre_producto,
  nombre_actividad,
  nombre_indicador,
}: any): Promise<AxiosResponse<ResponseServer<IBusquedaFuenteIndicador[]>>> => {
  const url = `seguimiento-planes/consultar-fuentes-financiacion-indicadores-avanzado/?nombre_fuente=${String(
    nombre_fuente ?? ''
  )}&nombre_proyecto=${String(nombre_proyecto ?? '')}&nombre_producto=${String(
    nombre_producto ?? ''
  )}&nombre_actividad=${String(
    nombre_actividad ?? ''
  )}&nombre_indicador=${String(nombre_indicador ?? '')}`;
  return await api.get<ResponseServer<IBusquedaFuenteIndicador[]>>(url);
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
