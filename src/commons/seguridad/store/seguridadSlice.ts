import { createSlice } from '@reduxjs/toolkit';
import { type IRolesInfo } from '../interfaces';

const initial_state: IRolesInfo = {
  roles: [],
};

export const seguridad_slice = createSlice({
  name: 'seguridad',
  initialState: initial_state,
  reducers: {    
    set_roles: (state, { payload }) => {
      console.log('payload', payload)
      state.roles = payload;
      console.log('state', state.roles)
    },
  }
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const {
  set_roles,
} = seguridad_slice.actions;
