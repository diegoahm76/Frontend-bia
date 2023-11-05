
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

// Obtener TRD actual
export const obtener_trd_actual: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/trd-actual/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener unidades marcadas como seccion y subsecciones de un organigrama
export const obtener_unidades_marcadas: any = (id_organigrama: number) => {
  return async () => {
    try {
      const { data } = await api.get(`transversal/organigrama/unidades/get-sec-sub/${id_organigrama}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener de Catalogo Serie Subserie Unidad TRD
export const obtener_serie_subserie: any = (id_trd: number, id_unidad_organizacional: number) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/serie-subserie-unidad-trd/get/?id_trd=${id_trd}&id_unidad_organizacional=${id_unidad_organizacional}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener configuración de expediente y el expediente si existe
export const obtener_config_expediente: any = (id_serie: number) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/configuracion-expediente/get/${id_serie}/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener unidades organizacionales
export const obtener_unidad_organizacional: any = (id_trd: number) => {
  return async () => {
    try {
      const { data } = await api.get(`transversal/organigrama/unidades/get-list/organigrama-actual/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Crear expediente
export const crear_expediente: any = (expediente: any) => {
  return async () => {
    try {
      const { data } = await api.post(`gestor/expedientes-archivos/expedientes/apertura-expediente/create/`,expediente);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Anulación expedientes
export const anular_expediente: any = (id_expediente: number,motivo: any) => {
  return async () => {
    try {
      const { data } = await api.put(`gestor/expedientes-archivos/expedientes/apertura-expediente/anular/${id_expediente}/`,motivo);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Borrar expedientes
export const borrar_expediente: any = (id_expediente: number) => {
  return async () => {
    try {
      const { data } = await api.delete(`gestor/expedientes-archivos/expedientes/apertura-expediente/borrar/${id_expediente}/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener usuario logueado de local storage
export const obtener_usuario_logueado: any = (id_serie: number) => {
  return async () => {
    try {
      let data_resp = null;
        const data = localStorage.getItem('persist:macarenia_app');
        if (data !== null) {
          const data_json = JSON.parse(data);
          const data_auth = JSON.parse(data_json.auth);
          data_resp = data_auth.userinfo;
        }
      return data_resp;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
