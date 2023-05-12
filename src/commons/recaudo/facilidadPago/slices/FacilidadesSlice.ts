import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../../api/axios';

const initial_state = {
  facilidades: [],
};

// Listar facilidades de pago ingresadas desde Pag. Usuario Admin
export const get_facilidades_ingresadas = createAsyncThunk('facilidades_pago/admin', async () => {
  const { data } = await api.get('recaudo/pagos/listado-facilidades-pagos/')
  return data.data
})

// Listar facilidades de pago asignadas desde Pag. Usuario Interno
export const get_facilidades_asignadas = createAsyncThunk('facilidades_pago/funcionario', async () => {
  const { data } = await api.get('recaudo/pagos/listado-facilidades-funcionarios/')
  return data
})

export const facilidades_slice = createSlice({
  name: 'facilidades',
  initialState: initial_state,
  reducers: {
    facilidades: (state, action) => {
      state.facilidades = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_facilidades_ingresadas.fulfilled, (state, action) => {
      state.facilidades = action.payload;
    });
    builder.addCase(get_facilidades_asignadas.fulfilled, (state, action) => {
      state.facilidades = action.payload;
    });
  },
});

export const { facilidades } = facilidades_slice.actions;
