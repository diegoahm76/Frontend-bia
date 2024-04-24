// Types
import { type AxiosError, } from 'axios';
// Reducers
import { toast, type ToastContent } from 'react-toastify';
import { api } from '../../../../api/axios';


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

// Obtener Tipos de Tramites
export const tipos_tramites: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`tramites/choices/cod-tipo-permiso-ambiental/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Listar Trámites o Servicios
export const tramites_servicios: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`tramites/opa/tramites/get-list/O/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Lista Departamentos
export const get_departamentos: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`listas/departamentos/?pais=CO`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Lista Municipios
export const get_municipios: any = (departamento: number) => {
  return async () => {
    try {
      const { data } = await api.get(`listas/municipios/?cod_departamento=${departamento}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener información de persona titular
export const get_info_persona: any = (persona_id: number) => {
  return async () => {
    try {
      const { data } = await api.get(`tramites/opa/tramites/persona-titular/get-info/${persona_id}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Paso 1. Inicio Trámite
export const create_tramite_servicio: any = (tramite: any) => {
  return async () => {
    try {
      const { data } = await api.post(`tramites/opa/tramites/inicio-tramite/create/`,tramite);
      control_success(data.detail);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Paso 2. Añadir/Actualizar/Eliminar Anexos
export const cargar_anexos_opas: any = (id_tramite: any, documentos: any) => {
  return async () => {
    try {
      console.log(documentos);
      const { data } = await api.put(`tramites/opa/tramites/anexos-metadatos/update/${id_tramite}/`,documentos);
      control_success(data.detail);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
    };
  };

export const cargar_anexos_opas_metadatos: any = (id_tramite: any, documentos: any) => {
  return async () => {
    try {
      const { data } = await api.put(`tramites/opa/tramites/anexos-metadatos/update/${id_tramite}/`,documentos);
      control_success(data.detail);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};






// Paso 3. Radicación de OPA
export const radicar_opa: any = (id_tramite: any) => {
  return async () => {
    try {
      const { data } = await api.post(`tramites/opa/tramites/radicar/create/${id_tramite}/`);
      control_success(data.detail);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Paso 4. Volver a Enviar Radicación de Trámite OPA
export const eviar_correo_radicado: any = (id_tramite: any) => {
  return async () => {
    try {
      const { data } = await api.post(`tramites/opa/tramites/radicar/volver-enviar/${id_tramite}/`);
      control_success(data.detail);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Listar tramites OPAS por persona titular
export const obtener_opas_por_titular: any = (id_persona_titular: any) => {
  return async () => {
    try {
      const { data } = await api.get(`tramites/opa/tramites/list/${id_persona_titular}/`);
      control_success(data.detail);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

