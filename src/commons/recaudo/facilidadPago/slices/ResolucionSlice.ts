import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../../api/axios';

const initial_state = {
  resolucion_facilidad: [],
};

// Validar resolución desde Pag. Usuario Interno
export const get_validacion_resolucion = createAsyncThunk('facilidades_pago/validacion_resolucion', async (id: number) => {
  const { data } = (await api.get(`recaudo/planes-pagos/validacion-resolucion/${id}/`))
  return data
})

export const resolucion_facilidad_slice = createSlice({
  name: 'resolucion_facilidad',
  initialState: initial_state,
  reducers: {
    resolucion_facilidad: (state, action) => {
      state.resolucion_facilidad = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_validacion_resolucion.fulfilled, (state, action) => {
      state.resolucion_facilidad = action.payload;
    });
  },
});

export const { resolucion_facilidad } = resolucion_facilidad_slice.actions;
