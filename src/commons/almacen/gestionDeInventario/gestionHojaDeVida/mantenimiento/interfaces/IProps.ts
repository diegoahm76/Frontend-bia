export interface row {
    id: number,
    codigo: number,
    serial_placa: string,
    kilometraje: string,
    fecha: string,
    tipo_mantenimiento: string
}

export interface detalle_articulo {
    marca: string,
    serial_placa: string,
    modelo: string
    kilometraje: string,
}

export interface detalle_mantenimiento {
    tipo: string,
    especificacion: string,
}
export interface anular_mantenimiento {
    justificacion_anulacion: string
}

export interface crear_mantenimiento {
    tipo_programacion: string,
    cod_tipo_mantenimiento: string,
    kilometraje_programado: string | null,
    fecha_programada: string | null,
    motivo_mantenimiento: string,
    observaciones: string,
    fecha_solicitud: string,
    fecha_anulacion: string | null,
    justificacion_anulacion: string | null,
    ejecutado: boolean,
    id_articulo: number,
    id_persona_solicita: number,
    id_persona_anula: number| null
    placa?: string | null
}

export interface ejecutar_mantenimiento {
    "fecha_registrado": string | null,
    "fecha_ejecutado": string,
    "cod_tipo_mantenimiento": string,
    "dias_empleados": number,
    "fecha_estado_anterior": string | null,
    "id_articulo": number,
    "cod_estado_final": string,
    "id_persona_realiza": number,
    "id_persona_diligencia": number,
    "cod_estado_anterior": string | null,
    "acciones_realizadas": string,
    "observaciones": string | null,
    "valor_mantenimiento": number | null,
    "contrato_mantenimiento": string | null,
    "id_programacion_mtto": number | null
  }