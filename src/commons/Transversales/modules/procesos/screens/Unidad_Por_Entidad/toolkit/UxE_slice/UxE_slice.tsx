/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  //* --- control mode traslado unidad x entidad --- *//
  controlModoTrasladoUnidadXEntidad: 'modo_entrada_sin_validaciones',

  //* ---- validacion de fase de entrada --- *//
  controlFaseEntrada: 1,

  //* --- eleccion opcion traslado unidad x entidad --- *//
  eleccion_opcion_traslado_unidad_x_entidad: false
};

export const u_x_e_slice = createSlice({
  name: 'u_x_e_slice',
  initialState,
  reducers: {
    // ! --- set control mode traslado unidad x entidad ---
    setControlModoTrasladoUnidadXEntidad: (
      state: any,
      payloadAction: PayloadAction<string>
    ) => {
      state.controlModoTrasladoUnidadXEntidad = payloadAction.payload;
    },

    // ! --- set control fase entrada ---
    setControlFaseEntrada: (
      state: any,
      payloadAction: PayloadAction<number>
    ) => {
      state.controlFaseEntrada = payloadAction.payload;
    },

    //* eleccion opcion traslado unidad x entidad
    setEleccionOpcionTrasladoUnidadXEntidad: (
      state: any,
      payloadAction: PayloadAction<boolean>
    ) => {
      state.eleccion_opcion_traslado_unidad_x_entidad = payloadAction.payload;
    }
  }
});

export const {
  setControlModoTrasladoUnidadXEntidad,
  setEleccionOpcionTrasladoUnidadXEntidad,
  setControlFaseEntrada,
} = u_x_e_slice.actions;
