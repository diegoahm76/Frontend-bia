import { type Persona } from '../../../../interfaces/globalModels';

export interface ICentralDigitization {

  request_types: IObjListType[];
  request_type: IObjListType;
  list_request_status: IObjListType[];
  request_status: IObjListType;
  digitization_requests: IObjDigitizationRequest[];
  digitization_request: IObjDigitizationRequest;
  storage_mediums: IObjListType[];
  edit_digitization: boolean;

  exhibits: IObjExhibit[];
  exhibit: IObjExhibit;
  file_categories: IObjListType[];
  file_category: IObjListType;
  file_origins: IObjListType[];
  file_origin: IObjListType;
  file_typologies: IObjListType[];
  file_typology: IObjListType;
  metadata: IObjMetaData;
  persons: IObjPerson[];
  person: IObjPerson;
  pqr: IObjPqr;
  pqr_request: IObjPqrRequest;
  file_fisico: any | null;

}


export interface IObjListType {
  id: number | string | null;
  key: string | number | null;
  label: string | null;
  reference?: string | null; 
}

export interface IObjDigitizationRequest{
  id_solicitud_de_digitalizacion: number | null;
  id_PQRSDF?: number | null;
  id_complemento_usu_PQR?: number | null;
  fecha_solicitud?: string | null;
  fecha_rta_solicitud?: string | null;
  nombre_tipo_solicitud?: string | null;
  asunto: string | null;
  observacion_digitalizacion?: string | null;
  digitalizacion_completada?: boolean | null;
  devuelta_sin_completar?: boolean | null;
  id_persona_digitalizo?: number | null;
  tipo_solicitud?: string | null;
  estado_digitalizacion?: string | null;
  numero_radicado?: string | null;
  titular?: string | null;
  numero_anexos?: number | null;
  anexos?: IObjExhibit[];
  pqr?: IObjPqr;
  complemento_pqr?: IObjPqrRequest;
}



export interface IObjPerson {
  id_persona?: number | null;
  tipo_documento_id?: number | string | null;
  tipo_documento?: number | string | null;
  tipo_persona?: number | string | null;
  tipo_persona_desc?: number | string | null;
  numero_documento?: number | string | null;
  primer_nombre?: string | null;
  primer_apellido?: string | null;
  nombre_completo?: string | null;
}


export interface IObjPqrRequest {
  id_solicitud_al_usuario_sobre_pqrsdf?: number | null;
  id_pqrsdf?: number | null;
  cod_tipo_oficio?: number | null;
  nombre_tipo_oficio?: string | null;
  fecha_solicitud?: string | null;
  numero_radicado_salida?: string | null;
  fecha_radicado_salida?: string | null;
  id_und_org_oficina_solicita?: number | null;
  nombre_und_org_oficina_solicita?: string | null;
  asunto?: string | null;
  descripcion?: string | null;
}

export interface IObjExhibit {
  id_anexo?: number | null;
  nombre_anexo?: string | null;
  orden_anexo_doc?: number | null;
  nombre_medio_almacenamiento?: string | null;
  cod_medio_almacenamiento?: string | number | null;
  medio_almacenamiento_otros_cual?: string | number | null;
  numero_folios?: number | null;
  ya_digitalizado?: boolean | null;
  observacion_digitalizacion?: string | null;
  exhibit_link?: string | IObjFile | null;
  ruta_archivo?: string | IObjFile | null;
  id_docu_de_arch_exp?: number | null;
  metadatos: IObjMetaData | null;
}

export interface IObjMetaData {
  id_metadatos_anexo_tmp?: number | null;
  id_anexo?: number | null;
  fecha_creacion_doc?: string | null | Date;
  descripcion?: number | null;
  asunto?: string | null;
  categoria_archivo?: string | null;
  cod_categoria_archivo?: string | number | null;
  es_version_original?: boolean | null;
  tiene_replica_fisica?: boolean | null;

