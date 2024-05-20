import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  INotificaciones,
  IObjActo,
  IObjAsignacionFuncioanrio,
  IObjExpediente,
  IObjListType,
  IObjNotificacionCause,
  IObjNotificacionStatus,
  IObjNotificacionType,
  IObjNotificationPerRequest,
  IObjNotificationRequest,
  IObjPerson,
  IObjSerieSubserie,
  IObjSupportType,
  IObjTramite,
  IObjTrd,
  IObjTypeDocument,
  IObjUnidadesMarcadas,
  IObjSoporte,
} from '../../interfaces/notificaciones';

// import { type Persona } from '../../../../../interfaces/globalModels';

// export const type_applicant: IObjListType[] = [
//   {
//     id: 1,
//     key: 1,
//     label: 'Titular',
//   },
//   {
//     id: 2,
//     key: 2,
//     label: 'Anónimo',
//   },
// ];

export const initial_state_list: IObjListType = {
  id: null,
  key: null,
  label: '',
};

// export const on_behalf_of: IObjListType[] = [
//   {
//     id: 1,
//     key: 1,
//     label: 'Propia',
//   },
//   {
//     id: 2,
//     key: 2,
//     label: 'Empresa',
//   },
//   {
//     id: 3,
//     key: 3,
//     label: 'Apoderado',
//   },
// ];

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

// export const initial_state_company: IObjCompany = {
//   id_persona: null,
//   tipo_documento_id: null,
//   tipo_documento: null,
//   tipo_persona: null,
//   tipo_persona_desc: null,
//   numero_documento: null,

//   nombre_comercial: null,
//   razon_social: null,
//   persona_representante: initial_state_person,
// };

// export const initial_state_pqr: IObjPqr = {
//   id_PQRSDF: null,
//   fecha_registro: new Date(),
//   fecha_radicado: null,
//   numero_radicado: null,
//   nombre_estado_solicitud: null,
//   id_estado_actual_solicitud: null,
//   solicitudes_pqr: [],

//   tipo_PQRSDF: null,
//   cod_tipo_PQRSDF: null,
//   nombre_completo_titular: null,
//   asunto: null,
//   descripcion: null,
//   requiere_rta: true,
//   es_anonima: null,
//   id_persona_interpone: null,
//   id_persona_titular: null,
//   cod_relacion_con_el_titular: null,
//   relacion_con_el_titular: null,
//   medio_solicitud: null,
//   id_medio_solicitud: null,
//   forma_presentacion: null,
//   cod_forma_presentacion: null,
//   sucursal_especifica_implicada: null,
//   id_sucursal_especifica_implicada: null,
//   persona_recibe: null,
//   sucursal_recepcion_fisica: null,
//   id_sucursal_recepcion_fisica: null,
//   id_radicado: null,
//   requiere_digitalizacion: null,
//   dias_para_respuesta: null,
//   cantidad_anexos: null,
//   nro_folios_totales: null,
//   anexos: [],
//   denuncia: null,
// };

// export const initial_state_pqr_request: IObjPqrRequest = {
//   id_pqrsdf: null,
//   id_solicitud_al_usuario_sobre_pqrsdf: null,
//   cod_tipo_oficio: null,
//   nombre_tipo_oficio: null,
//   fecha_solicitud: null,
//   numero_radicado_salida: null,
//   fecha_radicado_salida: null,
//   id_und_org_oficina_solicita: null,
//   nombre_und_org_oficina_solicita: null,
//   asunto: null,
//   descripcion: null,
// };

// export const pqr_types: IObjListType[] = [
//   {
//     id: 1,
//     key: 1,
//     label: 'Nuevo',
//   },
//   {
//     id: 2,
//     key: 2,
//     label: 'Existente sin responder',
//   },
// ];

// export const person_types: IObjListType[] = [
//   {
//     id: 1,
//     key: 1,
//     label: 'Natural',
//   },
//   {
//     id: 2,
//     key: 2,
//     label: 'Jurídica',
//   },
// ];

