/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
// import { type Ipsd } from './types/slice.types';

const initialState: any= {
  //! elemento actual dentro del módulo búsqueda ccd 
  ccdOrganigramaCurrentBusquedaOfiResp: null,
  //! unidades que ya fueron asignadas como responsables de series documentales
  unidadesResponsablesActual: [],
};

export const DelOfiResSlice = createSlice({
  name: 'DelOfiResSlice',
  initialState,
  reducers: {
    //* ccd actual de la busqueda
    setCcdOrganigramaCurrentAsiOfiResp: (state, action: PayloadAction<any>) => {
      state.ccdOrganigramaCurrentBusquedaOfiResp = action.payload;
    },


    //* unidades que ya fueron asignadas como responsables de series documentales
    setUnidadesResponsablesActual: (state, action: PayloadAction<any>) => {
      state.unidadesResponsablesActual = action.payload;
    },

    // ? -- función para limpiar todos los estados que se encuentran en el slice y que se usan en el módulo
    reset_states_asi_ofi_resp: (state) => {
      state.ccdOrganigramaCurrentBusquedaOfiResp = null;
    },
  },
});

export const {
  // ! acciones sobre los ccd's y organigramas
  setCcdOrganigramaCurrentAsiOfiResp,
  // ! unidades que ya fueron asignadas como responsables de series documentales
  setUnidadesResponsablesActual,
  // ? reset states
  reset_states_asi_ofi_resp,
} = DelOfiResSlice.actions;
