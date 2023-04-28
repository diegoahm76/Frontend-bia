import { toast } from 'react-toastify';
export const control_error = (error: any | unknown): void => {
  let message = '';
  console.error(error);
  let type: 'info' | 'success' | 'warning' | 'error' | 'default' = 'error';
  if (error.message === 'Network Error') {
    message = 'Error de conexión';
    type = 'warning';
  } else {
    message = error.toString();
  }
  toast(message, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    type
  });
};
