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
  get_bienes,
  current_bien
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
      console.log(data)
      dispatch(get_bienes(data.data.data));
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
  nursery: any,
  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      console.log(nursery);
      const { data } = await api.post(
        'almacen/bienes/catalogo-bienes/create/',
        nursery
      );

      dispatch(get_bienes_service());
      dispatch(current_bien(data.detail));
      control_success('El bien se agrego correctamente');
      // navigate('/gestor_documental/organigrama/editar_organigrama');
      return data;
    } catch (error: any) {
      console.log('add_bien_service');
      control_error(error.response.data.detail);
      console.log(error.response.data);
      //     navigate('/gestor_documental/organigrama/crear_organigrama');
      return error as AxiosError;
    }
  };
};


