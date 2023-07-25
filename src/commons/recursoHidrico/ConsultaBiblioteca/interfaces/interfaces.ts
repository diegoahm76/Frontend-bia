export interface CuencasInstrumentos {
    id_instrumento: number;
    instrumento: string;
    id_cuenca: number;
    cuenca: string;
}
export interface Instrumentos {
    id_instrumento: number;
    nombre: string;
    id_seccion: number;
    id_subseccion: number;
    id_resolucion: number;
    id_persona_registra: number;
    fecha_registro: string;
    fecha_creacion_instrumento: string;
    fecha_fin_vigencia: string;
}
export interface BusquedaArchivo {
    id_seccion: number;
    nombre_seccion: string;
    id_subseccion: number;
    nombre_subseccion: string;
    id_archivo_instrumento: number;
    id_instrumento: number;
    nombre_instrumento: string;
    nombre_archivo: string;
    ruta_archivo: string;
}
export interface Archivos {
    id_archivo_instrumento: number;
    cod_tipo_de_archivo: string;
    nombre_archivo: string;
    ruta_archivo: string;
    fecha_cargado: string;
    id_instrumento: number;
}
export interface BusquedaBasica {
    id_instrumento: number;
    instrumento: string;
    id_cuenca: number;
    cuenca: string;
}
export interface IntrumentosId {
    id_instrumento: number;
    nombre: string;
    id_resolucion: number;
    fecha_registro: string;
    fecha_creacion_instrumento: string;
    fecha_fin_vigencia: string;
    cod_tipo_agua: string;
    id_seccion: number;
    id_subseccion: number;
    id_persona_registra: number;
    id_pozo: null;
}

export interface DataGeneralLaboratorio {
    id_resultado_laboratorio: number;
    descripcion: string;
    lugar_muestra: string;
    cod_clase_muestra: string;
    fecha_registro: string;
    fecha_toma_muestra: string;
    fecha_resultados_lab: string;
    fecha_envio_lab: string;
    latitud: string;
    longitud: string;
    id_instrumento: number;
    id_cuenca: number;
    id_pozo: number;
}
export interface Resultadolaboratorio {
    id_dato_registro_laboratorio: number;
    cod_clase: string;
    metodo: string;
    resultado: string;
    fecha_analisis: string;
    id_registro_laboratorio: number;
    id_parametro: number;
}
export interface ParametrosId {
    id_parametro: number;
    cod_tipo_parametro: string;
    nombre: string;
    unidad_de_medida: string;
    item_ya_usado: boolean;
    activo: boolean;
    registro_precargado: boolean;
}

export interface Laboratorio {
    cod_clase:                    string;
    parametro:                    string;
    unidad:                       string;
    id_dato_registro_laboratorio: number;
    id_registro_laboratorio:      number;
    id_parametro:                 number;
    metodo:                       string;
    resultado:                    string;
    fecha_analisis:               string;
}
