
import { type AxiosError } from 'axios';
import { api } from '../../../../../../api/axios';
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

// Obtiene consecutivo de entregas
export const obtener_consecutivo: any = () => {
    return async () => {
      try {
        const { data } = await api.get('almacen/entregas/get-number-despacho/');
        return data;
      } catch (error: any) {
        control_error(error.response.data.detail);
        return error as AxiosError;
      }
    };
  };

// Obtiene todas las entradas que pueden ser utilizadas en entregas
export const obtener_entradas_entregas: any = () => {
    return async () => {
      try {
        const { data } = await api.get('almacen/entregas/get-entradas-entregas/');
        return data;
      } catch (error: any) {
        control_error(error.response.data.detail);
        return error as AxiosError;
      }
    };
  };

// Obtener todas las entregas que han sido realizadas
export const obtener_entregas: any = () => {
    return async () => {
      try {
        const { data } = await api.get('almacen/entregas/get-entregas/');
        return data;
      } catch (error: any) {
        control_error(error.response.data.detail);
        return error as AxiosError;
      }
    };
  };
  

// Crear entrada
export const crear_entrega: any = (form_data: any) => {
  return async () => {
    try {
      const { data } = await api.post('almacen/entregas/create-entrega/', form_data);
      control_success('La entrada se creo correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Actualizar entrega
export const actualizar_entrega: any = (id_entrega:number,form_data: any) => {
  return async () => {
    try {
      const { data } = await api.put(`almacen/entregas/actualizar-entrega/${id_entrega}/`, form_data);
      control_success('La entrada se actualizó correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Anular entrega
export const anular_entrega: any = (id_entrega:number,form_data: any) => {
  return async () => {
    try {
      const { data } = await api.put(`almacen/entregas/anular-entrega/${id_entrega}/`, form_data);
      control_success('La entrada se actualizó correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};