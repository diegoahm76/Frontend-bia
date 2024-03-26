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
  nombre_completo?: string
  razon_social?: string
  nombre_comercial?: string
  digito_verificacion?: string
  cod_naturaleza_empresa?: string
  tiene_usuario?: boolean
  tipo_usuario?: string
}

export interface response_busqueda_operario {
  success: boolean
  detail: string
  data: interface_busqueda_operario[]
}

export interface interface_busqueda_operario {
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
  tiene_usuario?: boolean
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
  nombre_bien: string
  nombre_unidad_medida: string
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
  cantidad?: number
  fecha_devolucion?: string
  tipo_unidad_medida?: string 
  observacion?: string
  nro_posicion?: number
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
  id_bien: number
  id_solicitud_activo: number
  primer_nombre_persona_solicita: string
  primer_apellido_persona_solicita: string
  tipo_documento_persona_solicita: string
  numero_documento_persona_solicita: any
  primer_nombre_funcionario_resp_unidad: string
  primer_apellido_funcionario_resp_unidad: string
  tipo_documento_funcionario_resp_unidad: string
  numero_documento_funcionario_resp_unidad: string
  primer_nombre_persona_operario: string
  primer_apellido_persona_operario: string
  tipo_documento_persona_operario: string
  numero_documento_persona_operario: string
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
  codigo_bien: string
  nombre_bien: string
  cod_tipo_bien: string
  descripcion_bien: string
  cantidad: number
  fecha_devolucion: any
  observacion: string
  nro_posicion: number
  id_solicitud_activo: number
  id_bien: number
  id_unidad_medida: number
  nombre_unidad_medida: string
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