  tiene_tipologia?: boolean | null;
  ya_digitalizado?: boolean | null;
  nro_folios_documento?: number | null;
  origen_archivo?: string | null;
  cod_origen_archivo?: string | number | null;
  nombre_anexo?: string | null;

  cod_medio_almacenamiento?: string | null;
  medio_almacenamiento?: string | null;
  palabras_clave_doc?: string | null;
  id_archivo_en_sistema?: number | null;
  id_archivo_sistema?: number | null;

  archivo?: IObjFile | null;

  id_tipologia_doc?: number | null;
  tipologia_doc?: string | null;
  tipologia_no_creada_en_TRD?: string | null;
  tipologia_no_creada_TRD?: string | null;
  observacion_digitalizacion?: string | null;
  id_persona_digitalizo?: number | null;
  id_solicitud_de_digitalizacion?: number | null;
}

export interface IObjFile{
  
  es_Doc_elec_archivo?: boolean | null;
  fecha_creacion_doc?:string | null;
  formato?: string | null
  id_archivo_digital?: number | null;
  nombre_de_Guardado?: string|null;
  ruta_archivo?:string|null;
  tamagno_kb?:number|null;
  }

export interface IObjPqr {
  id_PQRSDF?: number | null; // id de pqr
  fecha_registro?: string | Date | null; // fecha creación pqr
  fecha_radicado?: string | null; // fecha de radicado pqr
  numero_radicado?: string | null; // numero de radicado
  nombre_estado_solicitud?: string | null; // estado de pqr
  id_estado_actual_solicitud?: string | null; // id del estado de pqr
  solicitudes_pqr?: IObjPqrRequest[]; // solicitudes de pqr

  
  tipo_PQRSDF?: string | null; // tipó de pqr
  cod_tipo_PQRSDF?: number | null;// id de tipo de pqr
  nombre_completo_titular?: string | null; // persona titular
  asunto?: string | null; // asunto de pqr
  descripcion?: string | null; // descripcion pqr
  requiere_rta?: boolean | null;// requere respuesta
  es_anonima?: boolean | null;// es anonimo
  id_persona_interpone?: number | null;// id de la persona que interpone
  id_persona_titular?: number | null; // id de la persona titular
  cod_relacion_con_el_titular?: string | number | null; // codigo de relacion entre persona titular y persona que interpone
  relacion_con_el_titular?: string | null; //relacion entre persona titular y persona que interpone
  medio_solicitud?: string | null; // medio de entrega de documentacion
  id_medio_solicitud?: number | null; // id medio de entrega de documentacion
  forma_presentacion?: string | null; //tipo de presentacion
  cod_forma_presentacion?: string | number | null; // id tipo de presentacion

  sucursal_especifica_implicada?: string | null; // sucursal destino nombre
  id_sucursal_especifica_implicada?: number | null; // id sucursal destino
  persona_recibe?: string | null;// nombre persona que crea

  id_persona_recibe?: number | null; // id persona que crea
  sucursal_recepcion_fisica?: string | null; // sucursal de recepcion fisica
  id_sucursal_recepcion_fisica?: number | null; // id de sucursal de recepcion fisica
  id_radicado?: number | null; // id del radicado
  requiere_digitalizacion?: boolean | null;// requiere digializacion
  dias_para_respuesta?: number | null; // tiempo de respuesta
  cantidad_anexos?: number | null;// total de anexos
  nro_folios_totales?: number | null; // total folios en anexos
}

export interface IObjPqrRequest {
  id_solicitud_al_usuario_sobre_pqrsdf?: number | null;
  id_pqrsdf?: number | null;
  cod_tipo_oficio?: number | null;
  nombre_tipo_oficio?: string | null;
  fecha_solicitud?: string | null;
  numero_radicado_salida?: string | null;
  fecha_radicado_salida?: string | null;
  id_und_org_oficina_solicita?: number | null;
  nombre_und_org_oficina_solicita?: string | null;
  asunto?: string | null;
  descripcion?: string | null;
}

