import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import { api } from '../../../../api/axios';

const initial_state = {
  deudores: [],
};

export const get_deudores = createAsyncThunk('facilidades_pago/get_deudores', async () => {
  const { data } = await api.get(`recaudo/pagos/listado-deudores/`)
  return data.data
})

export const deudores_slice = createSlice({
  name: 'deudores',
  initialState: initial_state,
  reducers: {
    deudores: (state, action) => {
      state.deudores = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_deudores.fulfilled, (state, action) => {
      state.deudores = action.payload;
    });
  },
});
