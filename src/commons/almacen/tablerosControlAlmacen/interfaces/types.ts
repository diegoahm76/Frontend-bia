export interface interface_inputs_mafi {
  tipo_activo: string
  fecha_desde: string | null
  fecha_hasta: string | null
}

export interface interface_inputs_rabp {
  tipo_categoria: string
  fecha_desde: string | null
  fecha_hasta: string | null
}

export interface interface_inputs_bce {
  fecha_desde: string | null
  fecha_hasta: string | null
}

export interface interface_inputs_msi {
  tipo_bien: string
  tipo_categoria: string
  fecha_desde: string | null
  fecha_hasta: string | null
}

export interface interface_inputs_huv {
  tipo_consulta: string
  consecutivo?: string
  codigo_bien?: string
  placa?: string,
  marca?: string,
  nombre_vehiculo: string
  tipo_vehiculo: string
  fecha_desde: string | null
  fecha_hasta: string | null
  propiedad: string
}


export interface response_movimientos_inventario {
  success: boolean
  detail: string
  data: interface_movimientos_inventario[]
}

export interface interface_movimientos_inventario {
  id_inventario: number
  nombre_bien: string
  codigo_bien: string
  identificador_bien?: string
  id_marca?: number
  nombre_marca?: string
  nombre_bodega: string
  estado?: string
  valor_unitario?: number
  id_item_entrada_almacen?: number
  cantidad: number
  ubicacion?: string
  tipo_movimiento?: string
  nombre_persona_responsable?: string
  nombre_persona_origen?: string
  fecha_ingreso: string
  numero_doc_origen?: string
  valor_ingreso?: string
  realizo_baja?: boolean
  realizo_salida?: boolean
  ubicacion_en_bodega?: boolean
  ubicacion_asignado?: boolean
  ubicacion_prestado?: boolean
  fecha_ultimo_movimiento?: string
  tipo_doc_ultimo_movimiento?: string
  id_registro_doc_ultimo_movimiento?: number
  cantidad_entrante_consumo?: number
  cantidad_saliente_consumo?: number
  id_bien: number
  id_bodega: number
  cod_tipo_entrada: number
  id_persona_origen?: number
  id_persona_responsable?: number
  cod_estado_activo?: string
}

export interface response_bienes_consumo_entregado {
  success: boolean
  detail: string
  data: interface_bienes_consumo_entregado[]
}

export interface interface_bienes_consumo_entregado {
  id_item_despacho_consumo: number
  codigo_bien?: string
  nombre_bien?: string
  cantidad: number
  fecha_entrega: string
  responsable?: string
  cantidad_solicitada?: number
  cantidad_despachada: number
  observacion: string
  numero_posicion_despacho: number
  id_despacho_consumo: number
  id_bien_despachado?: number
  id_bien_solicitado?: number
  id_entrada_almacen_bien?: number
  id_bodega: number
  id_unidad_medida_solicitada?: number
}

export interface response_busqueda_vehiculos {
  success: boolean
  detail: string
  data: interface_busqueda_vehiculos[]
}

export interface interface_busqueda_vehiculos {
  id_hoja_de_vida: number
  consecutivo: string
  codigo_bien: string
  placa: string
  marca: string
  nombre: string
  tipo_vehiculo?: string
  nombre_contratista?: string
  cod_tipo_vehiculo?: string
  tiene_platon?: boolean
  capacidad_pasajeros?: number
  color?: string
  linea?: string
  tipo_combustible?: string
  es_arrendado?: boolean
  ultimo_kilometraje?: number
  fecha_ultimo_kilometraje?: string
  fecha_adquisicion?: string
  fecha_vigencia_garantia?: string
  numero_motor?: string
  numero_chasis?: string
  cilindraje?: number
  transmision?: string
  dimesion_llantas?: number
  capacidad_extintor?: number
  tarjeta_operacion?: string
  observaciones_adicionales?: string
  es_agendable?: boolean
  en_circulacion?: boolean
  fecha_circulacion?: string
  ruta_imagen_foto?: string
  id_articulo: number
  id_vehiculo_arrendado?: number
  id_proveedor: any
}

export interface response_historico_vehiculo {
  success: boolean
  detail: string
  data: interface_historico_vehiculo[]
}

export interface interface_historico_vehiculo {
  id_viaje_agendado: number
  id_hoja_vida_vehiculo: number
  Municipio_desplazamiento: string
  cod_tipo_vehiculo: string
  es_arrendado: boolean
  tipo_vehiculo: string
  funcionario_autorizo: string
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
  realizo_inspeccion: boolean
  id_vehiculo_conductor: number
  id_solicitud_viaje: number
  cod_municipio_destino: string
  id_persona_autoriza: number
  primer_nombre_responsable_vehiculo: string
  primer_apellido_responsable_vehiculo: string
}

export interface response_almace_bienes_prestamo {
  success: boolean
  detail: string
  data: interface_almacen_bienes_prestamo[]
}

export interface interface_almacen_bienes_prestamo {
  id_inventario: number
  nombre_bien: string
  codigo_bien: string
  identificador_bien: string
  id_marca: number
  nombre_marca: string
  nombre_bodega: string
  estado: string
  codigo_categoria: string
  nombre_categoria: string
  valor_unitario: number
  id_item_entrada_almacen: number
  cantidad: number
  ubicacion: string
  tipo_movimiento: string
  nombre_persona_responsable: any
  nombre_persona_origen: string
  fecha_ingreso: string
  numero_doc_origen: string
  valor_ingreso: string
  realizo_baja: any
  realizo_salida: any
  ubicacion_en_bodega: boolean
  ubicacion_asignado: any
  ubicacion_prestado: boolean
  fecha_ultimo_movimiento: string
  tipo_doc_ultimo_movimiento: string
  id_registro_doc_ultimo_movimiento?: number
  cantidad_entrante_consumo: any
  cantidad_saliente_consumo: any
  id_bien: number
  id_bodega: number
  cod_tipo_entrada: number
  id_persona_origen: number
  id_persona_responsable: any
  cod_estado_activo: string
}
