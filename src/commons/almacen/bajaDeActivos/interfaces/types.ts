
export interface response_busqueda_avanzada_bienes {
  success: boolean
  detail: string
  data: interface_busqueda_avanzada_bienes[]
}

export interface interface_busqueda_avanzada_bienes {
  id_inventario: number
  nombre_bien: string
  codigo_bien: string
  identificador_bien: string
  nombre_marca?: string
  valor_unitario: number
  depreciacion_valor: number
  id_item_entrada_almacen: number
  fecha_ingreso: string
  numero_doc_origen: string
  valor_ingreso: string
  realizo_baja: boolean
  realizo_salida: boolean
  ubicacion_en_bodega: boolean
  ubicacion_asignado: any
  ubicacion_prestado: any
  fecha_ultimo_movimiento: string
  tipo_doc_ultimo_movimiento: string
  id_registro_doc_ultimo_movimiento: number
  cantidad_entrante_consumo: any
  cantidad_saliente_consumo: any
  id_bien: number
  id_bodega: number
  cod_tipo_entrada: number
  id_persona_origen: number
  id_persona_responsable: any
  cod_estado_activo: string
  justificacion_baja_activo?: string
}

export interface response_anexo_opcional {
  success: boolean
  detail: string
  data: interface_anexo_opcional[]
}

export interface interface_anexo_opcional {
  id_anexo_doc_alma: number
  id_baja_activo: interface_activo_baja
  id_salida_espec_arti: any
  nombre_anexo: string
  nro_folios: number
  descripcion_anexo: string
  fecha_creacion_anexo: string
  id_archivo_digital: interface_archivo_original
}

export interface interface_activo_baja {
  id_baja_activo: number
  consecutivo_por_baja: number
  concepto: string
  fecha_baja: string
  cantidad_activos_baja: number
  id_persona_registro_baja: number
  id_uni_org_registro_baja: number
}

export interface interface_archivo_original {
  id_archivo_digital: number
  nombre_de_Guardado: string
  formato: string
  tamagno_kb: number
  ruta_archivo: string
  fecha_creacion_doc: string
  es_Doc_elec_archivo: boolean
}


export interface response_obtener_consecutivo {
  success: boolean
  detail: string
  data: interface_obtener_consecutivo
}

export interface interface_obtener_consecutivo {
  consecutivo_por_baja: number
}
