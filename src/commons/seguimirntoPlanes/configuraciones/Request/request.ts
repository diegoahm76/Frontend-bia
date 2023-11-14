import { api } from "../../../../api/axios";
import { type ResponseServer } from "../../../../interfaces/globalModels";
import type { Cuenca, CrearCuenca, EditarCuenca, TiposEjes, IObjetivoDesarrolloSostenible, IEntidades } from "../interfaces/interfaces";

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

// Objetivos de desarrollo sostenible
export const get_ods = async (): Promise<IObjetivoDesarrolloSostenible[]> => {
    const response = await api.get(`/seguimiento/planes/consultar-ods/`);
    const data = response.data.data;
    return data ?? [];
};
export const crear_ods = async (
    datos: IObjetivoDesarrolloSostenible
): Promise<IObjetivoDesarrolloSostenible> => {
    const response = await api.post(
        `seguimiento/planes/crear-ods/`,
        datos
    );
    return response.data;
};
export const eliminar_ods = async (id_objetivo: number): Promise<any> => {
    return await api.delete(`seguimiento/planes/eliminar-ods/${id_objetivo}`);
};
export const editar_ods = async (
    id_objetivo: number,
    datos: IObjetivoDesarrolloSostenible
): Promise<IObjetivoDesarrolloSostenible> => {
    const response = await api.put(
        `seguimiento/planes/actualizar-ods/${id_objetivo}/`,
        datos
    );
    return response.data;
};

// Tipos de eje

export const get_tipos_eje = async (): Promise<TiposEjes[]> => {
    const response = await api.get(`/seguimiento/planes/consultar-tipos-ejes/`);
    const data = response.data.data;
    return data ?? [];
};
export const crear_tipos_eje = async (
    datos: TiposEjes
): Promise<TiposEjes> => {
    const response = await api.post(
        `seguimiento/planes/crear-tipos-ejes/`,
        datos
    );
    return response.data;
};
export const eliminar_tipos_eje = async (id_tipo: number): Promise<any> => {
    return await api.delete(`seguimiento/planes/eliminar-tipos-ejes/${id_tipo}`);
};
export const editar_tipos_eje = async (
    id_tipo: number,
    datos: TiposEjes
): Promise<TiposEjes> => {
    const response = await api.put(
        `seguimiento/planes/actualizar-tipos-ejes/${id_tipo}/`,
        datos
    );
    return response.data;
};

// Entidades
export const get_entidades = async (): Promise<IEntidades[]> => {
    const response = await api.get(`/seguimiento/planes/consultar-entidades/`);
    const data = response.data.data;
    return data ?? [];
};
export const crear_entidades = async (
    datos: IEntidades
): Promise<IEntidades> => {
    const response = await api.post(
        `seguimiento/planes/crear-entidades/`,
        datos
    );
    return response.data;
};
export const eliminar_entidades = async (id_entidad: number): Promise<any> => {
    return await api.delete(`seguimiento/planes/eliminar-entidades/${id_entidad}`);
};
export const editar_entidades = async (
    id_entidad: number,
    datos: IEntidades
): Promise<IEntidades> => {
    const response = await api.put(
        `seguimiento/planes/actualizar-entidades/${id_entidad}/`,
        datos
    );
    return response.data;
};

// Mediciones
export const get_mediciones = async (): Promise<any[]> => {
    const response = await api.get(`/seguimiento/planes/consultar-mediciones/`);
    const data = response.data.data;
    return data ?? [];
};
export const crear_mediciones = async (
    datos: any
): Promise<any> => {
    const response = await api.post(
        `seguimiento/planes/crear-mediciones/`,
        datos
    );
    return response.data;
};
export const eliminar_mediciones = async (id_medicion: number): Promise<any> => {
    return await api.delete(`seguimiento/planes/eliminar-mediciones/${id_medicion}`);
};
export const editar_mediciones = async (
    id_medicion: number,
    datos: any
): Promise<any> => {
    const response = await api.put(
        `seguimiento/planes/actualizar-mediciones/${id_medicion}/`,
        datos
    );
    return response.data;
};