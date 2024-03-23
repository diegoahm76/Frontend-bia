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
  IObjPqrDenuncia,
  IObjOtros,
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
  requiere_rta: true,
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
  anexos: [],
  denuncia: null,
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
  orden_anexo_doc: null,
  medio_almacenamiento: null,
  cod_medio_almacenamiento: null,
  medio_almacenamiento_otros_cual: null,
  numero_folios: null,
  ya_digitalizado: null,
  exhibit_link: null,
  metadatos: null,
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
  numero_radicado_completo: null,
};
export const initial_state_denuncia: IObjPqrDenuncia = {
  Cod_zona_localizacion: null,
  cod_municipio_cocalizacion_hecho: null,
  barrio_vereda_localizacion: null,
  direccion_localizacion: null,
  cod_recursos_fectados_presuntos: [],
  otro_recurso_Afectado_cual: null,
  evidencias_soportan_hecho: null,
  nombre_completo_presunto_infractor: null,
  telefono_presunto_infractor: null,
  direccion_presunto_infractor: null,
  ya_habia_puesto_en_conocimiento: false,
  ante_que_autoridad_había_interpuesto: null,
};
export const initial_state_otro: IObjOtros = {
  id_otros: null,
  nombre_estado_solicitud: null,
  id_persona_titular: null,
  id_persona_interpone: null,
  cod_relacion_titular: null,
  es_anonima: false,
  id_medio_solicitud: null,
  cod_forma_presentacion: null,
  asunto: null,
  descripcion: null,
  cantidad_anexos: null,
  nro_folios_totales: null,
  requiere_rta: false,
  id_sucursal_especifica_implicada: null,
  id_persona_recibe: null,
  id_sucursal_recepciona_fisica: null,
  numero_radicado_entrada: null,
  nombre_completo_titular: null,
  fecha_registro: new Date(),
  fecha_radicado: null,
  fecha_envio_definitivo_digitalizacion: null,
  fecha_digitalizacion_completada: null,
  fecha_inicial_estado_actual: null,
  id_radicados: null,
  id_estado_actual_solicitud: null,
  id_documento_archivo_expediente: null,
  id_expediente_documental: null,
  anexos: [],
};

const initial_state: IPqrsdf = {
  file_fisico: null,
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
  areas: [],
  area: initial_state_list,
  municipalities: [],
  municipality: initial_state_list,
  departments: [],
  department: initial_state_list,
  resources: [
    { id: 1, key: 'Su', label: 'Suelo' },
    { id: 2, key: 'Ag', label: 'Agua' },
    { id: 3, key: 'Fs', label: 'Fauna silvestre' },
    { id: 4, key: 'Ai', label: 'Aire' },
    { id: 5, key: 'Fl', label: 'Flora' },
    { id: 6, key: 'Ot', label: 'Otro' },
  ],
  resource: [],

  filings: [],
  filed: initial_state_filed,
  filed_types: [],
  filed_type: initial_state_list,
  denuncia: initial_state_denuncia,
  otros: [],
  otro: initial_state_otro,
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
    set_file_fisico: (state: IPqrsdf, action: PayloadAction<any>) => {
      state.file_fisico = action.payload;
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

    set_denuncia: (state: IPqrsdf, action: PayloadAction<IObjPqrDenuncia>) => {
      state.denuncia = action.payload;
    },

    set_areas: (state: IPqrsdf, action: PayloadAction<IObjListType[]>) => {
      state.areas = action.payload;
    },
    set_area: (state: IPqrsdf, action: PayloadAction<IObjListType>) => {
      state.area = action.payload;
    },

    set_municipalities: (
      state: IPqrsdf,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.municipalities = action.payload;
    },
    set_municipality: (state: IPqrsdf, action: PayloadAction<IObjListType>) => {
      state.municipality = action.payload;
    },

    set_departments: (
      state: IPqrsdf,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.departments = action.payload;
    },
    set_department: (state: IPqrsdf, action: PayloadAction<IObjListType>) => {
      state.department = action.payload;
    },

    set_resources: (state: IPqrsdf, action: PayloadAction<IObjListType[]>) => {
      state.resources = action.payload;
    },
    set_resource: (state: IPqrsdf, action: PayloadAction<IObjListType[]>) => {
      state.resource = action.payload;
    },
    set_others: (state: IPqrsdf, action: PayloadAction<IObjOtros[]>) => {
      state.otros = action.payload;
    },
    set_other: (state: IPqrsdf, action: PayloadAction<IObjOtros>) => {
      state.otro = action.payload;
    },
  },
});
export const {
  set_other,
  set_file_fisico,
  set_area,
  set_areas,
  set_department,
  set_departments,
  set_municipalities,
  set_municipality,
  set_resource,
  set_resources,
  set_denuncia,
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
  set_others,
} = pqrsdf_slice.actions;
