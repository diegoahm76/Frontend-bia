export interface ICierreExpedientes {
  current_cierre_Expediente: IObjCierreExpediente;
  trd: IObjTRD[];
  tipologias: IObTipologia[];
  expedientes: IObjExpedientes[];
  current_archivo_expediente: IObjArchivoExpediente;
  archivos_por_expedientes: IObjarchivo[];
  informacion_reapertura: IObjInformacionReapertura;
}

export interface IObjCierreExpediente {
  fecha_actual?: string | null;
  titulo_expediente?: string | null;
  id_expediente_doc?: number | null;
  justificacion_cierre_reapertura?: string | null;
  justificacion_reapertura?: string | null;
}

export interface IObjTRD {
  id_trd_origen?: number | null;
  nombre_tdr_origen?: string | null;
  actual_tdr_origen?: boolean;
  fecha_retiro_produccion_tdr_origen?: string | null;
  estado_actual?: string | null;
}

export interface IObTipologia {
  id_tipologia_documental?: number | null;
  nombre?: string | null;
}

export interface IObjExpedientes {
  codigo_exp_und_serie_subserie?: number | null;
  id_expediente_documental?: number | null;
  titulo_expediente?: string | null;
  id_und_seccion_propietaria_serie?: number | null;
  nombre_unidad_org?: string | null;
  id_serie_origen?: number | null;
  nombre_serie_origen?: string | null;
  id_subserie_origen?: number | null;
  nombre_subserie_origen?: string | null;
  id_trd_origen?: number | null;
  nombre_trd_origen?: string | null;
  fecha_apertura_expediente?: string | null;
}

export interface IObjArchivoExpediente {
  id_expediente_documental?: number | null;
  nombre_asignado_documento?: string | null;
  fecha_creacion_doc?: string | null;
  tiene_consecutivo_documento?: string | null;
  nro_folios_del_doc?: string | null;
  cod_origen_archivo?: string | null;
  codigo_tipologia_doc_prefijo?: string | null;
  codigo_tipologia_doc_agno?: string | null;
  codigo_tipologia_doc_consecutivo?: string | null;
  cod_categoria_archivo?: string | null;
  tiene_replica_fisica?: boolean | string | null;
  asunto?: string | null;
  nombre_tipologia?: string | null;
  descripcion?: string | null;
  palabras_clave_documento?: string | null;
  file?: string | null;
  id_tipologia_documental?: string | null;
  identificacion_doc_en_expediente?: string | null;
  id_documento_de_archivo_exped?: number | null;
  nombre_original_del_archivo?: string | null;
  fecha_incorporacion_doc_a_Exp?: string | null;
  es_version_original?: boolean;
  orden_en_expediente?: number | null;
  es_un_archivo_anexo?: boolean;
  tipologia_no_creada_trd: null;
  anexo_corresp_a_lista_chequeo?: boolean;
  cantidad_anexos?: string | null;
  sub_sistema_incorporacion?: string | null;
  cod_tipo_radicado?: string | null;
  codigo_radicado_prefijo?: string | null;
  codigo_radicado_agno?: string | null;
  codigo_radicado_consecutivo?: string | null;
  es_radicado_inicial_de_solicitud?: boolean;
  documento_requiere_rta?: boolean;
  id_persona_titular?: number | null;
  id_doc_de_arch_del_cual_es_anexo?: number | null;
  id_archivo_sistema?: number | null;
  id_doc_arch_respondido?: number | null;
  id_doc_arch_rad_ini_exp_simple?: number | null;
  id_und_org_oficina_creadora?: number | null;
  id_persona_que_crea?: number | null;
  id_und_org_oficina_respon_actual?: number | null;
}

export interface IObjarchivo {
  orden_en_expediente?: number | null;
  id_documento_de_archivo_exped?: number | null;
  id_expediente_documental?: number | null;
  nombre_asignado_documento?: string | null;
  id_tipologia_documental?: string | null;
  nombre_tipologia?: string | null;
}

export interface IObjReaperturaExpediente {
  fecha_actual?: string | null;
  titulo_expediente?: string | null;
  id_expediente_doc?: number | null;
  justificacion_reapertura?: string | null;
  fecha_inicio_expediente?: string | null;
  fecha_fin_expediente?: string | null;
}

export interface IObjInformacionReapertura {
  titulo_expediente?: string | null;
  nombre_persona_cierra?: string | null;
  cierre_expediente: {
    id_cierre_reapertura_exp?: number | null;
    cod_operacion?: string | null;
    fecha_cierre_reapertura?: string | null;
    justificacion_cierre_reapertura?: string | null;
    cod_etapa_archivo_pre_reapertura: null;
    id_expediente_doc?: number | null;
    id_persona_cierra_reabre?: number | null;
  };
}

export interface IObjTrd {
  id_trd?: number | null;
  usado?: boolean;
  version?: string | null;
  nombre?: string | null;
  fecha_terminado?: string | null;
  fecha_puesta_produccion?: string | null;
  fecha_retiro_produccion?: string | null;
  actual?: boolean;
  id_ccd?: number | null;
}
