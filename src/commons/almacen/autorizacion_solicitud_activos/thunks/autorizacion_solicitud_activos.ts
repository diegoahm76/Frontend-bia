import { AxiosError } from "axios";
import { api } from "../../../../api/axios";

export const get_obtener_solicitudes_activos: any = (
  estado_solicitud: string,
  fecha_desde: string,
  fecha_hasta: string,
  id_persona_solicita: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/activos/busqueda-solicitudes-proceso/get/?estado_solicitud=${
        estado_solicitud
      }&fecha_desde=${
        fecha_desde
      }&fecha_hasta=${
        fecha_hasta
      }&id_persona_solicita=${
        id_persona_solicita
      }`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};