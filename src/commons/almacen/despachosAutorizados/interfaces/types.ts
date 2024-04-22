


export interface response_resumen_solicitud_despacho {
  success: boolean
  detail: string
  data: interface_resumen_solicitud_despacho
}

export interface interface_resumen_solicitud_despacho {
  id_despacho_activo: number
  id_solicitud_activo: any
  despacho_sin_solicitud: boolean
  estado_despacho: string
  fecha_autorizacion_resp: any
  justificacion_rechazo_resp: any
  fecha_solicitud: any
  fecha_despacho: string
  id_persona_despacha: number
  primer_nombre_persona_persona_despacha: string
  primer_apellido_persona_persona_despacha: string
  tipo_documento_persona_persona_despacha: string
  numero_documento_persona_persona_despacha: string
  observacion: string
  id_persona_solicita: any
  primer_nombre_persona_solicita: string
  primer_apellido_persona_solicita: string
  tipo_documento_persona_solicita: string
  numero_documento_persona_solicita: string
  id_uni_org_solicitante: any
  id_bodega: number
  nombre_bodega: string
  despacho_anulado: boolean
  justificacion_anulacion: any
  fecha_anulacion: any
  id_archivo_doc_recibido: any
  id_persona_anula: any
  primer_nombre_persona_anula: any
  primer_apellido_persona_anula: any
  tipo_documento_persona_anula: any
  numero_documento_persona_anula: any
  items_despacho: items_despacho[]
  asignaciones_activo: asignaciones_activo[]
  solicitudes: any[]
  items_solicitud: any[]
  archivos_digitales: any[]
}

export interface items_despacho {
  id_item_despacho_activo: number
  id_despacho_activo: number
  id_bien_solicitado: any
  nombre_bien_solicitado: any
  id_bien_despachado: number
  nombre_bien_despachado: string
  id_entrada_alma: number
  id_bodega: number
  nombre_bodega: string
  cantidad_solicitada: any
  fecha_devolucion: any
  se_devolvio: boolean
  id_uni_medida_solicitada: number
  nombre_uni_medida_solicitada: string
  abreviatura_uni_medida_solicitada: string
  cantidad_despachada: number
  observacion: string
  nro_posicion_despacho: number
}

export interface asignaciones_activo {
  id_asignacion_activos: number
  id_despacho_asignado: number
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
  actual: boolean
  fecha_asignacion: string
  observacion: any
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
  id_unidad_organizacional_actual: number
}

export interface response_obtener_despachos {
  success: boolean
  detail: string
  data: interface_obtener_despachos[]
}

export interface interface_obtener_despachos {
  id_despacho_activo: number
  id_bodega: number
  nombre_bodega: string
  nombre_persona_despacha: string
  tipo_solicitud: string
  numero_activos: number
  id_funcionario_resp_asignado: number
  primer_nombre_funcionario_resp_asignado: string
  primer_apellido_funcionario_resp_asignado: string
  tipo_documento_funcionario_resp_asignado: string
  numero_documento_funcionario_resp_asignado: string
  id_persona_operario_asignado: number
  primer_nombre_persona_operario_asignado: string
  primer_apellido_persona_operario_asignado: string
  tipo_documento_persona_operario_asignado: string
  numero_documento_persona_operario_asignado: string
  despacho_sin_solicitud: boolean
  estado_despacho: string
  fecha_autorizacion_resp?: string
  justificacion_rechazo_resp: any
  fecha_solicitud?: string
  fecha_despacho: string
  observacion: string
  despacho_anulado: boolean
  justificacion_anulacion: any
  fecha_anulacion?: string
  id_solicitud_activo?: number
  id_persona_despacha: number
  id_persona_solicita?: number
  id_uni_org_solicitante: any
  id_persona_anula?: number
  id_archivo_doc_recibido?: number
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