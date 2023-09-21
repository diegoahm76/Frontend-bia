/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from './types/ctrlAccesoExp.types';

const initialState: InitialState = {
  ccdActions: {
    ccdsBusquedaCtrlAccesoExp: [],
    currentCcdCtrlAccesoExp: null,
  },
};

export const ctrlAccesoExpSlice = createSlice({
  name: 'ctrlAccesoExpSlice',
  initialState,
  reducers: {
      // ? CCD ACTIONS
    setCcdsBusquedaCtrlAccesoExp: (state, action: PayloadAction<any[]>): any => {
        state.ccdActions.ccdsBusquedaCtrlAccesoExp = action.payload as any;
    },
    setCcdCurrentBusquedaCtrlAccesoExp: (state, action: PayloadAction<any>): any => {
        state.ccdActions.currentCcdCtrlAccesoExp = action.payload as any;
    },
    // ? ---- RESET ALL THE STATES IN THIS SLICE -----
    resetStatesCtrlAccesoExp: (state) => {
      state.ccdActions.ccdsBusquedaCtrlAccesoExp = [];
      state.ccdActions.currentCcdCtrlAccesoExp = null;
      // y los que se vayan añadiendo ...
    },
  },
});

export const {
  // ! ----- ACCIONES SOBRE LOS CCD'S -----
  setCcdsBusquedaCtrlAccesoExp,
  setCcdCurrentBusquedaCtrlAccesoExp,

  // ? ---- RESET ALL THE STATES IN THIS SLICE -----
  resetStatesCtrlAccesoExp,
} = ctrlAccesoExpSlice.actions;

//* para el próximo slice que cree se debe tener en cuenta el siguiente ejemplo
/*

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ipsd, ICcd, IUnidadOrganizacional } from './types/slice.types';

interface IPsdState extends Ipsd {
  // Agrega tipos específicos para las propiedades del estado
  ccdsBusqueda: ICcd[];
  ccd_current_busqueda: ICcd | null;
  unidadesOrganizacionales: IUnidadOrganizacional[];
  current_unidad_organizacional: IUnidadOrganizacional | null;
}

const initialState: IPsdState = {
  ccdsBusqueda: [],
  ccd_current_busqueda: null,
  unidadesOrganizacionales: [],
  current_unidad_organizacional: null,
};

const psdSlice = createSlice({
  name: 'psd',
  initialState,
  reducers: {
    // Acciones relacionadas con los CCD
    ccdActions: {
      setCcdsBusqueda: (state, action: PayloadAction<ICcd[]>) => {
        state.ccdsBusqueda = action.payload;
      },
      setCcdCurrentBusqueda: (state, action: PayloadAction<ICcd>) => {
        state.ccd_current_busqueda = action.payload;
      },
    },

    // Acciones relacionadas con las unidades organizacionales
    unidadOrganizacionalActions: {
      setUnidadesOrganizacionales: (
        state,
        action: PayloadAction<IUnidadOrganizacional[]>
      ) => {
        state.unidadesOrganizacionales = action.payload;
      },
      setCurrentUnidadOrganizacional: (
        state,
        action: PayloadAction<IUnidadOrganizacional>
      ) => {
        state.current_unidad_organizacional = action.payload;
      },
    },
  },
});

export const {
  setCcdsBusqueda,
  setCcdCurrentBusqueda,
} = psdSlice.actions.ccdActions;

export const {
  setUnidadesOrganizacionales,
  setCurrentUnidadOrganizacional,
} = psdSlice.actions.unidadOrganizacionalActions;

export default psdSlice.reducer;

*/
