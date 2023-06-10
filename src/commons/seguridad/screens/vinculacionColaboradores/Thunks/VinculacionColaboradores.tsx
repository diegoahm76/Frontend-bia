
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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

// Obtiene persona por tipo y numero de documento
export const obtener_persona: any = (tipo_documento: string, nro_documento: string) => {
  return async () => {
    try {
      const { data } = await api.get(`personas/get-personas-by-document/${tipo_documento}/${nro_documento}/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtiene lista de cargos
export const obtener_cargos: any = () => {
  return async () => {
    try {
      const { data } = await api.get('personas/cargos/get-list/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  }
};

// Obtiene lista de unidades del organigrama actual
export const obtener_unidades_org: any = () => {
  return async () => {
    try {
      const { data } = await api.get('transversal/organigrama/unidades/get-list/organigrama-actual/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  }
};

// Vincula colaborador
export const vincular_colaborador: any = (persona_id:number, form_data: any) => {
  return async () => {
    try {
      const { data } = await api.put(`transversal/vinculacion/vinculacion-colaboradores/${persona_id}/`, form_data);
      control_success('Se realizó la vinculación correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  }
};

// Actualizar un vinculo
export const actualizar_vinculo: any = (persona_id:number, form_data: any) => {
  return async () => {
    try {
      const { data } = await api.put(`transversal/vinculacion/update-vinculacion-colaboradores/${persona_id}/`, form_data);
      control_success('Se realizó la actualizaciòn correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  }
};

// Desvincular colaborador
export const desvincular_colaborador: any = (persona_id:number, form_data: any) => {
  return async () => {
    try {
      const { data } = await api.put(`transversal/vinculacion/desvinculacion-persona/${persona_id}/`, form_data);
      control_success('Se realizó la vinculación correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  }
};