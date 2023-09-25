/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
// import { type Ipsd } from './types/slice.types';

const initialState: any | any = {
  //! TCA necesarios para el funcionamiento de la aplicación
  ccd_current_busqueda: null,
};

export const HomologacionesSlice = createSlice({
  name: 'HomologacionesSlice',
  initialState,
  reducers: {
    //* ccd actual de la busqueda
    setCcdOrganigramaCurrent: (state, action: PayloadAction<any>) => {
      state.ccdOrganigramaCurrentBusqueda = action.payload;
    },

    reset_states: (state) => {
      state.ccdOrganigramaCurrentBusqueda = [];
      // state.ccd_current_busqueda = null;
    }
  }
});

export const {
  // ! acciones sobre los ccd's y organigramas
  setCcdOrganigramaCurrent
} = HomologacionesSlice.actions;
