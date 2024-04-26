import { AxiosError } from "axios";
import { api } from "../../../../api/axios";


export const get_obtener_tipos_estados: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/choices/estado-despacho-activo/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
}


export const get_obtener_despachos: any = (
  estado_despacho: string,
  fecha_desde: string,
  fecha_hasta: string,
  id_persona_solicita: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/despachos-autorizar/get/?estado_despacho=${
        estado_despacho
      }&fecha_desde=${
        fecha_desde
      }&fecha_hasta=${
        fecha_hasta
      }&persona_solicita=${
        id_persona_solicita
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
      const { data } = await api.get(`/personas/get-operarios-filters/?tipo_documento=${
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

export const get_obtener_resumen_solicitud_despacho: any = (id_despacho_activo : string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/resumen-despacho-activos/${id_despacho_activo}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const put_autorizar_solicitud_despacho: any = (id_despacho_activo : string) => {
  return async () => {
    try {
      const { data } = await api.put(`/almacen/activos/aceptar-despacho/${id_despacho_activo}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const put_rechazar_solicitud: any = (id_despacho_activo: string, form_data: { justificacion_anulacion: string}) => {
  return async () => {
    try {
      const { data } = await api.put(`/almacen/activos/rechazar-despacho/${id_despacho_activo}/`, form_data);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};