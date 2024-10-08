import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import { api } from '../../../../api/axios';
import { type Filtro } from '../interfaces/interfaces';

const initial_state = {
  deudores: []
};

// Listar Deudores desde Pag. Usuario Interno
export const get_deudores = createAsyncThunk('facilidades_pago/get_deudores', async () => {
  const { data } = await api.get(`recaudo/facilidades-pagos/listado-deudores/`)
  return data.data
})

// Filtrar Deudores desde Pag. Usuario Interno
export const get_filtro_deudores = createAsyncThunk('facilidades_pago/get_filtro_deudores', async (filtro: Filtro) => {
  const { data } = await api.get(`recaudo/facilidades-pagos/listado-deudores/?${filtro.parametro}=${filtro.valor}`)
  return data.data
})

// Ver la información personal del Deudor desde Pag. Usuario Interno
export const get_datos_deudor = createAsyncThunk('facilidades_pago/get_datos_deudor', async (id: number) => {
  const { data } = await api.get(`recaudo/facilidades-pagos/datos-deudor/${id}/`)
  return data.data
})

// Ver Datos para la amortización desde Pag. Usuario Interno
export const get_datos_deudor_amortizacion = createAsyncThunk('facilidades_pago/get_datos_deudor_amortizacion', async (id: number) => {
  const { data } = await api.get(`recaudo/planes-pagos/datos-facilidad-pago/${id}/`)
  return data.data
})

// Consultar información cuota plan de pagos desde Pag. Usuario Externo
export const get_cuota_recibo = createAsyncThunk('facilidades_pago/get_datos_recibo', async (id: number) => {
  const { data } = await api.get(`recaudo/planes-pagos/cuota-by-id/get/${id}/`)
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
    builder.addCase(get_filtro_deudores.fulfilled, (state, action) => {
      state.deudores = action.payload;
    });
    builder.addCase(get_datos_deudor.fulfilled, (state, action) => {
      state.deudores = action.payload;
    });
    builder.addCase(get_datos_deudor_amortizacion.fulfilled, (state, action) => {
      state.deudores = action.payload;
    });
    builder.addCase(get_cuota_recibo.fulfilled, (state, action) => {
      state.deudores = action.payload;
    });
  },
});

export const { deudores } = deudores_slice.actions;

