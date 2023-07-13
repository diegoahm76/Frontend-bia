import { api } from "../../../../api/axios";
import { type ResponseServer } from "../../../../interfaces/globalModels";
import type { Cuenca, CrearCuenca, EditarCuenca, EditarPozo, EditarParametros, Pozo, Parametros } from "../interfaces/interfaces";

export const get_cuencas = async (): Promise<Cuenca[]> => {
    const { data } = await api.get<ResponseServer<Cuenca[]>>(
        `hidrico/bibliotecas/cuencas/get/`
    );
    return data.data;
};

export const crear_cuenca = async (
    datos: CrearCuenca
): Promise<CrearCuenca> => {
    const response = await api.post(
        `hidrico/bibliotecas/cuencas/create/`,
        datos
    );
    return response.data;
};

export const eliminar_cuenca = async (id_cuenca: number): Promise<any> => {
    return await api.delete(`hidrico/bibliotecas/cuencas/delete/${id_cuenca}`);
};

export const editar_cuenca = async (
    id_cuenca: number,
    datos: EditarCuenca
): Promise<EditarCuenca> => {
    const response = await api.put(
        `hidrico/bibliotecas/cuencas/update/${id_cuenca}/`,
        datos
    );
    return response.data;
};

// pozos
export const get_pozo = async (): Promise<Pozo[]> => {
    const response = await api.get(`/hidrico/bibliotecas/pozos/get/`);
    const data = response.data.data;
    return data ?? [];
};
export const crear_pozo = async (
    datos: Pozo
): Promise<Pozo> => {
    const response = await api.post(
        `hidrico/bibliotecas/pozos/create/`,
        datos
    );
    return response.data;
};
export const eliminar_pozo = async (id_pozo: number): Promise<any> => {
    return await api.delete(`hidrico/bibliotecas/pozos/delete/${id_pozo}`);
};
export const editar_pozo = async (
    id_pozo: number,
    datos: EditarPozo
): Promise<EditarPozo> => {
    const response = await api.put(
        `hidrico/bibliotecas/pozos/update/${id_pozo}/`,
        datos
    );
    return response.data;
};

// parametros

export const get_parametros = async (): Promise<Parametros[]> => {
    const response = await api.get(`/hidrico/bibliotecas/parametros_laboratorio/get/`);
    const data = response.data.data;
    return data ?? [];
};
export const crear_parametros = async (
    datos: Parametros
): Promise<Parametros> => {
    const response = await api.post(
        `hidrico/bibliotecas/parametros_laboratorio/create/`,
        datos
    );
    return response.data;
};
export const eliminar_parametros = async (id_parametros: number): Promise<any> => {
    return await api.delete(`hidrico/bibliotecas/parametros_laboratorio/delete/${id_parametros}`);
};
export const editar_parametros = async (
    id_parametro: number,
    datos: EditarParametros
): Promise<EditarParametros> => {
    const response = await api.put(
        `hidrico/bibliotecas/parametros_laboratorio/update/${id_parametro}/`,
        datos
    );
    return response.data;
};