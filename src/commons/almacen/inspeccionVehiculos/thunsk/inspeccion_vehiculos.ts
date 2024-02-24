import { AxiosError } from "axios";
import { control_error } from "../../../../helpers";
import { api } from "../../../../api/axios";



export const obtener_nombres_conductor: any = () => {
  return async () => {
    try {
      const { data } = await api.get('/almacen/vehiculos/info-conductor/get/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};