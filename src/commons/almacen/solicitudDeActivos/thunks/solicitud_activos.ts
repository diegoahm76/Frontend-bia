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

export const post_crear_solicitud_activos: any = (form_data: any) => {
  return async () => {
    try {
      const { data } = await api.post(`/almacen/activos/crear-solicitud-baja-activos/create/`, form_data);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const put_editar_solicitud_activos: any = (id_solicitud_activo: string, form_data: any) => {
  return async () => {
    try {
      const { data } = await api.put(`/almacen/activos/editar-solicitud-activos/${id_solicitud_activo}/`, form_data);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_obtener_unidades_medidas: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/listar-unidades-medida/get/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};


export const get_obtener_solicitudes_realizadas: any = (id_solicitud_activo: string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/resumen-solicitud-activos/${id_solicitud_activo}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const put_cancelar_solicitud: any = (id_solicitud_activo: string, form_data: {justificacion_anulacion:string}) => {
  return async () => {
    try {
      const { data } = await api.put(`/almacen/activos/cancelar-solicitud-activos/${id_solicitud_activo}/`, form_data);
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