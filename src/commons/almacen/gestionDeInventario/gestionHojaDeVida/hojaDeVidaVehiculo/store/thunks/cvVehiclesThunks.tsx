
import { api } from '../../../../../../../api/axios';
// Types
import { type AxiosError, } from 'axios';
// Reducers
import { toast, type ToastContent } from 'react-toastify';
// Interfaces
import { set_cv_vehicle, set_vehicles, get_marks, set_current_cv_vehicle, set_maintenance_vehicle } from '../../store/slices/indexCvVehiculo';
import { type Dispatch } from 'react';


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


export const get_marca_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('almacen/marcas/get-list');
      dispatch(get_marks(data));
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

// Obtener programados 

export const get_maintenance_vehicle = (id: number | null): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`almacen/mantenimientos/programados/get-list/${id ?? ''}/`);

      if (data.status === true) {
        dispatch(set_maintenance_vehicle(data.detail));

      }
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);

      return error as AxiosError;
    }
  };
};

export const get_vehicles_all_service: any = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const { data } = await api.get(`almacen/bienes/catalogo-bienes/get-by-nombre-nroidentificador/?cod_tipo_activo=Veh`);
      //  console.log('')(data)
      dispatch(set_vehicles(data.Elementos));
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener Hoja de Vida 
export const get_cv_vehicle_service: (id: any) => any = (id: any) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const { data } = await api.get(`almacen/hoja-de-vida/vehiculos/get-by-id-bien/${id}/`);
      dispatch(set_cv_vehicle(data.Elementos));
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


// Crear Hoja de Vida 
export const create_cv_vehicles_service: any = (formdata: any) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post('almacen/hoja-de-vida/vehiculos/create/', formdata);
      control_success('La hoja de vida se creo correctamente');
      dispatch(get_vehicles_all_service());
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener Hoja de Vida PC

export const get_cv_vehicle_id = (id: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`almacen/hoja-de-vida/vehiculos/get-by-id-bien/${id}/`);
      //  console.log('')(data)
      if (data.success === true) {
        dispatch(set_current_cv_vehicle(data.data));

      }
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);

      return error as AxiosError;
    }
  };
};


// Eliminar Hoja de Vida
export const delete_cv_vehicle_service: any = (id: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(`/almacen/hoja-de-vida/vehiculos/delete//${id}/`);
      control_success('La hoja de vida se eliminó correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Actualizar Hoja de Vida 
export const update_cv_vehicle_service: any = (id: string | number, hoja_vida: any) => {
  return async (dispatch: Dispatch<any>) => {

    try {
      const { data } = await api.put(`almacen/hoja-de-vida/vehiculos/update/${id}/`, hoja_vida);
      control_success('La hoja de vida se actualizó correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};