import type { AxiosError, AxiosResponse } from "axios";
import type { AlertaProgramada, ConfiguracionAlerta, CrearAlerta, CrearPersonaAlerta, DataAlertaPersona, PutConfigutracionAlerta } from "../interfaces/types";
import type { ResponseServer } from "../../../../interfaces/globalModels";
import { api } from "../../../../api/axios";
import { control_error } from "../../../../helpers";
import type{ ValueProps } from "../../Instrumentos/interfaces/interface";



export const get_alerta_cod = async (
    cod_Alerta: string
): Promise<ConfiguracionAlerta> => {
    const response: AxiosResponse<ResponseServer<ConfiguracionAlerta[]>> = await api.get<
        ResponseServer<ConfiguracionAlerta[]>
    >(`transversal/alertas/configuracion_clase_alerta/get-by-cod/${cod_Alerta}/`);
    return response.data.data[0];
};

export const get_alerta = async (): Promise<ConfiguracionAlerta[]> => {
    const response: AxiosResponse<ResponseServer<ConfiguracionAlerta[]>> = await api.get<
        ResponseServer<ConfiguracionAlerta[]>
    >(`transversal/alertas/configuracion_clase_alerta/get-by-subsistema/RECU/`);
    return response.data.data;
};

export const get_unidades_organizacionales_by_id_organigrama_service: any = async () => {
    try {
        const url = `transversal/organigrama/unidades/get-list/organigrama-actual/`;
        const { data } = await api.get(url);
        return data.data;
    } catch (error: any) {
        //  console.log('')(error.response.data, 'error');
        control_error(error.response.data.detail);
        return error as AxiosError;
    }
}

export const perfiles_sistema = async (): Promise<any> => {
    const response: AxiosResponse<ResponseServer<any[]>> = await api.get<
        ResponseServer<any[]>
    >(`listas/perfiles_sistema/`);
    return response.data.data;
}

export const personas_alertas = async (
    cod_clase_alerta: string
): Promise<any> => {
    const response: AxiosResponse<ResponseServer<DataAlertaPersona[]>> = await api.get<
        ResponseServer<DataAlertaPersona[]>
    >(`transversal/alertas/personas_alertar/get-by-configuracion/${cod_clase_alerta}/`);
    return response.data.data;
}

export const get_alerta_programada = async (
    cod_clase_alerta: string
): Promise<any> => {
    const response: AxiosResponse<ResponseServer<AlertaProgramada[]>> = await api.get<
        ResponseServer<AlertaProgramada[]>
    >(`transversal/alertas/fecha_clase_alert/get-by-configuracion/${cod_clase_alerta}/`);
    return response.data.data;
}

export const post_fecha_alerta = async (
    data: CrearAlerta
): Promise<any> => {
    const response: AxiosResponse<ResponseServer<any>> = await api.post<
        ResponseServer<any>
    >(`transversal/alertas/fecha_clase_alert/create/`, data);
    return response.data;
}

export const post_persona_alerta = async (
    data: CrearPersonaAlerta
): Promise<any> => {
    const response: AxiosResponse<ResponseServer<any>> = await api.post<
        ResponseServer<any>
    >(`transversal/alertas/personas_alertar/create/`, data);
    return response.data;
}

export const put_configuracion_alerta = async (
    data: PutConfigutracionAlerta,
    cod_clase_alerta: string
): Promise<any> => {
    const response: AxiosResponse<ResponseServer<any>> = await api.put<
        ResponseServer<any>
    >(`transversal/alertas/configuracion_clase_alerta/update/${cod_clase_alerta}/`, data);
    return response.data;
}

export const delete_fecha_alerta = async (
    id_fecha: number
): Promise<any> => {
    const response: AxiosResponse<ResponseServer<any>> = await api.delete<
        ResponseServer<any>
    >(`transversal/alertas/fecha_clase_alert/delete/${id_fecha}/`);
    return response.data;
}

export const delete_persona_alerta = async (
    id_persona_alertar: number
): Promise<any> => {
    const response: AxiosResponse<ResponseServer<any>> = await api.delete<
        ResponseServer<any>
    >(`transversal/alertas/personas_alertar/delete/${id_persona_alertar}/`);
    return response.data;
}
export const get_prioridad_alerta = async (): Promise<ValueProps[]> => {
    const response: AxiosResponse<ResponseServer<ValueProps[]>> = await api.get<
        ResponseServer<ValueProps[]>
    >(`listas/niveles_prioridad_alerta/`);
    return response.data.data;
}