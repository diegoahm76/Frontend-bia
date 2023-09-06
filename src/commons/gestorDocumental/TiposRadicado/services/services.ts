import { api } from "../../../../api/axios";
import type{ ValueProps } from "../../../recursoHidrico/Instrumentos/interfaces/interface";




// * get tipos radicado
export const get_tipos_radicado = async (): Promise<ValueProps[]> => {
    const response = await api.get(`gestor/choices/cod-tipo-consecutivo/`);
    const data = response.data.data;
    return data ?? [];
};