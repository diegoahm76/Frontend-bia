import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../../api/axios';

interface GenererarAmortizacion {
  id_facilidad : number;
  fecha_final: string;
  cuotas: number;
  periodicidad: number;
  abono:Number;
}

const initial_state = {
  plan_pagos: [],
};

// Validar plan de pagos desde Pag. Usuario Interno
export const get_validacion_plan_pagos = createAsyncThunk('facilidades_pago/validacion_plan_pagos', async (id: number) => {
  const { data } = await api.get(`recaudo/planes-pagos/validacion/${id}/`)
  return data
})

// Ver Datos para la amortización desde Pag. Usuario Interno
export const get_datos_amortizacion = createAsyncThunk('facilidades_pago/amortizacion', async (amortizacion: GenererarAmortizacion) => {
  const { data } = await api.get(`recaudo/planes-pagos/plan-obligaciones-facilidad/${amortizacion.id_facilidad}/?fecha_final=${amortizacion.fecha_final}&cuotas=${amortizacion.cuotas}&periodicidad=${amortizacion.periodicidad}&abono=${amortizacion.abono}`)
  return data.data
})

export const plan_pagos_slice = createSlice({
  name: 'plan_pagos',
  initialState: initial_state,
  reducers: {
    plan_pagos: (state, action) => {
      state.plan_pagos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_validacion_plan_pagos.fulfilled, (state, action) => {
      state.plan_pagos = action.payload;
    });
    builder.addCase(get_datos_amortizacion.fulfilled, (state, action) => {
      state.plan_pagos = action.payload;
    });
  },
});

export const { plan_pagos } = plan_pagos_slice.actions;
