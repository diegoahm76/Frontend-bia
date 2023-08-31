/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Slice } from './types/UxE_slice.types';

const initialState: Slice = {
  //* --- control mode traslado unidad x entidad --- *//
  controlModoTrasladoUnidadXEntidad: 'modo_entrada_sin_validaciones',

  //* ---- validacion de fase de entrada --- *//
  controlFaseEntrada: 1,

  //* --- eleccion opcion traslado unidad x entidad --- *//
  eleccion_opcion_traslado_unidad_x_entidad: false,

  // ! --- almacenadores de data para las grid de los traslados -- //
  // ! --- grid actual a nuevo --- //
  gridActualANuevo: [],
  unidadesSeleccionadas: [],
  /*  gridActualANuevo: {
    data: [],
    dataSelectedUnidadNueva: []
  } */
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
    },

    // ! --- set grid actual a nuevo ---
    setGridActualANuevo: (state: any, payloadAction: PayloadAction<any>) => {
      state.gridActualANuevo = payloadAction.payload;
    },
    setUnidadesSeleccionadas: (state: any, payloadAction: PayloadAction<any>) => {
      state.unidadesSeleccionadas = payloadAction.payload;
    }
  }
});

export const {
  setControlModoTrasladoUnidadXEntidad,
  setEleccionOpcionTrasladoUnidadXEntidad,
  setControlFaseEntrada,
  //* esta funcion se debe analizar su uso , ya que tambien va a ser importante al momento de que la T026 tenga datos, así que su ejecucion se va a dar en dos momentos diferentes,probablemente en el useEffect de la pantalla principal ya que en ese momento no se da la opciókn de elegir el modo de traslado, y ese useEffect se ejecuta en el componente procesoARealizar.
  setGridActualANuevo,
  setUnidadesSeleccionadas,
} = u_x_e_slice.actions;
