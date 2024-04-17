import { api } from "../../../../api/axios";
import { type ResponseServer } from "../../../../interfaces/globalModels";
import type {
    Cuenca, CrearCuenca, EditarCuenca, TiposEjes, IObjetivoDesarrolloSostenible, IEntidades, ITipos, ISector, IModalidad,
    IUbicacion, IFuenteRecursoPAA, IIntervalo, IEstadoVF, ICodigoUnspsc
} from "../interfaces/interfaces";

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

// Tipos
export const get_tipos = async (): Promise<ITipos[]> => {
    const response = await api.get(`/seguimiento/planes/consultar-tipos/`);
    const data = response.data.data;
    return data ?? [];
};
export const crear_tipos = async (
    datos: ITipos
): Promise<ITipos> => {
    const response = await api.post(
        `seguimiento/planes/crear-tipos/`,
        datos
    );
    return response.data;
};
export const eliminar_tipos = async (id_tipo: number): Promise<any> => {
    return await api.delete(`seguimiento/planes/eliminar-tipos/${id_tipo}`);
};
export const editar_tipos = async (
    id_tipo: number,
    datos: ITipos
): Promise<ITipos> => {
    const response = await api.put(
        `seguimiento/planes/actualizar-tipos/${id_tipo}/`,
        datos
    );
    return response.data;
};

// Sector
export const get_sector = async (): Promise<ISector[]> => {
    const response = await api.get(`/seguimiento-planes/consultar-sectores/`);
    const data = response.data.data;
    return data ?? [];
};
export const crear_sector = async (
    datos: ISector
): Promise<ISector> => {
    const response = await api.post(
        `seguimiento-planes/crear-sectores/`,
        datos
    );
    return response.data;
};
export const eliminar_sector = async (id_sector: number): Promise<any> => {
    return await api.delete(`seguimiento-planes/eliminar-sectores/${id_sector}`);
};
export const editar_sector = async (
    id_sector: number,
    datos: ISector
): Promise<ISector> => {
    const response = await api.put(
        `seguimiento-planes/actualizar-sectores/${id_sector}/`,
        datos
    );
    return response.data;
};

// Modalidad

export const get_modalidad = async (): Promise<IModalidad[]> => {
    const response = await api.get(`/seguimiento-planes/consultar-modalidades/`);
    const data = response.data.data;
    return data ?? [];
};
export const crear_modalidad = async (
    datos: IModalidad
): Promise<IModalidad> => {
    const response = await api.post(
        `seguimiento-planes/crear-modalidades/`,
        datos
    );
    return response.data;
};
export const eliminar_modalidad = async (id_modalidad: number): Promise<any> => {
    return await api.delete(`seguimiento-planes/eliminar-modalidades/${id_modalidad}`);
};
export const editar_modalidad = async (
    id_modalidad: number,
    datos: IModalidad
): Promise<IModalidad> => {
    const response = await api.put(
        `seguimiento-planes/actualizar-modalidades/${id_modalidad}/`,
        datos
    );
    return response.data;
};

// Ubicaciones

export const get_ubicacion = async (): Promise<IUbicacion[]> => {
    const response = await api.get(`/seguimiento-planes/consultar-ubicaciones/`);
    const data = response.data.data;
    return data ?? [];
};

export const crear_ubicacion = async (
    datos: IUbicacion
): Promise<IUbicacion> => {
    const response = await api.post(
        `seguimiento-planes/crear-ubicaciones/`,
        datos
    );
    return response.data;
};

export const eliminar_ubicacion = async (id_ubicacion: number): Promise<any> => {
    return await api.delete(`seguimiento-planes/eliminar-ubicaciones/${id_ubicacion}`);
};

export const editar_ubicacion = async (
    id_ubicacion: number,
    datos: IUbicacion
): Promise<IUbicacion> => {
    const response = await api.put(
        `seguimiento-planes/actualizar-ubicaciones/${id_ubicacion}/`,
        datos
    );
    return response.data;
};

// Fuente de recurso PAA