// export const initial_state_exhibit: IObjExhibit = {
//   id_anexo: null,
//   nombre_anexo: null,
//   orden_anexo_doc: null,
//   medio_almacenamiento: null,
//   cod_medio_almacenamiento: null,
//   medio_almacenamiento_otros_cual: null,
//   numero_folios: null,
//   ya_digitalizado: null,
//   exhibit_link: null,
//   metadatos: null,
// };

// export const initial_state_metadata: IObjMetaData = {
//   id_metadatos_anexo_tmp: null,
//   id_anexo: null,
//   fecha_creacion_doc: null,
//   descripcion: null,
//   asunto: null,
//   categoria_archivo: null,
//   cod_categoria_archivo: null,
//   es_version_original: null,
//   tiene_replica_fisica: null,
//   tiene_tipologia: null,
//   numero_folios_documento: null,
//   origen_archivo: null,
//   cod_origen_archivo: null,
//   nombre_anexo: null,
//   medio_almacenamiento: null,
//   cod_medio_almacenamiento: null,
//   palabras_clave_doc: null,
//   id_archivo_en_sistema: null,
//   id_tipologia_doc: null,
//   tipologia_doc: null,
// };

// export const initial_state_filed: IObjFiled = {
//   id_radicado: null,
//   cod_tipo_radicado: null,
//   tipo_radicado: null,
//   prefijo_radicado: null,
//   agno_radicado: null,
//   nro_radicado: null,
//   fecha_radicado: null,
//   id_persona_radica: null,
//   id_radicado_asociado: null,
//   numero_radicado_completo: null,
// };
// export const initial_state_denuncia: IObjPqrDenuncia = {
//   Cod_zona_localizacion: null,
//   cod_municipio_cocalizacion_hecho: null,
//   barrio_vereda_localizacion: null,
//   direccion_localizacion: null,
//   cod_recursos_fectados_presuntos: [],
//   otro_recurso_Afectado_cual: null,
//   evidencias_soportan_hecho: null,
//   nombre_completo_presunto_infractor: null,
//   telefono_presunto_infractor: null,
//   direccion_presunto_infractor: null,
//   ya_habia_puesto_en_conocimiento: false,
//   ante_que_autoridad_había_interpuesto: null,
// };
// export const initial_state_otro: IObjOtros = {
//   id_otros: null,
//   nombre_estado_solicitud: null,
//   id_persona_titular: null,
// 	id_persona_interpone: null,
// 	cod_relacion_titular: null,
// 	es_anonima: false,
// 	id_medio_solicitud: null,
// 	cod_forma_presentacion: null,
// 	asunto: null,
// 	descripcion: null,
// 	cantidad_anexos: null,
// 	nro_folios_totales: null,
// 	requiere_rta: false,
// 	id_sucursal_especifica_implicada: null,
// 	id_persona_recibe: null,
// 	id_sucursal_recepciona_fisica: null,
//   numero_radicado_entrada: null,
//   nombre_completo_titular: null,
//   fecha_registro: new Date(),
//   fecha_radicado: null,
//   fecha_envio_definitivo_digitalizacion: null,
//   fecha_digitalizacion_completada: null,
//   fecha_inicial_estado_actual: null,
//   id_radicados: null,
//   id_estado_actual_solicitud: null,
//   id_documento_archivo_expediente: null,
//   id_expediente_documental: null,
//   anexos:[],
// }

