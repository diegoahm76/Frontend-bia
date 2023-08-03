import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { lideresInterface } from './types/LideresSlice.types';

const initial_state: lideresInterface = {
  //* -- organigrama lideres interaction -- *//
  organigramas_list: [],
  organigrama_lideres_current: null
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
    }
  }
});

export const {
  set_organigrama_lideres_current,
  get_list_busqueda_organigramas
} = lideres_slice.actions;
