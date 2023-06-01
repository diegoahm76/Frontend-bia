export interface TRD {
    id_trd: number;
    usado: boolean;
    version: string;
    nombre: string;
    fecha_terminado: string;
    fecha_puesta_produccion: string | null;
    fecha_retiro_produccion: string | null;
    actual: boolean;
    id_ccd: number;
  }