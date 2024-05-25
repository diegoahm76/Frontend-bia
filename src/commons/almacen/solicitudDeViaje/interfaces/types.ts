export interface props_solicitar_viaje{
  set_mostrar_solicitud_viaje:(value: boolean)=>void;
}

export interface data_solicitud_viaje {
  id_solicitud_viaje: number
  fecha_solicitud: string
  tiene_expediente_asociado: boolean
  motivo_viaje?: string
  motivo_viaje_solicitado?: string
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
  fecha_aprobacion_responsable: any
  fecha_rechazo: any
  justificacion_rechazo: any
  estado_solicitud: string
  id_persona_solicita: number
  id_unidad_org_solicita: number
  id_expediente_asociado?: number
  cod_municipio: string
  id_persona_responsable: any
  id_unidad_org_responsable: any
  id_solicitud?: number
  cod_departamento: string
}

export interface data_row_solicitud_viaje {
  fecha_solicitud: string
  nro_pasajeros: number
  fecha_partida: string
  fecha_retorno: string
  estado_solicitud: string
  cod_municipio: string
  id_solicitud?: number
}

export interface interface_solicitar_viaje {
  motivo_viaje_solicitado?: string,  // Motivo del viaje
  motivo_viaje?: string,  // Motivo del viaje
  cod_municipio: string, // Código del municipio de destino
  cod_departamento?: string,  // Código del departamento de destino
  tiene_expediente_asociado: boolean,  // Indica si tiene un expediente asociado
  id_expediente_asociado?: number,  // ID del expediente asociado, si corresponde
  direccion: string,  // Dirección del destino
  nro_pasajeros: number,  // Número de pasajeros
  fecha_partida: string,  // Fecha de partida
  hora_partida: string,  // Hora de partida
  fecha_retorno: string,  // Fecha de retorno
  hora_retorno: string,  // Hora de retorno
  req_compagnia_militar: boolean,  // Indica si se requiere compañía militar
  requiere_carga: boolean,  // Indica si se requiere compañía militar
  consideraciones_adicionales: string,  // Consideraciones adicionales
  indicaciones_destino: string  // Indicaciones para llegar al destino
  personas_viajan?: any[];  // Personas que viajan
}
export interface response_solicitud_respondida {
  success: boolean
  detail: string
  data: data_solicitud_respondida
}

export interface data_solicitud_respondida {
  solicitud_viaje: interface_solicitud_viaje
  viajes_agendados: interface_solicitud_respondida
}

export interface interface_solicitud_viaje {
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
  id_expediente_asociado: number
  cod_municipio: string
  id_persona_responsable: number
  id_unidad_org_responsable: number
}

export interface interface_solicitud_respondida {
  id_viaje_agendado: number
  nombre_conductor: string
  apellido_conductor: string
  fecha_nacimiento: string
  telefono_celular: string
  telefono_celular_empresa: any
  email: string
  email_empresarial: string
  tipo_documento: string
  numero_documento: string
  placa: string
  marca: string
  nombre: string
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
  id_vehiculo_conductor: number
  id_solicitud_viaje: number
  cod_municipio_destino: string
  id_persona_autoriza: number
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

export interface inputs_persona_seleccionada {
  tp_documento: string
  documento: string
  nombres: string
  razon_social: string
  nombre_comercial: string
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