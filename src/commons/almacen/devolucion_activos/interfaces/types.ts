export interface inputs_almacenista {
  tipo_documento: string;
  numero_documento: string;
  nombre_apellido: string;
}

export interface inputs_funcionario_responsable {
  tipo_documento: string;
  numero_documento: string;
}

export interface response_busqueda_responsable {
  success: boolean
  detail: string
  data: interface_busqueda_responsable[]
}

export interface interface_busqueda_responsable {
  id_persona?: number
  tipo_persona?: string
  tipo_persona_desc?: string
  tipo_documento?: string
  numero_documento?: string
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

export interface response_tipos_documentos {
  success: boolean
  detail: string
  data: interface_tipos_documentos[]
}

export interface interface_tipos_documentos {
  value: string
  label: string
}

export interface response_inf_almacenista {
  success: boolean
  detail: string
  data: interface_inf_almamacenista
}

export interface interface_inf_almamacenista {
  id_persona: number
  tipo_documento: string
  numero_documento: string
  primer_nombre: string
  segundo_nombre: string
  primer_apellido: string
  segundo_apellido: string
  tipo_persona: string
  telefono_celular: string
  telefono_empresa: any
  email: string
  email_empresarial: any
}

export interface response_obtener_ultimo_consecutivo {
  success: boolean
  detail: string
  ultimo_consecutivo: number
}

export interface response_obtener_despacho_activos {
  success: boolean
  detail: string
  data: interface_obtener_despacho_activos[]
}

export interface interface_obtener_despacho_activos {
  id_despacho_activo: number
  id_bodega: number
  nombre_bodega: string
  nombre_persona_despacha: string
  tipo_solicitud: string
  despacho_sin_solicitud: boolean
  estado_despacho: string
  fecha_autorizacion_resp: any
  justificacion_rechazo_resp: any
  fecha_solicitud: string
  fecha_despacho: string
  observacion: string
  despacho_anulado: boolean
  justificacion_anulacion: any
  fecha_anulacion: any
  id_solicitud_activo: number
  id_persona_despacha: number
  id_persona_solicita: number
  id_uni_org_solicitante: any
  id_persona_anula: any
  id_archivo_doc_recibido?: number
}

export interface response_obtener_activos_de_despachos {
  success: boolean
  detail: string
  data: interface_obtener_activos_de_despachos[]
}

export interface interface_obtener_activos_de_despachos {
  id_item_despacho_activo: number
  id_bodega?: number
  nombre_bodega?: string
  id_bien?: number
  codigo_bien?: string
  nombre_bien?: string
  nombre_marca?: string
  identificador_activo?: string
  cantidad_solicitada: number
  fecha_devolucion: any
  se_devolvio: boolean
  cantidad_despachada: number
  observacion?: string
  nro_posicion_despacho: number
  id_despacho_activo: number
  id_bien_despachado?: number
  id_bien_solicitado: number
  id_entrada_alma?: number
  id_uni_medida_solicitada: number
  justificacion_devolucion?: string | null
  cod_estado_activo?: string | null
}

export interface response_tipos_estado_activo {
  success: boolean
  detail: string
  data: interface_tipos_estado_activo[]
}

export interface interface_tipos_estado_activo {
  cod_estado: string
  nombre: string
}

export interface response_data_registro_devolucion {
  success: boolean
  detail: string
  devolucion_activos: interface_data_registro_devolucion
  activos_devueltos: interface_activos_devueltos[]
  item_despacho_activos: item_despacho_activos[]
  despacho_activo: interface_despacho_activo
  almacenista_logueado?: interface_almacenista_logueado
}

export interface interface_almacenista_logueado {
  id_persona: number
  tipo_documento: string
  numero_documento: string
  primer_nombre: string
  segundo_nombre: string
  primer_apellido: string
  segundo_apellido: string
  tipo_persona: string
  telefono_celular: string
  telefono_empresa: any
  email: string
  email_empresarial: any
}


export interface interface_data_registro_devolucion {
  id_devolucion_activos: number
  nombre_persona_devolucion: string
  nombre_persona_anulacion: any
  consecutivo_devolucion: number
  fecha_devolucion: string
  devolucion_anulada: boolean
  justificacion_anulacion: any
  fecha_anulacion: any
  id_asignacion_activo: number
  id_despacho_activo: number
  id_persona_devolucion: number
  id_uni_org_persona_devolucion: number
  id_persona_anulacion: any
}

export interface interface_activos_devueltos {
  id_activo_devolucionado: number
  cod_estado_nombre: string
  justificacion_activo_devolucion: string
  id_devolucion_activo: number
  id_item_despacho_activo: number
  cod_estado_activo_devolucion: string
}

export interface item_despacho_activos {
  id_item_despacho_activo: number
  cantidad_solicitada: number
  fecha_devolucion: any
  se_devolvio: boolean
  cantidad_despachada: number
  observacion: string
  nro_posicion_despacho: number
  id_despacho_activo: number
  id_bien_despachado: number
  id_bien_solicitado: number
  id_entrada_alma: number
  id_bodega: number
  id_uni_medida_solicitada: number
}

export interface interface_despacho_activo {
  tipo_documento_funcionario_resp_asignado: string
  numero_documento_funcionario_resp_asignado: string
  id_despacho_activo: number
  id_bodega: number
  nombre_bodega: string
  nombre_persona_despacha: string
  tipo_solicitud: string
  despacho_sin_solicitud: boolean
  estado_despacho: string
  fecha_autorizacion_resp: any
  justificacion_rechazo_resp: any
  fecha_solicitud: string
  fecha_despacho: string
  observacion: string
  despacho_anulado: boolean
  justificacion_anulacion: any
  fecha_anulacion: any
  id_solicitud_activo: number
  id_persona_despacha: number
  id_persona_solicita: number
  id_uni_org_solicitante: any
  id_persona_anula: any
  id_archivo_doc_recibido: number
}
