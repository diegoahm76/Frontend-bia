import { AxiosError } from "axios";
import { api } from "../../../../api/axios";

export const obtener_vehiculos_inspeccionados: any = () => {
  return async () => {
    try {
      const { data } = await api.get('/almacen/vehiculos/novedades-vehiculo/get/');
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const put_verificar_inspeccion: any = (id_inspeccion_vehiculo: string, from_data: {observaciones_verifi_sup: string}) => {
  return async () => {
    try {
      const { data } = await api.put(`/almacen/vehiculos/revisar-vehiculo/${id_inspeccion_vehiculo}/`, from_data);
      return data;
    } catch (error: any) {
      if(error !== undefined && Object.keys(error).length !== 0){
        return error.response.data as AxiosError;
      }
    }
  };
};

export const get_obtener_revision_inspeccion: any = (id_inspeccion_vehiculo: string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/vehiculos/listar-inspecciones-id/${id_inspeccion_vehiculo}/`);
      return data;
    } catch (error: any) {
      if(error !== undefined && Object.keys(error).length !== 0){
        return error.response.data as AxiosError;
      }
    }
  };
};