

import { AxiosResponse } from "axios";
import { api } from "../../../../api/axios";
import { IActividadPgar, IIndicadorPgar, ILineaBasePgar, IMedicion, IMetasPgar, IUnidadOrganizacional } from "../../types/types";
import { ResponseServer } from "../../../../interfaces/globalModels";
import { IBusquedaActividades, IBusquedaLineas, IBusquedaMetas } from "../utils/types";

// ? ----------------------------------------------- [ GET ] -----------------------------------------------

  //Servicios para obtener los datos de los planes PGAR

  export const get_ejes_estrategicos_id_objetivo = async (
    id_objetivo: number
  ): Promise<any> => {
    const response = await api.get(
      `seguimiento/planes/consultar-ejes-estrategicos-id-objetivo/${id_objetivo}/`
    );
    return response.data.data;
  };

  export const get_metas_id_eje = async (
    id_eje: number
  ): Promise<IMetasPgar[]> => {
    const response = await api.get(
      `seguimiento/planes/consultar-metasPGAR-idEjeEstrategico/${id_eje}/`
    );
    return response.data.data;
  };

  export const get_linea_base_id_meta = async (
    id_meta: number
  ): Promise<ILineaBasePgar[]> => {
    const response = await api.get(
      `seguimiento/planes/consultar-linea-base-id-meta/${id_meta}/`
    );
    return response.data.data;
  };

  export const get_actividades_id_linea_base = async (
    id_linea_base: number
  ): Promise<IActividadPgar[]> => {
    const response = await api.get(
      `seguimiento/planes/consultar-actividades-id-linea-base/${id_linea_base}/`
    );
    return response.data.data;
  };

  export const get_indicadores_id_actividad = async (
    id_actividad: number
  ): Promise<IIndicadorPgar[]> => {
    const response = await api.get(
      `seguimiento/planes/consultar-indicadores-id-actividad/${id_actividad}/`
    );
    return response.data.data;
  };

  //Servicios para obtener los datos de los planes PAI

  export const get_programas_id_eje_estrategico = async (
    id_eje_estrategico: number
  ): Promise<any> => {
    const response = await api.get(
      `seguimiento/planes/consultar-programas-id-eje-estrategico/${id_eje_estrategico}/`
    );
    return response.data.data;
  };

  export const get_proyectos_id_programa = async (
    id_programa: number
  ): Promise<any> => {
    const response = await api.get(
      `seguimiento/planes/consultar-proyectos-id-programas/${id_programa}/`
    );
    return response.data.data;
  };

  export const get_productos_id_proyectos = async (
    id_proyecto: number
  ): Promise<any> => {
    const response = await api.get(
      `seguimiento/planes/consultar-productos-id-proyectos/${id_proyecto}/`
    );
    return response.data.data;
  };

  export const get_actividades_id_producto = async (
    id_producto: number
  ): Promise<any> => {
    const response = await api.get(
      `seguimiento/planes/consultar-actividades-id-productos/${id_producto}/`
    );
    return response.data.data;
  };

  //Servicios para obtener los datos de armonizacion de los planes PGAR

  export const get_armonizaciones = async (): Promise<any> => {
    const response = await api.get(`seguimiento/planes/consultar-ArmonizacionPGARPAI/`);
    return response.data.data;
  };

  export const get_mediciones = async (): Promise<IMedicion[]> => {
    const response = await api.get(`seguimiento/planes/consultar-mediciones/`);
    return response.data.data;
  };

  export const get_unidades_organizacionales = async (): Promise<IUnidadOrganizacional[]> => {
    const response = await api.get(`/gestor/consecutivos-unidades/unidades_organigrama_actual/get/`)
    return response.data.data;
  };

  export const get_planes_pai = async (): Promise<any> => {
    const response = await api.get(`seguimiento/planes/consultar-planesPAI/`);
    return response.data.data;
  };

  export const get_planes_pgar = async (): Promise<any> => {
    const response = await api.get(`seguimiento/planes/consultar-planesPGAR/`);
    return response.data.data;
  };



  // --------------------------- BUSQUEDAS AVANZADAS ------------------------------------------

  export const search_eje_pgar = async ({
    nombre_objetivo,
    nombre,
  }: any): Promise<AxiosResponse<ResponseServer<any>>> => {
    const url = `/seguimiento/planes/busqueda-avanzada-ejes-estrategicosPGAR/?nombre_objetivo=${String(nombre_objetivo ?? '')}&nombre_eje=${String(
      nombre ?? ''
    )}`;
    return await api.get<ResponseServer<any>>(url);
  };

  export const search_meta = async ({
    nombre_eje_estrategico,
    nombre_meta_eje,
  }: any): Promise<AxiosResponse<ResponseServer<IBusquedaMetas[]>>> => {
    const url = `/seguimiento/planes/busqueda-avanzada-metasPGAR/?nombre_eje_estrategico=${String(
      nombre_eje_estrategico ?? ''
    )}&nombre_meta=${String(nombre_meta_eje ?? '')}`;
    return await api.get<ResponseServer<IBusquedaMetas[]>>(url);
  };

  export const search_linea = async ({
    nombre_meta_eje,
    nombre_linea,
  }: any): Promise<AxiosResponse<ResponseServer<IBusquedaLineas[]>>> => {
    const url = `/seguimiento/planes/busqueda-avanzada-lineas-base/?nombre_meta=${String(
      nombre_meta_eje ?? ''
    )}&nombre_linea_base=${String(nombre_linea ?? '')}`;
    return await api.get<ResponseServer<IBusquedaLineas[]>>(url);
  };

  //TODO: Cambiar interfaz de busqueda
  export const search_actividad = async ({
    nombre_meta,
    nombre_linea_base,
    nombre_actividad,
    nombre_eje_estrategico,
  }: any): Promise<AxiosResponse<ResponseServer<IBusquedaActividades[]>>> => {
    const url = `/seguimiento/planes/busqueda-avanzada-actividadesPGAR/?nombre_meta=${String(
      nombre_meta ?? ''
    )}&nombre_linea_base=${String(nombre_linea_base ?? '')}&nombre_actividad=${String(
      nombre_actividad ?? ''
    )}&nombre_eje_estrategico=${String(nombre_eje_estrategico ?? '')}`;
    return await api.get<ResponseServer<IBusquedaActividades[]>>(url);
  };


  // ? ----------------------------------------------- [ POST ] -----------------------------------------------
  export const post_meta = async (
    data: IMetasPgar
  ): Promise<IMetasPgar> => {
    const response = await api.post(
      `seguimiento/planes/crear-metasPGAR/`,
      data
    );
    return response.data;
  };

  export const post_linea_base = async (
    data: ILineaBasePgar
  ): Promise<ILineaBasePgar> => {
    const response = await api.post(
      `seguimiento/planes/crear-linea-base/`,
      data
    );
    return response.data;
  };

  export const post_actividad_pgar = async (
    data: IActividadPgar
  ): Promise<IActividadPgar> => {
    const response = await api.post(
      `seguimiento/planes/crear-actividadesPGAR/`,
      data
    );
    return response.data;
  };

  export const post_indicador_pgar = async (
    data: IIndicadorPgar
  ): Promise<IIndicadorPgar> => {
    const response = await api.post(
      `seguimiento/planes/crear-indicadoresPGAR/`,
      data
    );
    return response.data;
  };

  export const post_armonizacion = async (
    data: any
  ): Promise<any> => {
    const response = await api.post(
      `seguimiento/planes/crear-ArmonizacionPGAR/`,
      data
    );
    return response.data;
  };

  export const post_seguimiento_pgar = async (
    data: any
  ): Promise<any> => {
    const response = await api.post(
      `seguimiento/planes/crear-SeguiemientoPGAR/`,
      data
    );
    return response.data;
  };

  // ? ----------------------------------------------- [ PUT ] -----------------------------------------------
  export const put_meta = async (
    id_meta: number,
    data: IMetasPgar
  ): Promise<IMetasPgar> => {
    const response = await api.put(
      `seguimiento/planes/actualizar-metasPGAR/${id_meta}/`,
      data
    );
    return response.data;
  };

  export const put_linea_base = async (
    id_linea_base: number,
    data: ILineaBasePgar
  ): Promise<ILineaBasePgar> => {
    const response = await api.put(
      `seguimiento/planes/actualizar-linea-base/${id_linea_base}/`,
      data
    );
    return response.data;
  };

  export const put_actividad_pgar = async (
    id_actividad: number,
    data: IActividadPgar
  ): Promise<IActividadPgar> => {
    const response = await api.put(
      `seguimiento/planes/actualizar-actividadesPGAR/${id_actividad}/`,
      data
    );
    return response.data;
  };

  export const put_indicador_pgar = async (
    id_indicador: number,
    data: IIndicadorPgar
  ): Promise<IIndicadorPgar> => {
    const response = await api.put(
      `seguimiento/planes/actualizar-indicadoresPGAR/${id_indicador}/`,
      data
    );
    return response.data;
  };

  export const put_armonizacion = async (
    id_armonizacion: number,
    data: any
  ): Promise<any> => {
    const response = await api.put(
      `seguimiento/planes/actualizar-ArmonizacionPGAR/${id_armonizacion}/`,
      data
    );
    return response.data;
  };