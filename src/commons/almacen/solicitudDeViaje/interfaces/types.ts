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
}