import { AxiosError } from "axios";
import { api } from "../../../../api/axios";


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

export const get_obtener_inf_almacenista: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/Informacion-almacenista/get/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
}

export const get_obtener_ultimo_consecutivo: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/obtener-ultimo-consecutivo-salida-especial/get/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
}

export const get_obtener_despachos_activos: any = (id_persona_responsable: string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/despachos-activos/get/${id_persona_responsable}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
}