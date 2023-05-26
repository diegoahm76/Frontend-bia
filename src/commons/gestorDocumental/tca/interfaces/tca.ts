export interface TCA {
    id_tca: number;
    version: string;
    nombre: string;
    fecha_terminado: string | null;
    fecha_puesta_produccion: string | null;
    fecha_retiro_produccion: string | null;
    justificacion_nueva_version: string | null;
    ruta_soporte: string | null;
    actual: boolean;
    id_ccd: number;
}