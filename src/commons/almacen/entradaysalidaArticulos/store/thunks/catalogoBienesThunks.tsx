import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError
  // type AxiosResponse
} from 'axios';
// Slices
import {
  get_bienes,
  get_marks,
  get_unit_measurement,
  get_percentages,  
} from '../slices/indexCatalogodeBienes';
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


// Obtener bienes
export const get_bienes_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('almacen/bienes/catalogo-bienes/get-list');
      dispatch(get_bienes(data.data));
      return data;
    } catch (error: any) {
      console.log('get_bienes_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Agregar bien
export const add_bien_service: any = (
  bien: any,
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      console.log(bien)
      const { data } = await api.put(
        'almacen/bienes/catalogo-bienes/create/',
        bien
      );
      console.log(data)
      dispatch(get_bienes_service());
      control_success('El bien se agrego correctamente');
      return data;
    } catch (error: any) {
      console.log('add_bien_service');
      control_error(error.response.data.detail);
      console.log(error);
      return error as AxiosError;
    }
  };
};

// obtener marcas
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
// obtener porcentajes
export const get_porcentaje_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('almacen/porcentajes/get-list');
      dispatch(get_percentages(data));
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

// Obtener Medida
export const get_medida_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('almacen/unidades-medida/get-list/');
      dispatch(get_unit_measurement(data));
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};


