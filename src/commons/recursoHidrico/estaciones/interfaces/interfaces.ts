export interface Estaciones {
    id_estacion: number | string,
    fecha_modificacion: null | string,
    nombre_estacion: string,
    cod_tipo_estacion: string,
    latitud: number,
    longitud: number,
    indicaciones_ubicacion: null | string,
    fecha_modificacion_coordenadas: null | string,
    id_persona_modifica: null | number
}
export interface EstacionesDetalle {
    id_estacion: number | string,
    nombre_estacion: string,
    personas: Persona[],
}
export interface Persona {

    id_persona: number | string;
    cod_tipo_documento_id: string;
    numero_documento_id: string | number;
    primer_nombre: string;
    segundo_nombre: string | null;
    primer_apellido: string;
    segundo_apellido: string | null;
    entidad: string | null;
    cargo: string | null;
    email_notificacion: string;
    nro_celular_notificacion: string | number;
    observacion: string;
}
export interface Datos {
    id_data: number,
    fecha_registro: number,
    temperatura_ambiente: number,
    humedad_ambiente: number,
    presion_barometrica: number,
    velocidad_viento: number,
    direccion_viento: number,
    precipitacion: number,
    luminosidad: number,
    nivel_agua: number,
    velocidad_agua: number,
    id_estacion: number,
}
export interface conf_alarma {
    id_confi_alerta_persona: number,
    nombre_variable_alarma: string,
    mensaje_alarma_maximo: string,
    mensaje_alarma_minimo: string,
    mensaje_no_alarma: string,
    frecuencia_alarma: number,
}
export interface Parametros {

    id_estacion: number,
    frecuencia_solicitud_datos: number,
    temperatura_ambiente_max: number,
    temperatura_ambiente_min: number,
    humedad_ambiente_max: number,
    humedad_ambiente_min: number,
    presion_barometrica_max: number,
    presion_barometrica_min: number,
    velocidad_viento_max: number,
    velocidad_viento_min: number,
    direccion_viento_max: number,
    direccion_viento_min: number,
    precipitacion_max: number,
    precipitacion_min: number,
    luminosidad_max: number,
    luminosidad_min: number,
    nivel_agua_max: number,
    nivel_agua_min: number,
    velocidad_agua_max: number,
    velocidad_agua_min: number,
}
export interface IEstacionEstaciones {
    nombre_estacion: string,
    cod_tipo_estacion: string,
    latitud: number,
    longitud: number,
    cod_municipio: string | number,
    indicaciones_ubicacion: string,
}
export interface PersonaEstacion {

    cod_tipo_documento_id: string;
    numero_documento_id: string | number;
    primer_nombre: string;
    segundo_nombre: string | null;
    primer_apellido: string;
    segundo_apellido: string | null;
    entidad: string | null;
    cargo: string | null;
    email_notificacion: string;
    nro_celular_notificacion: string | number;
    observacion: string;
}
export interface EstacionData {
    id_estacion: number,
    temperatura_ambiente: string,
    humedad_ambiente: string,
    presion_barometrica: string,
    Velocidad_Viento: string,
    direccion_viento: string,
    precipitacion: string,
    luminosidad: string,
    nivel_agua: string,
    velocidad_agua: string,
    fecha_registro: string,
    frecuencia: string,
}


export interface PersonasEstacion {

    cod_tipo_documento_id: string;
    numero_documento_id: string | number;
    primer_nombre: string;
    segundo_nombre: string | null;
    primer_apellido: string;
    segundo_apellido: string | null;
    entidad: string | null;
    cargo: string | null;
    email_notificacion: string;
    nro_celular_notificacion: string | number;
    observacion: string;
    estacion: any
}
export interface CrearAlerta {
    nombre_variable_alarma: string;
    mensaje_alarma_maximo: string;
    mensaje_alarma_minimo: string;
    mensaje_no_alarma: string;
    frecuencia_alarma: number;
}
export interface Tipos {
    frecuencia_solicitud_datos: number;
    temperatura_ambiente_max: number;
    temperatura_ambiente_min: number;
    humedad_ambiente_max: number;
    humedad_ambiente_min: number;
    presion_barometrica_max: number;
    presion_barometrica_min: number;
    velocidad_viento_max: number;
    velocidad_viento_min: number;
    direccion_viento_max: number;
    direccion_viento_min: number;
    precipitacion_max: number;
    precipitacion_min: number;
    luminosidad_max: number;
    luminosidad_min: number;
    nivel_agua_max: number;
    nivel_agua_min: string;
    velocidad_agua_max: number;
    velocidad_agua_min: number;
}

