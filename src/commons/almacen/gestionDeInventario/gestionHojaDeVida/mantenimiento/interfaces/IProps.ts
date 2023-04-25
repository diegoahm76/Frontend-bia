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
    id_mantenimiento: number, 
    id_funcionario: number, 
    fecha_anulacion: string, 
    motivo_anulacion: string 
}

export interface crear_mantenimiento {
    tipo_programacion: string,
    cod_tipo_mantenimiento: string,
    kilometraje_programado: string,
    fecha_programada: string,
    motivo_mantenimiento: string,
    observaciones: string,
    fecha_solicitud: string,
    fecha_anulacion: string,
    justificacion_anulacion: string,
    ejecutado: boolean,
    id_articulo: number,
    id_persona_solicita: number,
    id_persona_anula: number
}