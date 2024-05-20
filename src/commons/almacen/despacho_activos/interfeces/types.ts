export interface interface_busqueda_persona_solicita {
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
  tiene_usuario: boolean
  tipo_usuario?: string
}

export interface interface_solicitudes_realizadas {
  id_solicitud_activo: number
  fecha_solicitud: string
  motivo: string
  estado_solicitud: string
  id_persona_solicita: number
  primer_nombre_persona_solicita: string
  primer_apellido_persona_solicita: string
  id_funcionario_resp_unidad: number
  primer_nombre_funcionario_resp_unidad: string
  primer_apellido_funcionario_resp_unidad: string
  numero_activos: number
}

export interface response_resumen_despacho_con_solicitud {
  success: boolean
  detail: string
  data: interface_resumen_despacho_con_solicitud
}

export interface interface_resumen_despacho_con_solicitud {
  id_solicitud_activo: number
  fecha_solicitud: string
  motivo: string
  observacion: string
  id_persona_solicita: number
  primer_nombre_persona_solicitante: string
  primer_apellido_persona_solicitante: string
  tipo_documento_persona_solicitante: string
  numero_documento_persona_solicitante: string
  id_uni_org_solicitante: number
  id_funcionario_resp_unidad: number
  primer_nombre_funcionario_resp_unidad: string
  primer_apellido_funcionario_resp_unidad: string
  tipo_documento_funcionario_resp_unidad: string
  numero_documento_funcionario_resp_unidad: string
  id_uni_org_responsable: number
  id_persona_operario: number
  primer_nombre_persona_operario: string
  primer_apellido_persona_operario: string
  tipo_documento_persona_operario: string
  numero_documento_persona_operario: string
  id_uni_org_operario: number
  estado_solicitud: string
  solicitud_prestamo: boolean
  fecha_devolucion: any
  fecha_cierra_solicitud: any
  revisada_responsable: boolean
  estado_aprobacion_resp: string
  justificacion_rechazo_resp: any
  fecha_aprobacion_resp: any
  gestionada_alma: boolean
  obser_cierre_no_dispo_alma: any
  fecha_cierre_no_dispo_alma: any
  id_persona_cierra_no_dispo_alma: any
  primer_nombre_persona_cierra_no_dispo_alma: any
  primer_apellido_persona_cierra_no_dispo_alma: any
  tipo_documento_persona_cierra_no_dispo_alma: any
  numero_documento_persona_cierra_no_dispo_alma: any
  rechazada_almacen: boolean
  fecha_rechazo_almacen: any
  justificacion_rechazo_almacen: any
  id_persona_alma_rechaza: any
  primer_nombre_persona_alma_rechaza: any
  primer_apellido_persona_alma_rechaza: any
  tipo_documento_persona_alma_rechaza: any
  numero_documento_persona_alma_rechaza: any
  solicitud_anulada_solicitante: boolean
  fecha_anulacion_solicitante: any
  items_solicitud: itmes_solicitud_por_id[]
  despachos: despacho[]
  items_despacho: items_despacho[]
  archivos_digitales: archivos_digitales[]
}

export interface despacho {
  id_despacho_activo: number
  despacho_sin_solicitud: boolean
  estado_despacho: string
  fecha_autorizacion_resp: any
  justificacion_rechazo_resp: any
  fecha_solicitud: string
  fecha_despacho: string
  id_persona_despacha: number
  primer_nombre_persona_despacha: string
  primer_apellido_persona_despacha: string
  tipo_documento_persona_despacha: string
  numero_documento_persona_despacha: string
  observacion: string
  id_persona_solicita: number
  primer_nombre_persona_solicitante: string
  primer_apellido_persona_solicitante: string
  tipo_documento_persona_solicitante: string
  numero_documento_persona_solicitante: string
  id_uni_org_solicitante: any
  id_bodega: number
  nombre_bodega: string
  despacho_anulado: boolean
  justificacion_anulacion: any
  fecha_anulacion: string
  id_persona_anula: number
  primer_nombre_persona_anula: string
  primer_apellido_persona_anula: string
  tipo_documento_persona_anula: string
  numero_documento_persona_anula: string
  id_archivo_doc_recibido: number
}

