/* eslint-disable no-unused-vars */

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
      control_success('El expediente se creo correctamente.');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Actualizar expediente
export const actualizar_expediente: any = (id_expediente: number,expediente: any) => {
  return async () => {
    try {
      const { data } = await api.put(`gestor/expedientes-archivos/expedientes/apertura-expediente/update/${id_expediente}/`,expediente);
      control_success('El expediente fue actualizado correctamente.');
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
      control_success('El expediente se anuló correctamente.');
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
      control_success('El expediente a sido borrado correctamente.');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Buscar expediente por id
export const buscar_expediente_id: any = (id_expediente: number) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/apertura-expediente/get/${id_expediente}/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Buscar expedientes
export const buscar_expediente: any = (trd_nombre: string,fecha_apertura_expediente: string,id_serie_origen: string,id_subserie_origen: string,palabras_clave_expediente: string,titulo_expediente: string,codigos_uni_serie_subserie: string,id_persona_titular_exp_complejo: string,codigo_exp_consec_por_agno: string) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/buscar-expediente-abierto/?trd_nombre=${trd_nombre}&fecha_apertura_expediente=${fecha_apertura_expediente}&id_serie_origen=${id_serie_origen}&id_subserie_origen=${id_subserie_origen}&palabras_clave_expediente=${palabras_clave_expediente}&titulo_expediente=${titulo_expediente}&codigos_uni_serie_subserie=${codigos_uni_serie_subserie}&id_persona_titular_exp_complejo=${id_persona_titular_exp_complejo}&codigo_exp_consec_por_agno=`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Buscar persona
export const buscar_persona: any = (tipo_documento: string,numero_documento: string) => {
  return async () => {
    try {
      const { data } = await api.get(`personas/get-personas-filters/?tipo_documento=${tipo_documento}&numero_documento=${numero_documento}`);
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
        const data = sessionStorage.getItem('persist:macarenia_app');
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
