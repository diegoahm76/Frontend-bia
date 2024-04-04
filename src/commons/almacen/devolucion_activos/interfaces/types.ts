export interface inputs_almacenista {
  tipo_documento: string;
  numero_documento: string;
  nombre_apellido: string;
}

export interface inputs_funcionario_responsable {
  tipo_documento: string;
  numero_documento: string;
}

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

export interface response_tipos_documentos {
  success: boolean
  detail: string
  data: interface_tipos_documentos[]
}

export interface interface_tipos_documentos {
  value: string
  label: string
}