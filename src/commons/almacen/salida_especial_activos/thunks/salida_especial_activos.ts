import { AxiosError } from "axios";
import { api } from "../../../../api/axios";

export const get_obtener_consecutivo: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/obtener-ultimo-consecutivo-salida-especial/get/`);
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

export const get_obtener_tipos_terceros: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`/listas/clase-tercero/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
}

export const get_obtener_inf_terceros: any = (
  tipo_documento: string,
  numero_documento: string,
  primer_nombre: string,
  primer_apellido: string,
  id_clase_tercero: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/busqueda-terceros-activos/get/?tipo_documento=${
        tipo_documento
      }&numero_documento=${
        numero_documento
      }&primer_nombre=${
        primer_nombre
      }&primer_apellido=${
        primer_apellido
      }&id_clase_tercero=${
        id_clase_tercero
      }`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_obtener_entradas_relacionadas: any = (id_persona: string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/entradas-relacionadas-activos/get/${id_persona}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
}

export const get_obtener_activos_asociados: any = (id_entrada_almacen: string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/activos-asociados/get/${id_entrada_almacen}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
}

export const post_crear_salida_especial: any = (form_data: any) => {
  return async () => {
    try {
      const { data } = await api.post(`/almacen/activos/crear-salida-especial-activo/`, form_data);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
}

export const get_obtener_data_registro_por_consecutivo: any = (consecutivo: string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/info-salida-especial-activo/get/${consecutivo}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
}