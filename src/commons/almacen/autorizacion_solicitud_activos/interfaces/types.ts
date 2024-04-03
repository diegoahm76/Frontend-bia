export interface response_obtener_solicitudes_realizadas {
  success: boolean
  detail: string
  data: interface_solicitudes_realizadas[]
}

export interface interface_solicitudes_realizadas {
  id_solicitud_activo: number
  fecha_solicitud: string
  motivo: string
  estado_solicitud: string
  id_persona_solicita: number
  primer_nombre_persona_solicita: string
  primer_apellido_persona_solicita: string
  id_funcionario_resp_unidad: number
  primer_nombre_funcionario_resp_unidad: string
  primer_apellido_funcionario_resp_unidad: string
  numero_activos: number
}

export interface response_busqueda_responsable {
  success: boolean
  detail: string
  data: interface_busqueda_responsable[]
}

export interface interface_busqueda_responsable {
  id_persona: number
  tipo_persona: string
  tipo_persona_desc: string
  tipo_documento: string
  numero_documento: string
  primer_nombre?: string
  segundo_nombre?: string
  primer_apellido?: string
  segundo_apellido?: string
  nombre_completo: string
  razon_social?: string
  nombre_comercial?: string
  digito_verificacion?: string
  cod_naturaleza_empresa?: string
  tiene_usuario: boolean
  tipo_usuario?: string
}

export interface response_busqueda_persona_solicita {
  success: boolean
  detail: string
  data: interface_busqueda_persona_solicita[]
}

export interface interface_busqueda_persona_solicita {
  id_persona: number
  tipo_persona: string
  tipo_persona_desc: string
  tipo_documento: string
  numero_documento: string
  primer_nombre?: string
  segundo_nombre?: string
  primer_apellido?: string
  segundo_apellido?: string
  nombre_completo?: string
  razon_social?: string
  nombre_comercial?: string
  digito_verificacion?: string
  cod_naturaleza_empresa?: string
  tiene_usuario: boolean
  tipo_usuario?: string
}

export interface response_busqueda_articulos {
  success: boolean
  detail: string
  data: interface_busqueda_articulo[]
}

export interface interface_busqueda_articulo {
  id_bien: number
  marca: string
  nombre_padre: string
  unidad_medida: string
  unidad_medida_vida_util: string
  porcentaje_iva: number
  tipo_bien: string
  codigo_bien: string
  nro_elemento_bien: any
  nombre: string
  cod_tipo_bien: string
  nivel_jerarquico: number
  nombre_cientifico: any
  descripcion: string
  doc_identificador_nro: any
  cantidad_vida_util: number
  valor_residual?: string
  stock_minimo: any
  stock_maximo: any
  solicitable_vivero: boolean
  es_semilla_vivero: any
  cod_tipo_elemento_vivero: any
  tiene_hoja_vida: any
  maneja_hoja_vida: boolean
  visible_solicitudes: boolean
  cod_tipo_activo: string
  id_marca: number
  id_unidad_medida: number
  id_porcentaje_iva: number
  cod_metodo_valoracion: any
  cod_tipo_depreciacion: number
  id_unidad_medida_vida_util: number
  id_bien_padre: number
}

export interface interface_articulos_agregados {
  id_bien: number
  marca: string
  nombre_padre: string
  unidad_medida: string
  unidad_medida_vida_util: string
  porcentaje_iva: number
  tipo_bien: string
  codigo_bien: string
  nro_elemento_bien: any
  nombre: string
  cod_tipo_bien: string
  nivel_jerarquico: number
  nombre_cientifico: any
  descripcion: string
  doc_identificador_nro: any
  cantidad_vida_util: number
  valor_residual?: string
  stock_minimo: any
  stock_maximo: any
  solicitable_vivero: boolean
  es_semilla_vivero: any
  cod_tipo_elemento_vivero: any
  tiene_hoja_vida: any
  maneja_hoja_vida: boolean
  visible_solicitudes: boolean
  cod_tipo_activo: string
  id_marca: number
  id_unidad_medida: number
  id_porcentaje_iva: number
  cod_metodo_valoracion: any
  cod_tipo_depreciacion: number
  id_unidad_medida_vida_util: number
  id_bien_padre: number
  cantidad_articulo?: number
  fecha_devolucion?: string
  tipo_unidad_medida?: string 
  observacion?: string
}

export interface response_unidades_medidas {
  success: boolean
  detail: string
  data: interface_unidades_medidas[]
}

export interface interface_unidades_medidas {
  id_unidad_medida: number
  nombre: string
  abreviatura: string
  precargado: boolean
  activo: boolean
  item_ya_usado: boolean
  id_magnitud: number
}

export interface response_solicitud_obtenida_por_id {
  success: boolean
  detail: string
  data: interface_solicitud_obtenida_por_id
}

export interface interface_solicitud_obtenida_por_id {
  id_solicitud_activo: number
  fecha_solicitud: string
  motivo: string
  observacion: string
  estado_solicitud: string
  solicitud_prestamo: boolean
  fecha_devolucion: any
  fecha_cierra_solicitud: any
  revisada_responsable: boolean
  estado_aprobacion_resp: string
  justificacion_rechazo_resp: any
  fecha_aprobacion_resp: any
  gestionada_alma: boolean
  obser_cierre_no_dispo_alma: any
  fecha_cierre_no_dispo_alma: any
  rechazada_almacen: boolean
  fecha_rechazo_almacen: any
  justificacion_rechazo_almacen: any
  solicitud_anulada_solicitante: boolean
  fecha_anulacion_solicitante: any
  justificacion_anulacion: any
  id_persona_solicita: number
  id_uni_org_solicitante: number
  id_funcionario_resp_unidad: number
  id_uni_org_responsable: number
  id_persona_operario: number
  id_uni_org_operario: number
  id_persona_cierra_no_dispo_alma: any
  id_persona_alma_rechaza: any
  items: interface_articulos_obtenidos_por_id[]
}

