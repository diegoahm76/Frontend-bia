import type { AxiosResponse } from "axios";
import type { ResponseServer } from "../../../../../interfaces/globalModels";
import type { ExpedienteDocumental, SelectTipologias } from "../types/types"
import { api } from "../../../../../api/axios";

export const search_expediente = async ({
    trd_nombre,
    fecha_apertura_expediente,
    id_serie_origen,
    id_subserie_origen,
    palabras_clave_expediente,
    titulo_expediente,
    codigos_uni_serie_subserie,
}: any): Promise<AxiosResponse<ResponseServer<ExpedienteDocumental[]>>> => {

    const url = `gestor/expedientes-archivos/expedientes/buscar-expediente/?trd_nombre=${String(
        trd_nombre ?? ''
    )}&fecha_apertura_expediente=${String(
        fecha_apertura_expediente ?? ''
    )}&id_serie_origen=${String(id_serie_origen ?? '')}&id_subserie_origen=${String(
        id_subserie_origen ?? ''
    )}&palabras_clave_expediente=${String(
        palabras_clave_expediente ?? ''
    )}&titulo_expediente=${String(titulo_expediente ?? '')}&codigos_uni_serie_subserie=${String(
        codigos_uni_serie_subserie ?? ''
    )}`;
    return await api.get<ResponseServer<ExpedienteDocumental[]>>(url);
};

// select tipologias documentales

export const get_tipos_tipologias = async (): Promise<SelectTipologias[]> => {
    const response = await api.get(`gestor/expedientes-archivos/expedientes/listar-topologias/`);
    const data = response.data.data;
    return data ?? [];
};

// ? post
export const post_archivo_soporte = async (data: any): Promise<any> => {
    const response = await api.post(`gestor/expedientes-archivos/expedientes/agregar-archivo-soporte/`, data);
    return response.data;
};
