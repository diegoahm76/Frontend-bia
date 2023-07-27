/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface TCASliceInterface {
  //! TCA necesarios para el funcionamiento de la aplicación
  tcas: any[];
  tca_current: any;
}

const initialState: TCASliceInterface = {
  //! TCA necesarios para el funcionamiento de la aplicación
  tcas: [],
  tca_current: null,
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
    }
  }
});

export const {
  // * TCA necesarios para el funcionamiento de la aplicación
  set_get_tcas_action,
  set_current_tca_action
} = TCASlice.actions;
