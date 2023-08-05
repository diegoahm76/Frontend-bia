import axios from 'axios';
import { control_warning } from '../commons/almacen/configuracion/store/thunks/BodegaThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const baseURL = "https://back-end-bia-preproduction.up.railway.app/api/"

// const baseURL = "http://70.30.6.237/api/"


export const api = axios.create({
  baseURL
});

api.interceptors.request.use(
  async (request) => {
    try {
      const token = localStorage.getItem('token');
      if (token !== null) {
        request.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      window.location.href = '/#/auth/login';
      control_warning(
        'Su sesión ha expirado, por favor vuelva a iniciar sesión'
      );
    }
    return request;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);
