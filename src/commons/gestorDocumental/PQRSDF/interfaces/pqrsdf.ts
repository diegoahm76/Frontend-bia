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
  id_pqr?: number | null; // id de pqr
  created_at?: string | Date | null; // fecha creación pqr
  filing_at?: string | null; // fecha de radicado pqr
  filing_number?: string | null; // numero de radicado
  pqr_status?: string | null; // estado de pqr
  pqr_status_id?: string | null; // id del estado de pqr
  pqr_request?: IObjPqrRequest[]; // solicitudes de pqr

  
  pqr_type?: string | null; // tipó de pqr
  pqr_type_id?: number | null;// id de tipo de pqr
  headline?: string | null; // persona titular
  subject?: string | null; // asunto de pqr
  description?: string | null; // descripcion pqr
  requires_response?: boolean | null;// requere respuesta
  is_anonymous?: boolean | null;// es anonimo
  person_interposes_id?: number | null;// id de la persona que interpone
  titular_person_id?: number | null; // id de la persona titular
  code_owner_relationship?: string | number | null; // codigo de relacion entre persona titular y persona que interpone
  owner_relationship?: string | null; //relacion entre persona titular y persona que interpone
  media_type?: string | null; // medio de entrega de documentacion
  media_type_id?: number | null; // id medio de entrega de documentacion
  presentation_type?: string | null; //tipo de presentacion
  code_presentation_type?: string | number | null; // id tipo de presentacion
  destination_office?: string | null; // sucursal destino nombre
  destination_office_id?: number | null; // id sucursal destino
  person_create?: string | null;// nombre persona que crea
  person_create_id?: number | null; // id persona que crea
  reception_office?: string | null; // sucursal de recepcion fisica
  reception_office_id?: number | null; // id de sucursal de recepcion fisica
  filing_id?: number | null; // id del radicado
  
  requires_digitization?: boolean | null;// requiere digializacion
  response_time?: number | null; // tiempo de respuesta
  total_number_exhibit?: number | null;// total de anexos
  total_number_pages?: number | null; // total folios en anexos
}

export interface IObjPqrRequest {
  id_pqr_request?: number | null;
  pqr_id?: number | null;
  request_type_id?: number | null;
  request_type?: string | null;
  request_at?: string | null;
  request_number?: string | null;
  notification_at?: string | null;
  organizational_unit_id?: number | null;
  organizational_unit?: string | null;
  subject?: string | null;
  description?: string | null;
}

export interface IObjExhibit {
  id_exhibit?: number | null;
  exhibit_name?: string | null;
  exhibit_order?: number | null;
  storage_medium?: string | null;
  code_storage_medium?: string | number | null;
  other_storage_medium?: string | number | null;
  pages_number?: number | null;
  is_digitized?: boolean | null;
  exhibit_link?: string | null;
  metadata: IObjMetaData | null;
}

export interface IObjMetaData {
  id_metadata?: number | null;
  exhibit_id?: number | null;
  created_at?: string | null;
  description?: number | null;
  subject?: string | null;
  file_category?: string | null;
  code_file_category?: string | number | null;
  is_original?: boolean | null;
  has_physical_replica?: boolean | null;
  has_typology?: boolean | null;
  pages_number?: number | null;
  file_origin?: string | null;
  code_file_origin?: string | number | null;
  exhibit_name?: string | null;
  storage_medium?: string | null;
  key_words?: string | null;
  file_system_id?: number | null;
  file_typology_id?: number | null;
  file_typology?: string | null;
  other_file_typology?: string | null;
}
