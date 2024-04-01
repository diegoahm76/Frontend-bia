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
