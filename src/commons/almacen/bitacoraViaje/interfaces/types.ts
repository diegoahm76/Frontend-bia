export interface response_agendamientos_bitacora {
  success: boolean
  detail: string
  data: interface_agendamientos_bitacora[]
}

export interface interface_agendamientos_bitacora {
  nombre_conductor: string
  apellido_conductor: string
  id_viaje_agendado: number
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

export interface data_busqueda_conductor {
  id_clase_tercero: number
  id_clase_tercero_persona: number
  id_persona: number
  nombre_clase_tercero: string
  nombre_persona: string
  nro_documento: string;
}

export interface data_busqueda_conductores {
  id_clase_tercero_persona: number
  id_persona?: number
  id_clase_tercero?: number
  nombre_clase_tercero?: string
  nombre_persona: string
  nro_documento: string
}

export interface crear_bitacora_inicio {
  id_viaje_agendado: number
  es_conductor_asignado: boolean
  id_conductor_que_parte?: number
  novedad_salida: string
}

export interface response_bitacora_completa {
  success: boolean
  detail: string
  data: interface_bitacora_completa[]
}

export interface interface_bitacora_completa {
  id_bitacora: number
  es_conductor_asignado: boolean
  fecha_inicio_recorrido: string
  novedad_salida: string
  fecha_llegada_recorrido: string
  novedad_llegada: string
  id_viaje_agendado: number
  id_conductor_que_parte: number
}
