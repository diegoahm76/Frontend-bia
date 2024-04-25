export interface item_input_radio {
  item: string;
  tipo_inspeccion: string;
  set_tipo_inspeccion: React.Dispatch<React.SetStateAction<string>>;
}
export interface response_conductor_logueado {
  success: boolean;
  detail: string;
  data: data_conductor_logueado;
}

export interface data_conductor_logueado {
  email: string
  fecha_nacimiento: string
  id_persona_logueada: number
  nombre_completo: string
  numero_documento: string
  telefono_celular: string
  tipo_documento: string
}

export interface response_vehiculo_logueado {
  success: boolean;
  detail: string;
  data: data_vehiculo_logueado[][];
}

export interface data_vehiculo_logueado {
  id_vehiculo_conductor: number;
  id_hoja_vida_vehiculo: number;
  id_persona_conductor: number;
  marca: string;
  contratista: string;
  placa: string;
}

export interface response_busqueda_vehiculos {
  success: boolean
  detail: string
  data: data_busqueda_vehiculos[]
}

export interface data_busqueda_vehiculos {
  id_vehiculo_arrendado: number;
  nombre: string;
  descripcion: string;
  placa: string;
  nombre_marca: string;
  empresa_contratista: string;
  tiene_hoja_de_vida: boolean;
  id_marca: number;
  id_hoja_de_vida: number;
}

export interface get_inspeccion_vehiculo {
  id_hoja_vida_vehiculo: number;
  kilometraje: number;
  dir_llantas_delanteras: boolean;
  dir_llantas_traseras: boolean;
  limpiabrisas_delantero: boolean;
  limpiabrisas_traseros: boolean;
  nivel_aceite: boolean;
  estado_frenos: boolean;
  nivel_refrigerante: boolean;
  apoyo_cabezas_piloto: boolean;
  apoyo_cabezas_copiloto: boolean;
  apoyo_cabezas_traseros: boolean;
  frenos_generales: boolean;
  freno_emergencia: boolean;
  llantas_delanteras: boolean;
  llantas_traseras: boolean;
  llanta_repuesto: boolean;
  espejos_laterales: boolean;
  espejo_retrovisor: boolean;
  cinturon_seguridad_delantero: boolean;
  cinturon_seguridad_trasero: boolean;
  luces_altas: boolean;
  luces_media: boolean;
  luces_bajas: boolean;
  luces_parada: boolean;
  luces_parqueo: boolean;
  luces_reversa: boolean;
  kit_herramientas: boolean;
  botiquin_completo: boolean;
  pito: boolean;
  observaciones?: string;
}

export interface create_inspeccion_vehiculo {
  id_hoja_vida_vehiculo: number;
  kilometraje: number;
  dir_llantas_delanteras: boolean;
  dir_llantas_traseras: boolean;
  limpiabrisas_delantero: boolean;
  limpiabrisas_traseros: boolean;
  nivel_aceite: boolean;
  estado_frenos: boolean;
  nivel_refrigerante: boolean;
  apoyo_cabezas_piloto: boolean;
  apoyo_cabezas_copiloto: boolean;
  apoyo_cabezas_traseros: boolean;
  frenos_generales: boolean;
  freno_emergencia: boolean;
  llantas_delanteras: boolean;
  llantas_traseras: boolean;
  llanta_repuesto: boolean;
  espejos_laterales: boolean;
  espejo_retrovisor: boolean;
  cinturon_seguridad_delantero: boolean;
  cinturon_seguridad_trasero: boolean;
  luces_altas: boolean;
  luces_media: boolean;
  luces_bajas: boolean;
  luces_parada: boolean;
  luces_parqueo: boolean;
  luces_reversa: boolean;
  kit_herramientas: boolean;
  botiquin_completo: boolean;
  pito: boolean;
  observaciones?: string;
}

export interface response_viajes_asociados {
  success: boolean
  detail: string
  data: interface_viajes_asociados[]
}

export interface interface_viajes_asociados {
  id_viaje_agendado: number
  nombre_conductor: string
  apellido_conductor: string
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
  realizo_inspeccion: boolean
}

export interface response_resumen_solicitud {
  success: boolean
  detail: string
  data: interface_resumen_solicitud
}

export interface interface_resumen_solicitud {
  solicitud_viaje: sub_interface_solicitud_viaje
  viajes_agendados: sub_interface_viajes_agendados
  personas_solicitud_viaje: sub_interface_personas_solicitud_viaje[]
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

export interface sub_interface_viajes_agendados {
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
  id_vehiculo_conductor: number
  id_solicitud_viaje: number
  cod_municipio_destino: string
  id_persona_autoriza: number
}

export interface sub_interface_personas_solicitud_viaje {
  id_persona_solcitud_viaje: number
  nombre_persona_viaja: string
  tipo_documento_persona_viaja: string
  numero_documento_persona_viaja: string
  celular_documento_persona_viaja?: string
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

export interface inputs_persona_seleccionada {
  tp_documento: string
  documento: string
  nombres: string
  razon_social: string
  nombre_comercial: string
}

export interface response_busqueda_persona_solicita {
  success: boolean
  detail: string
  data: interface_busqueda_persona_solicita[]
}

export interface interface_busqueda_persona_solicita {
  //interface de personas traidas directamente del servicio de operarios
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
  id_unidad_organizacional_actual?: number

  persona_agregada_inspeccion?: any
  persona_confirma_viaje?: boolean
  
  // interface de personas en inspeccion traidas por el servicio de informacion de solicitud de viaje por id
  id_persona_solcitud_viaje?: number
  nombre_persona_viaja?: string
  tipo_documento_persona_viaja?: string
  numero_documento_persona_viaja?: string
  celular_documento_persona_viaja?: any
  email_persona_viaja?: string
  observacion?: any
  fecha_registro?: string
  fecha_confirmacion?: any
  id_persona_viaja?: number
  id_solicitud_viaje?: number
  id_inspeccion_vehiculo?: any
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