import { createSlice } from '@reduxjs/toolkit';
import { type DataPersonas } from '../../../interfaces/globalModels';
import type {
  ISeguridadInfo,
  InfoUsuario,
  InfoPersonal,
  Users,
} from '../interfaces/seguridadModels';

export const initial_state_data_user_search: InfoUsuario = {
  id_usuario: 0,
  nombre_de_usuario: '',
  persona: 0,
  tipo_persona: '',
  numero_documento: '',
  primer_nombre: '',
  primer_apellido: '',
  nombre_completo: '',
  razon_social: '',
  nombre_comercial: '',
  is_superuser: false,
};

export const initial_state_data_person_search: InfoPersonal = {
  id_persona: 0,
  tipo_persona: '',
  tipo_documento: '',
  numero_documento: '',
  primer_nombre: '',
  segundo_nombre: '',
  primer_apellido: '',
  segundo_apellido: '',
  nombre_completo: '',
  razon_social: '',
  nombre_comercial: '',
  tiene_usuario: false,
  usuarios: [
    {
      id_usuario: 0,
      nombre_de_usuario: '',
    },
  ],
};

export const initial_state_user_info: Users = {
  id_usuario: 0,
  nombre_de_usuario: '',
  persona: 0,
  tipo_persona: '',
  tipo_documento: '',
  numero_documento: '',
  primer_nombre: '',
  segundo_nombre: '',
  primer_apellido: '',
  segundo_apellido: '',
  nombre_completo: '',
  razon_social: '',
  nombre_comercial: '',
  is_active: false,
  fecha_ultimo_cambio_activacion: '',
  justificacion_ultimo_cambio_activacion: '',
  is_blocked: false,
  fecha_ultimo_cambio_bloqueo: '',
  justificacion_ultimo_cambio_bloqueo: '',
  tipo_usuario: '',
  profile_img: '',
  creado_por_portal: false,
  created_at: '',
  activated_at: '',
  id_usuario_creador: 0,
  primer_nombre_usuario_creador: '',
  primer_apellido_usuario_creador: '',
  roles: [
    {
      value: 0,
      label: '',
    },
  ],
  descripcion_sucursal_empresa: undefined,
  id_sucursal_empresa: undefined
};

const initial_legal_person: DataPersonas = {
  id_persona: 0,
  nombre_unidad_organizacional_actual: '',
  tiene_usuario: false,
  primer_nombre: '',
  segundo_nombre: '',
  primer_apellido: '',
  segundo_apellido: '',
  tipo_persona: '',
  numero_documento: '',
  digito_verificacion: '',
  nombre_comercial: '',
  razon_social: '',
  pais_residencia: '',
  municipio_residencia: '',
  direccion_residencia: '',
  direccion_residencia_ref: '',
  ubicacion_georeferenciada: '',
  direccion_laboral: '',
  direccion_notificaciones: '',
  pais_nacimiento: '',
  fecha_nacimiento: new Date(),
  sexo: '',
  fecha_asignacion_unidad: '',
  es_unidad_organizacional_actual: '',
  email: '',
  email_empresarial: '',
  telefono_fijo_residencial: '',
  telefono_celular: '',
  telefono_empresa: '',
  cod_municipio_laboral_nal: '',
  cod_municipio_notificacion_nal: '',
  telefono_celular_empresa: '',
  telefono_empresa_2: '',
  cod_pais_nacionalidad_empresa: '',
  acepta_notificacion_sms: false,
  acepta_notificacion_email: false,
  acepta_tratamiento_datos: false,
  cod_naturaleza_empresa: '',
  direccion_notificacion_referencia: '',
  fecha_cambio_representante_legal: '',
  fecha_inicio_cargo_rep_legal: '',
  fecha_inicio_cargo_actual: '',
  fecha_a_finalizar_cargo_actual: '',
  observaciones_vinculacion_cargo_actual: '',
  fecha_ultim_actualizacion_autorizaciones: '',
  fecha_creacion: '',
  fecha_ultim_actualiz_diferente_crea: '',
  tipo_documento: '',
  estado_civil: '',
  id_cargo: 0,
  id_unidad_organizacional_actual: 0,
  representante_legal: 0,
  cod_municipio_expedicion_id: '',
  id_persona_crea: 0,
  id_persona_ultim_actualiz_diferente_crea: 0,
  cod_departamento_expedicion: '',
  cod_departamento_residencia: '',
  cod_departamento_notificacion: '',
  cod_departamento_laboral: '',
};

const initial_state: ISeguridadInfo = {
  superUser: [],
  roles: [],
  rol: {
    id_rol: 0,
    nombre_rol: '',
    descripcion_rol: '',
    Rol_sistema: false,
  },
  users: [],
  persons: [],
  action_admin_users: '',
  data_user_search: initial_state_data_user_search,
  data_person_search: initial_state_data_person_search,
  user_info: initial_state_user_info,
  legal_person: initial_legal_person,
};

export const seguridad_slice = createSlice({
  name: 'seguridad',
  initialState: initial_state,
  reducers: {
    set_rol: (state, { payload }) => {
      state.rol = payload;
    },
    delegate_superuser_role: (state, { payload }) => {
      state.superUser = payload;
    },
    set_users: (state, { payload }) => {
      state.users = payload;
      state.user_info = initial_state_user_info;
    },
    set_persons: (state, { payload }) => {
      state.persons = payload;
      state.user_info = initial_state_user_info;
    },
    set_action_admin_users: (state, { payload }) => {
      state.action_admin_users = payload;
    },
    set_user_info: (state, { payload }) => {
      state.user_info = payload;
    },
    set_data_user_search: (state, { payload }) => {
      state.data_user_search = payload;
    },
    set_data_person_search: (state, { payload }) => {
      state.data_person_search = payload;
    },
    set_data_legal_person: (state, { payload }) => {
      state.legal_person = payload;
    },
  },
});

export const {
  set_rol,
  set_users,
  set_persons,
  set_user_info,
  set_data_user_search,
  set_action_admin_users,
  set_data_person_search,
  delegate_superuser_role,
  set_data_legal_person,
} = seguridad_slice.actions;
