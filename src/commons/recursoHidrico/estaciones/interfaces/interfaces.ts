export interface Estaciones {
    id_estacion: number,
    fecha_modificacion: null | Date,
    nombre_estacion: string,
    cod_tipo_estacion: string,
    cod_municipio: string | number,
    latitud: number,
    longitud: number,
    indicaciones_ubicacion: null | string,
    fecha_modificacion_coordenadas: null | string,
    nombre_persona_modifica: string | null,
}
export interface EstacionesDetalle {
    id_estacion: number | string,
    nombre_estacion: string,
    personas: Persona[],
}
export interface Persona {

    id_persona: number;
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
export interface DatosMigracionGraficas {
    id_migracion_estacion: number,
    fecha: number,
    temperatura: number,
    humedad_relativa: number,
    punto_de_rocio: number,
    presion_atm_abs: number,
    presion_atm_rel: number,
    precipitacion: number,
    nivel_agua: number,
    velocidad_rio: number,
    caudal: number,
}
export interface DatosMigracion {
    id_migracion_estacion: number;
    id_estacion: number;
    nombre: string;
    fecha: string;
    temperatura: string;
    temperatura_max: string;
    temperatura_min: string;
    humedad_relativa: string;
    punto_de_rocio: string;
    presion_atm_abs: string;
    presion_atm_rel: string;
    intensidad: string;
    precipitacion: string;
    nivel_agua: string;
    nivel_agua_max: string;
    nivel_agua_min: string;
    velocidad_rio: string;
    caudal: string;
    voltaje: string;
}
export interface Equipo {
    id_alerta_equipo_estacion: number,
    nombre_estacion: string,
    descripcion: string,
    nombre_variable: string,
    fecha_generacion: string | Date,
}
export interface HistorialAlerta {
    id_historial_alarma_enviada_estacion: number
    nombre_estacion: string,
    id_persona_estacion: string | number,
    fecha_hora_envio: string | Date,
    mensaje_enviado: string,
    dir_email_enviado: string,
    nro_celular_enviado: string | number,
    nombre_persona_envio: string,
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

    id_parametro_referencia: number,
    nombre_estacion: string,
    fecha_modificacion: string | null,
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
    nombre_persona_modifica: string | null,
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
export interface EditarPersona {
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    entidad: string;
    cargo: string;
    email_notificacion: string;
    nro_celular_notificacion: string;
    observacion: string;
}
export interface ParametrosEditar {

    frecuencia_solicitud_datos: number | string,
    temperatura_ambiente_max: number | string,
    temperatura_ambiente_min: number | string,
    humedad_ambiente_max: number | string,
    humedad_ambiente_min: number | string,
    presion_barometrica_max: number | string,
    presion_barometrica_min: number | string,
    velocidad_viento_max: number | string,
    velocidad_viento_min: number | string,
    direccion_viento_max: number | string,
    direccion_viento_min: number | string,
    precipitacion_max: number | string,
    precipitacion_min: number | string,
    luminosidad_max: number | string,
    luminosidad_min: number | string,
    nivel_agua_max: number | string,
    nivel_agua_min: number | string,
    velocidad_agua_max: number | string,
    velocidad_agua_min: number | string,
}
export const municipios_meta = [
    {
        value: '50251',
        label: 'El Castillo'
    },
    {
        value: '50270',
        label: 'El Dorado',
    },
    {
        value: '50287',
        label: 'Fuente De Oro',
    },
    {
        value: '50313',
        label: 'Granada',
    },
    {
        value: '50350',
        label: 'La Macarena',
    },
    {
        value: '50370',
        label: 'La Uribe',
    },
    {
        value: '50400',
        label: 'Lejanías',
    },
    {
        value: '50325',
        label: 'Mapiripan',
    },
    {
        value: '50330',
        label: 'Mesetas',
    },
    {
        value: '50450',
        label: 'Puerto Concordia',
    },
    {
        value: '50577',
        label: 'Puerto Lleras',
    },
    {
        value: '50590',
        label: 'Puerto Rico',
    },
    {
        value: '50683',
        label: 'San Juan De Arama',
    },
    {
        value: '50711',
        label: 'Vista Hermosa',
    },
    {
        value: '50001',
        label: 'Villavicencio',
    },
    {
        value: '50006',
        label: 'Acacias',
    },
    {
        value: '50110',
        label: 'Barranca De Upia',
    },
    {
        value: '50150',
        label: 'Castilla La Nueva',
    },
    {
        value: '50226',
        label: 'Cumaral',
    },
    {
        value: '50245',
        label: 'El Calvario',
    },
    {
        value: '50318',
        label: 'Guamal',
    },
    {
        value: '50606',
        label: 'Restrepo',
    },
    {
        value: '50680',
        label: 'San Carlos Guaroa',
    },
    {
        value: '50686',
        label: 'San Juanito',
    },
    {
        value: '50223',
        label: 'San Luis De Cubarral',
    },
    {
        value: '50689',
        label: 'San Martín',
    },
    {
        value: '50124',
        label: 'Cabuyaro',
    },
    {
        value: '50568',
        label: 'Puerto Gaitán',
    },
    {
        value: '50573',
        label: 'Puerto Lopez',
    },

]