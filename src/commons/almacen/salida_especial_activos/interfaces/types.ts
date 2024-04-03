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
  id_salida_espec_arti: any
  nombre_anexo: string
  nro_folios: number
  descripcion_anexo: string
  fecha_creacion_anexo: string
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
