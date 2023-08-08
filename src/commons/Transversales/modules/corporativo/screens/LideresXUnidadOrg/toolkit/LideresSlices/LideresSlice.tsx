import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { lideresInterface } from '../types/LideresSlice.types';

const initial_state: lideresInterface = {
  //* -- organigrama lideres interaction -- *//
  organigramas_list: [],
  organigrama_lideres_current: null,

  //* -- asignacion lideres interaction -- *//
  asignaciones_lideres_list: [],
  asignacion_lideres_current: null,

  //* -- unidades interaction -- *//
  unidades_list: [],
  unidad_current: null,

  //* busqueda avanzada personas interaction *//
  busqueda_avanzada_personas_list: []
};

export const lideres_slice = createSlice({
  name: 'lideres_slice',
  initialState: initial_state,
  reducers: {
    // ! --- get list busqueda organigramas ---
    get_list_busqueda_organigramas: (
      state: any,
      action: PayloadAction<any>
    ) => {
      state.organigramas_list = action.payload;
    },

    // !  --- set organigrama lideres current ---
    set_organigrama_lideres_current: (
      state: any,
      action: PayloadAction<any>
    ) => {
      state.organigrama_lideres_current = action.payload;
    },

    // ! --- get list asignaciones lideres ---
    get_list_asignaciones_lideres: (
      state: any,

      action: PayloadAction<any>
    ) => {
      state.asignaciones_lideres_list = action.payload;
    },

    // ! --- set asignacion lideres current ---
    set_asignacion_lideres_current: (
      state: any,
      action: PayloadAction<any>
    ) => {
      state.asignacion_lideres_current = action.payload;
    },

    // ! --- get list unidades ---
    get_list_unidades: (
      state: any,

      action: PayloadAction<any>
    ) => {
      state.unidades_list = action.payload;
    },

    set_unidad_current: (state: any, action: PayloadAction<any>) => {
      state.unidad_current = action.payload;
    },

    // ? busqueda avanzada personas interaction
    get_list_busqueda_avanzada_personas: (
      state: any,
      action: PayloadAction<any>
    ) => {
      state.busqueda_avanzada_personas_list = action.payload;
    }
  }
});

export const {
  //* organigrama lideres interaction
  set_organigrama_lideres_current,
  get_list_busqueda_organigramas,

  //* asignacion lideres interaction
  get_list_asignaciones_lideres,
  set_asignacion_lideres_current,

  //* unidades interaction
  get_list_unidades,
  set_unidad_current,

  //* busqueda avanzada personas interaction
  get_list_busqueda_avanzada_personas
} = lideres_slice.actions;
