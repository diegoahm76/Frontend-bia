/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
// import { type Ipsd } from './types/slice.types';

interface InitialState {
  // ! organigrama actual de la busqueda
  ccdOrganigramaCurrentBusqueda: any;
  // ? lista de secciones persistentes del ccd nuevo
  seccionesPersistentesCcdNuevo: any;

  // ? lsta de secciones sin responsable establecido
  seccionesSinResponsable: any;
}
const initialState: InitialState = {
  //! variable de estado para el ccd actual de la busqueda
  ccdOrganigramaCurrentBusqueda: null,
  // ? lista de secciones persistentes del ccd nuevo
  seccionesPersistentesCcdNuevo: [],
  // ? lista de secciones sin responsable establecido
  seccionesSinResponsable: [],
};

export const AsigUniRespSlice = createSlice({
  name: 'AsigUniRespSlice',
  initialState,
  reducers: {
    //* ccd actual de la busqueda
    setCcdOrganigramaCurrent: (state, action: PayloadAction<any>) => {
      state.ccdOrganigramaCurrentBusqueda = action.payload;
    },

    // ? set lista de persistencias del ccd nuevo (seleccionado)
    setSeccionesPersistentes: (state, action: PayloadAction<any>) => {
      state.seccionesPersistentesCcdNuevo = action.payload;
    },

    // ? set lista de secciones sin responsable establecido
    setSeccionesSinResponsable: (state, action: PayloadAction<any>) => {
      state.seccionesSinResponsable = action.payload;
    },

    // ? -- función para limpiar todos los estados que se encuentran en el slice y que se usan en el módulo
    resetStateUniResp: (state) => {
      state.ccdOrganigramaCurrentBusqueda = null;
      state.seccionesPersistentesCcdNuevo = [];
      state.seccionesSinResponsable = [];
    },
  },
});

export const {
  // ! acciones sobre los ccd's y organigramas
  setCcdOrganigramaCurrent,
  // ? acciones sobre las secciones persistentes del ccd nuevo
  setSeccionesPersistentes,
  // ? acciones sobre las secciones sin responsable establecido
  setSeccionesSinResponsable,
  // ? reset states
  resetStateUniResp,
} = AsigUniRespSlice.actions;
