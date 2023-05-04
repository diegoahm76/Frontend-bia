import { api } from "../../../api/axios";
import type { DataPersonas, HistoricoDatosRestringidos, ResponseServer } from "../../../interfaces/globalModels";

// editar datos persona restringida naturual
export const editar_datos_restringidos_persona = async (id_persona: number | undefined, datos: FormData): Promise<any> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const response = await api.put(`personas/update-personas-naturales-restringidos/${id_persona}/`, datos);
    return response.data;
};

// editar datos persona restringida juridica
export const editar_datos_restringidos_juridica = async (id_persona: number | undefined, datos: FormData): Promise<any> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const response = await api.put(`personas/update-personas-juridicas-restringidos/${id_persona}/`, datos);
    return response.data;
};
// consultar historico datos restringidos
export const consultar_historico_restringido = async (id: number): Promise<HistoricoDatosRestringidos[]> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const { data } = await api.get<ResponseServer<HistoricoDatosRestringidos[]>>(`personas/buscar-historico-cambios/${id}/`);
    return data.data;
}
// consultar datos de una persona por id 
export const consultar_datos_persona = async (id: number | undefined): Promise<DataPersonas> => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const { data } = await api.get<ResponseServer<DataPersonas>>(`personas/get-by-id/${id}/`);
        return data.data; 
}
