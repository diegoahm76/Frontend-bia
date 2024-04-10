export interface interface_form_inf_tercero {
  id_persona_tercero: number;
  tipo_documento: string;
  documento: string;
  nombres: string;
  apellidos: string;
}

export interface response_obtener_consecutivo {
  success: boolean
  detail: string
  ultimo_consecutivo: number
}

export interface response_inf_tercero {
  success: boolean
  detail: string
  data: interface_inf_tercero[]
}

export interface interface_inf_tercero {
  id_clase_tercero_persona: number
  primer_nombre?: string
  segundo_nombre?: string
  primer_apellido?: string
  segundo_apellido?: string
  tipo_documento: string
  numero_documento: string
  tipo_persona: string
  nombre_clase_tercero: string
  id_persona: number
  id_clase_tercero: number
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

export interface interface_anexo_opcional {
  id_anexo: string
  id_file?: number
  id_salida_espec_arti: any
  nombre_anexo: string
  nro_folios: number
  descripcion_anexo: string
  fecha_creacion_anexo: string
  id_archivo_digital?: archivos_digitales
}

export interface response_tipos_terceros {
  success: boolean
  detail: string
  data: interface_tipos_terceros[]
}

export interface interface_tipos_terceros {
  value: number
  label: string
}

export interface response_entradas_relacionadas {
  success: boolean
  detail: string
  data: interface_entradas_relacionadas[]
}

export interface interface_entradas_relacionadas {
  id_entrada_almacen: number
  tipo_entrada: string
  consecutivo: number
  fecha_registro: string
  numero_entrada_almacen: number
  fecha_entrada: string
  fecha_real_registro: string
  motivo: string
  observacion: string
  id_archivo_soporte: any
  valor_total_entrada: string
  fecha_ultima_actualizacion_diferente_creador: any
  entrada_anulada: any
  justificacion_anulacion: any
  fecha_anulacion: any
  id_proveedor: number
  id_tipo_entrada: number
  id_bodega: number
  id_creador: number
  id_persona_ult_act_dif_creador: any
  id_persona_anula: any
}

export interface response_activos_asociados {
  success: boolean
  detail: string
  data: interface_activos_asociados[]
}

export interface interface_activos_asociados {
  id_item_entrada_almacen: number
  id_entrada_almacen: number
  id_bien: number
  codigo: string
  serial_placa: string
  nombre: string
  marca: string
}

export interface response_interface_registro_por_consecutivo {
  salida_especial: interface_registro_por_consecutivo
  anexos: interface_data_anexos[]
  archivos_digitales: archivos_digitales[]
  bienes: interface_bienes_asociados[]
  success?: boolean
}

export interface interface_registro_por_consecutivo {
  id_salida_espec_arti: number
  consecutivo_por_salida: number
  fecha_salida: string
  referencia_salida: string
  concepto: string
  id_entrada_almacen_ref: number
}

export interface interface_data_anexos {
  id_anexo_doc_alma: number
  id_baja_activo: any
  id_salida_espec_arti: number
  nombre_anexo: string
  nro_folios: number
  descripcion_anexo: string
  fecha_creacion_anexo: string
  id_archivo_digital: interface_archivo_digital
}

export interface interface_archivo_digital {
  id_archivo_digital: number
  nombre_de_Guardado: string
  formato: string
  tamagno_kb: number
  ruta_archivo: string
  fecha_creacion_doc: string
  es_Doc_elec_archivo: boolean
}

export interface archivos_digitales {
  id_archivo_digital: number
  nombre_de_Guardado: string
  formato: string
  tamagno_kb: number
  ruta_archivo: string
  fecha_creacion_doc: string
  es_Doc_elec_archivo: boolean
}

export interface interface_bienes_asociados {
  id_item_entrada_almacen: number
  codigo_bien: string
  serie_placa: string
  nombre_bien: string
  id_marca: number
  nombre_marca: string
  cantidad: number
  valor_unitario: string
  valor_iva: string
  valor_total_item: string
  doc_identificador_bien: string
  cantidad_vida_util: number
  valor_residual: string
  numero_posicion: number
  id_entrada_almacen: number
  id_bien: number
  porcentaje_iva: number
  id_bodega: number
  cod_estado: string
  id_unidad_medida_vida_util: number
}
