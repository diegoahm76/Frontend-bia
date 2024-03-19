import { AxiosError } from "axios";
import { api } from "../../../../api/axios";


export const get_buscar_solicitudes_activos: any = (
  fecha_desde: string,
  fecha_hasta: string,
  estado_solicitud: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/busqueda-solicitudes-realizadas/get/?fecha_desde=${
        fecha_desde
      }&fecha_hasta=${
        fecha_hasta
      }&estado_solicitud=${estado_solicitud}`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};