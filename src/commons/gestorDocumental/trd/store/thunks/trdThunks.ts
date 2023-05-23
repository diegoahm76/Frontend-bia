import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
import {
  type AxiosError
  // type AxiosResponse
} from 'axios';
// Slices
// Interfaces
import { api } from '../../../../../api/axios';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_error = (message: ToastContent) =>
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
// const control_success = (message: ToastContent) =>
//   toast.success(message, {
//     position: 'bottom-right',
//     autoClose: 3000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: 'light'
//   });


// Obtener todos los trd's terminados
export const get_finished_trd_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('gestor/trd/get-terminados/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};