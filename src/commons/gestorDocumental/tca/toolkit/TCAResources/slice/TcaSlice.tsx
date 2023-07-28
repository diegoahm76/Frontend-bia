/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface TCASliceInterface {
  //! TCA necesarios para el funcionamiento de la aplicación
  tcas: any[];
  tca_current: any;

  // ! ------- CATALOG TRD ----------------->
  catalog_trd: any[];
  catalog_trd_current: any;

  // ! ------- CATALOG TCA ----------------->
  catalog_TCA: any[];
  catalog_TCA_current: any;
}

const initialState: TCASliceInterface = {
  //! TCA necesarios para el funcionamiento de la aplicación
  tcas: [],
  tca_current: null,

  // ! ------- CATALOG TRD ----------------->
  catalog_trd: [],
  catalog_trd_current: null,

  // ! ------- CATALOG TCA ----------------->
  catalog_TCA: [],
  catalog_TCA_current: null
};

export const TCASlice = createSlice({
  name: 'tca_slice',
  initialState,
  reducers: {
    // ? se asgina en busqueda de tca
    set_get_tcas_action(state, action: PayloadAction<any>) {
      state.tcas = action.payload;
    },
    // ? se asgina en busqueda de tca al seleccionar un tca con el icono de ver
    set_current_tca_action(state, action: PayloadAction<any>) {
      state.tca_current = action.payload;
    },

    // ! ------- CATALOG TRD ----------------->
    set_catalog_trd_action(state, action: PayloadAction<any>) {
      state.catalog_trd = action.payload;
    },

    set_current_catalog_trd_action(state, action: PayloadAction<any>) {
      state.catalog_trd_current = action.payload;
    },

    // ! ------- CATALOG TCA ----------------->
    set_catalog_TCA_action(state, action: PayloadAction<any>) {
      state.catalog_TCA = action.payload;
    },

    set_current_catalog_TCA_action(state, action: PayloadAction<any>) {
      state.catalog_TCA_current = action.payload;
    }
  }
});

export const {
  // * TCA necesarios para el funcionamiento de la aplicación
  set_get_tcas_action,
  set_current_tca_action,

  // ! ------- CATALOG TRD ----------------->
  set_catalog_trd_action,
  set_current_catalog_trd_action,

  // ! ------- CATALOG TCA ----------------->
  set_catalog_TCA_action,
  set_current_catalog_TCA_action
} = TCASlice.actions;
