import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  IObjListType,
  IObjPerson,
  IObjPqr,
  ICentralDigitization,
  IObjPqrRequest,
  IObjExhibit,
  IObjMetaData,
  IObjDigitizationRequest,
} from '../../interfaces/central_digitalizacion';
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

export const initial_state_exhibit: IObjExhibit = {
  id_anexo: null,
  nombre_anexo: null,
  orden_anexo_doc: null,
  nombre_medio_almacenamiento: null,
  cod_medio_almacenamiento: null,
  medio_almacenamiento_otros_cual: null,
  numero_folios: null,
  ya_digitalizado: null,
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
  nro_folios_documento: null,
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

export const initial_state_digitization_request: IObjDigitizationRequest = {
  anexos: [],
  id_solicitud_de_digitalizacion: null,
  id_PQRSDF: null,
  id_complemento_usu_PQR: null,
  fecha_solicitud: null,
  fecha_rta_solicitud: null,
  observacion_digitalizacion: null,
  digitalizacion_completada: null,
  devuelta_sin_completar: null,
  id_persona_digitalizo: null,
  asunto: null,
};

const initial_state: ICentralDigitization = {
  request_types: [],
  request_type: initial_state_list,
  list_request_status: [],
  request_status: initial_state_list,
  storage_mediums: [],
  persons: [],
  person: initial_state_person,
  pqr: initial_state_pqr,
  pqr_request: initial_state_pqr_request,
  exhibits: [],
  exhibit: initial_state_exhibit,
  file_categories: [],
  file_category: initial_state_list,
  file_origins: [],
  file_origin: initial_state_list,
  file_typologies: [],
  file_typology: initial_state_list,
  metadata: initial_state_metadata,
  digitization_requests: [],
  digitization_request: initial_state_digitization_request,
};

export const central_digitalizacion_slice = createSlice({
  name: 'central_digitalizacion_slice',
  initialState: initial_state,
  reducers: {
    reset_state: () => initial_state,
    set_request_types: (
      state: ICentralDigitization,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.request_types = action.payload;
    },
    set_request_type: (
      state: ICentralDigitization,
      action: PayloadAction<IObjListType>
    ) => {
      state.request_type = action.payload;
    },

    set_list_request_status: (
      state: ICentralDigitization,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.list_request_status = action.payload;
    },
    set_request_status: (
      state: ICentralDigitization,
      action: PayloadAction<IObjListType>
    ) => {
      state.request_status = action.payload;
    },

    set_digitization_requests: (
      state: ICentralDigitization,
      action: PayloadAction<IObjDigitizationRequest[]>
    ) => {
      state.digitization_requests = action.payload;
    },
    set_digitization_request: (
      state: ICentralDigitization,
      action: PayloadAction<IObjDigitizationRequest>
    ) => {
      state.digitization_request = action.payload;
    },

    set_pqr: (state: ICentralDigitization, action: PayloadAction<IObjPqr>) => {
      state.pqr = action.payload;
    },
    set_storage_mediums: (
      state: ICentralDigitization,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.storage_mediums = action.payload;
    },

    set_exhibits: (
      state: ICentralDigitization,
      action: PayloadAction<IObjExhibit[]>
    ) => {
      state.exhibits = action.payload;
    },
    set_exhibit: (
      state: ICentralDigitization,
      action: PayloadAction<IObjExhibit>
    ) => {
      state.exhibit = action.payload;
    },

    set_file_categories: (
      state: ICentralDigitization,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.file_categories = action.payload;
    },
    set_file_category: (
      state: ICentralDigitization,
      action: PayloadAction<IObjListType>
    ) => {
      state.file_category = action.payload;
    },

    set_file_origins: (
      state: ICentralDigitization,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.file_origins = action.payload;
    },
    set_file_origin: (
      state: ICentralDigitization,
      action: PayloadAction<IObjListType>
    ) => {
      state.file_origin = action.payload;
    },

    set_file_typologies: (
      state: ICentralDigitization,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.file_typologies = action.payload;
    },
    set_file_typology: (
      state: ICentralDigitization,
      action: PayloadAction<IObjListType>
    ) => {
      state.file_typology = action.payload;
    },

    set_metadata: (
      state: ICentralDigitization,
      action: PayloadAction<IObjMetaData>
    ) => {
      state.metadata = action.payload;
    },
  },
});
export const {
  set_list_request_status,
  set_request_status,
  set_request_type,
  set_request_types,
  set_digitization_requests,
  set_digitization_request,
  set_pqr,
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
} = central_digitalizacion_slice.actions;
