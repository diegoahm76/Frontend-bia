import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  IObjListType,
  IObjPerson,
  IObjCompany,
  IObjPqr,
  IPqrsdf,
  IObjDocumentType,
  IObjPqrRequest,
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
  id_person: null,
  document_type_id: null,
  document_type: null,
  person_type_id: null,
  person_type: null,
  document: null,
  name: null,
  last_name: null,
  full_name: null,
};

export const initial_state_company: IObjCompany = {
  id_company: null,
  document_type_id: null,
  document_type: null,
  tradename: null,
  business_name: null,
  document: null,
  person_type_id: null,
  person_type: null,
  representatives_document_type_id: null,
  representatives_document_type: null,
  representatives_document: null,
  representatives_name: null,
  representatives_last_name: null,
};

export const initial_state_pqr: IObjPqr = {
  id_pqr: null,
  created_at: null,
  filing_at: null,
  filing_number: null,
  pqr_status: null,
  pqr_status_id: null,
  pqr_request: [],
  requires_response: true,
};

export const initial_state_pqr_request: IObjPqrRequest = {
  id_pqr_request: null,
  pqr_id: null,
  request_type_id: null,
  request_type: null,
  request_at: null,
  request_number: null,
  notification_at: null,
  organizational_unit_id: null,
  organizational_unit: null,
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

const initial_state: IPqrsdf = {
  list_applicant_types: type_applicant,
  type_applicant: type_applicant[1],
  list_on_behalf_of: on_behalf_of,
  on_behalf_of: on_behalf_of[0],
  persons: [],
  person: initial_state_person,
  companies: [],
  company: initial_state_company,
  grantors: [],
  grantor: initial_state_person,
  attorneys: [],
  attorney: initial_state_person,
  list_pqr_status: pqr_types,
  pqr_status: pqr_types[0],
  pqrs: [],
  pqr: initial_state_pqr,
  pqr_request: initial_state_pqr_request,
  person_types: person_types,
  person_type: { id: null, key: null, label: null },
  document_types: [],
  document_type: {
    cod_tipo_documento: null,
    nombre: null,
  },

  pqr_types: [],
  pqr_type: ,
  presentation_types: [],
  presentation_type: ,
  media_types: [],
  media_type: ,
  destination_offices: [],
  destination_office: ,
  Exhibits: [],
  Exhibit: ,
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
  reset_state,
} = pqrsdf_slice.actions;
