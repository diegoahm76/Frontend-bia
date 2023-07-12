export interface CuencasInstrumentos {
    id_instrumento: number;
    instrumento:    string;
    id_cuenca:      number;
    cuenca:         string;
}
export interface Instrumentos {
    id_instrumento:             number;
    nombre:                     string;
    id_seccion:                 number;
    id_subseccion:              number;
    id_resolucion:              number;
    id_persona_registra:        number;
    fecha_registro:             Date;
    fecha_creacion_instrumento: Date;
    fecha_fin_vigencia:         Date;
}
export interface BusquedaArchivo {
    id_seccion:             number;
    nombre_seccion:         string;
    id_subseccion:          number;
    nombre_subseccion:      string;
    id_archivo_instrumento: number;
    id_instrumento:         number;
    nombre_instrumento:     string;
    nombre_archivo:         string;
    ruta_archivo:           string;
}
export interface Archivos {
    id_archivo_instrumento: number;
    cod_tipo_de_archivo:    string;
    nombre_archivo:         string;
    ruta_archivo:           string;
    fecha_cargado:          Date;
    id_instrumento:         number;
}
