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