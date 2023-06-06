import { api } from "../../../../../api/axios";
import type { ResponseServer } from "../../../../../interfaces/globalModels";
import type { Cargos, CrearCargo, EditarCargo } from "../interfaces/interfaces";

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
        `personas/cargos/update//${id_cargo}`,
        datos
    );
    return response.data;
};