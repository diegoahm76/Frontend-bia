import { type AxiosResponse } from "axios";
import { api } from "../../../../api/axios";
import { type ResponseServer } from "../../../../interfaces/globalModels";



export const search_instrumento = async ({
    nombre_seccion,
    nombre_subseccion,
    nombre_instrumento,
    nombre_archivo,
}: any): Promise<AxiosResponse<ResponseServer<any[]>>> => {
    const url = `hidrico/programas/get/avanzada/avances/?nombre_seccion=${String(nombre_seccion ?? '')}&nombre_subseccion=${String(nombre_subseccion ?? '')}&nombre_instrumento=${String(nombre_instrumento ?? '')}&nombre_archivo=${String(nombre_archivo ?? '')}`;
    return await api.get<ResponseServer<any[]>>(url);
};
