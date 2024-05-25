export interface response_put_revisar_vehiculo {
  success?: boolean
  detail?: string
  error?: string
  data: interface_put_revisar_vehiculo
}

export interface interface_put_revisar_vehiculo {
  observaciones_verifi_sup: string
  id_inspeccion_vehiculo: number
  dia_inspeccion: string
  fecha_registro: string
  kilometraje: number
  dir_llantas_delanteras: boolean
  dir_llantas_Traseras: boolean
  limpiabrisas_delantero: boolean
  limpiabrisas_traseros: boolean
  nivel_aceite: boolean
  estado_frenos: boolean
  nivel_refrigerante: boolean
  apoyo_cabezas_piloto: boolean
  apoyo_cabezas_copiloto: boolean
  apoyo_cabezas_traseros: boolean
  frenos_generales: boolean
  freno_emergencia: boolean
  llantas_delanteras: boolean
  llantas_traseras: boolean
  llanta_repuesto: boolean
  espejos_laterales: boolean
  espejo_retrovisor: boolean
  cinturon_seguridad_delantero: boolean
  cinturon_seguridad_trasero: boolean
  luces_altas: boolean
  luces_media: boolean
  luces_bajas: boolean
  luces_parada: boolean
  luces_parqueo: boolean
  luces_reversa: boolean
  kit_herramientas: boolean
  botiquin_completo: boolean
  pito: boolean
  observaciones: string
  requiere_verificacion: boolean
  verificacion_superior_realizada: boolean
  id_hoja_vida_vehiculo: number
  id_persona_inspecciona: number
  id_persona_que_verifica: number
}

export interface data_vehiculos_inspeccionados {
  vehiculos_sin_novedad: interface_vehiculos_sin_novedad[]
  vehiculos_con_novedad: interface_vehiculos_con_novedad[]
}

export interface interface_vehiculos_con_novedad {
  fecha_registro: string
  id_inspeccion_vehiculo: number
  id_hoja_de_vida: number
  placa_marca: string
  verificacion_superior_realizada: boolean
  novedad?: string
  cantidad_novedades?: number
}

export interface interface_vehiculos_sin_novedad {
  id_inspeccion_vehiculo: number
  id_hoja_de_vida: number
  placa: string
  marca: string
  fecha_registro: string
  dia_inspeccion: string
  id_persona_inspecciona: number
  nombre_inspecciona: string
  apellido_inspecciona: string
  fecha_nacimiento_persona_inspecciona: string
  tipo_documento_persona_inspecciona: string
  numero_documento_persona_inspecciona: string
  numero_celular_persona_inspecciona: string
  numero_empresarial_celular_persona_inspecciona: any
  email_persona_inspecciona: string
  email_empresarial_persona_inspecciona: any
  verificacion_superior_realizada: boolean
}

export interface response_vehiculos_inspeccionados {
  success: boolean
  detail: string
  data: data_vehiculos_inspeccionados
}