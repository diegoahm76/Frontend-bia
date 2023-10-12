/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
// import { type Ipsd } from './types/slice.types';

interface InitialState {
  ccdOrganigramaCurrentBusqueda: null | { [key: string]: any };
}
const initialState: InitialState = {
  //! variable de estado para el ccd actual de la busqueda
  ccdOrganigramaCurrentBusqueda: null,
};

export const AsigUniRespSlice = createSlice({
  name: 'AsigUniRespSlice',
  initialState,
  reducers: {
    //* ccd actual de la busqueda
    setCcdOrganigramaCurrent: (state, action: PayloadAction<any>) => {
      state.ccdOrganigramaCurrentBusqueda = action.payload;
    },
    // ? -- función para limpiar todos los estados que se encuentran en el slice y que se usan en el módulo
    reset_states: (state) => {
      state.ccdOrganigramaCurrentBusqueda = null;
    },
  },
});

export const {
  // ! acciones sobre los ccd's y organigramas
  setCcdOrganigramaCurrent,

  // ? reset states
  reset_states,
} = AsigUniRespSlice.actions;
