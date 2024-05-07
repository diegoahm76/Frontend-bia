import { AxiosError } from "axios";
import { api } from "../../../../api/axios";
import { control_error } from "../../../../helpers";
import { crear_aprobacion_viaje, interface_rechazo_solicitud } from "../interfaces/types";

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
      control_error('Hubo un error al intentar enviar el la aprobación de solicitud');
      return error as AxiosError;
    }
  };
};

export const obtener_ver_agendamiento: any = (id_solicitud_viaje: string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/vehiculos/obtener-agendamiento-viajes/${id_solicitud_viaje}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const editar_aprobacion_viaje: any = (id_viaje_agendado: number, form_data: {id_vehiculo_conductor: number}) => {
  return async () => {
    try {
      const { data } = await api.put(`/almacen/vehiculos/viajes-agendados/${id_viaje_agendado}/`,form_data);
      return data;
    } catch (error: any) {
      control_error('Hubo un error al intentar editar el agendamiento');
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

export const get_resumen_solicitud: any = (id_solicitud_viaje : string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/vehiculos/obtener-informacion-viajes/${id_solicitud_viaje}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};