/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
// import { type Ipsd } from './types/slice.types';

const initialState: any | any = {
  //! TCA necesarios para el funcionamiento de la aplicación
  ccdOrganigramaCurrentBusqueda: null,
};

export const HomologacionesSlice = createSlice({
  name: 'HomologacionesSlice',
  initialState,
  reducers: {
    //* ccd actual de la busqueda
    setCcdOrganigramaCurrent: (state, action: PayloadAction<any>) => {
      state.ccdOrganigramaCurrentBusqueda = action.payload;
    },

    // ? -- función para limpiar todos los estados que se encuentran en el slice y que se usan en el módulo
    reset_states: (state) => {
      state.ccdOrganigramaCurrentBusqueda = null;
    }
  }
});

export const {
  // ! acciones sobre los ccd's y organigramas
  setCcdOrganigramaCurrent,


  // ? reset states
} = HomologacionesSlice.actions;
