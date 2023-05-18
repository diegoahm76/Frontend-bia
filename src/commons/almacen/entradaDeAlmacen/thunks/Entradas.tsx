
import { api } from '../../../../api/axios';
// Types
import { type AxiosResponse, type AxiosError, } from 'axios';
// Reducers
import { toast, type ToastContent } from 'react-toastify';
import { type anular_entrada, type crear_entrada } from '../interfaces/entradas';
import { type ResponseServer } from '../../../../interfaces/globalModels';


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

// Crear entrada
export const crear_entrada_bien: any = (form_data: crear_entrada) => {
  return async () => {
    try {
      const { data } = await api.post('almacen/bienes/entradas/create/', form_data);
      control_success('La entrada se creo correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtiene ultimo numero de entrada (Consecutivo)
export const obtener_consecutivo: any = () => {
  return async () => {
    try {
      const { data } = await api.get('almacen/bienes/entradas/get-numero_entrada/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtiene los tipos de entrada
export const obtener_tipos_entrada = async (): Promise<AxiosResponse<ResponseServer<any[]>>> => {
  return await api.get<ResponseServer<any[]>>('almacen/bienes/entradas/tipos-entradas/');
};

// Obtiene listado de bodegas
export const obtener_bodegas: any = () => {
  return async () => {
    try {
      const { data } = await api.get('almacen/bodega/get-list/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Anular mantenimiento
export const override_maintenance: any = (id_entrada: number,form_data: anular_entrada) => {
  return async () => {
    try {
      const { data } = await api.put(`almacen/bienes/entradas/anular/${id_entrada}/`, form_data);
      control_success('Se anulo la entrada');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener bien por código de bien
export const get_programmed_maintenance: any = (codigo_bien: number) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/bienes/entradas/get-by-codigo/?codigo_bien=${codigo_bien}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};