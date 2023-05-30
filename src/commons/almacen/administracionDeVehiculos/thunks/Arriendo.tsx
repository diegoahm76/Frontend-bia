
import { api } from '../../../../api/axios';
// Types
import { type AxiosError, } from 'axios';
// Reducers
import { toast, type ToastContent } from 'react-toastify';
import { type crear_arriendo } from '../interfaces/ArriendoVehiculo';


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
export const crear_arriendo_veh: any = (form_data: crear_arriendo) => {
  return async () => {
    try {
      const { data } = await api.post('almacen/vehiculos/registrar/vehiculo/arrendado/create/', form_data);
      control_success('El arriendo de vehículo se creo correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Eliminar arriendo por id
export const eliminar_arriendo_veh: any = (id_vehiculo_arrendado: number) => {
  return async () => {
    try {
      const { data } = await api.delete(`almacen/vehiculos/registro/vehiculo/arrendado/delete/${id_vehiculo_arrendado}/`);
      control_success('El arriendo de vehículo se creo correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtiene listado de marcas
export const obtener_marcas: any = () => {
  return async () => {
    try {
      const { data } = await api.get('almacen/marcas/get-list/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };

};

// Obtiene listado de arriendos registrados
export const obtener_arriendos: any = () => {
  return async () => {
    try {
      const { data } = await api.get('almacen/vehiculos/busqueda/vehiculo/arrendado/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  }
};