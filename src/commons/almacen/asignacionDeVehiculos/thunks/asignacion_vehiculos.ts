import { AxiosError } from "axios";
import { api } from "../../../../api/axios";
import { control_error, control_success } from "../../../../helpers";
import { interface_vehiculo_agendado_conductor } from "../interfaces/types";


export const buscar_vehiculos_asignados: any = (tipo_vehiculo: string,tipo_coductor: string,placa: string,conductor: string) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/vehiculos/listar-asignaciones/get/?tipo_vehiculo=${tipo_vehiculo}&tipo_conductor=${tipo_coductor}&placa=${placa}&conductor=${conductor}`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const elimiar_asignacion_vehiculo: any = (id_solicitud: number) => {
  return async () => {
    try {
      const eliminiar_solicitud = await api.delete(`/almacen/vehiculos/eliminar-asignacion/${id_solicitud}/`);
      if(eliminiar_solicitud.status === 200){
        control_success('Se elimino la asignacion correctamente')
      } else {
        console.log(eliminiar_solicitud.status);
      }
      return eliminiar_solicitud;
    } catch (error) {
      control_error('Error al intentar borrar la asignacion, intente de nuevo');
      return error as AxiosError;
    }
  }
}

export const buscar_vehiculos: any = (tipo_vehiculo: string,marca: string,placa: string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/vehiculos/busqueda-vehiculos/get/?tipo_vehiculo=${tipo_vehiculo}&placa=${placa}&marca=${marca}`);
      return data;
    } catch (error: any) {
      if(Object.keys(error).length !== 0){
        return error as AxiosError;
      }
    }
  };
};

export const buscar_conductores: any = (tipo_conductor: string,nombre_conductor: string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/vehiculos/busqueda-conductores/get/?conductor_nombre=${nombre_conductor}&tipo_conductor=${tipo_conductor}`);
      return data;
    } catch (error: any) {
      if(Object.keys(error).length !== 0){
        return error as AxiosError;
      }
    }
  };
};

export const enviar_asignacion_vehiculo: any = (form_data: interface_vehiculo_agendado_conductor[]) => {
  return async () => {
    try {
      const { data } = await api.post('/almacen/vehiculos/asignacion-conductor/create/', form_data);
      control_success('Las asignaciones se crearon correctamente');
      
      return data;
    } catch (error: any) {
      return error?.response.data as AxiosError;
    }
  };
};