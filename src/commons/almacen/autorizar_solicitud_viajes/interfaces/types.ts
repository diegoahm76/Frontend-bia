

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

export interface interface_inputs_resumen_solicitud {
  fecha_solicitud: string
  fecha_partida: string
  hora_partida: string
  fecha_retorno: string
  hora_retorno: string
  fecha_aprobacion_responsable: string
  fecha_rechazo: string
  direccion: string
  indicaciones_destino: string
  nro_pasajeros: number
  requiere_carga: boolean
  requiere_compagnia_militar: boolean
  estado_solicitud: string
  consideraciones_adicionales: string
  motivo_viaje: string
  justificacion_rechazo: string
  cod_municipio: string
  cod_departamento: string
  nombre_conductor: string
  apellido_conductor: string
  telefono_celular_empresa: string
  email_empresarial: string
  tipo_documento: string
  numero_documento: string
  placa: string
  marca: string
  nombre_vehiculo: string
  nombre_persona_autoriza: string
  viaje_autorizado: boolean
  fecha_no_autorizado: string
  observacion_autorizacion: string
  fecha_autorizacion: string
  ya_inicio: boolean
  ya_llego: boolean
  estado_agendamieto: string
  realizo_inspeccion: boolean
  personas_solicitud_viaje: sub_interface_personas_viajan[]
}

export interface response_resumen_solicitud {
  success: boolean
  detail: string
  data: interface_resumen_solicitud
}

export interface interface_resumen_solicitud {
  solicitud_viaje: sub_interface_solicitud_viaje
  viajes_agendados: sub_interface_viaje_agendado
  personas_solicitud_viaje: sub_interface_personas_viajan[]
}

export interface sub_interface_solicitud_viaje {
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
  fecha_aprobacion_responsable: string
  fecha_rechazo: any
  justificacion_rechazo: any
  estado_solicitud: string
  id_persona_solicita: number
  id_unidad_org_solicita: number
  id_expediente_asociado: any
  cod_municipio: string
  id_persona_responsable: number
  id_unidad_org_responsable: number
}

export interface sub_interface_viaje_agendado {
  id_viaje_agendado: number
  nombre_conductor: any
  apellido_conductor: any
  fecha_nacimiento: any
  telefono_celular: any
  telefono_celular_empresa: string
  email: string
  email_empresarial: string
  tipo_documento: string
  numero_documento: string
  placa: string
  marca: string
  nombre: string
  nombre_persona_autoriza: string
  direccion: string
  indicaciones_destino: string
  nro_total_pasajeros_req: number
  requiere_capacidad_carga: boolean
  fecha_partida_asignada: string
  hora_partida: string
  fecha_retorno_asignada: string
  hora_retorno: string
  requiere_compagnia_militar: boolean
  viaje_autorizado: boolean
  observacion_autorizacion: any
  fecha_no_autorizado: any
  fecha_autorizacion: string
  ya_inicio: boolean
  ya_llego: boolean
  multiples_asignaciones: boolean
  estado: string
  realizo_inspeccion: boolean
  id_vehiculo_conductor: number
  id_solicitud_viaje: number
  cod_municipio_destino: string
  id_persona_autoriza: number
}

export interface sub_interface_personas_viajan {
  id_persona_solcitud_viaje: number
  nombre_persona_viaja: string
  tipo_documento_persona_viaja: string
  numero_documento_persona_viaja: string
  celular_documento_persona_viaja: string
  email_persona_viaja: string
  persona_confirma_viaje: any
  persona_agregada_inspeccion: any
  observacion: any
  fecha_registro: string
  fecha_confirmacion: any
  id_persona_viaja: number
  id_solicitud_viaje: number
  id_inspeccion_vehiculo: any
}
