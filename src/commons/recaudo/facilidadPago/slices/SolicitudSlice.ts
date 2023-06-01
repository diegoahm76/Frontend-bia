import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../../api/axios';

const initial_state = {
  solicitud_facilidad: [],
};

// Ver la información de la facilidad de pago desde Pag. Usuario Interno
export const get_facilidad_solicitud = createAsyncThunk('facilidades_pago/solicitud', async (id: number) => {
  const { data } = await api.get(`recaudo/pagos/consulta-facilidades-pagos/${id}/`)
  return data.data
})

export const solicitud_facilidad_slice = createSlice({
  name: 'solicitud_facilidad',
  initialState: initial_state,
  reducers: {
    solicitud_facilidad: (state, action) => {
      state.solicitud_facilidad = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_facilidad_solicitud.fulfilled, (state, action) => {
      state.solicitud_facilidad = action.payload;
    });
  },
});

export const { solicitud_facilidad } = solicitud_facilidad_slice.actions;
