import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import { api } from '../../../../api/axios';

const initial_state = {
  funcionarios: [],
};

// Listar Funcionarios desde Pag. Usuario Interno
export const get_funcionarios = createAsyncThunk('facilidades_pago/get_funcionarios', async () => {
  const { data } = await api.get(`recaudo/facilidades-pagos/funcionarios/`)
  return data.data
})

export const funcionarios_slice = createSlice({
  name: 'funcionarios',
  initialState: initial_state,
  reducers: {
    funcionarios: (state, action) => {
      state.funcionarios = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_funcionarios.fulfilled, (state, action) => {
      state.funcionarios = action.payload;
    });
  },
});

export const { funcionarios } = funcionarios_slice.actions;

