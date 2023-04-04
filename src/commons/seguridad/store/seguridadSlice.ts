import { createSlice } from '@reduxjs/toolkit';
// import clienteAxios from '../../../api/axios';
import { type IRolesInfo } from '../interfaces/seguridadModels';

const initial_state: IRolesInfo = {
  roles: [],
};

export const seguridad_slice = createSlice({
  name: 'seguridad',
  initialState: initial_state,
  reducers: {    
    set_roles: (state, { payload }) => {
      state.roles = payload;
    },
  }
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const {
  set_roles,
} = seguridad_slice.actions;
