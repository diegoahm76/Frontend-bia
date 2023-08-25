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

  // ! ------- AÑADIR TIPOLOGIA COMO RESERVADA ----------------->
  tipologias_resevadas: any[];
  tipologias_NO_resevadas: any[];
  mixed_tipologias: any[];

  //! selected icon from catalogo create or edit admini TCA
  selected_item_from_catalogo: any;
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
  catalog_TCA_current: null,

  // ! ------- AÑADIR TIPOLOGIA COMO RESERVADA ----------------->
  tipologias_resevadas: [],
  tipologias_NO_resevadas: [],
  mixed_tipologias: [],

  //! selected icon from catalogo create or edit admini TCA
  selected_item_from_catalogo: null
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
    },

    //* establecer tipologias reservadas y no reservadas

    set_tipologias_reservadas(state, action: PayloadAction<any>) {
      state.tipologias_resevadas = action.payload;
    },

    set_tipologias_NO_reservadas(state, action: PayloadAction<any>) {
      state.tipologias_NO_resevadas = action.payload;
    },

    set_mixed_tipologias(state, action: PayloadAction<any>) {
      state.mixed_tipologias = action.payload;
    },

    // ! ------- SELECTED ITEM FROM CATALOG ----------------->
    set_selected_item_from_catalogo_action(state, action: PayloadAction<any>) {
      state.selected_item_from_catalogo = action.payload;
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
  set_current_catalog_TCA_action,

  //* establecer tipologias reservadas y no reservadas
  set_tipologias_reservadas,
  set_tipologias_NO_reservadas,
  set_mixed_tipologias,

  // ! ------- SELECTED ITEM FROM CATALOG ----------------->
  set_selected_item_from_catalogo_action
} = TCASlice.actions;
