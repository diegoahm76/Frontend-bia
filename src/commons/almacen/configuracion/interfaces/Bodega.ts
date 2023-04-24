export interface IBodegaGet {
  bodegas: IBodega[];
  bodega_seleccionada: IBodega;
  id_responsable: IdResponsable[];
}
export interface IBodega {
  id_bodega: number | null;
  nombre: string;
  cod_municipio: string;
  direccion: string;
  id_responsable: number | null;
  es_principal: boolean;
}

export interface IdResponsable {
  id_responsable: {
    id_persona: number;
    nombre_unidad_organizacional_actual: null;
    tiene_usuario: boolean;
    primer_nombre: string;
    segundo_nombre: null;
    primer_apellido: string;
    segundo_apellido: null;
    tipo_persona: string;
    numero_documento: 1;
    digito_verificacion: null;
    nombre_comercial: null;
    razon_social: null;
    pais_residencia: string;
    municipio_residencia: number;
    direccion_residencia: string;
    direccion_residencia_ref: string;
    ubicacion_georeferenciada: string;
    direccion_laboral: null;
    direccion_notificaciones: null;
    pais_nacimiento: string;
    fecha_nacimiento: string | number | Date;
    sexo: string;
    fecha_asignacion_unidad: string | number | Date;
    es_unidad_organizacional_actual: null;
    email: string;
    email_empresarial: null;
    telefono_fijo_residencial: null;
    telefono_celular: number;
    telefono_empresa: null;
    cod_municipio_laboral_nal: null;
    cod_municipio_notificacion_nal: number;
    telefono_celular_empresa: null;
    telefono_empresa_2: null;
    cod_pais_nacionalidad_empresa: null;
    acepta_notificacion_sms: boolean;
    acepta_notificacion_email: boolean;
    acepta_tratamiento_datos: boolean;
    cod_naturaleza_empresa: null;
    direccion_notificacion_referencia: null;
    fecha_cambio_representante_legal: string | number | Date;
    fecha_inicio_cargo_rep_legal: string | number | Date;
    fecha_inicio_cargo_actual: string | number | Date;
    fecha_a_finalizar_cargo_actual: string | number | Date;
    observaciones_vinculacion_cargo_actual: null;
    fecha_ultim_actualizacion_autorizaciones: string | number | Date;
    fecha_creacion: string | number | Date;
    fecha_ultim_actualiz_diferente_crea: string | number | Date;
    tipo_documento: string;
    estado_civil: null;
    id_cargo: null;
    id_unidad_organizacional_actual: null;
    representante_legal: null;
    cod_municipio_expedicion_id: number;
    id_persona_crea: null;
    id_persona_ultim_actualiz_diferente_crea: null;
  };
}
