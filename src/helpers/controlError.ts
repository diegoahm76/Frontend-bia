import { toast } from 'react-toastify';

export const control_error = (error: any | unknown): void => {
  let message = '';
  let auto_close: number | boolean = 5000;
  console.error(error);
  let type: 'info' | 'success' | 'warning' | 'error' | 'default' = 'error';
  if (error.message === 'Network Error') {
    message = 'Error de conexión';
    type = 'warning';
  } else if (error.response !== undefined && error.response.status === 401) {
    message = 'Su sesión ha vencido, por favor inicie sesión nuevamente';
    type = 'info';
    auto_close = 4000;
    setTimeout(() => {
      localStorage.clear();
      window.location.reload();
    }, 5000);
  } else {
    message = error.toString();
  }
  toast(message, {
    position: 'bottom-right',
    autoClose: auto_close,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    type
  });
};
