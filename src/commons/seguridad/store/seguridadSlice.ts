import { createSlice } from '@reduxjs/toolkit';
import { type IRolesInfo } from '../interfaces/seguridadModels';

const initial_state: IRolesInfo = {
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
      state.roles = payload;
    },
    set_rol: (state, {payload}) => {
      state.rol = payload
      console.log("state_rol", state.rol);
    }
  }
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const {
  set_roles,
  set_rol
} = seguridad_slice.actions;
