import type { AxiosResponse } from "axios";
import type { ResponseServer } from "../../../../interfaces/globalModels";
import type { BusquedaAvance, BusquedaAvanzada, InfoAvance, InfoPorh } from "../Interfaces/interfaces";
import { api } from "../../../../api/axios";

export const search_avanzada = async ({
    nombre_proyecto,
    nombre_programa,
    nombre_PORH,
}: BusquedaAvanzada): Promise<AxiosResponse<ResponseServer<InfoPorh[]>>> => {
    const url = `hidrico/programas/get/avanzada/programas/?nombre_proyecto=${String(nombre_proyecto ?? '')}&nombre_programa=${String(nombre_programa ?? '')}&nombre_PORH=${String(nombre_PORH ?? '')}`;
    return await api.get<ResponseServer<InfoPorh[]>>(url);
};
export const search_avance = async ({
    nombre_proyecto,
    nombre_programa,
    nombre_PORH,
    nombre_avances,
}: BusquedaAvance): Promise<AxiosResponse<ResponseServer<InfoAvance[]>>> => {
    const url = `hidrico/programas/get/avanzada/avances/?nombre_proyecto=${String(nombre_proyecto ?? '')}&nombre_programa=${String(nombre_programa ?? '')}&nombre_PORH=${String(nombre_PORH ?? '')}&nombre_avances=${String(nombre_avances ?? '')}`;
    return await api.get<ResponseServer<InfoAvance[]>>(url);
};

export const get_data_id = async (id: number, set_data: any, url: string): Promise<any[]> => {
    const { data } = await api.get<ResponseServer<any[]>>(
        `hidrico/programas/${url}/${id}/`
    );
    set_data(data.data);
    return data.data;
};

export const agregar_avance = async (
    id_proyecto: number,
    datos: FormData
): Promise<any> => {
    const response = await api.post(
        `hidrico/programas/registro/avance/proyecto/${id_proyecto}/`,
        datos
    );
    return response.data;
};

export const editar_avance = async (
    id_avance: number,
    datos: FormData
): Promise<any> => {
    const response = await api.put(
        `hidrico/programas/actualizar/evidencia/avance/proyecto/${id_avance}/`,
        datos
    );
    return response.data;
};


export const get_empty_info_porh = (): InfoPorh => {
    return {
        id_proyecto: 0,
        nombre_programa: '',
        nombre_PORH: null,
        fecha_inicio: null,
        fecha_fin: null,
        nombre: '',
        vigencia_inicial: '',
        vigencia_final: '',
        inversion: 0,
        fecha_registro: '',
        id_programa: 0,
    };
};
