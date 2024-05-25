export interface response_data_agendamiento_vehiculos {
  success: boolean
  detail: string
  data: interface_data_agendamiento_vehiculos[]
}

export interface interface_data_agendamiento_vehiculos {
  id_viaje_agendado?: number
  id_solicitud_viaje?: number
  id_persona_solicita?: number
  primer_nombre_solicitante?: string
  primer_apellido_solicitante?: string
  cod_municipio?: string
  nombre_municipio?: string
  fecha_solicitud?: string
  tiene_expediente_asociado?: boolean
  motivo_viaje?: string
  direccion?: string
  indicaciones_destino?: string
  nro_pasajeros?: number
  requiere_carga?: boolean
  fecha_partida?: string
  hora_partida?: string
  fecha_retorno?: string
  hora_retorno?: string
  requiere_compagnia_militar?: boolean
  consideraciones_adicionales?: string
  fecha_aprobacion_responsable?: any
  fecha_rechazo?: any
  justificacion_rechazo?: any
  estado_solicitud?: string
}

export interface interface_rechazo_solicitud {
  id_solicitud_viaje: number
  observacion_no_autorizado: string
}

export interface response_detalles_vehiculos_agendados {
  success: boolean
  detail: string
  data: interface_detalles_vehiculos_agendados[]
}

export interface interface_detalles_vehiculos_agendados {
  id_viaje_agendado: number
  placa: string
  nombre: string
  marca: string
  id_marca: number
  empresa_contratista: string
  persona_conductor: string
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

export interface response_buscar_vehiculo {
  success: boolean
  detail: string
  data: data_buscar_vehiculo[]
}

export interface data_buscar_vehiculo {
  id_vehiculo_conductor: number;
  id_persona_conductor: number;
  id_hoja_vida_vehiculo: number;
  id_articulo: number;
  id_vehiculo_arrendado: number;
  tiene_platon: boolean;
  es_arrendado: boolean;
  placa: string;
  nombre: string;
  marca: string;
  id_marca: number;
  empresa_contratista: string;
  persona_conductor: string;
  id_unico?: string;
}

export interface crear_aprobacion_viaje {
  id_solicitud_viaje: number
  id_persona_conductor: number
}

export interface response_ver_agendamiento {
  success: boolean
  detail: string
  data: data_ver_agendamiento
}

export interface data_ver_agendamiento {
  viajes_agendados: interface_ver_agendamiento
}

export interface interface_ver_agendamiento {
  id_viaje_agendado: number
  nombre_conductor: string
  apellido_conductor: string
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
