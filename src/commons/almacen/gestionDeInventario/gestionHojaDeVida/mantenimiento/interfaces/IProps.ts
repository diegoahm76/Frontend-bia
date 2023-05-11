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
}

export interface ejecutar_mantenimiento {
    "fecha_registrado": string,
    "fecha_ejecutado": string,
    "cod_tipo_mantenimiento": string,
    "dias_empleados": number,
    "fecha_estado_anterior": string,
    "id_articulo": number,
    "cod_estado_final": string,
    "id_persona_realiza": number,
    "id_persona_diligencia": number,
    "cod_estado_anterior": string,
    "acciones_realizadas": string,
    "observaciones": string,
    "valor_mantenimiento": number,
    "contrato_mantenimiento": string,
    "id_programacion_mtto": number
  }