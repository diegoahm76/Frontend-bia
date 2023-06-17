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
    const url = `hidrico/programas/get/avanzada/programas/?nombre_proyecto=${String(nombre_proyecto ?? '')}&nombre_programa=${String(nombre_programa ?? '')}&nombre_PORH=${String(nombre_PORH ?? '')}&nombre_avances=${String(nombre_avances ?? '')}`;
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
