import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import { api } from '../../../../api/axios';

const initial_state = {
  calidad_personas: []
};

// Ver la información de contacto del Deudor desde Pag. Usuario Interno
export const get_datos_contacto = createAsyncThunk('facilidades_pago/get_datos_contacto', async (id: number) => {
  const { data } = await api.get(`recaudo/pagos/datos-contacto-deudor/${id}/`)
  return data.data
})

export const calidad_personas_slice = createSlice({
  name: 'calidad_personas',
  initialState: initial_state,
  reducers: {
    calidad_personas: (state, action) => {
      state.calidad_personas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_datos_contacto.fulfilled, (state, action) => {
      state.calidad_personas = action.payload;
    });
  },
});

export const { calidad_personas } = calidad_personas_slice.actions;
