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

export const get_obtener_activos_asociados_funcionario_actual: any = (id_persona: string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/busqueda-articulos-responsable/${id_persona}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
}

export const post_crear_reasignacion: any = (form_data: any) => {
  return async () => {
    try {
      const { data } = await api.post(`/almacen/activos/crear-reasginacion-responsable/create/`, form_data);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
}