export interface interface_articulos_obtenidos_por_id {
  id_item_solicitud_activo: number
  cantidad: number
  observacion: string
  nro_posicion: number
  id_solicitud_activo: number
  id_bien: number
  id_unidad_medida: number
  nombre_unidad_medida: string
}

export interface response_solicites_en_proceso {
  success: boolean
  detail: string
  data: interface_solicitiudes_en_proceso[]
}

export interface interface_solicitiudes_en_proceso {
  id_solicitud_activo: number
  fecha_solicitud: string
  motivo: string
  estado_solicitud: string
  id_persona_solicita: number
  primer_nombre_persona_solicita: string
  primer_apellido_persona_solicita: string
  id_funcionario_resp_unidad: number
  primer_nombre_funcionario_resp_unidad: string
  primer_apellido_funcionario_resp_unidad: string
  numero_activos: number
}

export interface interface_estado_autorizacion_solicitud_activos {
  es_solicitud_prestamo:  boolean
  fecha_devolucion: string
  fecha_solictud: string
  estado_solicitud: string
  tipo_documento_solictante: string
  documento_solictante: string
  nombres_solictante: string
  apellidos_solictante: string
  tipo_documento_responsable: string
  documento_responsable: string
  nombres_responsable: string
  apellidos_responsable: string
  justificacion_rechazo: string
  fecha_aprobacion: string
  tipo_documento_operario: string
  documento_operario: string
  nombres_operario: string
  apellidos_operario: string
  justificacion_rechazo_resp: string
  fecha_aprobacion_resp: string
  tipo_documento_persona_cierra_no_dispo_alma: string
  documento_persona_cierra_no_dispo_alma: string
  nombres_persona_cierra_no_dispo_alma: string
  apellidos_persona_cierra_no_dispo_alma: string
  obser_cierre_no_dispo_alma: string
  fecha_cierre_no_dispo_alma: string
  tipo_documento_persona_alma_rechaza: string
  documento_persona_alma_rechaza: string
  justificacion_rechazo_almacen: string
  fecha_rechazo_almacen : string
  nombres_persona_alma_rechaza: string
  apellidos_persona_alma_rechaza: string
  motivo: string
  observacion: string
  fecha_cierre_solicitud: string
  items_solicitud: itmes_solicitud_por_id[]
}

export interface response_solicitud_por_id {
  success: boolean
  detail: string
  data: interface_solicitud_por_id
}

export interface interface_solicitud_por_id {
  id_solicitud_activo: number
  fecha_solicitud: string
  motivo: string
  observacion: string
  id_persona_solicita: number
  primer_nombre_persona_solicitante: string
  primer_apellido_persona_solicitante: string
  tipo_documento_persona_solicitante: string
  numero_documento_persona_solicitante: string
  id_uni_org_solicitante: number
  id_funcionario_resp_unidad: number
  primer_nombre_funcionario_resp_unidad: string
  primer_apellido_funcionario_resp_unidad: string
  tipo_documento_funcionario_resp_unidad: string
  numero_documento_funcionario_resp_unidad: string
  id_uni_org_responsable: number
  id_persona_operario: number
  primer_nombre_persona_operario: string
  primer_apellido_persona_operario: string
  tipo_documento_persona_operario: string
  numero_documento_persona_operario: string
  id_uni_org_operario: number
  estado_solicitud: string
  solicitud_prestamo: boolean
  fecha_devolucion: any
  fecha_cierra_solicitud: any
  revisada_responsable: boolean
  estado_aprobacion_resp: string
  justificacion_rechazo_resp: any
  fecha_aprobacion_resp: any
  gestionada_alma: boolean
  obser_cierre_no_dispo_alma: any
  fecha_cierre_no_dispo_alma: any
  id_persona_cierra_no_dispo_alma: any
  primer_nombre_persona_cierra_no_dispo_alma: any
  primer_apellido_persona_cierra_no_dispo_alma: any
  tipo_documento_persona_cierra_no_dispo_alma: any
  numero_documento_persona_cierra_no_dispo_alma: any
  rechazada_almacen: boolean
  fecha_rechazo_almacen: any
  justificacion_rechazo_almacen: any
  id_persona_alma_rechaza: any
  primer_nombre_persona_alma_rechaza: any
  primer_apellido_persona_alma_rechaza: any
  tipo_documento_persona_alma_rechaza: any
  numero_documento_persona_alma_rechaza: any
  solicitud_anulada_solicitante: boolean
  fecha_anulacion_solicitante: any
  items_solicitud: itmes_solicitud_por_id[]
  despachos: any[]
  items_despacho: any[]
}

export interface itmes_solicitud_por_id {
  id_item_solicitud_activo: number
  id_solicitud_activo: number
  id_bien: number
  nombre_bien: string
  cantidad: number
  id_unidad_medida: number
  abreviatura_unidad_medida: string
  nombre_unidad_medida: string
  observacion: string
  nro_posicion: number
}

export interface interface_persona_solicita_modal {
  nombre_completo: string
  id_persona: number
}

export interface response_tipos_documentos {
  success: boolean
  detail: string
  data: interface_tipos_documentos[]
}

export interface interface_tipos_documentos {
  value: string
  label: string
}
