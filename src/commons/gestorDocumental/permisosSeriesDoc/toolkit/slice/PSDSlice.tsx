/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Ipsd } from './types/slice.types';

const initialState: Ipsd = {
  //! TCA necesarios para el funcionamiento de la aplicación
  ccdsBusqueda: [],
  ccd_current_busqueda: null,
  unidadesOrganizacionales: [],
};

export const PsdSlice = createSlice({
  name: 'PsdSlice',
  initialState,
  reducers: {
    //* busqueda de ccd's
    set_busqueda_ccds_action: (state, action: PayloadAction<any>) => {
      state.ccdsBusqueda = action.payload;
    },
    //* ccd actual de la busqueda
    set_ccd_current_busqueda_action: (state, action: PayloadAction<any>) => {
      state.ccd_current_busqueda = action.payload;
    },

    //* unidades organizacionales
    set_unidades_organizacionales_action: (state, action: PayloadAction<any>) => {
      state.unidadesOrganizacionales = action.payload;
    }
  }
});

export const {
  // ! acciones sobre los ccd's
  set_busqueda_ccds_action,
  set_ccd_current_busqueda_action,
  // ! acciones sobre las unidades organizacionales
  set_unidades_organizacionales_action
} = PsdSlice.actions;
