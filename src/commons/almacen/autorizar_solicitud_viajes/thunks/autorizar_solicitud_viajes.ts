import { AxiosError } from "axios";
import { api } from "../../../../api/axios";
import dayjs from "dayjs";


export const get_obtener_solicitudes: any = (
  estado_solicitud: string,
  fecha_solicitud_desde: string,
  fecha_solicitud_hasta: string,
  id_persona_solicita: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/vehiculos/listar-solicitud-viajes-autorizar/get/?estado_solicitud=${
        estado_solicitud
      }&fecha_solicitud_desde=${
        fecha_solicitud_desde
      }&fecha_solicitud_hasta=${
        fecha_solicitud_hasta
      }&id_persona_solicita=${
        id_persona_solicita
      }`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const put_rechazar_solicitud: any = (id_solicitud_viaje : string, form_data: {justificacion_rechazo: string}) => {
  return async () => {
    try {
      const { data } = await api.put(`/almacen/vehiculos/rechazar-solicitud-viaje/${id_solicitud_viaje}/`, form_data);
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

export const put_aprobar_solicitud: any = (id_solicitud_viaje : string) => {
  return async () => {
    try {
      const { data } = await api.put(`/almacen/vehiculos/aprobar-solicitud-viaje/${id_solicitud_viaje}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};


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
      const { data } = await api.get(`/personas/get-personas-filters/?tipo_documento=${
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

export function parseHora(hora: string | null): dayjs.Dayjs | null {
  if (hora === null || hora === '') {
    return null;
  } else {
    const [horas, minutos] = hora?.split(':');
    const hora_parceada = dayjs().set('hour', parseInt(horas)).set('minute', parseInt(minutos)).toDate();
    return dayjs(hora_parceada);
  }
}