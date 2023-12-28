import { type Persona } from '../../../../interfaces/globalModels';

export interface IPqrsdf {
  // Solicitud PQRSDF
  list_applicant_types: IObjListType[];
  type_applicant: IObjListType;
  list_on_behalf_of: IObjListType[];
  on_behalf_of: IObjListType;
  persons: IObjPerson[];
  person: IObjPerson;
  companies: IObjCompany[];
  company: IObjCompany;
  grantors: IObjPerson[];
  grantor: IObjPerson;
  attorneys: IObjPerson[];
  attorney: IObjPerson;
  list_pqr_status: IObjListType[];
  pqr_status: IObjListType;
  pqrs: IObjPqr[];
  pqr: IObjPqr;
  pqr_request: IObjPqrRequest;
  person_types: IObjListType[];
  person_type: IObjListType;
  document_types: IObjDocumentType[];
  document_type: IObjDocumentType;
  otros: IObjOtros[];
  otro:IObjOtros;

  // Crear PQRSDF
  pqr_types: IObjListType[];
  pqr_type: IObjListType;
  presentation_types: IObjListType[];
  presentation_type: IObjListType;
  media_types: IObjListType[];
  media_type: IObjListType;
  destination_offices: IObjListType[];
  destination_office: IObjListType;
  exhibits: IObjExhibit[];
  exhibit: IObjExhibit;
  storage_mediums: IObjListType[];
  file_categories: IObjListType[];
  file_category: IObjListType;
  file_origins: IObjListType[];
  file_origin: IObjListType;
  file_typologies: IObjListType[];
  file_typology: IObjListType;
  metadata: IObjMetaData;
  denuncia: IObjPqrDenuncia | null;
  areas: IObjListType[];
  area: IObjListType;
  municipalities: IObjListType[];
  municipality: IObjListType;
  departments: IObjListType[];
  department: IObjListType;
  resources: IObjListType[];
  resource: IObjListType[];


  //Radicados pqr
  filings: IObjFiled[];
  filed: IObjFiled;
  filed_types: IObjListType[];
  filed_type: IObjListType;

}

export interface IObjListType {
  id: number | string | null;
  key: string | number | null;
  label: string | null;
  reference?: string | null; 
}

export interface IObjStepConfiguration {
  step_number: number | null;
  optional: boolean | null;
  skipped: boolean | null;
  step_title: string | null;
  body?: React.ReactNode | null; 
  handle_submit?:any;
  validate?:any;
}

export interface IObjDocumentType {
  cod_tipo_documento?: string |  null;
  nombre?: string | null;
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

export interface IObjCompany {
  id_persona?: number | null;
  tipo_documento_id?: number | string | null;
  tipo_documento?: number | string | null;
  tipo_persona?: number | string | null;
  tipo_persona_desc?: number | string | null;
  numero_documento?: number | string | null;
  razon_social?: string | null;
  nombre_comercial?: string | null;
  persona_representante?: IObjPerson | null;
  
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
  cod_tipo_PQRSDF?: number | string | null;// id de tipo de pqr
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
  anexos?: IObjExhibit[];
  denuncia?: IObjPqrDenuncia | null;



  descripcionMetadatos?: string | null; // descripcion de metadatos
}

export interface IObjPqrDenuncia {
  Cod_zona_localizacion?: string | null;
  cod_municipio_cocalizacion_hecho?: string | null;
  barrio_vereda_localizacion?: string | null;
  direccion_localizacion?: string | null;
  cod_recursos_fectados_presuntos?: string[] | string | null;
  otro_recurso_Afectado_cual?: string | null;
  evidencias_soportan_hecho?: string | null;
  nombre_completo_presunto_infractor?: string | null;
  telefono_presunto_infractor?: number | string | null;
  direccion_presunto_infractor?: string | null;
  ya_habia_puesto_en_conocimiento?: boolean | null;
  ante_que_autoridad_había_interpuesto?: string | null;
  cod_departamento?: string | null;
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
  medio_almacenamiento?: string | null;
  cod_medio_almacenamiento?: string | number | null;
  medio_almacenamiento_otros_cual?: string | number | null;
  numero_folios?: number | null;
  ya_digitalizado?: boolean | null;
  observacion_digitalizacion?: string | null;
  exhibit_link?: string | IObjFile | null;
  id_docu_de_arch_exp?: number | null;
  metadatos: IObjMetaData | null;
  nombre_medio_almacenamiento?: string | number | null;
  descripcionMetadatos?:string|null;
}

export interface IObjMetaData {
  id_metadatos_anexo_tmp?: number | null;
  id_anexo?: number | null;
  fecha_creacion_doc?: string | null;
  descripcion?: number | null;
  asunto?: string | null;
  categoria_archivo?: string | null;
  cod_categoria_archivo?: string | number | null;
  es_version_original?: boolean | null;
  tiene_replica_fisica?: boolean | null;

  tiene_tipologia?: boolean | null;

  numero_folios_documento?: number | null;
  origen_archivo?: string | null;
  cod_origen_archivo?: string | number | null;
  nombre_anexo?: string | null;

  cod_medio_almacenamiento?: string | null;
  medio_almacenamiento?: string | null;
  palabras_clave_doc?: string | null;
  id_archivo_en_sistema?: number | null;
  archivo?: IObjFile | null;

  id_tipologia_doc?: number | null;
  tipologia_doc?: string | null;
  tipologia_no_creada_en_TRD?: string | null;
  nro_folios_documento?: number | null;
  tipologia_no_creada_TRD?: string | null;
  id_archivo_sistema?: number | null;
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

export interface IObjFiled {
  id_radicado?: number | null;
  cod_tipo_radicado?: string | number | null;
  tipo_radicado?: number | string | null;
  prefijo_radicado?: string | number | null;
  agno_radicado?: string | number | null;
  nro_radicado?: string | number | null;
  numero_radicado_completo?: string | number | null;
  fecha_radicado?: string | null;
  id_persona_radica?: number | null;
  id_radicado_asociado?: number | null;
  nombre_tipo_radicado?: string | null;
  titular?: string | number;
  asunto?:string|null;
}


// OTROS / / / / / /  /



export interface IObjOtros {
  id_otros?: number | null;
  nombre_estado_solicitud?: string | null;
  id_persona_titular?: number | null;
	id_persona_interpone?: number | null;
	cod_relacion_titular?: number | string | null;
	es_anonima?: boolean;
	id_medio_solicitud?: number | null;
	cod_forma_presentacion?: number | string | null;
	asunto?: string | null;
	descripcion?: string | null;
	cantidad_anexos?: number | null;
	nro_folios_totales?: number | null;
	requiere_rta?: boolean;
	id_sucursal_especifica_implicada?: number | null;
	id_persona_recibe?: number | null;
	id_sucursal_recepciona_fisica?: number | null;
  numero_radicado_entrada?: number | null;
  nombre_completo_titular?: string | null;
  fecha_registro?: string | Date | null;
  fecha_radicado?: string | null;
  fecha_envio_definitivo_digitalizacion?: string | null;
  fecha_digitalizacion_completada?: string | null;
  fecha_inicial_estado_actual?: string | null;
  id_radicados?: number | null;
  id_estado_actual_solicitud?: number | null;
  id_documento_archivo_expediente?: number | null;
  id_expediente_documental?: number | null;
  anexos?: IObjExhibit[];

}