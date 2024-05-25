/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../api/axios";
import { control_error } from "../../../../../helpers";

export const listaEstadosTramite = async (): Promise<any> => {
  try {
    const url = `gestor/consultar-estado-solicitud-tramite/estados/tramites/`
    const response = await api.get(url);
    if (response?.data?.success) {
      console.log('soy la data', response?.data?.data);
      return response?.data?.data;
    }
  } catch (error: any) {
    console.error('Error al cargar las estado', error);
    control_error(error?.response?.data?.detail);
  }
}