export interface items_despacho {
  id_item_despacho_activo: number
  id_despacho_activo: number
  id_bien_solicitado: number
  nombre_bien_solicitado: string
  id_bien_despachado: number
  nombre_bien_despachado: string
  id_entrada_alma: number
  id_bodega: number
  nombre_bodega: string
  cantidad_solicitada: number
  fecha_devolucion: any
  se_devolvio: boolean
  id_uni_medida_solicitada: number
  nombre_uni_medida_solicitada: string
  abreviatura_uni_medida_solicitada: string
  cantidad_despachada: number
  observacion: string
  nro_posicion_despacho: number
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

export interface itmes_solicitud_por_id {
  id_item_solicitud_activo: number
  id_solicitud_activo: number
  id_bien: number
  nombre_bien: string
  cantidad: number
  id_unidad_medida: number
  abreviatura_unidad_medida: string
  nombre_unidad_medida: string
  observacion: string
  nro_posicion: number
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

export interface response_busqueda_persona_solicita {
  success: boolean
  detail: string
  data: interface_busqueda_persona_solicita[]
}

export interface interface_busqueda_persona_solicita {
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
  tiene_usuario: boolean
  tipo_usuario?: string
}

export interface response_busqueda_persona_responsable {
  success: boolean
  detail: string
  data: interface_busqueda_persona_responsable[]
}

export interface interface_busqueda_persona_responsable {
  id_persona: number
  tipo_persona: string
  tipo_persona_desc: string
  tipo_documento: string
  numero_documento: string
  primer_nombre: string
  segundo_nombre?: string
  primer_apellido: string
  segundo_apellido?: string
  nombre_completo: string
  razon_social: any
  nombre_comercial?: string
  digito_verificacion?: string
  cod_naturaleza_empresa: any
  tiene_usuario: boolean
  tipo_usuario?: string
  id_unidad_organizacional_actual: number
}

export interface response_despachos_sin_solicitud {
  success: boolean
  detail: string
  data: interface_despachos_sin_solicitud[]
}

export interface interface_despachos_sin_solicitud {
  id_despacho_activo: number
  id_bodega: number
  nombre_bodega: string
  nombre_persona_despacha: string
  tipo_solicitud: string
  numero_activos: number
  id_funcionario_resp_asignado: number
  despacho_sin_solicitud: boolean
  estado_despacho: string
  fecha_autorizacion_resp: any
  justificacion_rechazo_resp: any
  fecha_solicitud: any
  fecha_despacho: string
  observacion: string
  despacho_anulado: boolean
  justificacion_anulacion: any
  fecha_anulacion: any
  id_solicitud_activo: any
  id_persona_despacha: number
  id_persona_solicita: any
  id_uni_org_solicitante: any
  id_persona_anula: any
  id_archivo_doc_recibido: number
  tipo_documento_funcionario_resp_asignado: string
  tipo_documento_persona_operario_asignado: string
  numero_documento_funcionario_resp_asignado: string
  numero_documento_persona_operario_asignado: string
  primer_apellido_funcionario_resp_asignado: string
  primer_apellido_persona_operario_asignado: string
  primer_nombre_funcionario_resp_asignado: string
  primer_nombre_persona_operario_asignado: string
}

export interface interface_inputs_funcionarios {
  tp_documento_funcionario_responsable?: string
  documento_funcionario_responsable?: string
  nombres_funcionario_responsable?: string
  apellidos_funcionario_responsable?: string
  tp_documento_funcionario_operario?: string
  documento_funcionario_operario?: string
  nombres_funcionario_operario?: string
  apellidos_funcionario_operario?: string
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

export interface response_busqueda_bodegas {
  success: boolean
  detail: string
  data: interface_busqueda_bodegas[]
}

export interface interface_busqueda_bodegas {
  id_bodega: number
  nombre_municipio: string
  nombre: string
  direccion: string
  es_principal: boolean
  activo: boolean
  item_ya_usado: boolean
  cod_municipio: string
  id_responsable?: number
}

export interface interface_inputs_buscar_bodega {
  departamento?: string
  municipio?: string
  nombre_bodega?: string
  direccion?: string
}


export interface interface_inputs_busqueda_articulo {
  codigo_articulo: string
  nombre_articulo: string
}


export interface response_articulos_despacho_con_solicitud {
  success: boolean
  detail: string
  items: interface_busqueda_articulos[]
}

export interface interface_articulos_despacho_con_solicitud {

}


export interface response_busqueda_articulos {
  success: boolean
  detail: string
  data: interface_busqueda_articulos[]
}

export interface interface_busqueda_articulos {
  // Interface cuando se traen los articulos de los despachos con solicitud
  id_item_solicitud_activo?: number
  id_solicitud_activo?: number
  nombre_bien?: string
  id_unidad_medida?: number
  nombre_unidad_medida?: string
  abreviatura_unidad_medida?: string
  cantidad_solicitada?: string
  fecha_devolucion?: any
  observaciones?: string
  id_articulo_seleccionado?: string

