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
    marca_seleccionada,
    get_porcentaje,
    porcentaje_seleccionado,
    get_medida,
    medida_seleccionada,

} from '../slice/MarcaMedidaPorcentajeSlice';
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


// Obtener Marca
export const get_marca_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('almacen/marcas/get-list');
      console.log(data)
      dispatch(get_marca(data));
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

// porcentaje

// Obtener Porcentaje
export const get_porcentaje_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('almacen/porcentajes/get-list');
      console.log(data)
      dispatch(get_porcentaje(data));
      return data;
    } catch (error: any) {
      console.log('get_porcentaje_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Agregar Porcentaje
export const add_porcentaje_service: any = (
  porcentaje: any,
  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      console.log(porcentaje);
      const { data } = await api.post(
        'almacen/porcentajes/create/',
        porcentaje
      );

      dispatch(get_porcentaje_service());
      dispatch(porcentaje_seleccionado(data.detail));
      control_success('El porcentaje se agrego correctamente');
      
      return data;
    } catch (error: any) {
      console.log('add_porcentaje_service');
      control_error(error.response.data.detail);
      console.log(error.response.data);
      
      return error as AxiosError;
    }
  };
};

// Medida

// Obtener Medida
export const get_medida_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('almacen/unidades-medida/get-list/');
      console.log("medida")
      console.log(data)
      dispatch(get_medida(data));
      return data;
    } catch (error: any) {
      console.log('get_medida_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Agregar Medida
export const add_medida_service: any = (
  medida: any,
  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      console.log(medida);
      const { data } = await api.post(
        'almacen/unidades-medida/create/',
        medida
      );

      dispatch(get_medida_service());
      dispatch(medida_seleccionada(data.detail));
      control_success('La medida se agrego correctamente');
      
      return data;
    } catch (error: any) {
      console.log('add_medida_service');
      control_error(error.response.data.detail);
      console.log(error.response.data);
      
      return error as AxiosError;
    }
  };
};



