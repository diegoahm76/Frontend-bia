export interface Programa {
    nombre_programa: string;
    fecha_inicio: string;
    fecha_fin: string;
    proyectos?: Proyecto[];
}

export interface Proyecto {
    nombre: string;
    vigencia_inicial: string;
    vigencia_final: string;
    inversion: number;
    actividades?: Actividad[];
}

export interface Actividad {
    nombre: string;
}
export interface GetPrograma {
    id_programa: number;
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
}
export interface GetProyectos {
    id_proyecto: number;
    nombre: string;
    vigencia_inicial: string;
    vigencia_final: string;
    inversion: number;
    fecha_registro: string;
    id_programa: number;
}
export interface GetActividades {
    id_actividades: number;
    nombre: string;
    fecha_registro: string;
    id_proyecto: number;
}
export interface GetAvances {
    id_avance:           number;
    fecha_reporte:       string;
    accion:              string;
    descripcion:         string;
    fecha_registro:      string;
    id_proyecto:         number;
    id_persona_registra: number;
}
export interface InfoPorh {
    id_proyecto: number;
    nombre_programa: string;
    nombre_PORH: null | string;
    fecha_inicio: null | string;
    fecha_fin: null | string;
    nombre: string;
    vigencia_inicial: string;
    vigencia_final: string;
    inversion: number;
    fecha_registro: string;
    id_programa: number;
}
export interface BusquedaAvanzada {
    nombre_proyecto?: string;
    nombre_programa?: string;
    nombre_PORH?: string;
}
export interface BusquedaAvance {
    nombre_proyecto?: string;
    nombre_programa?: string;
    nombre_PORH?: string;
    nombre_avances?: string;
}
export interface InfoAvance {
    id_avance:           number;
    nombre_programa:     string;
    nombre_PORH:         string;
    nombre:              string;
    nombre_avance:       string;
    fecha_reporte:       string;
    accion:              string;
    descripcion:         string;
    fecha_registro:      string;
    id_proyecto:         number;
    id_persona_registra: number;
}
