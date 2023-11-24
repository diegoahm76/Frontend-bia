
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

// 
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

