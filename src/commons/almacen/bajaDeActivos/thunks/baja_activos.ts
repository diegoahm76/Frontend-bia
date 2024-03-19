import { AxiosError } from "axios";
import { api } from "../../../../api/axios";

export const get_obtener_consecutivo: any = () => {
  return async () => {
    try {
      const { data } = await api.get('/almacen/activos/restablecer-consecutivo/get/');
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_obtener_bienes: any = (
  codigo_bien: string,
  nombre_bien: string,
  nombre_marca: string,
  identificador_bien: string,
  valor_unitario: string
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/busqueda-avanzada-bienes/get/?codigo_bien=${
        codigo_bien
      }&nombre_bien=${
        nombre_bien
      }&nombre_marca=${
        nombre_marca
      }&identificador_bien=${
        identificador_bien
      }&valor_unitario=${valor_unitario}`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const post_enviar_baja_activos: any = (form_data: any) => {
  return async () => {
    try {
      const { data } = await api.post('/almacen/activos/crear-baja-activos/create/', form_data);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_obtener_registro_baja: any = (consecutivo_baja: string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/info-baja-activos/get/${consecutivo_baja}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const put_editar_baja_activos: any = (consecutivo: string, form_data: any) => {
  return async () => {
    try {
      const { data } = await api.put(`/almacen/activos/actualizar-baja-activos/update/${consecutivo}/`, form_data);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const post_enviar_anexos_opcionales: any = (id_baja_activo: string, form_data: any) => {
  return async () => {
    try {
      const { data } = await api.post(`/almacen/activos/crear-anexo-opcional/create/${id_baja_activo}/`, form_data);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_obtener_anexos_opcionales: any = (id_baja_bien: string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/listar-anexo-opcional/get/${id_baja_bien}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const delete_anexo_opcional: any = (id_anexo_doc_alma: string) => {
  return async () => {
    try {
      const { data } = await api.delete(`/almacen/activos/eliminar-anexo-opcional/delete/${id_anexo_doc_alma}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const put_editar_anexo_opcional: any = (id_baja_activo: string, form_data: any) => {
  return async () => {
    try {
      const { data } = await api.put(`/almacen/activos/actualizar-anexo-opcional/update/${id_baja_activo}/`, form_data);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};