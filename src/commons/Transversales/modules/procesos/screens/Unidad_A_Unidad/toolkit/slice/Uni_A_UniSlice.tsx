/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Unidad_A_Unidad_Interface } from './types/Uni_A_Uni.types';

const initialState: Unidad_A_Unidad_Interface = {
  organigrama_anterior: null,
  unidades_org_anterior: [],
  unidades_org_actual: [],
  listado_personas_unidades: []
};

export const uni_a_uni_slice = createSlice({
  name: 'uni_a_uni_slice',
  initialState,
  reducers: {
    setOrganigramaAnterior: (state, action: PayloadAction<any>) => {
      state.organigrama_anterior = action.payload;
    },
    setUnidadesOrgAnterior: (state, action: PayloadAction<any>) => {
      state.unidades_org_anterior = action.payload;
    },
    setUnidadesOrgActual: (state, action: PayloadAction<any>) => {
      state.unidades_org_actual = action.payload;
    },
    setListadoPersonasUnidades: (state, action: PayloadAction<any>) => {
      state.listado_personas_unidades = action.payload;
    }
  }
});

export const {
  setOrganigramaAnterior,
  setUnidadesOrgAnterior,
  setUnidadesOrgActual,
  setListadoPersonasUnidades
} = uni_a_uni_slice.actions;
