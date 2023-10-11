export interface IConfiTiemposPlazoAccion {
  configuraciones_tiempos: IObjConfiTiemposPlazoAccion[];
}

export interface IObjConfiTiemposPlazoAccion {
  id_configuracion_tiempo_respuesta?: number | null;
  nombre_configuracion?: string | null;
  tiempo_respuesta_en_dias?: number | null;
  observacion_ultimo_cambio?: string | null;
}
