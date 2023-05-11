import { api } from '../../../../../../../../api/axios';
// Types
import { type AxiosError, } from 'axios';
// Reducers
import { toast, type ToastContent } from 'react-toastify';
import { type ejecutar_mantenimiento } from '../../../interfaces/IProps';


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

// Crear resgitro de mantenimiento
export const create_maintenance_service: any = (form_data: ejecutar_mantenimiento) => {
  return async () => {
    try {
      const { data } = await api.post('almacen/mantenimientos/ejecutados/create/', form_data);
      control_success('El registro de mantenimiento se creo correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Elimina registro de mantenimiento
export const delete_maintenance_record: any = (id_registro_mtto: number) => {
  return async () => {
    try {
      const { data } = await api.delete(`almacen/mantenimientos/ejecutados/delete/${id_registro_mtto}/`);
      control_success('Se eliminó el registro de mantenimiento');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Consulta registro de mantenimiento por id
export const get_by_id_record: any = (id_registro_mtto: number) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/mantenimientos/ejecutados/get-by-id/${id_registro_mtto}/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};