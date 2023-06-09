import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../../api/axios';
import { type Filtro } from '../../facilidadPago/interfaces/interfaces';

interface FiltroFacilidad {
  parametro: string;
  valor: string;
  tipo: string;
}

const initial_state = {
  reportes_recaudo: [],
};

// Ver Reporte Detallado Cartera
export const get_cartera_detallada = createAsyncThunk('reportes_recaudo/cartera_detallada', async () => {
  const { data } = await api.get('recaudo/reportes/reporte-general-detallado/')
  return data.data
})

// Filtro Reporte Detallado Cartera
export const get_filtro_cartera_detallada = createAsyncThunk('reportes_recaudo/filtro_cartera_detallada', async (filtro: Filtro) => {
  const { data } = await api.get(`recaudo/reportes/reporte-general-detallado/?${filtro.parametro}=${filtro.valor}`)
  return data.data
})

// Ver Reporte Facilidad de Pago General
export const get_facilidad_general = createAsyncThunk('reportes_recaudo/facilidad_general', async () => {
  const { data } = await api.get('recaudo/reportes/reporte-facilidades-pagos/')
  return data.data
})

// Ver Reporte Detallado Facilidad
export const get_facilidad_detallada = createAsyncThunk('reportes_recaudo/facilidad_detallada', async () => {
  const { data } = await api.get('recaudo/reportes/reporte-facilidades-pagos-detalle/')
  return data.data
})

// Filtro Reporte Detallado Facilidad
export const get_filtro_facilidad_detallada = createAsyncThunk('reportes_recaudo/filtro_facilidad_detallada', async (filtro: FiltroFacilidad) => {
  const { data } = await api.get(`recaudo/reportes/reporte-facilidades-pagos-detalle/?tipo_cobro=${filtro.tipo}&${filtro.parametro}=${filtro.valor}`)
  return data.data
})

export const reportes_recaudo_slice = createSlice({
  name: 'reportes_recaudo',
  initialState: initial_state,
  reducers: {
    reportes_recaudo: (state, action) => {
      state.reportes_recaudo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_cartera_detallada.fulfilled, (state, action) => {
      state.reportes_recaudo = action.payload;
    });
    builder.addCase(get_filtro_cartera_detallada.fulfilled, (state, action) => {
      state.reportes_recaudo = action.payload;
    });
    builder.addCase(get_facilidad_general.fulfilled, (state, action) => {
      state.reportes_recaudo = action.payload;
    });
    builder.addCase(get_facilidad_detallada.fulfilled, (state, action) => {
      state.reportes_recaudo = action.payload;
    });
    builder.addCase(get_filtro_facilidad_detallada.fulfilled, (state, action) => {
      state.reportes_recaudo = action.payload;
    });
  },
});

export const { reportes_recaudo } = reportes_recaudo_slice.actions;