  // propiedades que comparten ambas interfaces
  codigo_bien?: string
  id_bien?: number

  // Interface cuando se traen los articulos de los despachos sin solicitud
  marca: string
  nombre_padre: string
  unidad_medida: string
  unidad_medida_vida_util: string
  porcentaje_iva: number
  tipo_bien: string
  nro_elemento_bien: any
  nombre: string
  cod_tipo_bien: string
  nivel_jerarquico: number
  nombre_cientifico: any
  descripcion: string
  doc_identificador_nro: any
  cantidad_vida_util: number
  valor_residual?: string
  stock_minimo: any
  stock_maximo: any
  solicitable_vivero: boolean
  es_semilla_vivero: any
  cod_tipo_elemento_vivero: any
  tiene_hoja_vida: any
  maneja_hoja_vida: boolean
  visible_solicitudes: boolean
  cod_tipo_activo: string
  id_marca: number
  id_porcentaje_iva: number
  cod_metodo_valoracion: any
  cod_tipo_depreciacion: number
  id_unidad_medida_vida_util: number
  id_bien_padre: number
  articulos_hijos: interface_activos_disponibles[]
}

export interface response_activos_disponibles {
  success: boolean
  detail: string
  items: interface_activos_disponibles[]
}

export interface interface_activos_disponibles {
  id_bien_solicitado?: number
  id_bien_despachado: number
  codigo_bien_espachado: string
  nombre_bien_espachado: string
  cantidad_despachada: number
  observaciones: any
  id_bodega: number
  nombre_bodega: string
}

export interface response_resumen_despacho_sin_solicitud {
  success: boolean
  detail: string
  data: interface_resumen_despacho_sin_solicitud
}

export interface interface_resumen_despacho_sin_solicitud {
  id_despacho_activo: number
  id_solicitud_activo: number
  despacho_sin_solicitud: boolean
  estado_despacho: string
  fecha_autorizacion_resp: string
  justificacion_rechazo_resp: any
  fecha_solicitud: string
  fecha_despacho: string
  id_persona_despacha: number
  primer_nombre_persona_persona_despacha: string
  primer_apellido_persona_persona_despacha: string
  tipo_documento_persona_persona_despacha: string
  numero_documento_persona_persona_despacha: string
  observacion: string
  id_persona_solicita: number
  primer_nombre_persona_solicita: string
  primer_apellido_persona_solicita: string
  tipo_documento_persona_solicita: string
  numero_documento_persona_solicita: string
  id_uni_org_solicitante: any
  id_bodega: number
  nombre_bodega: string
  despacho_anulado: boolean
  justificacion_anulacion: any
  fecha_anulacion: any
  id_archivo_doc_recibido: number
  id_persona_anula: any
  primer_nombre_persona_anula: any
  primer_apellido_persona_anula: any
  tipo_documento_persona_anula: any
  numero_documento_persona_anula: any
  items_despacho: items_despacho[]
  asignaciones_activo: asignaciones_activo[]
  solicitudes: solicitudes[]
  items_solicitud: items_solicitud[]
  archivos_digitales: archivos_digitales[]
}

export interface items_despacho {
  id_item_despacho_activo: number
  id_despacho_activo: number
  id_bien_solicitado: number
  nombre_bien_solicitado: string
  id_bien_despachado: number
  nombre_bien_despachado: string
  id_entrada_alma: number
  id_bodega: number
  nombre_bodega: string
  cantidad_solicitada: number
  fecha_devolucion: any
  se_devolvio: boolean
  id_uni_medida_solicitada: number
  nombre_uni_medida_solicitada: string
  abreviatura_uni_medida_solicitada: string
  cantidad_despachada: number
  observacion: string
  nro_posicion_despacho: number
}

export interface asignaciones_activo {
  id_asignacion_activos: number
  id_despacho_asignado: number
  id_funcionario_resp_unidad: number
  primer_nombre_funcionario_resp_unidad: string
  primer_apellido_funcionario_resp_unidad: string
  tipo_documento_funcionario_resp_unidad: string
  numero_documento_funcionario_resp_unidad: string
  id_uni_org_responsable: number
  id_persona_operario: number
  primer_nombre_persona_operario: string
  primer_apellido_persona_operario: string
  tipo_documento_persona_operario: string
  numero_documento_persona_operario: string
  id_uni_org_operario: number
  actual: boolean
  fecha_asignacion: string
  observacion: any
}

export interface solicitudes {
  id_solicitud_activo: number
  fecha_solicitud: string
  motivo: string
  observacion: string
  id_persona_solicita: number
  primer_nombre_persona_solicitante: string
  primer_apellido_persona_solicitante: string
  tipo_documento_persona_solicitante: string
  numero_documento_persona_solicitante: string
  id_uni_org_solicitante: number
  id_funcionario_resp_unidad: number
  primer_nombre_funcionario_resp_unidad: string
  primer_apellido_funcionario_resp_unidad: string
  tipo_documento_funcionario_resp_unidad: string
  numero_documento_funcionario_resp_unidad: string
  id_uni_org_responsable: number
  id_persona_operario: number
  primer_nombre_persona_operario: string
  primer_apellido_persona_operario: string
  tipo_documento_persona_operario: string
  numero_documento_persona_operario: string
  id_uni_org_operario: number
  estado_solicitud: string
  solicitud_prestamo: boolean
  fecha_cierra_solicitud: string
  revisada_responsable: boolean
  estado_aprobacion_resp: string
  justificacion_rechazo_resp: any
  fecha_aprobacion_resp: string
  gestionada_alma: boolean
  obser_cierre_no_dispo_alma: any
  fecha_cierre_no_dispo_alma: any
  id_persona_cierra_no_dispo_alma: any
  primer_nombre_persona_cierra_no_dispo_alma: any
  primer_apellido_persona_cierra_no_dispo_alma: any
  tipo_documento_persona_cierra_no_dispo_alma: any
  numero_documento_persona_cierra_no_dispo_alma: any
  rechazada_almacen: boolean
  fecha_rechazo_almacen: any
  justificacion_rechazo_almacen: any
  id_persona_alma_rechaza: any
  primer_nombre_persona_alma_rechaza: any
  primer_apellido_persona_alma_rechaza: any
  tipo_documento_persona_alma_rechaza: any
  numero_documento_persona_alma_rechaza: any
  solicitud_anulada_solicitante: boolean
  fecha_anulacion_solicitante: any
}

export interface items_solicitud {
  id_item_solicitud_activo: number
  id_solicitud_activo: number
  id_bien: number
  nombre_bien: string
  codigo_bien: string
  cantidad: number
  id_unidad_medida: number
  abreviatura_unidad_medida: string
  nombre_unidad_medida: string
  observacion: string
  nro_posicion: number
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
