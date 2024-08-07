import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../../api/axios';

const initial_state = {
  obligaciones: [],
};

// Listar Obligaciones desde Pag. Usuario Externo
export const get_obligaciones = createAsyncThunk('facilidades_pago/get_obligaciones', async () => {
  const { data } = await api.get(`recaudo/facilidades-pagos/listado-obligaciones/`)
  return data.data
})

// Listar Obligaciones de Usuario Externo desde Pag. Usuario Interno
export const get_obligaciones_id = createAsyncThunk('facilidades_pago/get_obligaciones_id', async (identificacion: string) => {
  const { data } = await api.get(`recaudo/liquidaciones/obetener-obligaciones-deudor/${identificacion}/`)
  return data.data
})

export const get_obligaciones_factura = createAsyncThunk('facilidades_pago/get_obligaciones_id', async (identificacion: string) => {
  const { data } = await api.get(`recaudo/liquidaciones/expedientes-deudor/get/${identificacion}/`)
  return data.data
})



export const obligaciones_slice = createSlice({
  name: 'obligaciones',
  initialState: initial_state,
  reducers: {
    obligaciones_seleccionadas: (state, action) => {
      state.obligaciones = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_obligaciones_id.fulfilled, (state, action) => {
      state.obligaciones = action.payload;
    });
    builder.addCase(get_obligaciones.fulfilled, (state, action) => {
      state.obligaciones = action.payload;
    });
  },
});

export const { obligaciones_seleccionadas } = obligaciones_slice.actions;