const initial_state: INotificaciones = {
  list_document_types: [],
  document_type: initial_state_list,
  list_status: [],
  status_notification: initial_state_list,
  list_status_asignation: [],
  status_asignation: initial_state_list,
  list_groups: [],
  group: initial_state_list,
  list_unidades_organizacionales: [],
  unidad_organizacional: initial_state_list,

  notification_requests: [],
  notification_request: null,
  notifications_per_request: [],
  notification_per_request: null,
  search_notification_request: null,

  tipos_documento_notificacion: [],
  tipo_documento_notificacion: null,

  tipos_notificacion: [],
  tipo_notificacion: null,
  causas_notificacion: [],
  causa_notificacion: null,
  estados_notificacion: [],
  estado_notificacion: null,
  tipos_soporte: [],
  tipo_soporte: null,
  asignacion_funcionario: null,
  tramites: [],
  tramite: null,
  actos_administrativos: [],
  acto_administrativo: null,
  expedientes: [],
  expediente: null,
  trd: [],
  serie_subserie: [],
  unidades_marcadas: [],
  tipos_acto_administrativo: [],
  //   file_fisico: null,
  //   list_applicant_types: [],
  //   type_applicant: initial_state_list,
  //   list_on_behalf_of: [],
  //   on_behalf_of: initial_state_list,
  persons: [],
  person: initial_state_person,
  soportes: [],
  soporte: null,
  //   companies: [],
  //   company: initial_state_company,
  //   grantors: [],
  //   grantor: initial_state_person,
  //   attorneys: [],
  //   attorney: initial_state_person,
  //   list_pqr_status: [],
  //   pqr_status: initial_state_list,
  //   pqrs: [],
  //   pqr: initial_state_pqr,
  //   pqr_request: initial_state_pqr_request,
  //   person_types: [],
  //   person_type: { id: null, key: null, label: null },
  //   document_types: [],
  //   document_type: {
  //     cod_tipo_documento: null,
  //     nombre: null,
  //   },

  //   pqr_types: [],
  //   pqr_type: initial_state_list,
  //   presentation_types: [],
  //   presentation_type: initial_state_list,
  //   media_types: [],
  //   media_type: initial_state_list,
  //   destination_offices: [],
  //   destination_office: initial_state_list,
  //   storage_mediums: [],
  //   exhibits: [],
  //   exhibit: initial_state_exhibit,
  //   file_categories: [],
  //   file_category: initial_state_list,
  //   file_origins: [],
  //   file_origin: initial_state_list,
  //   file_typologies: [],
  //   file_typology: initial_state_list,
  //   metadata: initial_state_metadata,
  //   areas: [],
  //   area: initial_state_list,
  //   municipalities: [],
  //   municipality: initial_state_list,
  //   departments: [],
  //   department: initial_state_list,
  //   resources: [
  //     { id: 1, key: 'Su', label: 'Suelo' },
  //     { id: 2, key: 'Ag', label: 'Agua' },
  //     { id: 3, key: 'Fs', label: 'Fauna silvestre' },
  //     { id: 4, key: 'Ai', label: 'Aire' },
  //     { id: 5, key: 'Fl', label: 'Flora' },
  //     { id: 6, key: 'Ot', label: 'Otro' },
  //   ],
  //   resource: [],

  //   filings: [],
  //   filed: initial_state_filed,
  //   filed_types: [],
  //   filed_type: initial_state_list,
  //   denuncia: initial_state_denuncia,
  //   otros: [],
  //   otro: initial_state_otro,
};

