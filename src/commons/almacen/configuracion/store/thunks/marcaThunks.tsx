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
    get_marca,
    marca_seleccionada
} from '../slice/marcaSlice';
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


// Obtener Organigrama
export const get_marca_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('almacen/marcas/get-list');
      console.log(data)
      dispatch(get_marca(data.data));
      return data;
    } catch (error: any) {
      console.log('get_marca_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Agregar Marca
export const add_marca_service: any = (
  marca: any,
  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      console.log(marca);
      const { data } = await api.post(
        'almacen/marcas/create/',
        marca
      );

      dispatch(get_marca_service());
      dispatch(marca_seleccionada(data.detail));
      control_success('La marca se agrego correctamente');
      
      return data;
    } catch (error: any) {
      console.log('add_marca_service');
      control_error(error.response.data.detail);
      console.log(error.response.data);
      
      return error as AxiosError;
    }
  };
};


