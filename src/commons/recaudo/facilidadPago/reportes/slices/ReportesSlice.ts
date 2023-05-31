import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../../../api/axios';
import { type Filtro } from '../../interfaces/interfaces';

const initial_state = {
  reportes_facilidades: [],
};

// Ver Reporte Detallado Cartera
export const get_cartera_detallada = createAsyncThunk('reportes_facilidades/cartera_detallada', async () => {
  const { data } = await api.get('recaudo/reportes/reporte-general-detallado/')
  return data.data
})

// Filtro Reporte Detallado Cartera
export const get_filtro_cartera_detallada = createAsyncThunk('reportes_facilidades/filtro_cartera_detallada', async (filtro: Filtro) => {
  const { data } = await api.get(`recaudo/reportes/reporte-general-detallado/?${filtro.parametro}=${filtro.valor}`)
  return data.data
})

export const reportes_facilidades_slice = createSlice({
  name: 'reportes_facilidades',
  initialState: initial_state,
  reducers: {
    reportes: (state, action) => {
      state.reportes_facilidades = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_cartera_detallada.fulfilled, (state, action) => {
      state.reportes_facilidades = action.payload;
    });
    builder.addCase(get_filtro_cartera_detallada.fulfilled, (state, action) => {
      state.reportes_facilidades = action.payload;
    });
  },
});

export const { reportes } = reportes_facilidades_slice.actions;
