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