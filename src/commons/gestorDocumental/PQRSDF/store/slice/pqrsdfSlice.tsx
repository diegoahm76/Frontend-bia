import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  IObjListType,
  IObjPerson,
  IObjCompany,
  IObjPqr,
  IPqrsdf,
  IObjDocumentType,
  IObjPqrRequest,
  IObjExhibit,
  IObjMetaData,
  IObjFiled,
} from '../../interfaces/pqrsdf';
// import { type Persona } from '../../../../../interfaces/globalModels';

export const type_applicant: IObjListType[] = [
  {
    id: 1,
    key: 1,
    label: 'Titular',
  },
  {
    id: 2,
    key: 2,
    label: 'Anónimo',
  },
];

export const initial_state_list: IObjListType = {
  id: null,
  key: null,
  label: '',
};

export const on_behalf_of: IObjListType[] = [
  {
    id: 1,
    key: 1,
    label: 'Propia',
  },
  {
    id: 2,
    key: 2,
    label: 'Empresa',
  },
  {
    id: 3,
    key: 3,
    label: 'Apoderado',
  },
];

export const initial_state_person: IObjPerson = {
  id_persona: null,
  tipo_documento_id: null,
  tipo_documento: null,
  tipo_persona: null,
  tipo_persona_desc: null,
  numero_documento: null,
  primer_apellido: null,
  primer_nombre: null,
  nombre_completo: null,
};

export const initial_state_company: IObjCompany = {
  id_persona: null,
  tipo_documento_id: null,
  tipo_documento: null,
  tipo_persona: null,
  tipo_persona_desc: null,
  numero_documento: null,

  nombre_comercial: null,
  razon_social: null,
  persona_representante: initial_state_person,
};

export const initial_state_pqr: IObjPqr = {
  id_PQRSDF: null,
  fecha_registro: new Date(),
  fecha_radicado: null,
  numero_radicado: null,
  nombre_estado_solicitud: null,
  id_estado_actual_solicitud: null,
  solicitudes_pqr: [],

  tipo_PQRSDF: null,
  cod_tipo_PQRSDF: null,
  nombre_completo_titular: null,
  asunto: null,
  descripcion: null,
  requiere_rta: null,
  es_anonima: null,
  id_persona_interpone: null,
  id_persona_titular: null,
  cod_relacion_con_el_titular: null,
  relacion_con_el_titular: null,
  medio_solicitud: null,
  id_medio_solicitud: null,
  forma_presentacion: null,
  cod_forma_presentacion: null,
  sucursal_especifica_implicada: null,
  id_sucursal_especifica_implicada: null,
  persona_recibe: null,
  sucursal_recepcion_fisica: null,
  id_sucursal_recepcion_fisica: null,
  id_radicado: null,
  requiere_digitalizacion: null,
  dias_para_respuesta: null,
  cantidad_anexos: null,
  nro_folios_totales: null,
};

export const initial_state_pqr_request: IObjPqrRequest = {
  id_pqrsdf: null,
  id_solicitud_al_usuario_sobre_pqrsdf: null,
  cod_tipo_oficio: null,
  nombre_tipo_oficio: null,
  fecha_solicitud: null,
  numero_radicado_salida: null,
  fecha_radicado_salida: null,
  id_und_org_oficina_solicita: null,
  nombre_und_org_oficina_solicita: null,
  asunto: null,
  descripcion: null,
};

export const pqr_types: IObjListType[] = [
  {
    id: 1,
    key: 1,
    label: 'Nuevo',
  },
  {
    id: 2,
    key: 2,
    label: 'Existente sin responder',
  },
];

export const person_types: IObjListType[] = [
  {
    id: 1,
    key: 1,
    label: 'Natural',
  },
  {
    id: 2,
    key: 2,
    label: 'Jurídica',
  },
];

export const initial_state_exhibit: IObjExhibit = {
  id_anexo: null,
  nombre_anexo: null,
  orden_anexo_en_el_doc: null,
  medio_almacenamiento: null,
  cod_medio_almacenamiento: null,
  medio_almacenamiento_otros_cual: null,
  numero_folios: null,
  ya_digitalizado: null,
  metadata: null,
};

