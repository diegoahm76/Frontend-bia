export interface TrdsUsados {
  id_trd: number;
  usado: boolean;
  version: string;
  nombre: string;
  fecha_terminado: Date;
  fecha_puesta_produccion: Date | null;
  fecha_retiro_produccion: Date | null;
  actual: boolean;
  id_ccd: number;
}