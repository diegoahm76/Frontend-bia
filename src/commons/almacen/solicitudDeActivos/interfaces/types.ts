export interface response_solicitudes_realizadas {
  success: boolean
  detail: string
  data: interface_solicitudes_realizadas[]
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
