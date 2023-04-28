import { createSlice } from '@reduxjs/toolkit';
import { type IRolesInfo } from '../interfaces/seguridadModels';

const initial_state: IRolesInfo = {
  superUser: [],
  roles: [],
  rol: {
    rol:{
      id_rol: 0,
      nombre_rol: '',
      descripcion_rol: '',
      Rol_sistema: false,
    },
    permisos: [],
  }
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
    }
  }
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const {
  set_roles,
  set_rol,
  delegate_superuser_role
} = seguridad_slice.actions;
