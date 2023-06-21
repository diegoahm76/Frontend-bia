export interface ISolicitudConsumo {
  current_solicitud: IObjSolicitudVivero;
  solicitudes: IObjSolicitudVivero[];
  bienes: IObjBienConsumo[];
  bienes_solicitud: IObjBienesSolicitud[];
  current_bien: IObjBienConsumo;
  persona_solicita: IObjPersonaSolicita;
  funcionarios: IObjFuncionario[];
  current_funcionario: IObjFuncionario;
  unidad_organizacional: UnidadOrganizacional[];
  nro_solicitud: number | null;
  nurseries: IObjNursery[];
  current_nursery: IObjNursery;
}

export interface IObjPersonaSolicita {
  id_persona?: number | null;
  nombre?: string;
  unidad_organizacional?: string | null;
  id_unidad_organizacional_actual?: number | null;
}

export interface UnidadOrganizacional {
  id_unidad_organizacional: number;
  id_organigrama: number;
  id_nivel_organigrama: number;
  nombre: string;
  codigo: string;
  cod_tipo_unidad: string;
  cod_agrupacion_documental: string;
  unidad_raiz: boolean;
  id_unidad_org_padre: null;
}
export interface IObjFuncionario {
  id_persona?: number | null;
  tipo_persona?: string | null;
  tipo_documento?: string | null;
  numero_documento?: number | null;
  primer_nombre?: string | null;
  segundo_nombre?: string | null;
  primer_apellido?: string | null;
  segundo_apellido?: string | null;
  nombre_completo?: string | null;
  razon_social?: null | null;
  nombre_comercial?: string | null;
  tiene_usuario?: true | null;
  id_unidad_organizacional_actual?: number | null;
  nombre_unidad_organizacional_actual?: string | null;
  id_unidad_para_la_que_solicita?: number | null;
  digito_verificacion?: number | null;
  cod_naturaleza_empresa?: string | null;
}

export interface IObjSolicitudVivero {
  id_solicitud_vivero?: number | null;
  nro_solicitud?: number | null;
  fecha_solicitud?: string | null;
  motivo?: string | null;
  observaciones?: string | null;
  con_municipio_destino?: number | null;
  direccion_destino?: string | null;
  nombre_predio_destino?: string | null;
  fecha_retiro_material?: string | null;
  nro_info_tecnico?: number | null;
  ruta_archivo_info_tecnico?: null;
  solicitud_abierta?: boolean;
  fecha_cierra_solicitud?: string | null;
  revisada_responsable?: boolean;
  estado_aprobacion_responsable?: string | null;
  justificacion_aprobacion_responsable?: string | null;
  fecha_aprobacion_responsable?: string | null;
  gestionada_viveros?: boolean;
  id_despacho_viveros?: number | null;
  observacion_cierre_no_dispo_viveros?: string | null;
  fecha_cierre_no_dispo?: string | null;
  revisada_coord_viveros?: boolean;
  estado_aprobacion_coord_viveros?: string | null;
  justificacion_aprobacion_coord_viveros?: string | null;
  fecha_aprobacion_coord_viv?: string | null;
  solicitud_anulada_solicitante?: boolean;
  justificacion_anulacion_solicitante?: string | null;
  fecha_anulacion_solicitante?: string | null;
  id_vivero_solicitud?: number | null;
  id_persona_solicita?: number | null;
  id_unidad_org_del_solicitante?: number | null;
  id_unidad_para_la_que_solicita?: number | null;
  id_funcionario_responsable_und_destino?: number | null;
  id_unidad_org_del_responsable?: number | null;
  id_persona_cierre_no_dispo_viveros?: number | null;
  id_persona_coord_viveros?: number | null;
  nombre_unidad_organizacional?: string | null;
  persona_solicita?: string | null;
  persona_responsable?: string | null;
  nombre_unidad_organizacional_destino?: string | null;
}

export interface IObjBienesSolicitud {
  id_item_solicitud_viveros?: number | null;
  id_solicitud_viveros?: number | null;
  nro_posicion?: number | null;
  id_bien?: number | null;
  cod_tipo_elemento_vivero?: string | null;
  codigo_bien?: string | null;
  nombre_bien?: string | null;
  cantidad?: number | null;
  observaciones?: string | null;
}
export interface IObjBienConsumo {
  id_bien?: number | null;
  marca?: string | null;
  nombre_padre?: string | null;
  unidad_medida?: string | null;
  unidad_medida_vida_util?: string | null;
  porcentaje_iva?: number | null;
  codigo_bien?: string | null;
  nro_elemento_bien?: number | null;
  nombre?: string | null;
  cod_tipo_bien?: string | null;
  cod_tipo_activo?: string | null;
  nivel_jerarquico?: number | null;
  nombre_cientifico?: string | null;
  descripcion?: string | null;
  doc_identificador_nro?: number | null;
  cod_metodo_valoracion?: string | null;
  cod_tipo_depreciacion?: string | null;
  cantidad_vida_util?: number | null;
  valor_residual?: number | null;
  stock_minimo?: number | null;
  stock_maximo?: number | null;
  solicitable_vivero?: boolean | null;
  es_semilla_vivero?: boolean | null;
  cod_tipo_elemento_vivero?: string | null;
  tiene_hoja_vida?: boolean | null;
  maneja_hoja_vida?: boolean | null;
  visible_solicitudes?: boolean | null;
  id_marca?: number | null;
  id_unidad_medida?: number | null;
  id_porcentaje_iva?: number | null;
  id_unidad_medida_vida_util?: number | null;
  id_bien_padre?: number | null;
  tipo_bien?: string | null;
}

export interface IObjNursery {
  id_vivero: number | null;
  nombre: string;
  cod_municipio: string | null;
  direccion: string | null;
  area_mt2: number | null;
  area_propagacion_mt2: number | null;
  tiene_area_produccion: boolean | null;
  tiene_areas_pep_sustrato: boolean | null;
  tiene_area_embolsado: boolean | null;
  cod_tipo_vivero: string | null;
  fecha_inicio_viverista_actual: string | null;
  cod_origen_recursos_vivero: string | null;
  fecha_creacion: string | Date | null;
  en_funcionamiento: boolean | null;
  fecha_ultima_apertura: string | Date | null;
  justificacion_apertura: string | null;
  fecha_cierre_actual: string | Date | null;
  justificacion_cierre: string | null;
  vivero_en_cuarentena: boolean | null;
  fecha_inicio_cuarentena: string | Date | null;
  justificacion_cuarentena: string | null;
  ruta_archivo_creacion: string | null;
  activo: boolean | null;
  item_ya_usado: boolean | null;
  id_viverista_actual: number | null;
  id_persona_crea: number | null;
  id_persona_abre: number | null;
  id_persona_cierra: number | null;
  id_persona_cuarentena: number | null;
}
