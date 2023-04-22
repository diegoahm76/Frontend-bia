import { api } from "../../../api/axios";
import type { DatosRestringidos, DatosRestringidos_juridica } from "../interfaces";

// editar datos persona restringida naturual
export const editar_datos_restringidos_persona = async (id_persona: number | undefined, datos: DatosRestringidos): Promise<any> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const response = await api.put(`personas/update-personas-naturales-restringidos/${id_persona}/`, datos);
    return response.data;
};

// editar datos persona restringida juridica
export const editar_datos_restringidos_juridica = async (id_persona: number | undefined, datos: DatosRestringidos_juridica): Promise<any> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const response = await api.put(`personas/update-personas-juridicas-restringidos/${id_persona}/`, datos);
    return response.data;
};