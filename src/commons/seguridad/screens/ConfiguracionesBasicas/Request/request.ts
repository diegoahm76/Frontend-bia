import { api } from "../../../../../api/axios";
import type { ResponseServer } from "../../../../../interfaces/globalModels";
import type { Cargos, CrearCargo, EditarCargo, GetEstadoCivil } from "../interfaces/interfaces";

// export const get_cargos = async (): Promise<AxiosResponse<ResponseServer<Cargos[]>>> => {
//     return await api.get<ResponseServer<Cargos[]>>(
//         `personas/cargos/get-list/`
//     );
// };

export const get_cargos = async (): Promise<Cargos[]> => {
    const { data } = await api.get<ResponseServer<Cargos[]>>(
        `personas/cargos/get-list/`
    );
    return data.data;
};

export const crear_cargo = async (
    datos: CrearCargo
): Promise<CrearCargo> => {
    const response = await api.post(
        `personas/cargos/create/`,
        datos
    );
    return response.data;
};
// eliminar cargo
export const eliminar_cargo = async (id_cargo: number): Promise<any> => {
    return await api.delete(`personas/cargos/delete/${id_cargo}`);
};
// editar cargo
export const editar_cargo = async (
    id_cargo: number,
    datos: EditarCargo
): Promise<EditarCargo> => {
    const response = await api.put(
        `personas/cargos/update/${id_cargo}/`,
        datos
    );
    return response.data;
};

// estados civiles

export const get_tipos_doc = async (): Promise<GetEstadoCivil[]> => {
    const { data } = await api.get<GetEstadoCivil[]>(
        `personas/estado-civil/get-list/`
    );
    return data;
};
export const crear_estado_civil = async (
    datos: GetEstadoCivil
): Promise<GetEstadoCivil> => {
    const response = await api.post(
        `personas/estado-civil/create/`,
        datos
    );
    return response.data;
};
export const eliminar_estado_civil = async (id_estado_civil: string): Promise<any> => {
    return await api.delete(`personas/estado-civil/delete/${id_estado_civil}`);
};