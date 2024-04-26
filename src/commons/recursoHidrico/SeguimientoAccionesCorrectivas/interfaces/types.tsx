export interface IAccionCorrectiva {
  id_accion:                number | string;
  nombre_tramite:           string;
  tipo_tramite:             string;
  nombre_accion:            string;
  descripcion:              string;
  observacion_accion:       string;
  cedula_catastral:         string;
  fecha_creacion:           string;
  cumplida:                 boolean;
  fecha_cumplimiento:       Date;
  id_expediente:            number | string;
  id_tramite:               number | string;
  id_persona_titular:       number | string;
  id_unidad_organizacional: number | string;
}

export interface ITramite {
  id_solicitud_tramite:                    string | number | null;
  numero_documento:                        string;
  radicado:                                string;
  nombre_solicitante:                      string;
  cod_relacion_con_el_titular:             string;
  cod_tipo_operacion_tramite:              string;
  costo_proyecto:                          string;
  pago:                                    boolean;
  id_pago_evaluacion:                      string | number | null;
  fecha_registro:                          string | Date;
  fecha_envio_solicitud:                   string | null;
  fecha_finalizada_solicitud:              string | null;
  cantidad_predios:                        string | number | null;
  solicitud_enviada:                       boolean;
  fecha_radicado:                          string | null;
  fecha_expediente:                        string | null;
  fecha_inicio:                            string | null;
  requiere_digitalizacion:                 boolean;
  fecha_envio_definitivo_a_digitalizacion: string | null;
  fecha_digitalizacion_completada:         string | null;
  fecha_rta_final_gestion:                 string | null;
  fecha_ini_estado_actual:                 string | Date;
  id_persona_titular:                      string | number | null;
  id_persona_interpone:                    string | number | null;
  id_medio_solicitud:                      string | number | null;
  id_persona_registra:                     string | number | null;
  id_sucursal_recepcion_fisica:            string | number | null;
  id_radicado:                             string | number | null;
  id_expediente:                           string | number | null;
  id_auto_inicio:                          string | number | null;
  id_persona_rta_final_gestion:            string | number | null;
  id_estado_actual_solicitud:              string | number | null;
}