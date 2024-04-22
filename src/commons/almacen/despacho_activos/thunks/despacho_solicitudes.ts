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
      const { data } = await api.get(`/almacen/activos/despachos-sin-solicitud/get/?estado_despacho=${
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

export const get_obtener_persona_responsable: any = (
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
      const { data } = await api.get(`/almacen/choices/estado-despacho-activo-despacho/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
}

export const get_obtener_tipos_estados_despachos_sin_solicitud: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/choices/estado-despacho-activo/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
}

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

export const get_obtener_bodegas: any = (
  nombre_bodega: string,
  cod_municipio: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/bodegas/busqueda-avanzada/?nombre=${
        nombre_bodega
      }&cod_municipio=${
        cod_municipio
      }`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_obtener_departamentos: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`/choices/departamentos/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_obtener_municipios: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`/choices/municipios/`);
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

export const get_obtener_activos_disponibles: any = (id_bien: string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/busqueda-articulos-sub/${id_bien}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const post_crear_despacho_sin_solicitud: any = (form_data: any) => {
  return async () => {
    try {
      const { data } = await api.post(`/almacen/activos/crear-despacho-activo-sin-solicitud/create/`, form_data);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const post_crear_despacho_con_solicitud: any = (form_data: any) => {
  return async () => {
    try {
      const { data } = await api.post(`/almacen/activos/crear-despacho-activo/create/`, form_data);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_resumen_sin_solicitud: any = (id_solicitud_activo : string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/resumen-despacho-activos/${id_solicitud_activo}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_articulos_despacho_con_solicitud: any = (id_solicitud_activo : string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/busqueda-articulos-principal/${id_solicitud_activo}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const put_anular_despacho_con_solicitud: any = (id_solicitud_activo: string, form_data: { justificacion_anulacion: string}) => {
  return async () => {
    try {
      const { data } = await api.put(`/almacen/activos/anular-solicitud-despacho/${id_solicitud_activo}/`, form_data);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const put_rechazar_despacho_con_solicitud: any = (id_solicitud_activo: string, form_data: { justificacion_rechazo_almacen: string}) => {
  return async () => {
    try {
      const { data } = await api.put(`/almacen/activos/cancelar-solicitud-despacho/${id_solicitud_activo}/`, form_data);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const put_anular_despacho_sin_solicitud: any = (id_solicitud_activo: string, form_data: { justificacion_anulacion: string}) => {
  return async () => {
    try {
      const { data } = await api.put(`/almacen/activos/anular-solicitud-despacho-sin-solicitud/${id_solicitud_activo}/`, form_data);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};