export const initial_state_metadata: IObjMetaData = {
  id_metadatos_anexo_tmp: null,
  id_anexo: null,
  fecha_creacion_doc: null,
  descripcion: null,
  asunto: null,
  categoria_archivo: null,
  cod_categoria_archivo: null,
  es_version_original: null,
  tiene_replica_fisica: null,
  tiene_tipologia: null,
  numero_folios_documento: null,
  origen_archivo: null,
  cod_origen_archivo: null,
  nombre_anexo: null,
  medio_almacenamiento: null,
  cod_medio_almacenamiento: null,
  palabras_clave_doc: null,
  id_archivo_en_sistema: null,
  id_tipologia_doc: null,
  tipologia_doc: null,
};

export const initial_state_filed: IObjFiled = {
  id_radicado: null,
  cod_tipo_radicado: null,
  tipo_radicado: null,
  prefijo_radicado: null,
  agno_radicado: null,
  nro_radicado: null,
  fecha_radicado: null,
  id_persona_radica: null,
  id_radicado_asociado: null,
};

const initial_state: IPqrsdf = {
  list_applicant_types: [],
  type_applicant: initial_state_list,
  list_on_behalf_of: [],
  on_behalf_of: initial_state_list,
  persons: [],
  person: initial_state_person,
  companies: [],
  company: initial_state_company,
  grantors: [],
  grantor: initial_state_person,
  attorneys: [],
  attorney: initial_state_person,
  list_pqr_status: [],
  pqr_status: initial_state_list,
  pqrs: [],
  pqr: initial_state_pqr,
  pqr_request: initial_state_pqr_request,
  person_types: [],
  person_type: { id: null, key: null, label: null },
  document_types: [],
  document_type: {
    cod_tipo_documento: null,
    nombre: null,
  },

  pqr_types: [],
  pqr_type: initial_state_list,
  presentation_types: [],
  presentation_type: initial_state_list,
  media_types: [],
  media_type: initial_state_list,
  destination_offices: [],
  destination_office: initial_state_list,
  storage_mediums: [],
  exhibits: [],
  exhibit: initial_state_exhibit,
  file_categories: [],
  file_category: initial_state_list,
  file_origins: [],
  file_origin: initial_state_list,
  file_typologies: [],
  file_typology: initial_state_list,
  metadata: initial_state_metadata,

  filings: [],
  filed: initial_state_filed,
  filed_types: [],
  filed_type: initial_state_list,
};

