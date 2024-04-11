import { AxiosError } from "axios";
import { api } from "../../../../api/axios";


export const get_obtener_despachos_con_solicitud: any = (
  estado_solicitud: string,
  fecha_desde: string,
  fecha_hasta: string,
  id_persona_solicita: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/busqueda-solicitudes-despacho/get/?estado_solicitud=${
        estado_solicitud
      }&fecha_desde=${
        fecha_desde
      }&fecha_hasta=${
        fecha_hasta
      }&id_persona_solicita=${
        id_persona_solicita
      }`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_obtener_despachos_sin_solicitud: any = (
  estado_despacho: string,
  fecha_desde: string,
  fecha_hasta: string,
  id_persona_responsable: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/busqueda-solicitudes-despacho/get/?estado_despacho=${
        estado_despacho
      }&fecha_desde=${
        fecha_desde
      }&fecha_hasta=${
        fecha_hasta
      }&persona_responsable=${
        id_persona_responsable
      }`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_obtener_persona_solicita: any = (
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

export const get_obtener_tipos_documentos: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`/listas/tipo-documento/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
}

export const get_obtener_tipos_estados: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/choices/estado-solicitud-activo/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
}