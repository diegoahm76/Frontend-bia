import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TRD {
  //! TRD necesarios para el funcionamiento de la aplicación
  trds: any[];
  trd_current: any;

  //! catalogo de series y subseries por Unidad organizacional

  catalado_series_subseries_unidad_organizacional: any[];
}

const initial_state: TRD = {
  //! TRD necesarios para el funcionamiento de la aplicación
  trds: [],
  trd_current: null,
  //! catalogo de series y subseries por Unidad organizacional
  catalado_series_subseries_unidad_organizacional: []
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
    }
  }
});

export const {
  get_trds,
  get_trd_current,
  get_catalogo_series_subseries_unidad_organizacional
} = trd_slice.actions;
