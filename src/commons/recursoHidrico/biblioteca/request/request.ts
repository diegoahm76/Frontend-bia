import { api } from "../../../../api/axios";
import type { ResponseServer } from "../../../../interfaces/globalModels";
import type { Seccion, SubSeccionPorSeccion } from "../interfaces/interfaces";

export const get_data_seccion = async (): Promise<Seccion[]> => {
    const { data } = await api.get<ResponseServer<Seccion[]>>(
        `hidrico/bibliotecas/get/secciones/`
    );
    return data.data;
};
export const get_data_subseccion_por_seccion = async (id_seccion: number): Promise<SubSeccionPorSeccion[]> => {
    const { data } = await api.get<ResponseServer<SubSeccionPorSeccion[]>>(
        `hidrico/bibliotecas/get/subsecciones/por/seccion/${id_seccion}/`
    );
    return data.data;
};
