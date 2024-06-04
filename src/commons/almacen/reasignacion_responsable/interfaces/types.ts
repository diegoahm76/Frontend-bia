

export interface response_busqueda_responsable {
  success: boolean
  detail: string
  data: interface_busqueda_responsable[]
}

export interface interface_busqueda_responsable {
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
  tiene_usuario?: boolean
  tipo_usuario?: string
}

export interface interface_inputs_funcionarios {
  tp_documento_funcionario_responsable_reasignado?: string
  documento_funcionario_responsable_reasignado?: string
  nombres_funcionario_responsable_reasignado?: string
  apellidos_funcionario_responsable_reasignado?: string
  tp_documento_funcionario_responsable_actual?: string
  documento_funcionario_responsable_actual?: string
  nombres_funcionario_responsable_actual?: string
  apellidos_funcionario_responsable_actual?: string
  tp_documento_funcionario_operario?: string
  documento_funcionario_operario?: string
  nombres_funcionario_operario?: string
  apellidos_funcionario_operario?: string
}

export interface interface_inputs_responsable {
  tp_documento_funcionario_responsable_reasignado?: string
  documento_funcionario_responsable_reasignado?: string
  nombres_funcionario_responsable_reasignado?: string
  apellidos_funcionario_responsable_reasignado?: string
}

export interface interface_inputs_responsable_actual {
  tp_documento_funcionario_responsable_actual?: string
  documento_funcionario_responsable_actual?: string
  nombres_funcionario_responsable_actual?: string
  apellidos_funcionario_responsable_actual?: string
}

export interface interface_inputs_operario {
  tp_documento_funcionario_operario?: string
  documento_funcionario_operario?: string
  nombres_funcionario_operario?: string
  apellidos_funcionario_operario?: string
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

export interface response_busqueda_operario {
  success: boolean
  detail: string
  data: interface_busqueda_operario[]
}

export interface interface_busqueda_operario {
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
  tiene_usuario?: boolean
  tipo_usuario?: string
}

export interface response_activos_asociados {
  success: boolean
  detail: string
  data: interface_activos_asociados[]
}

export interface interface_activos_asociados {
  id_inventario: number
  nombre_bien: string
  codigo_bien: string
  identificador_bien: string
  id_marca: any
  nombre_marca: any
  estado: string
  valor_unitario: number
  id_item_entrada_almacen: number
  fecha_ingreso: string
  numero_doc_origen: string
  valor_ingreso: string
  realizo_baja: any
  realizo_salida: any
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
  id_persona_responsable: number
  cod_estado_activo: string
}
