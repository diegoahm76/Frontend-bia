import { type Dispatch } from 'react';
import { type NavigateFunction } from 'react-router-dom';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError
  // type AxiosResponse
} from 'axios';
// Slices
import {
  current_nursery, get_nurseries, get_nurseries_closing, get_nurseries_quarantine,
  // current_nursery
} from '../slice/viveroSlice';
import { api } from '../../../../../api/axios';

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


// Obtener viveros
export const get_nurseries_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('conservacion/viveros/get-by-nombre-municipio');
      console.log(data)
      dispatch(get_nurseries(data.data));
      return data;
    } catch (error: any) {
      console.log('get_nursery_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Agregar Vivero
export const add_nursery_service: any = (
  nursery: any,
  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post(
        'conservacion/viveros/create/',
        nursery
      );
      dispatch(get_nurseries_service());
      control_success('El vivero se agrego correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      console.log(error.response.data);
      return error as AxiosError;
    }
  };
};

// Editar Vivero
export const edit_nursery_service: any = (
  nursery: any,
  id: string|number,

  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/viveros/update/${id}/`,
        nursery
      );
      dispatch(get_nurseries_service());
      control_success('El vivero se edito correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      console.log(error.response.data);
      return error as AxiosError;
    }
  };
};

// Borrar vivero
export const delete_nursery_service: any = (id: string | number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(
        `conservacion/viveros/delete/${id}/`
      );
      dispatch(get_nurseries_service());
      control_success('Se elimino el vivero');

      return data;
    } catch (error: any) {
      console.log('delete nursery service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Desactivar - activar vivero
export const activate_deactivate_nursery_service: any = (id: string | number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/viveros/desactivar/${id}/`
      );
      dispatch(get_nurseries_service());
      control_success(data.detail);

      return data;
    } catch (error: any) {
      console.log('activate-deactivate nursery service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener vivero por id
export const get_nursery_service: any = (id: string | number)  => {
  return async (dispatch: Dispatch<any>) => {
    try {
      if(id !== undefined)
      {const { data } = await api.get(`conservacion/viveros/get-by-id/${id}/`);
      console.log(data)
      dispatch(current_nursery(data));
      return data;}
    } catch (error: any) {
      console.log('get_nursery_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener viveros cierre
export const get_nurseries_closing_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('conservacion/viveros/get-by-nombre-municipio');
      console.log(data)
      dispatch(get_nurseries_closing(data.data));
      return data;
    } catch (error: any) {
      console.log('get_nursery_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener viveros cuarentena
export const get_nurseries_quarantine_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('/api/conservacion/viveros/get-by-nombre-municipio/cuarentena');
      console.log(data)
      dispatch(get_nurseries_quarantine(data.data));
      return data;
    } catch (error: any) {
      console.log('get_nursery_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// abrir-cerrar vivero
export const closing_nursery_service: any = (
  nursery: any,
  id: string|number,

  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      console.log(nursery)
      const { data } = await api.put(
        `conservacion/viveros/abrir-cerrar/${id}/`,
        nursery
      );
      dispatch(get_nursery_service(id));
      if(nursery.accion === "Abrir"){
        control_success('Se realizo la apertura del vivero');
      } else{
        control_success('Se realizo el cierre del vivero');
      }
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      console.log(error);
      return error as AxiosError;
    }
  };
};

// cuarentena vivero
export const quarantine_nursery_service: any = (
  nursery: any,
  id: string|number,

  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      console.log(nursery)
      const { data } = await api.put(
        `conservacion/viveros/cuarentena/${id}/`,
        nursery
      );
      dispatch(get_nursery_service(id));
      control_success(data.detail);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      console.log(error);
      return error as AxiosError;
    }
  };
};

