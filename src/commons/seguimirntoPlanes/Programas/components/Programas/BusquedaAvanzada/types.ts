export interface IBusquedaProgramas {
    id_programa: number;
    nombre_eje_estrategico: string;
    nombre_programa: string;
    porcentaje_1: number;
    porcentaje_2: number;
    porcentaje_3: number;
    porcentaje_4: number;
    cumplio: boolean;
    fecha_creacion: Date;
    id_plan: number;
}
export interface IBusquedaObjetivos {
    id_objetivo: number;
    nombre_plan: string;
    nombre_objetivo: string;
    id_plan: number;
}
export interface IBusquedaPlanes {
    id_plan: number;
    nombre_plan: string,
    sigla_plan: string,
    tipo_plan: string,
    agno_inicio: number,
    agno_fin: number,
    estado_vigencia: boolean
}