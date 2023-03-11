import { api } from "../../../api/axios";
import { type ResponseServer } from "../../../interfaces/globalModels";
import { type Parametros, type conf_alarma, type Datos, type Estaciones } from "../estaciones/interfaces/interfaces";

export const consultar_estaciones = async (): Promise<Estaciones[]>  => {
    const { data } =  await api.get<ResponseServer<Estaciones[]>>('estaciones/consultar-estaciones/');
    return data.data
}
export const consultar_datos = async (): Promise<Datos[]>  => {
    const { data } =  await api.get<ResponseServer<Datos[]>>('estaciones/datos/consultar-datos/');
    return data.data
}
export const consultar_conf_alerta_persona = async (): Promise<conf_alarma[]>  => {
    const { data } =  await api.get<ResponseServer<conf_alarma[]>>('estaciones/configuracion/alertas/consultar-configuracion-alerta/');
    return data.data
}
export const consultar_parametros_referencia = async (): Promise<Parametros[]>  => {
    const { data } =  await api.get<ResponseServer<Parametros[]>>('estaciones/parametros/consultar-parametro');
    return data.data
}