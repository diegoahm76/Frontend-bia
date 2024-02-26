import { AxiosError } from "axios";
import { control_error, control_success } from "../../../../helpers";
import { api } from "../../../../api/axios";
import { create_inspeccion_vehiculo } from "../interfaces/types";



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

export const obtener_vehiculo_logueado: any = () => {
  return async () => {
    try {
      const { data } = await api.get('/almacen/vehiculos/vehiculo-persona-conductor/get/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const buscar_vehiculos: any = (placa_vehiculo: string, nombre: string, empresa_contratista: string, nombre_marca: string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/vehiculos/busqueda/vehiculo/arrendado/?nombre=${nombre}&placa=${placa_vehiculo}&empresa_contratista=${empresa_contratista}&nombre_marca=${nombre_marca}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const enviar_inspeccion_vehiculo: any = (form_data: create_inspeccion_vehiculo) => {
  return async () => {
    try {
      const { data } = await api.post('/almacen/vehiculos/inspeccion-vehiculo/create/', form_data);
      control_success('La inspección se envió correctamente');
      return data;
    } catch (error: any) {
      control_error('Hubo un error al intentar crear la solicitud de viaje');
      return error as AxiosError;
    }
  };
};


export const obtener_vehiculos_sin_novedad: any = () => {
  return async () => {
    try {
      const { data } = await api.get('/almacen/vehiculos/novedades-vehiculo/get/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};