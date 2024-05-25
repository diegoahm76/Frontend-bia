import { AxiosError } from "axios";
import { api } from "../../../../api/axios";
import { control_error } from "../../../../helpers";
import { crear_bitacora_inicio } from "../interfaces/types";

export const buscar_agendamientos: any = (
  fecha_autorizacion_desde: string,
  fecha_autorizacion_hasta: string,
  estado: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/vehiculos/listar-agendamientos/get/?fecha_autorizacion_desde=${fecha_autorizacion_desde}&fecha_autorizacion_hasta=${fecha_autorizacion_hasta}&estado=${estado}`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const listar_municipios: any = () => {
  return async () => {
    try {
      const { data } = await api.get('choices/municipios/');
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const buscar_conductores: any = (tipo_conductor: string,nombre_conductor: string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/vehiculos/busqueda-conductores/get/?conductor_nombre=${nombre_conductor}&tipo_conductor=${tipo_conductor}`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const enviar_bitacora_inicio: any = (form_data: crear_bitacora_inicio) => {
  return async () => {
    try {
      const { data } = await api.post('/almacen/vehiculos/bitacora-salida/create/', form_data);
      return data;
    } catch (error: any) {
      control_error('Hubo un error al intentar enviar la bitácora de salida');
      return error as AxiosError;
    }
  };
};

export const enviar_bitacora_llegada: any = (id_solicitud: number, form_data: {novedad_llegada: string}) => {
  return async () => {
    try {
      const { data } = await api.put(`/almacen/vehiculos/bitacora-llegada/update/${id_solicitud}/`, form_data);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};


export const buscar_bitacora_completa: any = (id_viaje_agendado: string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/vehiculos/bitacora-salida/get/${id_viaje_agendado}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};
