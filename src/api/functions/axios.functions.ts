import { control_warning } from '../../commons/almacen/configuracion/store/thunks/BodegaThunks';

/* eslint-disable @typescript-eslint/naming-convention */
const handleSessionExpiry = async () => {
  await caches.delete('bia-v2');
  localStorage.removeItem('token'); // Elimina el token del almacenamiento local
  window.location.href = '/#/auth/login';
  control_warning('Su sesión ha expirado, por favor vuelva a iniciar sesión');
};

const handleRequest = async (request: any) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
      console.log(
        `%c ${request?.method?.toUpperCase()} ${request.url}`,
        'color: blue; font-weight: bold;'
      );
    }
  } catch (e) {
    console.log(e);
    await handleSessionExpiry();
  }
  return request;
};

const handleRequestError = async (error: any) => {
  await handleSessionExpiry();
  return await Promise.reject(error);
};

const handleResponseError = async (error: any) => {
  if (error.response.status === 401) {
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
