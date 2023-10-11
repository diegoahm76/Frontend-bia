export interface ICierreExpedientes {
  current_cierre_Expediente: IObjCierreExpediente;
  trd: IObjTRD[];
  tipologias: IObTipologia[];
  expedientes: IObjExpedientes[];
  current_archivo_expediente: IObjArchivoExpediente;
  // archivos_expedientes: IObjarchivo[];
}

export interface IObjCierreExpediente {
  fecha_actual?: string | null;
  titulo_expediente?: string | null;
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
  tiene_replica_fisica?: string | null;
  asunto?: string | null;
  descripcion?: string | null;
  palabras_clave_documento?: string | null;
  file?: string | null;
  id_tipologia_documental?: string | null;
}

export interface IObjarchivo {
  orden_en_expediente?: number | null;
  id_documento_de_archivo_exped?: number | null;
  id_expediente_documental?: number | null;
  nombre_asignado_documento?: string | null;
  id_tipologia_documental?: string | null;
}
