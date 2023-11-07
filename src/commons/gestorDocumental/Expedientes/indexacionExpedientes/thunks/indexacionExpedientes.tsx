
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
export const crear_expediente: any = (documento: any) => {
  return async () => {
    try {
      const { data } = await api.post(`gestor/expedientes-archivos/expedientes/apertura-documento/create/`,documento);
      control_success('El documento se creo correctamente.');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Actualizar documento
export const actualizar_expediente: any = (id_expediente: number,documento: any) => {
  return async () => {
    try {
      const { data } = await api.put(`gestor/expedientes-archivos/expedientes/apertura-documento/update/${id_expediente}/`,documento);
      control_success('El documento fue actualizado correctamente.');
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
      const { data } = await api.put(`gestor/expedientes-archivos/expedientes/apertura-documento/anular/${id_expediente}/`,motivo);
      control_success('El documento se anuló correctamente.');
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
      const { data } = await api.delete(`gestor/expedientes-archivos/expedientes/apertura-documento/borrar/${id_expediente}/`);
      control_success('El documento a sido borrado correctamente.');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


