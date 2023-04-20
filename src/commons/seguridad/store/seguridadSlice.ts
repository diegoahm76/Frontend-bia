import { createSlice } from '@reduxjs/toolkit';
import { type ISeguridadInfo } from '../interfaces/seguridadModels';

const initial_state: ISeguridadInfo = {
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
};

export const seguridad_slice = createSlice({
  name: 'seguridad',
  initialState: initial_state,
  reducers: {    
    set_roles: (state, { payload }) => {  
      state.roles = payload;
    },
    set_rol: (state, {payload}) => {
      state.rol = payload
    },
    set_users: (state, {payload}) => {
      state.users = payload
    },
    set_persons: (state, {payload}) => {
      state.persons = payload
    }

  }
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const {
  set_roles,
  set_rol,
  set_users,
  set_persons
} = seguridad_slice.actions;
