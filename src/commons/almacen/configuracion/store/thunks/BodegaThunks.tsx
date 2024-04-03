/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Dispatch } from 'react';
import { type NavigateFunction } from 'react-router-dom';
import { toast, type ToastContent } from 'react-toastify';

import { get_bodega } from '../slice/BodegaSlice';
import { api } from '../../../../../api/axios';
import { type AxiosError } from 'axios';

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

export const control_warning = (message: ToastContent) =>
  toast.warning(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

// Obtener Bodega
export const get_bodega_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('almacen/bodega/get-list/');
      //  console.log('')(data);
      dispatch(get_bodega(data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_bodega_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Agregar Bodega
export const add_bodega_service: any = (
  bodega: any,
  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post('almacen/bodega/create/', bodega);
      control_success('La Bodega se agrego correctamente');

      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      //  console.log('')('add_bodega_service');

      return error as AxiosError;
    }
  };
};

// editar bodega

export const edit_bodega_service: any = (
  bodega: any,
  id: string | number,

  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(`almacen/bodega/update/${id}/`, bodega);
      dispatch(get_bodega_service());
      control_success('La bodega se edito correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      //  console.log('')(error.response.data);

      return error as AxiosError;
    }
  };
};

// eliminar bodega

export const delete_bodega_service: any = (id: string | number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(`almacen/bodega/delete/${id}/`);
      dispatch(get_bodega_service());
      control_success('Se elimino la bodega');

      return data;
    } catch (error: any) {
      //  console.log('')('delete service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// id persona

// export const get_id_responsable_service = (): any => {
//     return async (dispatch: Dispatch<any>) => {
//         try {
//             const { data } = await api.get('personas/get-by-id/');
//             dispatch(get_id_responsable(data));
//             return data;
//         } catch (error: any) {
//             return error as AxiosError;
//         }
//     };
// }
