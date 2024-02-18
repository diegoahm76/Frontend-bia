import { AxiosError } from "axios";
import { control_error, control_success } from "../../../../helpers";
import { interface_solicitar_viaje } from "../interfaces/types";
import { api } from "../../../../api/axios";

export const enviar_solicitud_viaje: any = (form_data: interface_solicitar_viaje) => {
  return async () => {
    try {
      const { data } = await api.post('/almacen/vehiculos/registrar/vehiculo/arrendado/create/', form_data);
      control_success('El arriendo de vehículo se creo correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const obtener_solicitudes: any = () => {
  return async () => {
    try {
      const { data } = await api.get('almacen/vehiculos/listar-solicitudes-viajes/get/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const obtener_solicitudes_params: any = (estado: string, desde: string, hasta: string) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/vehiculos/listar-solicitudes-viajes/get/?fecha_solicitud_desde=${desde}&fecha_solicitud_hasta=${hasta}&estado_solicitud=${estado}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const elimiar_solicitud_viaje: any = (id_solicitud: number) => {
  return async () => {
    try {
      const eliminiar_solicitud = await api.delete(`/almacen/vehiculos/eliminar-solicitudes-viajes/${id_solicitud}/`);
      if(eliminiar_solicitud.status === 200){
        control_success('Se elimino la solicitud')
      } else {
        console.log(eliminiar_solicitud.status);
      }
      return eliminiar_solicitud;
    } catch (error) {
      control_error('Error al intentar borrar la solicitud, intente de nuevo');
      return error as AxiosError;
    }
  }
}