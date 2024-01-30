export interface IBusquedaAvanzadaActividad {
    id_actividad: number;
    nombre_plan: string;
    nombre_programa: string;
    nombre_proyecto: string;
    nombre_producto: string;
    indicadores: any[];
    numero_actividad: number;
    nombre_actividad: string;
    fecha_creacion: string;
    cumplio: boolean;
    id_producto: number;
    id_plan: number;
    id_proyecto: number;
    id_programa: number;
}

export interface IBusquedaIndicador {
    id_indicador:     number;
    nombre_medicion:  string;
    nombre_tipo:      string;
    nombre_plan:      string;
    nombre_programa:  string;
    nombre_proyecto:  string;
    nombre_producto:  string;
    nombre_actividad: string;
    metas:            any[];
    nombre_indicador: string;
    linea_base:       string;
    medida:           string;
    tipo_indicador:   string;
    fecha_creacion:   Date;
    cumplio:          boolean;
    id_medicion:      number;
    id_tipo:          number;
    id_producto:      number;
    id_actividad:     number;
    id_plan:          number;
    id_proyecto:      number;
    id_programa:      number;
}