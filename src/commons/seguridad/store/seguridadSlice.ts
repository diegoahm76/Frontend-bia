import { createSlice } from '@reduxjs/toolkit';
import produce from 'immer';
import type {  ISeguridadInfo,InfoUsuario,InfoPersonal } from '../interfaces/seguridadModels';


const initial_state_data_user_search: InfoUsuario = {
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

const initial_state_data_person_search: InfoPersonal = {
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
};

const initial_state_user_info = {
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
  roles:[ {
    id_rol: 0,
    nombre_rol: ''
  }]
}

const initial_state: ISeguridadInfo = {
  superUser:[],
  roles: [],
  rol: {
    rol:{
      id_rol: 0,
      nombre_rol: '',
      descripcion_rol: '',
      Rol_sistema: false,
    },
    permisos: [],
  },
  users: [],
  persons: [],
  action_admin_users: '',
  data_user_search: initial_state_data_user_search,
  data_person_search: initial_state_data_person_search,
  user_info: initial_state_user_info,
};

export const seguridad_slice = createSlice({
  name: 'seguridad',
  initialState: initial_state,
  reducers: {    
    set_roles: (state, { payload }) => {
      console.log('payload', payload)
      state.roles = payload;
    },
    set_rol: (state, {payload}) => {
      state.rol = payload
      console.log("state_rol", state.rol);
    },
    delegate_superuser_role: (state, { payload }) => {
      state.superUser = payload;
    },
    set_users: (state, {payload}) => {
      state.users = payload
    },
    set_persons: (state, {payload}) => {
      state.persons = payload
    },
    set_action_admin_users: (state, {payload}) => {
      state.action_admin_users = payload
    },
    set_user_info: (state, {payload}) => {
      return produce(state, draftState => {
        draftState.user_info = payload;
      });
    },
    set_data_user_search: (state, {payload}) => {
      state.data_user_search = payload
    },
    set_data_person_search: (state, {payload}) => {
      state.data_person_search = payload
    }

  }
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const {
  set_roles,
  set_rol,
  delegate_superuser_role,
  set_users,
  set_persons,
  set_action_admin_users,
  set_user_info,
  set_data_user_search,
  set_data_person_search
} = seguridad_slice.actions;
