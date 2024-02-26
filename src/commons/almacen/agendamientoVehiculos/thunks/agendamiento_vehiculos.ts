import { AxiosError } from "axios";
import { api } from "../../../../api/axios";
import { control_error, control_success } from "../../../../helpers";
import { crear_aprobacion_viaje, interface_data_agendamiento_vehiculos, interface_rechazo_solicitud } from "../interfaces/types";

export const buscar_solicitudes_agendamientos: any = (
  fecha_solicitud_desde: string,
  fecha_solicitud_hasta: string,
  cod_departamento: string,
  cod_municipio: string,
  nro_pasajeros: string,
  requiere_carga: string,
  fecha_partida: string,
  fecha_retorno: string,
  estado_solicitud: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/vehiculos/busqueda-solicitudes-viajes/get/?fecha_solicitud_desde=${fecha_solicitud_desde}&fecha_solicitud_hasta=${fecha_solicitud_hasta}&cod_municipio=${cod_municipio}&nro_pasajeros=${nro_pasajeros}&requiere_carga=${requiere_carga}&fecha_partida=${fecha_partida}&fecha_retorno=${fecha_retorno}&estado_solicitud=${estado_solicitud}`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};


export const enviar_rechazo_solicitud_viaje: any = (form_data: interface_rechazo_solicitud) => {
  return async () => {
    try {
      const { data } = await api.post('/almacen/vehiculos/reprobar-solicitud-viaje/create/', form_data);
      return data;
    } catch (error: any) {
      control_error('Hubo un error al intentar enviar el rechazo de solicitud');
      return error as AxiosError;
    }
  };
};

export const buscar_detalles_vehiculos_agendados: any = () => {
  return async () => {
    try {
      const { data } = await api.get('/almacen/vehiculos/detalles-vehiculos-agendados/');
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const buscar_vehiculos_general: any = (
  placa: string,
  nombre: string,
  marca: string,
  empresa_contratista: string,
  persona_conductor: string,
  tiene_platon: string,
  arrendado: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/vehiculos/busqueda-vehiculos-general/?placa=${
        placa
      }&nombre=${
        nombre
      }&marca=${
        marca
      }&empresa_contratista=${
        empresa_contratista
      }&persona_conductor=${
        persona_conductor
      }&tiene_platon=${
        tiene_platon
      }&es_arrendado=${
        arrendado
      }`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};


export const enviar_aprobacion_viaje: any = (form_data: crear_aprobacion_viaje) => {
  return async () => {
    try {
      const { data } = await api.post('/almacen/vehiculos/aprobar-solicitud-viaje/create/', form_data);
      return data;
    } catch (error: any) {
      control_error('Hubo un error al intentar enviar el rechazo de solicitud');
      return error as AxiosError;
    }
  };
};