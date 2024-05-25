import { AxiosError } from "axios";
import { api } from "../../../../api/axios";
import { control_error, control_success } from "../../../../helpers";
import { create_inspeccion_vehiculo } from "../interfaces/types";


export const obtener_nombres_conductor: any = () => {
  return async () => {
    try {
      const { data } = await api.get('/almacen/vehiculos/info-conductor/get/');
      return data;
    } catch (error: any) {
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

export const get_obtener_viajes_asociados: any = (id_vehiculo_conductor: string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/vehiculos/viajes-asociados-vehiculo/${id_vehiculo_conductor}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_obtener_resumen_solicitud: any = (id_solicitud_viaje: string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/vehiculos/obtener-informacion-viajes/${id_solicitud_viaje}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_obtener_tipos_documentos: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`/listas/tipo-documento/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
}

export const get_obtener_persona_solicita: any = (
  tipo_documento: string,
  numero_documento: string,
  primer_nombre: string,
  primer_apellido: string,
  razon_social: string,
  nombre_comercial: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/personas/get-operarios-filters/?tipo_documento=${
        tipo_documento
      }&numero_documento=${
        numero_documento
      }&primer_nombre=${
        primer_nombre
      }&primer_apellido=${
        primer_apellido
      }&razon_social=${
        razon_social
      }&nombre_comercial=${nombre_comercial}`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};