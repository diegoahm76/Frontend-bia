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
  id: number | null;
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
  id_person?: number | null;
  document_type_id?: number | string | null;
  document_type?: number | string | null;
  person_type_id?: number | string | null;
  person_type?: number | string | null;
  document?: number | string | null;
  name?: string | null;
  last_name?: string | null;
  full_name?: string | null;
}

export interface IObjCompany {
  id_company?: number | null;
  document_type_id?: number | null;
  document_type?: number | string | null;
  tradename?: string | null;
  business_name?: string | null;
  document?: number | string | null;
  person_type_id?: number | null;
  person_type?: string | number | null;
  representatives_document_type_id?: number | null;
  representatives_document_type?: number | string | null;
  representatives_document?: number | string | null;
  representatives_name?: string | null;
  representatives_last_name?: string | null;
  representatives_full_name?: string | null;
}

export interface IObjPqr {
  id_pqr?: number | null;
  created_at?: string | Date | null;
  filing_at?: string | null;
  filing_number?: string | null;
  pqr_status?: string | null;
  pqr_status_id?: string | null;
  pqr_request?: IObjPqrRequest[];
  pqr_type?: string | null;
  pqr_type_id?: number | null;
  headline?: string | null;
  subject?: string | null;
  description?: string | null;
  requires_response?: boolean | null;
  is_anonymous?: boolean | null;
  person_interposes_id?: number | null;
  titular_person_id?: number | null;
  code_owner_relationship?: string | number | null;
  owner_relationship?: string | null;
  media_type?: string | null;
  media_type_id?: number | null;
  presentation_type?: string | null;
  code_presentation_type?: string | number | null;
  destination_office?: string | null;
  destination_office_id?: number | null;
  person_create?: string | null;
  person_create_id?: number | null;
  reception_office?: string | null;
  reception_office_id?: number | null;
  filling_id?: number | null;
  filling_at?: string | null;
  requires_digitization?: boolean | null;
  response_time?: number | null;
  total_number_exhibit?: number | null;
  total_number_pages?: number | null;
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
