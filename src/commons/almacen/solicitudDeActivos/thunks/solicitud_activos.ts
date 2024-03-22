import { AxiosError } from "axios";
import { api } from "../../../../api/axios";


export const get_buscar_solicitudes_activos: any = (
  fecha_desde: string,
  fecha_hasta: string,
  estado_solicitud: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/busqueda-solicitudes-realizadas/get/?fecha_desde=${
        fecha_desde
      }&fecha_hasta=${
        fecha_hasta
      }&estado_solicitud=${estado_solicitud}`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_obtener_responsables: any = (
  tipo_documento: string,
  numero_documento: string,
  primer_nombre: string,
  primer_apellido: string,
  razon_social: string,
  nombre_comercial: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/personas/get-personas-responsible-filters/?tipo_documento=${
        tipo_documento
      }&numero_documento=${
        numero_documento
      }&primer_nombre=${
        primer_nombre
      }&primer_apellido=${
        primer_apellido
      }&razon_social=${
        razon_social
      }&nombre_comercial=${nombre_comercial}`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_obtener_operarios: any = (
  tipo_documento: string,
  numero_documento: string,
  primer_nombre: string,
  primer_apellido: string,
  razon_social: string,
  nombre_comercial: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/personas/get-personas-filters/?tipo_documento=${
        tipo_documento
      }&numero_documento=${
        numero_documento
      }&primer_nombre=${
        primer_nombre
      }&primer_apellido=${
        primer_apellido
      }&razon_social=${
        razon_social
      }&nombre_comercial=${nombre_comercial}`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_obtener_articulos: any = (
  cod_tipo_activo: string,
  nombre: string,
  doc_identificador_nro: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/bienes/catalogo-bienes/busqueda-articulo-activo/?cod_tipo_activo=${
        cod_tipo_activo
      }&nombre=${
        nombre
      }&doc_identificador_nro=${
        doc_identificador_nro}`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};