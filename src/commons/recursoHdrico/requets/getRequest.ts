import { api } from "../../../api/axios";
import { type ResponseServer } from "../../../interfaces/globalModels";
import { type Parametros, type conf_alarma, type Datos, type Estaciones, type EstacionesDetalle } from "../estaciones/interfaces/interfaces";


// consultar estaciones
export const consultar_estaciones = async (): Promise<Estaciones[]> => {
    const { data } = await api.get<ResponseServer<Estaciones[]>>('estaciones/consultar-estaciones/');
    return data.data
}

// consultar datos 
export const consultar_datos = async (): Promise<Datos[]> => {
    const { data } = await api.get<ResponseServer<Datos[]>>('estaciones/datos/consultar-datos/');
    return data.data
}

// consultar configuracion alerta personas
export const consultar_conf_alerta_persona = async (): Promise<conf_alarma[]> => {
    const { data } = await api.get<ResponseServer<conf_alarma[]>>('estaciones/configuracion/alertas/consultar-configuracion-alerta/');
    return data.data
}

// consultar parametros de referencia
export const consultar_parametros_referencia = async (): Promise<Parametros[]> => {
    const { data } = await api.get<ResponseServer<Parametros[]>>('estaciones/parametros/consultar-parametro');
    return data.data
}

// consultar estaciones id
export const consultar_estaciones_id = async (id: number | string): Promise<EstacionesDetalle> => {
    const { data } = await api.get<ResponseServer<EstacionesDetalle>>(`estaciones/consultar-estaciones-id/${id}/`);
    return data.data;
  }
  