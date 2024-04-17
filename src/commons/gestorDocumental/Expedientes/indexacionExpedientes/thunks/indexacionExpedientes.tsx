
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

// Obtener TRD actual y retirados
export const obtener_trd_actual_retirados: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/trd-actual-retirados/`);
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

//crear archibado 

 
export const crear_archivado: any = (obj_json: any, id_expediente: number) => {
  return async () => {
    try {
      const { data } = await api.post(`gestor/bandeja-tareas/archivar/otros/create/`,obj_json,{ headers: { "Content-Type": "multipart/form-data"}});
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
// Selección de Expediente
export const obtener_expediente_id_serie: any = (id_serie: number) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/list-complejos/get/${id_serie}/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Selección de Expediente
export const obtener_expediente_simple_id_serie: any = (id_serie: number) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/simple/get/${id_serie}/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener Tipologias de Catalogo TRD
export const obtener_tipologias_id_serie: any = (id_serie: number) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/trd/catalogo-trd/get-tipologias/${id_serie}/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener Tipo-Origen-Doc
export const obtener_tipo_archivo: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/choices/tipo-origen-doc/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener Categoria-Expediente
export const obtener_tipos_recurso: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/choices/categoria-archivo/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener tipo de archivos permitidos por topologia
export const obtener_tipos_archivos_permitidos: any = (tipologica:string) => {
  return async () => {
    try {
      const { data } = await api.get(`/gestor/trd/formatos/get-by-cod/${tipologica}/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Anulación documento
export const anular_documento: any = (id_expediente: number,motivo: any) => {
  return async () => {
    try {
      const { data } = await api.put(`gestor/expedientes-archivos/expedientes/indexar-documentos/anular/${id_expediente}/`,motivo);
      control_success('El documento se anuló correctamente.');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Borrar documento
export const borrar_documento: any = (id_expediente: number) => {
  return async () => {
    try {
      const { data } = await api.delete(`gestor/expedientes-archivos/expedientes/indexar-documentos/delete/${id_expediente}/`);
      control_success('El documento a sido borrado correctamente.');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener documento por id
export const obtener_documento_id: any = (id_documento: number) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/indexar-documentos/get/${id_documento}/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


