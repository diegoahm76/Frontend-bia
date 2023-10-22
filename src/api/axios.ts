import axios from "axios";
import { control_warning } from "../commons/almacen/configuracion/store/thunks/BodegaThunks";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const baseURL = "https://back-end-bia-beta.up.railway.app/api/";

// const baseURL = "http://70.30.6.237/api/"

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  async (request) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;

        //* interceptar la solicitud por tipo de metodo y mostrar un mensaje de carga
        console.log(
          `%c ${request?.method?.toUpperCase()} ${request.url}`,
          'color: blue; font-weight: bold;'
        );
        return request;
      }
    } catch (e) {
      console.log(e);
      await caches.delete("bia-v2");
      window.location.href = "/#/auth/login";
      control_warning(
        "Su sesión ha expirado, por favor vuelva a iniciar sesión"
      );
    }
    return request;
  },
  async (error) => {
      await caches.delete("bia-v2");
      window.location.href = "/#/auth/login";
      control_warning(
        "Su sesión ha expirado, por favor vuelva a iniciar sesión"
      );
    return await Promise.reject(error);
  }
);
