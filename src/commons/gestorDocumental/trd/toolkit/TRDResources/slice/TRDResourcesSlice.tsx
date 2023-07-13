import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TRD {
  //! TRD necesarios para el funcionamiento de la aplicación
  trds: any[];
  trd_current: any;

  //! catalogo de series y subseries por Unidad organizacional
  catalado_series_subseries_unidad_organizacional: any[];

  //! data formatos tipos medios creados
  data_format_documental_type_current: any;
  data_format_documental_type: any[];

  //! data tipologias documentales
  tipologias: any[];
}

const initial_state: TRD = {
  //! TRD necesarios para el funcionamiento de la aplicación
  trds: [],
  trd_current: null,
  //! catalogo de series y subseries por Unidad organizacional
  catalado_series_subseries_unidad_organizacional: [],
  //! data formatos tipos medios creados
  data_format_documental_type_current: null,
  data_format_documental_type: [],
  //! data tipologias documentales
  tipologias: []
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

    //! catalogo TRD --- I need this information to show the data in the table and administre the data (catalogo)
    get_catalogo_trd_action: (state: any, action: PayloadAction<any>) => {
      state.catalogo_trd = action.payload;
    },

  }
});

export const {
  //* -------------------------------->
  get_trds,
  get_trd_current,
  //* -------------------------------->
  get_catalogo_series_subseries_unidad_organizacional,
  //* -------------------------------->
  get_data_format_documental_type_current,
  get_data_format_documental_type,
  //* -------------------------------->
  get_data_tipologias_documentales,
  //* -------------------------------->
  get_catalogo_trd_action,
} = trd_slice.actions;
