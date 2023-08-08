export interface TcaHistoricoInterface {
  cod_clasificacion_exp: string;
  fecha_inicio: string;
  id_catserie_unidad_org: number;
  id_historico_catserie_unidad: number;
  id_persona_cambia: number;
  justificacion_del_cambio: string;
  persona_cambia: string;
  ruta_archivo_cambio: File | string | null;
}