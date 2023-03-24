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
  // current_bien,
} from '../slice/configuracionSlice';
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
      console.log(data.data)
      dispatch(get_bienes([data.data[5].data.bien]));
      return data;
    } catch (error: any) {
      console.log('get_bienes_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Editar Vivero
export const edit_bien_service: any = (
  bien: any,
  id: string|number,

) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/viveros/tipificacion/${id}/`,
        bien
      );
      dispatch(get_bienes_service());
      control_success('El bien se edito correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      console.log(error.response.data);
      return error as AxiosError;
    }
  };
};


