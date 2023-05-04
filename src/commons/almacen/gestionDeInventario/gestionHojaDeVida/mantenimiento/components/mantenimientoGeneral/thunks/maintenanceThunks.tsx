import { api } from '../../../../../../../../api/axios';
// Types
import { type AxiosError, } from 'axios';
// Reducers
import { toast, type ToastContent } from 'react-toastify';
import { type anular_mantenimiento, type crear_mantenimiento } from '../../../interfaces/IProps';


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

// Crear matenimiento
export const create_maintenance_service: any = (form_data: crear_mantenimiento[]) => {
  return async () => {
    try {
      const { data } = await api.post('almacen/mantenimientos/programados/create/', form_data);
      control_success('El mantenimiento se creo correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Anular mantenimiento
export const override_maintenance: any = (form_data: anular_mantenimiento) => {
  return async () => {
    try {
      const { data } = await api.patch(`almacen/mantenimientos/programados/anular/0/`, form_data);
      control_success('Se anulo el mantenimiento');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Consulta mantenimientos programados por fechas
export const get_programmed_maintenance: any = (fecha_desde: string, fecha_hasta: string) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/mantenimientos/programados/get-by-fechas/?rango-inicial-fecha=${fecha_desde}&rango-final-fecha=${fecha_hasta}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};