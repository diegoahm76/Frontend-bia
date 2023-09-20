export interface ISolicitudConsumo {
  current_solicitud: IObjSolicitud; // solicitud para crear
  solicitudes: IObjSolicitud[]; // solicitudes
  current_solicitud_vivero: IObjSolicitudVivero;
  solicitudes_vivero: IObjSolicitudVivero[];
  bienes_solicitud: IObjBienesSolicitud[]; // solicit;ud bienes por crear
  bienes_solicitud_vivero: IObjBienesViveroSolicitud[];
  bienes: IObjBienConsumo[];
  current_bien: IObjBienConsumo;
  bienes_vivero: IObjBienViveroConsumo[];
  current_bien_vivero: IObjBienViveroConsumo;
  persona_solicita: IObjPersonaSolicita;
  funcionarios: IObjFuncionario[];
  current_funcionario: IObjFuncionario;
  nro_solicitud: number | null; //
  nro_solicitud_vivero: number | null;
  unidades_medida: UnidadesMedida[];
  unidad_organizacional: UnidadOrganizacional[];
  coordinador_vivero: ICoordonadorVivero[];
}

export interface IObjPersonaSolicita {
  id_persona?: number | null;
  nombre?: string;
  unidad_organizacional?: string | null;
}

export interface IObjBienesSolicitud {
  id_item_solicitud_consumible: number | null;
  codigo_bien: string;
  nombre_bien: string;
  id_bien: number | null;
  cantidad: number | null;
  cantidad_faltante?: number | null;
  cantidad_despachada?: number | null;
  observaciones: string;
  nro_posicion?: string;
  id_unidad_medida?: null;
  id_solicitud_consumibles: number | null;
}
export interface IObjBienesViveroSolicitud {
  id_item_solicitud_consumible: number | null;
  codigo_bien: string;
  nombre_bien: string;
  id_bien: number | null;
  cantidad: string | null;
  observaciones: string;
  nro_posicion?: string;
  id_unidad_medida?: null;
  id_solicitud_consumibles: number | null;
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

export interface UnidadesMedida {
  id_unidad_medida: number | null;
  nombre: string;
  abreviatura: string;
  id_magnitud: number;
  precargado: boolean;
  activo: boolean;
  item_ya_usado: boolean;
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
}

export interface IObjBienViveroConsumo {
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

export interface IObjSolicitud {
  id_solicitud_consumibles?: number | null;
  es_solicitud_de_conservacion?: boolean;
  nro_solicitud_por_tipo?: number | null;
  fecha_solicitud?: string | null;
  motivo?: string;
  observacion?: string;
  solicitud_abierta?: boolean;
  fecha_cierre_solicitud?: string | null;
  revisada_responsable?: boolean;
  estado_aprobacion_responsable?: string | null;
  justificacion_rechazo_responsable?: string | null;
  fecha_aprobacion_responsable?: string | null;
  gestionada_almacen?: boolean;
  id_despacho_consumo?: number | null;
  observacion_cierre_no_dispo_alm?: string | null;
  fecha_cierre_no_dispo_alm?: string | null;
  rechazada_almacen?: boolean | null;
  fecha_rechazo_almacen?: string | null;
  justificacion_rechazo_almacen?: string | null;
  solicitud_anulada_solicitante?: boolean | null;
  justificacion_anulacion_solicitante?: string | null;
  fecha_anulacion_solicitante?: string | null;
  id_persona_solicita?: number | null; // creador de la solicitud
  id_unidad_org_del_solicitante?: number | null; // unidad del que solicita
  id_unidad_para_la_que_solicita?: number | null;
  id_funcionario_responsable_unidad?: number | null; // id del responsable de la unidad de solicitud
  id_unidad_org_del_responsable?: number | null; // responsable de solcitud
  id_persona_cierre_no_dispo_alm?: number | null;
  id_persona_almacen_rechaza?: number | null;
  persona_solicita?: string | null;
  persona_cierra?: string | null;
  nombre_unidad_organizacional?: string | null;
}
export interface IObjSolicitudVivero {
  id_solicitud_consumibles?: number | null;
  es_solicitud_de_conservacion?: boolean;
  nro_solicitud_por_tipo?: number | null;
  fecha_solicitud?: string | null;
  motivo?: string;
  observacion?: string;
  solicitud_abierta?: boolean;
  fecha_cierre_solicitud?: string | null;
  revisada_responsable?: boolean;
  estado_aprobacion_responsable?: string | null;
  justificacion_rechazo_responsable?: string | null;
  fecha_aprobacion_responsable?: string | null;
  gestionada_almacen?: boolean;
  id_despacho_consumo?: number | null;
  observacion_cierre_no_dispo_alm?: string | null;
  fecha_cierre_no_dispo_alm?: string | null;
  rechazada_almacen?: boolean | null;
  fecha_rechazo_almacen?: string | null;
  justificacion_rechazo_almacen?: string | null;
  solicitud_anulada_solicitante?: boolean | null;
  justificacion_anulacion_solicitante?: string | null;
  fecha_anulacion_solicitante?: string | null;
  id_persona_solicita?: number | null; // creador de la solicitud
  id_unidad_org_del_solicitante?: number | null; // unidad del que solicita
  id_unidad_para_la_que_solicita?: number | null;
  id_funcionario_responsable_unidad?: number | null; // id del responsable de la unidad de solicitud
  id_unidad_org_del_responsable?: number | null; // responsable de solcitud
  id_persona_cierre_no_dispo_alm?: number | null;
  id_persona_almacen_rechaza?: number | null;
  persona_solicita?: string | null;
  nombre_unidad_organizacional?: string | null;
}

export interface ICoordonadorVivero {
  id_persona?: number | null;
  tipo_persona?: string | null;
  tipo_persona_desc?: string | null;
  tipo_documento?: string | null;
  numero_documento?: number | null;
  primer_nombre?: string | null;
  segundo_nombre?: string | null;
  primer_apellido?: string | null;
  segundo_apellido?: string | null;
  nombre_completo?: string | null;
  razon_social?: string | null;
  nombre_comercial?: string | null;
  digito_verificacion?: string | null;
  cod_naturaleza_empresa?: string | null;
  tiene_usuario?: boolean;
  id_unidad_organizacional_actual?: number | null;
  nombre_unidad_organizacional_actual?: string | null;
}
