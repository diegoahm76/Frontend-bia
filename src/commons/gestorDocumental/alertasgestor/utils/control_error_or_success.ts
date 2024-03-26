import Swal from 'sweetalert2';
import { toast, type ToastContent } from 'react-toastify';

export const notification_error = async (
  message = 'Algo pasó, intente de nuevo',
  text = ''
): Promise<any> =>
  await Swal.mixin({
    position: 'center',
    icon: 'error',
    title: message,
    text,
    showConfirmButton: true,
    confirmButtonText: 'Aceptar'
  }).fire();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const control_error = (message: ToastContent) =>
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
export const control_success = (message: ToastContent) =>
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

// create toast info
export const control_info = (message: ToastContent): any =>
  toast.info(message, {
    position: 'bottom-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });
