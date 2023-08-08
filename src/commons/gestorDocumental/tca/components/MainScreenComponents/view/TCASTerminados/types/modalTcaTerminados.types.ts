export interface TcaTerminados {
  actual: boolean;
  fecha_puesta_produccion: Date | null;
  fecha_retiro_produccion: Date | null;
  fecha_terminado: Date;
  id_tca: number;
  id_trd: number;
  nombre: string;
  version: string;
}