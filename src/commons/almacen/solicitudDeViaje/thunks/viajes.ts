import { AxiosError } from "axios";
import { control_error, control_success } from "../../../../helpers";
import { interface_solicitar_viaje } from "../interfaces/types";
import { api } from "../../../../api/axios";
import dayjs from "dayjs";

export function parseHora(hora: string): dayjs.Dayjs {
  const [horas, minutos] = hora?.split(':');
  return dayjs().set('hour', parseInt(horas)).set('minute', parseInt(minutos));
}

export const obtener_solicitudes: any = () => {
  return async () => {
    try {
      const { data } = await api.get('almacen/vehiculos/listar-solicitudes-viajes/get/');
      return data;
    } catch (error: any) {
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

export const enviar_solicitud_viaje: any = (form_data: interface_solicitar_viaje) => {
  return async () => {
    try {
      const { data } = await api.post('/almacen/vehiculos/solicitar-viaje/create/', form_data);
      control_success('La solicitud de viaje se creo correctamente');
      return data;
    } catch (error: any) {
      control_error('Hubo un error al intentar crear la solicitud de viaje');
      return error as AxiosError;
    }
  };
};

export const editar_solicitud_viaje: any = (form_data: interface_solicitar_viaje, id_solicitud: number) => {
  return async () => {
    try {
      const { data } = await api.put(`almacen/vehiculos/editar-solicitudes-viajes/${id_solicitud}/`, form_data);
      control_success('Se editó y se envió la solicitud correctamente');
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const buscar_expediente: any = (titulo_expediente: string,fecha_inicio_expediente: string,fecha_fin_expediente: string,palabras_clave: string) => {
  return async () => {
    try {
      const { data } = await api.get(`gestor/expedientes-archivos/expedientes/buscar-expedientes/?titulo_expediente=${titulo_expediente}&fecha_inicio_expediente=${fecha_inicio_expediente}&fecha_fin_expediente=${fecha_fin_expediente}&palabras_clave_expediente=${palabras_clave}`);
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

export const listar_departamentos: any = () => {
  return async () => {
    try {
      const { data } = await api.get('choices/departamentos/');     
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};
 
export const obtener_agendamiento_solicitud: any = (id_solicitud_respondida: number) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/vehiculos/obtener-agendamiento-viajes/${id_solicitud_respondida}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};