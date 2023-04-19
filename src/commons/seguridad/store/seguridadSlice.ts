import { createSlice } from '@reduxjs/toolkit';
import { type IRolesInfo } from '../interfaces';

const initial_state: IRolesInfo = {
  superUser: [],
  roles: [],
};

export const seguridad_slice = createSlice({
  name: 'seguridad',
  initialState: initial_state,
  reducers: {
    set_roles: (state, { payload }) => {
      state.roles = payload;
    },
    delegate_superuser_role: (state, { payload }) => {
      state.superUser = payload;
    }
  }
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const {
  set_roles,
  delegate_superuser_role
} = seguridad_slice.actions;