export const pqrsdf_slice = createSlice({
  name: 'pqrsdf_slice',
  initialState: initial_state,
  reducers: {
    reset_state: () => initial_state,
    set_list_applicant_types: (
      state: IPqrsdf,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.list_applicant_types = action.payload;
    },
    set_type_applicant: (
      state: IPqrsdf,
      action: PayloadAction<IObjListType>
    ) => {
      state.type_applicant = action.payload;
    },

    set_list_on_behalf_of: (
      state: IPqrsdf,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.list_on_behalf_of = action.payload;
    },
    set_on_behalf_of: (state: IPqrsdf, action: PayloadAction<IObjListType>) => {
      state.on_behalf_of = action.payload;
    },

    set_persons: (state: IPqrsdf, action: PayloadAction<IObjPerson[]>) => {
      state.persons = action.payload;
    },
    set_person: (state: IPqrsdf, action: PayloadAction<IObjPerson>) => {
      state.person = action.payload;
    },

    set_companies: (state: IPqrsdf, action: PayloadAction<IObjCompany[]>) => {
      state.companies = action.payload;
    },
    set_company: (state: IPqrsdf, action: PayloadAction<IObjCompany>) => {
      state.company = action.payload;
    },

    set_grantors: (state: IPqrsdf, action: PayloadAction<IObjPerson[]>) => {
      state.grantors = action.payload;
    },
    set_grantor: (state: IPqrsdf, action: PayloadAction<IObjPerson>) => {
      state.grantor = action.payload;
    },

    set_attorneys: (state: IPqrsdf, action: PayloadAction<IObjPerson[]>) => {
      state.attorneys = action.payload;
    },
    set_attorney: (state: IPqrsdf, action: PayloadAction<IObjPerson>) => {
      state.attorney = action.payload;
    },

    set_list_pqr_status: (
      state: IPqrsdf,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.list_pqr_status = action.payload;
    },
    set_pqr_status: (state: IPqrsdf, action: PayloadAction<IObjListType>) => {
      state.pqr_status = action.payload;
    },

    set_pqrs: (state: IPqrsdf, action: PayloadAction<IObjPqr[]>) => {
      state.pqrs = action.payload;
    },
    set_pqr: (state: IPqrsdf, action: PayloadAction<IObjPqr>) => {
      state.pqr = action.payload;
    },
    set_pqr_request: (
      state: IPqrsdf,
      action: PayloadAction<IObjPqrRequest>
    ) => {
      state.pqr_request = action.payload;
    },

    set_person_types: (
      state: IPqrsdf,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.person_types = action.payload;
    },
    set_person_type: (state: IPqrsdf, action: PayloadAction<IObjListType>) => {
      state.person_type = action.payload;
    },

    set_document_types: (
      state: IPqrsdf,
      action: PayloadAction<IObjDocumentType[]>
    ) => {
      state.document_types = action.payload;
    },
    set_document_type: (
      state: IPqrsdf,
      action: PayloadAction<IObjDocumentType>
    ) => {
      state.document_type = action.payload;
    },

    set_pqr_types: (state: IPqrsdf, action: PayloadAction<IObjListType[]>) => {
      state.pqr_types = action.payload;
    },
    set_pqr_type: (state: IPqrsdf, action: PayloadAction<IObjListType>) => {
      state.pqr_type = action.payload;
    },

    set_presentation_types: (
      state: IPqrsdf,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.presentation_types = action.payload;
    },
    set_presentation_type: (
      state: IPqrsdf,
      action: PayloadAction<IObjListType>
    ) => {
      state.presentation_type = action.payload;
    },

    set_media_types: (
      state: IPqrsdf,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.media_types = action.payload;
    },
    set_media_type: (state: IPqrsdf, action: PayloadAction<IObjListType>) => {
      state.media_type = action.payload;
    },

    set_destination_offices: (
      state: IPqrsdf,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.destination_offices = action.payload;
    },
    set_destination_office: (
      state: IPqrsdf,
      action: PayloadAction<IObjListType>
    ) => {
      state.destination_office = action.payload;
    },

    set_storage_mediums: (
      state: IPqrsdf,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.storage_mediums = action.payload;
    },
    set_exhibits: (state: IPqrsdf, action: PayloadAction<IObjExhibit[]>) => {
      state.exhibits = action.payload;
    },
    set_exhibit: (state: IPqrsdf, action: PayloadAction<IObjExhibit>) => {
      state.exhibit = action.payload;
    },

    set_file_categories: (
      state: IPqrsdf,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.file_categories = action.payload;
    },
    set_file_category: (
      state: IPqrsdf,
      action: PayloadAction<IObjListType>
    ) => {
      state.file_category = action.payload;
    },

    set_file_origins: (
      state: IPqrsdf,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.file_origins = action.payload;
    },
    set_file_origin: (state: IPqrsdf, action: PayloadAction<IObjListType>) => {
      state.file_origin = action.payload;
    },

    set_file_typologies: (
      state: IPqrsdf,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.file_typologies = action.payload;
    },
    set_file_typology: (
      state: IPqrsdf,
      action: PayloadAction<IObjListType>
    ) => {
      state.file_typology = action.payload;
    },

    set_metadata: (state: IPqrsdf, action: PayloadAction<IObjMetaData>) => {
      state.metadata = action.payload;
    },

    set_filings: (state: IPqrsdf, action: PayloadAction<IObjFiled[]>) => {
      state.filings = action.payload;
    },
    set_filed: (state: IPqrsdf, action: PayloadAction<IObjFiled>) => {
      state.filed = action.payload;
    },

    set_filed_types: (
      state: IPqrsdf,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.filed_types = action.payload;
    },
    set_filed_type: (state: IPqrsdf, action: PayloadAction<IObjListType>) => {
      state.filed_type = action.payload;
    },
  },
});
export const {
  set_list_applicant_types,
  set_type_applicant,
  set_list_on_behalf_of,
  set_on_behalf_of,
  set_persons,
  set_person,
  set_companies,
  set_company,
  set_grantors,
  set_grantor,
  set_attorneys,
  set_attorney,
  set_list_pqr_status,
  set_pqr_status,
  set_pqrs,
  set_pqr,
  set_pqr_request,
  set_person_types,
  set_person_type,
  set_document_types,
  set_document_type,
  set_pqr_types,
  set_pqr_type,
  set_presentation_types,
  set_presentation_type,
  set_media_types,
  set_media_type,
  set_destination_offices,
  set_destination_office,
  set_storage_mediums,
  set_exhibits,
  set_exhibit,
  set_file_categories,
  set_file_category,
  set_file_origins,
  set_file_origin,
  set_file_typologies,
  set_file_typology,
  set_metadata,
  reset_state,
  set_filed,
  set_filed_type,
  set_filed_types,
  set_filings,
} = pqrsdf_slice.actions;