export const get_fuente_recurso_paa = async (): Promise<IFuenteRecursoPAA[]> => {
    const response = await api.get(`/seguimiento-planes/consultar-fuentes-recursos-paa/`);
    const data = response.data.data;
    return data ?? [];
};
export const crear_fuente_recurso_paa = async (
    datos: IFuenteRecursoPAA
): Promise<IFuenteRecursoPAA> => {
    const response = await api.post(
        `seguimiento-planes/crear-fuentes-recursos-paa/`,
        datos
    );
    return response.data;
}
export const eliminar_fuente_recurso_paa = async (id_fuente_recurso_paa: number): Promise<any> => {
    return await api.delete(`seguimiento-planes/eliminar-fuentes-recursos-paa/${id_fuente_recurso_paa}`);
};
export const editar_fuente_recurso_paa = async (
    id_fuente_recurso_paa: number,
    datos: IFuenteRecursoPAA
): Promise<IFuenteRecursoPAA> => {
    const response = await api.put(
        `seguimiento-planes/actualizar-fuentes-recursos-paa/${id_fuente_recurso_paa}/`,
        datos
    );
    return response.data;
};

// Intervalos

export const get_intervalos = async (): Promise<IIntervalo[]> => {
    const response = await api.get(`/seguimiento-planes/consultar-intervalos/`);
    const data = response.data.data;
    return data ?? [];
};
export const crear_intervalos = async (
    datos: IIntervalo
): Promise<IIntervalo> => {
    const response = await api.post(
        `seguimiento-planes/crear-intervalos/`,
        datos
    );
    return response.data;
};
export const eliminar_intervalos = async (id_intervalo: number): Promise<any> => {
    return await api.delete(`seguimiento-planes/eliminar-intervalos/${id_intervalo}`);
};
export const editar_intervalos = async (
    id_intervalo: number,
    datos: IIntervalo
): Promise<IIntervalo> => {
    const response = await api.put(
        `seguimiento-planes/actualizar-intervalos/${id_intervalo}/`,
        datos
    );
    return response.data;
};

// Estado de VF

export const get_estado_vf = async (): Promise<IEstadoVF[]> => {
    const response = await api.get(`/seguimiento-planes/consultar-estados-vf/`);
    const data = response.data.data;
    return data ?? [];
};
export const crear_estado_vf = async (
    datos: IEstadoVF
): Promise<IEstadoVF> => {
    const response = await api.post(
        `seguimiento-planes/crear-estados-vf/`,
        datos
    );
    return response.data;
};
export const eliminar_estado_vf = async (id_estado_vf: number): Promise<any> => {
    return await api.delete(`seguimiento-planes/eliminar-estados-vf/${id_estado_vf}`);
};
export const editar_estado_vf = async (
    id_estado_vf: number,
    datos: IEstadoVF
): Promise<IEstadoVF> => {
    const response = await api.put(
        `seguimiento-planes/actualizar-estados-vf/${id_estado_vf}/`,
        datos
    );
    return response.data;
};

// Codigo Unspsc

export const get_codigo_unspsc = async (): Promise<ICodigoUnspsc[]> => {
    const response = await api.get(`/seguimiento-planes/consultar-codigos-unsp/`);
    const data = response.data.results;
    return data ?? [];
};

export const get_codigo_unspsc_pag = async (page:number, name?: string, code?: string): Promise<any> => {
    let url = `seguimiento-planes/consultar-codigos-unsp/?page=${page}&page_size=10`;
    if (name) url += `&nombre=${name}`;
    if (code)  url += `&codigo=${code}`;
    const response = await api.get(url);
    return response.data;
};


export const crear_codigo_unspsc = async (
    datos: ICodigoUnspsc
): Promise<ICodigoUnspsc> => {
    const response = await api.post(
        `seguimiento-planes/crear-codigos-unsp/`,
        datos
    );
    return response.data;
};
export const eliminar_codigo_unspsc = async (id_codigo_unspsc: number): Promise<any> => {
    return await api.delete(`seguimiento-planes/eliminar-codigos-unsp/${id_codigo_unspsc}`);
};
export const editar_codigo_unspsc = async (
    id_codigo_unspsc: number,
    datos: ICodigoUnspsc
): Promise<ICodigoUnspsc> => {
    const response = await api.put(
        `seguimiento-planes/actualizar-codigos-unsp/${id_codigo_unspsc}/`,
        datos
    );
    return response.data;
};