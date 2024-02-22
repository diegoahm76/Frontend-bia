import { AxiosError } from "axios";
import { api } from "../../../../api/axios";
import { control_error } from "../../../../helpers";


export const buscar_vehiculos_asignados: any = (tipo_vehiculo: string,tipo_coductor: string,placa: string,conductor: string) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/vehiculos/listar-asignaciones/get/?tipo_vehiculo=${tipo_vehiculo}&tipo_conductor=${tipo_coductor}&placa=${placa}&conductor=${conductor}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};