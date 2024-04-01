import { AxiosError } from "axios";
import { api } from "../../../../api/axios";

export const get_obtener_solicitudes_activos: any = (
  estado_solicitud: string,
  fecha_desde: string,
  fecha_hasta: string,
  id_persona_solicita: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/busqueda-solicitudes-proceso/get/?estado_solicitud=${
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

export const put_aprobar_solicitud_activo: any = (id_solicitud_activo : string) => {
  return async () => {
    try {
      const { data } = await api.put(`/almacen/activos/aprobar-solicitud-activo/put/${id_solicitud_activo}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const put_rechazar_solicitud_activo: any = (id_solicitud_activo : string, form_data: {justificacion_rechazo: string}) => {
  return async () => {
    try {
      const { data } = await api.put(`/almacen/activos/rechazar-solicitud-activo/put/${id_solicitud_activo}/`, form_data);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_resumen_solicitud: any = (id_solicitud_activo : string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/resumen-solicitud-activos/${id_solicitud_activo}/`);
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