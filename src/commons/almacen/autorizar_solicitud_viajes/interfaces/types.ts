

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

export interface response_obtener_solicitudes {
  success: boolean
  detail: string
  data: interface_obtener_solicitudes[]
}

export interface interface_obtener_solicitudes {
  id_solicitud_viaje: number
  cod_departamento: string
  fecha_solicitud: string
  tiene_expediente_asociado: boolean
  motivo_viaje: string
  direccion: string
  indicaciones_destino: string
  nro_pasajeros: number
  requiere_carga: boolean
  fecha_partida: string
  hora_partida: string
  fecha_retorno: string
  hora_retorno: string
  requiere_compagnia_militar: boolean
  consideraciones_adicionales: string
  fecha_aprobacion_responsable?: string
  fecha_rechazo?: string
  justificacion_rechazo?: string
  estado_solicitud: string
  id_persona_solicita: number
  id_unidad_org_solicita: number
  id_expediente_asociado?: number
  cod_municipio: string
  id_persona_responsable?: number
  id_unidad_org_responsable?: number
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