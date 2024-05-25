export interface response_busqueda_bienes {
  success: boolean
  detail: string
  data: interface_busqueda_bienes[]
}

export interface interface_busqueda_bienes {
  id_inventario: number
  nombre_bien: string
  codigo_bien: string
  identificador_bien: string
  cod_tipo_bien: string
  id_marca?: number
  nombre_marca?: string
  estado: string
  valor_unitario?: number
  valor_total?: number
  valor_iva?: number
  valor_residual?: number
  depreciacion_valor?: number
  id_item_entrada_almacen?: number
  cantidad: number
  ubicacion: string
  fecha_ingreso: string
  numero_doc_origen: string
  valor_ingreso: string
  realizo_baja?: boolean
  realizo_salida?: boolean
  ubicacion_en_bodega: boolean
  ubicacion_asignado?: boolean
  ubicacion_prestado?: boolean
  fecha_ultimo_movimiento: string
  tipo_doc_ultimo_movimiento: string
  id_registro_doc_ultimo_movimiento?: number
  cantidad_entrante_consumo: any
  cantidad_saliente_consumo: any
  id_bien: number
  id_bodega: number
  cod_tipo_entrada: number
  id_persona_origen: number
  id_persona_responsable?: number
  cod_estado_activo: string
}
