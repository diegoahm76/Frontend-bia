import { control_warning } from '../../commons/almacen/configuracion/store/thunks/BodegaThunks';

/* eslint-disable @typescript-eslint/naming-convention */
import { AxiosRequestConfig, AxiosError } from 'axios';

const handleSessionExpiry = async () => {
  await caches.delete('bia-v2');
  sessionStorage.removeItem('token'); // Elimina el token del almacenamiento local
  window.location.href = '/#/auth/login';
  control_warning('Su sesión ha expirado, por favor vuelva a iniciar sesión');
};

const handleRequest = async (request: AxiosRequestConfig | any) => {
  try {
    const token = sessionStorage.getItem('token');
    if (token) {
      request.headers = request.headers || {}; // Asegúrate de que 'headers' exista
      request.headers.Authorization = `Bearer ${token}`;

      process.env.NODE_ENV === 'production' &&
        console.log(
          `%c ${request?.method?.toUpperCase()} ${request.url}`,
          'color: blue; font-weight: bold;'
        );
    }
  } catch (e) {
    console.error(e);
  }
  return request;
};

const handleRequestError = async (error: AxiosError) => {
  console.error(error);
  return Promise.reject(error);
};

const handleResponseError = async (error: AxiosError) => {
  if (error.response?.status === 401) {
    await handleSessionExpiry();
  }
  return Promise.reject(error);
};

export {
  handleRequest,
  handleRequestError,
  handleResponseError,
  handleSessionExpiry,
};
