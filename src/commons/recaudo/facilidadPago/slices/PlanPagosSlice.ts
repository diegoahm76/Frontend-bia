import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../../api/axios';

const initial_state = {
  plan_pagos: [],
};

// Validar plan de pagos desde Pag. Usuario Interno
export const get_validacion_plan_pagos = createAsyncThunk('facilidades_pago/validacion_plan_pagos', async (id: number) => {
  const { data } = (await api.get(`recaudo/planes-pagos/validacion/${id}/`))
  return data
})

export const plan_pagos_slice = createSlice({
  name: 'plan_pagos',
  initialState: initial_state,
  reducers: {
    plan_pagos: (state, action) => {
      state.plan_pagos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_validacion_plan_pagos.fulfilled, (state, action) => {
      state.plan_pagos = action.payload;
    });
  },
});

export const { plan_pagos } = plan_pagos_slice.actions;
