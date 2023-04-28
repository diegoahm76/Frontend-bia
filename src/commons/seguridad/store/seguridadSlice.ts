import { createSlice } from '@reduxjs/toolkit';
import { type IRolesInfo } from '../interfaces/seguridadModels';

const initial_state: IRolesInfo = {
  superUser: []
};

export const seguridad_slice = createSlice({
  name: 'seguridad',
  initialState: initial_state,
  reducers: {
    delegate_superuser_role: (state, { payload }) => {
      state.superUser = payload;
    }
  }
});

export const { delegate_superuser_role } = seguridad_slice.actions;
