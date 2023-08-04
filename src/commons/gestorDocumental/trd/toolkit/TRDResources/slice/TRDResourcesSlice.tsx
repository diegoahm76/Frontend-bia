import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type TRD } from './types/TRDResourcesSlices.types';

const initial_state: TRD = {
  //! TRD necesarios para el funcionamiento de la aplicación
  trds: [],
  trd_current: null,
  //! catalogo de series y subseries por Unidad organizacional
  catalado_series_subseries_unidad_organizacional: [],
  ccd_current_catalogo_ser_sub_unid: null,
  //! data formatos tipos medios creados
  data_format_documental_type_current: null,
  data_format_documental_type: [],
  //! data tipologias documentales
  tipologias: [],
  tipologias_asociadas_a_trd: [],
  tipologias_documental_current: null,
  //! catalogo TRD
  catalogo_trd: [],

  //! selected_item_from_catalogo_trd
  selected_item_from_catalogo_trd: null,

  //! add tipologia documental to trd
  nuevasTipologias: [],
  // ! historial de cambios
  historialCambios: [],
};

export const trd_slice = createSlice({
  name: 'trd_slice',
  initialState: initial_state,
  reducers: {
    //! TRD necesarios para el funcionamiento de la aplicación
    get_trds: (state: any, action: PayloadAction<any>) => {
      state.trds = action.payload;
    },
    get_trd_current: (state: any, action: PayloadAction<any | null>) => {
      state.trd_current = action.payload;
    },

    //! catalogo de series y subseries por Unidad organizacional
    get_catalogo_series_subseries_unidad_organizacional: (
      state: any,
      action: PayloadAction<any>
    ) => {
      state.catalado_series_subseries_unidad_organizacional = action.payload;
    },
    //! ccd current catalogo
    get_ccd_current_catalogo_ser_sub_unid: (
      state: any,
      action: PayloadAction<any>
    ) => {
      state.ccd_current_catalogo_ser_sub_unid = action.payload;
    },

    //! data formatos tipos medios creados

    get_data_format_documental_type_current: (
      state: any,
      action: PayloadAction<any>
    ) => {
      state.data_format_documental_type_current = action.payload;
    },

    get_data_format_documental_type: (
      state: any,
      action: PayloadAction<any>
    ) => {
      state.data_format_documental_type = action.payload;
    },

    //! data tipologias documentales
    get_data_tipologias_documentales: (
      state: any,
      action: PayloadAction<any>
    ) => {
      state.tipologias = action.payload;
    },
    get_tipologias_asociadas_a_trd: (
      state: any,
      action: PayloadAction<any>
    ) => {
      state.tipologias_asociadas_a_trd = action.payload;
    },
    get_current_tipologia_documental_action: (
      state: any,
      action: PayloadAction<any>
    ) => {
      state.tipologias_documental_current = action.payload;
    },

    //! catalogo TRD --- I need this information to show the data in the table and administre the data (catalogo)
    get_catalogo_trd_action: (state: any, action: PayloadAction<any>) => {
      state.catalogo_trd = action.payload;
    },

    //! selected_item_from_catalogo_trd
    set_selected_item_from_catalogo_trd_action: (
      state: any,
      action: PayloadAction<any>
    ) => {
      state.selected_item_from_catalogo_trd = action.payload;
    },

    //! add tipologia documental to trd
    add_tipologia_documental_to_trd: (state: any, action: PayloadAction<any>) => {
      state.nuevasTipologias = action.payload;
    },

    //! historial de cambios
    get_historial_cambios_action: (state: any, action: PayloadAction<any>) => {
      state.historialCambios = action.payload;
    }


  }
});

export const {
  //* -------------------------------->
  get_trds,
  get_trd_current,
  //* -------------------------------->
  get_catalogo_series_subseries_unidad_organizacional,
  get_ccd_current_catalogo_ser_sub_unid,
  //* -------------------------------->
  get_data_format_documental_type_current,
  get_data_format_documental_type,
  //* -------------------------------->
  get_data_tipologias_documentales,
  get_current_tipologia_documental_action,
  get_tipologias_asociadas_a_trd,
  //* -------------------------------->
  get_catalogo_trd_action,
  //* -------------------------------->
  set_selected_item_from_catalogo_trd_action,
  //* -------------------------------->
  add_tipologia_documental_to_trd,
  get_historial_cambios_action,
} = trd_slice.actions;
