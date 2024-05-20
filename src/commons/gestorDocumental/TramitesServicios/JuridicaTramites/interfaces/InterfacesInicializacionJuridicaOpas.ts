/* eslint-disable @typescript-eslint/naming-convention */
export interface Iinformacion_opa {
    id_solicitud_tramite: number;
    id_persona_titular: number;
    cod_tipo_documento_persona_titular: string;
    numero_documento_persona_titular: string;
    nombre_persona_titular: string;
    id_persona_interpone: number;
    cod_tipo_documento_persona_interpone: string;
    numero_documento_persona_interpone: string;
    nombre_persona_interpone: string;
    cod_relacion_con_el_titular: string;
    relacion_con_el_titular: string;
    cod_tipo_operacion_tramite: string;
    tipo_operacion_tramite: string;
    nombre_proyecto: string;
    costo_proyecto: number;
    id_estado_actual_solicitud: number;
    estado_actual_solicitud: string;
    fecha_ini_estado_actual: string;
    id_permiso_ambiental: number;
    cod_tipo_permiso_ambiental: string;
    tipo_permiso_ambiental: string;
    permiso_ambiental: string;
    cod_departamento: string;
    departamento: string;
    cod_municipio: string;
    municipio: string;
    direccion: string;
    descripcion_direccion: string;
    coordenada_x: string;
    coordenada_y: string;
    id_expediente: number | null;
    expediente: string | null;
    radicado: string;
    fecha_rta_solicitud: string | null;
    aprueba_solicitud_tramite: boolean | null;
    solicitud_completada: boolean;
    solicitud_sin_completar: boolean;
}

export  const initialDataOpa: Iinformacion_opa = {
    id_solicitud_tramite: 0,
    id_persona_titular: 0,
    cod_tipo_documento_persona_titular: '',
    numero_documento_persona_titular: '',
    nombre_persona_titular: '',
    id_persona_interpone: 0,
    cod_tipo_documento_persona_interpone: '',
    numero_documento_persona_interpone: '',
    nombre_persona_interpone: '',
    cod_relacion_con_el_titular: '',
    relacion_con_el_titular: '',
    cod_tipo_operacion_tramite: '',
    tipo_operacion_tramite: '',
    nombre_proyecto: '',
    costo_proyecto: 0,
    id_estado_actual_solicitud: 0,
    estado_actual_solicitud: '',
    fecha_ini_estado_actual: '',
    id_permiso_ambiental: 0,
    cod_tipo_permiso_ambiental: '',
    tipo_permiso_ambiental: '',
    permiso_ambiental: '',
    cod_departamento: '',
    departamento: '',
    cod_municipio: '',
    municipio: '',
    direccion: '',
    descripcion_direccion: '',
    coordenada_x: '',
    coordenada_y: '',
    id_expediente: null,
    expediente: null,
    radicado: '',
    fecha_rta_solicitud: null,
    aprueba_solicitud_tramite: null,
    solicitud_completada: false,
    solicitud_sin_completar: false,
};