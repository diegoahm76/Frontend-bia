
import { api } from '../../../../../api/axios';
// Types
import { type AxiosError, } from 'axios';
// Reducers
import { toast, type ToastContent } from 'react-toastify';


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_error = (message: ToastContent = 'Algo pasó, intente de nuevo') =>
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

  const control_success = (message: ToastContent) =>
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

// Listas expedientes por filtros
export const expedientes_por_filtros: any = (id_trd_origen: string,id_und_seccion_propietaria_serie: string,id_cat_serie_und_org_ccd_trd_prop: string,codigo_exp_Agno: string) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/consulta/get-list/?id_trd_origen=${id_trd_origen}&id_und_seccion_propietaria_serie=${id_und_seccion_propietaria_serie}&id_cat_serie_und_org_ccd_trd_prop=${id_cat_serie_und_org_ccd_trd_prop}&codigo_exp_Agno=${codigo_exp_Agno}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Busqueda de Expedientes
export const obtener_expedientes: any = (id_trd_origen: string,fecha_apertura_expediente: string,id_serie_origen: string,id_subserie_origen: string,palabras_clave_expediente: string,titulo_expediente: string,codigos_uni_serie_subserie: string, persona_id: number) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/buscar-expedientes/?id_trd_origen=${id_trd_origen}&fecha_apertura_expediente=${fecha_apertura_expediente}&id_serie_origen=${id_serie_origen}&id_subserie_origen=${id_subserie_origen}&palabras_clave_expediente=${palabras_clave_expediente}&titulo_expediente=${titulo_expediente}&codigos_uni_serie_subserie=${codigos_uni_serie_subserie}&id_persona_titular_exp_complejo=${persona_id}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Busqueda de Documentos de Expedientes
export const obtener_documentos: any = (identificacion: string,nombre_asignado: string,nombre_tipologia: string,fecha_incorporacion: string,asunto: string,palabras_clave: string) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/consulta/documentos-expedientes/get/?identificacion_doc_en_expediente=${identificacion}&nombre_asignado_documento=${nombre_asignado}&nombre_tipologia=${nombre_tipologia}&fecha_incorporacion_doc_a_Exp=${fecha_incorporacion}&asunto=${asunto}&palabras_clave_documento=${palabras_clave}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Listar documentos de expediente
export const obtener_documentos_expediente: any = (id_expediente: number,id_documento: string,nombre_asignado: string,palabras_clave: string) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/consulta/documentos-expedientes/get-list/${id_expediente}/?id_documento_de_archivo_exped=${id_documento}&nombre_asignado_documento=${nombre_asignado}&palabras_clave_documento=${palabras_clave}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener metadata documento
export const obtener_metadata: any = (id_documento: string) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/consulta/documentos-expedientes/metadata/get/${id_documento}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Descargar documentos expediente
export const descargar_expediente: any = (id_expediente: number) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/consulta/descargar/${id_expediente}/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Consultar permiso de acceso al módulo
export const permiso_acceso_expediente: any = (id_expediente: number) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/concesion-acceso/permiso/get/${id_expediente}/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Crear documento
export const crear_indexacion_documentos: any = (obj_json: any, id_expediente: number) => {
  return async () => {
    try {
      const { data } = await api.post(`gestor/expedientes-archivos/expedientes/indexar-documentos/create/${id_expediente}/`,obj_json,{ headers: { "Content-Type": "multipart/form-data"}});
      control_success('El documento se creo correctamente.');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Actualizar documento
export const actualizar_documento: any = (id_expediente: number,documento: any) => {
  return async () => {
    try {
      const { data } = await api.put(`gestor/expedientes-archivos/expedientes/indexar-documentos/update/${id_expediente}/`,documento);
      control_success('El documento fue actualizado correctamente.');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

