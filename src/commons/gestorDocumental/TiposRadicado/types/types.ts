export interface IConsecutivos {
    id_config_tipo_radicado_agno: number;
    cod_tipo_radicado_legible: string;
    agno_radicado: number;
    cod_tipo_radicado: string;
    prefijo_consecutivo: string;
    consecutivo_inicial: number;
    cantidad_digitos: number;
    implementar: boolean;
    fecha_inicial_config_implementacion: string;
    consecutivo_actual: number;
    fecha_consecutivo_actual: string;
    id_persona_config_implementacion: number;
    id_persona_consecutivo_actual: number;
}