export const notificaciones_slice = createSlice({
  name: 'notificaciones_slice',
  initialState: initial_state,
  reducers: {
    reset_state: () => initial_state,
    set_list_document_types: (
      state: INotificaciones,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.list_document_types = action.payload;
    },
    set_list_status: (
      state: INotificaciones,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.list_status = action.payload;
    },
    set_list_status_asignation: (
      state: INotificaciones,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.list_status_asignation = action.payload;
    },

    set_list_groups: (
      state: INotificaciones,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.list_groups = action.payload;
    },
    set_group: (
      state: INotificaciones,
      action: PayloadAction<IObjListType>
    ) => {
      state.group = action.payload;
    },
    set_list_unidades_organizacionales: (
      state: INotificaciones,
      action: PayloadAction<IObjListType[]>
    ) => {
      state.list_unidades_organizacionales = action.payload;
    },
    set_notification_requests: (
      state: INotificaciones,
      action: PayloadAction<IObjNotificationRequest[]>
    ) => {
      state.notification_requests = action.payload;
    },
    set_notification_request: (
      state: INotificaciones,
      action: PayloadAction<IObjNotificationRequest>
    ) => {
      state.notification_request = action.payload;
    },
    set_notifications_per_request: (
      state: INotificaciones,
      action: PayloadAction<IObjNotificationPerRequest[]>
    ) => {
      state.notifications_per_request = action.payload;
    },
    set_notification_per_request: (
      state: INotificaciones,
      action: PayloadAction<IObjNotificationPerRequest>
    ) => {
      state.notification_per_request = action.payload;
    },
    set_tipos_notificacion: (
      state: INotificaciones,
      action: PayloadAction<IObjNotificacionType[]>
    ) => {
      state.tipos_notificacion = action.payload;
    },
    set_tipo_notificacion: (
      state: INotificaciones,
      action: PayloadAction<IObjNotificacionType>
    ) => {
      state.tipo_notificacion = action.payload;
    },
    set_tipos_documento_notificacion: (
      state: INotificaciones,
      action: PayloadAction<IObjTypeDocument[]>
    ) => {
      state.tipos_documento_notificacion = action.payload;
    },
    set_tipo_documento_notificacion: (
      state: INotificaciones,
      action: PayloadAction<IObjTypeDocument>
    ) => {
      state.tipo_documento_notificacion = action.payload;
    },
    set_causas_notificacion: (
      state: INotificaciones,
      action: PayloadAction<IObjNotificacionCause[]>
    ) => {
      state.causas_notificacion = action.payload;
    },
    set_causa_notificacion: (
      state: INotificaciones,
      action: PayloadAction<IObjNotificacionCause>
    ) => {
      state.causa_notificacion = action.payload;
    },
    set_estados_notificacion: (
      state: INotificaciones,
      action: PayloadAction<IObjNotificacionStatus[]>
    ) => {
      state.estados_notificacion = action.payload;
    },
    set_estado_notificacion: (
      state: INotificaciones,
      action: PayloadAction<IObjNotificacionStatus>
    ) => {
      state.estado_notificacion = action.payload;
    },
    set_tipos_soporte: (
      state: INotificaciones,
      action: PayloadAction<IObjSupportType[]>
    ) => {
      state.tipos_soporte = action.payload;
    },
    set_tipo_soporte: (
      state: INotificaciones,
      action: PayloadAction<IObjSupportType>
    ) => {
      state.tipo_soporte = action.payload;
    },
    set_persons: (
      state: INotificaciones,
      action: PayloadAction<IObjPerson[]>
    ) => {
      state.persons = action.payload;
    },
    set_person: (state: INotificaciones, action: PayloadAction<IObjPerson>) => {
      state.person = action.payload;
    },
    set_asignacion_funcionario: (
      state: INotificaciones,
      action: PayloadAction<IObjAsignacionFuncioanrio>
    ) => {
      state.asignacion_funcionario = action.payload;
    },
    set_expedientes: (
      state: INotificaciones,
      action: PayloadAction<IObjExpediente[]>
    ) => {
      state.expedientes = action.payload;
    },
    set_expediente: (
      state: INotificaciones,
      action: PayloadAction<IObjExpediente>
    ) => {
      state.expediente = action.payload;
    },
    set_actos_administrativos: (
      state: INotificaciones,
      action: PayloadAction<IObjActo[]>
    ) => {
      state.actos_administrativos = action.payload;
    },
    set_acto_administrativo: (
      state: INotificaciones,
      action: PayloadAction<IObjActo>
    ) => {
      state.acto_administrativo = action.payload;
    },
    set_tramites: (
      state: INotificaciones,
      action: PayloadAction<IObjTramite[]>
    ) => {
      state.tramites = action.payload;
    },
    set_tramite: (
      state: INotificaciones,
      action: PayloadAction<IObjTramite>
    ) => {
      state.tramite = action.payload;
    },
    set_soportes: (
      state: INotificaciones,
      action: PayloadAction<IObjSoporte[]>
    ) => {
      state.soportes = action.payload;
    },
    set_soporte: (
      state: INotificaciones,
      action: PayloadAction<IObjSoporte>
    ) => {
      state.soporte = action.payload;
    },
    set_serie_subserie: (
      state: INotificaciones,
      action: PayloadAction<IObjSerieSubserie[]>
    ) => {
      state.serie_subserie = action.payload;
    },
    set_trd: (state: INotificaciones, action: PayloadAction<IObjTrd[]>) => {
      state.trd = action.payload;
    },
    set_unidades_marcadas: (
      state: INotificaciones,
      action: PayloadAction<IObjUnidadesMarcadas[]>
    ) => {
      state.unidades_marcadas = action.payload;
    },
    set_tipos_acto_administrativo: (
      state: INotificaciones,
      action: PayloadAction<IObjSupportType[]>
    ) => {
      state.tipos_acto_administrativo = action.payload;
    },
    //     set_document_type: (
    //       state: INotificaciones,
    //       action: PayloadAction<IObjDocumentType>
    //     ) => {
    //       state.document_type = action.payload;
    //     },

    //     set_pqr_types: (state: INotificaciones, action: PayloadAction<IObjListType[]>) => {
    //       state.pqr_types = action.payload;
    //     },
    //     set_pqr_type: (state: INotificaciones, action: PayloadAction<IObjListType>) => {
    //       state.pqr_type = action.payload;
    //     },

    //     set_presentation_types: (
    //       state: INotificaciones,
    //       action: PayloadAction<IObjListType[]>
    //     ) => {
    //       state.presentation_types = action.payload;
    //     },
    //     set_presentation_type: (
    //       state: INotificaciones,
    //       action: PayloadAction<IObjListType>
    //     ) => {
    //       state.presentation_type = action.payload;
    //     },

    //     set_media_types: (
    //       state: INotificaciones,
    //       action: PayloadAction<IObjListType[]>
    //     ) => {
    //       state.media_types = action.payload;
    //     },
    //     set_media_type: (state: INotificaciones, action: PayloadAction<IObjListType>) => {
    //       state.media_type = action.payload;
    //     },

    //     set_destination_offices: (
    //       state: INotificaciones,
    //       action: PayloadAction<IObjListType[]>
    //     ) => {
    //       state.destination_offices = action.payload;
    //     },
    //     set_destination_office: (
    //       state: INotificaciones,
    //       action: PayloadAction<IObjListType>
    //     ) => {
    //       state.destination_office = action.payload;
    //     },

    //     set_storage_mediums: (
    //       state: INotificaciones,
    //       action: PayloadAction<IObjListType[]>
    //     ) => {
    //       state.storage_mediums = action.payload;
    //     },
    //     set_exhibits: (state: INotificaciones, action: PayloadAction<IObjExhibit[]>) => {
    //       state.exhibits = action.payload;
    //     },
    //     set_exhibit: (state: INotificaciones, action: PayloadAction<IObjExhibit>) => {
    //       state.exhibit = action.payload;
    //     },

    //     set_file_categories: (
    //       state: INotificaciones,
    //       action: PayloadAction<IObjListType[]>
    //     ) => {
    //       state.file_categories = action.payload;
    //     },
    //     set_file_category: (
    //       state: INotificaciones,
    //       action: PayloadAction<IObjListType>
    //     ) => {
    //       state.file_category = action.payload;
    //     },

    //     set_file_origins: (
    //       state: INotificaciones,
    //       action: PayloadAction<IObjListType[]>
    //     ) => {
    //       state.file_origins = action.payload;
    //     },
    //     set_file_origin: (state: INotificaciones, action: PayloadAction<IObjListType>) => {
    //       state.file_origin = action.payload;
    //     },

    //     set_file_typologies: (
    //       state: INotificaciones,
    //       action: PayloadAction<IObjListType[]>
    //     ) => {
    //       state.file_typologies = action.payload;
    //     },
    //     set_file_typology: (
    //       state: INotificaciones,
    //       action: PayloadAction<IObjListType>
    //     ) => {
    //       state.file_typology = action.payload;
    //     },

    //     set_metadata: (state: INotificaciones, action: PayloadAction<IObjMetaData>) => {
    //       state.metadata = action.payload;
    //     },

    //     set_filings: (state: INotificaciones, action: PayloadAction<IObjFiled[]>) => {
    //       state.filings = action.payload;
    //     },
    //     set_filed: (state: INotificaciones, action: PayloadAction<IObjFiled>) => {
    //       state.filed = action.payload;
    //     },

    //     set_filed_types: (
    //       state: INotificaciones,
    //       action: PayloadAction<IObjListType[]>
    //     ) => {
    //       state.filed_types = action.payload;
    //     },
    //     set_filed_type: (state: INotificaciones, action: PayloadAction<IObjListType>) => {
    //       state.filed_type = action.payload;
    //     },

    //     set_denuncia: (state: INotificaciones, action: PayloadAction<IObjPqrDenuncia>) => {
    //       state.denuncia = action.payload;
    //     },

    //     set_areas: (state: INotificaciones, action: PayloadAction<IObjListType[]>) => {
    //       state.areas = action.payload;
    //     },
    //     set_area: (state: INotificaciones, action: PayloadAction<IObjListType>) => {
    //       state.area = action.payload;
    //     },

    //     set_municipalities: (
    //       state: INotificaciones,
    //       action: PayloadAction<IObjListType[]>
    //     ) => {
    //       state.municipalities = action.payload;
    //     },
    //     set_municipality: (state: INotificaciones, action: PayloadAction<IObjListType>) => {
    //       state.municipality = action.payload;
    //     },

    //     set_departments: (
    //       state: INotificaciones,
    //       action: PayloadAction<IObjListType[]>
    //     ) => {
    //       state.departments = action.payload;
    //     },
    //     set_department: (state: INotificaciones, action: PayloadAction<IObjListType>) => {
    //       state.department = action.payload;
    //     },

    //     set_resources: (state: INotificaciones, action: PayloadAction<IObjListType[]>) => {
    //       state.resources = action.payload;
    //     },
    //     set_resource: (state: INotificaciones, action: PayloadAction<IObjListType[]>) => {
    //       state.resource = action.payload;
    //     },
    //     set_others: (state: INotificaciones, action: PayloadAction<IObjOtros[]>) => {
    //       state.otros = action.payload;
    //     },
  },
});
export const {
  set_soporte,
  set_soportes,
  set_list_unidades_organizacionales,
  set_tipo_documento_notificacion,
  set_tipos_documento_notificacion,
  set_tipos_acto_administrativo,
  set_serie_subserie,
  set_trd,
  set_unidades_marcadas,
  set_acto_administrativo,
  set_actos_administrativos,
  set_expediente,
  set_expedientes,
  set_tramite,
  set_tramites,
  set_notification_requests,
  set_notification_request,
  set_notifications_per_request,
  set_notification_per_request,
  set_list_document_types,
  set_list_status,
  set_list_status_asignation,
  set_list_groups,
  set_group,
  set_tipo_notificacion,
  set_tipos_notificacion,
  set_causa_notificacion,
  set_causas_notificacion,
  set_estados_notificacion,
  set_estado_notificacion,
  set_tipo_soporte,
  set_tipos_soporte,
  reset_state,
  set_asignacion_funcionario,
  //   set_type_applicant,
  //   set_list_on_behalf_of,
  //   set_on_behalf_of,
  set_persons,
  set_person,
  //   set_companies,
  //   set_company,
  //   set_grantors,
  //   set_grantor,
  //   set_attorneys,
  //   set_attorney,
  //   set_list_pqr_status,
  //   set_pqr_status,
  //   set_pqrs,
  //   set_pqr,
  //   set_pqr_request,
  //   set_person_types,
  //   set_person_type,
  //   set_document_types,
  //   set_document_type,
  //   set_pqr_types,
  //   set_pqr_type,
  //   set_presentation_types,
  //   set_presentation_type,
  //   set_media_types,
  //   set_media_type,
  //   set_destination_offices,
  //   set_destination_office,
  //   set_storage_mediums,
  //   set_exhibits,
  //   set_exhibit,
  //   set_file_categories,
  //   set_file_category,
  //   set_file_origins,
  //   set_file_origin,
  //   set_file_typologies,
  //   set_file_typology,
  //   set_metadata,
  //   reset_state,
  //   set_filed,
  //   set_filed_type,
  //   set_filed_types,
  //   set_filings,
  //   set_others,
} = notificaciones_slice.actions;
