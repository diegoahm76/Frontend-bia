import { toast } from 'react-toastify';
export const control_error = (error: any | unknown): void => {
  console.error(error);
  toast(error.toString(), {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    type: 'error'
  });
};
