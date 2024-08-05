import { AxiosError } from "axios";
import { control_error, control_success } from "../../../../helpers";
import { interface_solicitar_viaje } from "../interfaces/types";
import { api } from "../../../../api/axios";
import dayjs from "dayjs";

export function parseHora(hora: string | null): dayjs.Dayjs | null {
  if (hora === null || hora === '') {
    return null;
  }
  const [horas, minutos] = hora?.split(':');
  const hora_parceada = dayjs().set('hour', parseInt(horas)).set('minute', parseInt(minutos)).toDate();
  return dayjs(hora_parceada);
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

export const obtener_solicitud_por_id: any = (id_solicitud: string) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/vehiculos/obtener-informacion-viajes/${id_solicitud}/`);
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
      const { data } = await api.get(`almacen/vehiculos/obtener-informacion-viajes/${id_solicitud_respondida}/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

// Lista Departamentos
export const get_departamentos: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`listas/departamentos/?pais=CO`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Lista Municipios
export const get_municipios: any = (departamento: number) => {
  return async () => {
    try {
      const { data } = await api.get(`listas/municipios/?cod_departamento=${departamento}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
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

export const get_obtener_estados_solicitud: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/choices/estado-solicitud/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
}