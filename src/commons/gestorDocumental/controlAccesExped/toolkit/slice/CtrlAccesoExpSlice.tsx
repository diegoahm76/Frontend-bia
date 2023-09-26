/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from './types/ctrlAccesoExp.types';

const initialState: InitialState = {
    ccdsBusquedaCtrlAccesoExp: [],
    currentCcdCtrlAccesoExp: null,
    // ! --- unidades organizacionales ---
    unidadesOrganizacionales: [],
    currentUnidadOrganizacional: null,
    //! series and subseries
    seriesSubseriesList: [],
    currentSerieSubserie: null,

    // !control acceso expedientes
    controlAccesoExpedientesList: [],
    currentControlAccesoExpedientes: null,

    verModuloAutorizacioneGenerales: false,
    //! modo de configuracion, parte inicial del modulo
    moodConfig: null,
    // ? se configura el tipo de clasificacion (publico, reservada, clasificado)
    tipoDeClasificacion: null,
};

export const ctrlAccesoExpSlice = createSlice({
  name: 'ctrlAccesoExpSlice',
  initialState,
  reducers: {
      // ? CCD ACTIONS
    setCcdsBusquedaCtrlAccesoExp: (state, action: PayloadAction<any[]>): any => {
        state.ccdsBusquedaCtrlAccesoExp = action.payload as any;
    },
    setCcdCurrentBusquedaCtrlAccesoExp: (state, action: PayloadAction<any>): any => {
        state.currentCcdCtrlAccesoExp = action.payload as any;
    },

    // ? UNIDADES ORGANIZACIONALES ACTIONS
    setUnidadesOrganizacionales: (state, action: PayloadAction<any[]>): any => {
      state.unidadesOrganizacionales = action.payload as any;
    }
    ,
    setCurrentUnidadOrganizacional: (state, action: PayloadAction<any>): any => {
      state.currentUnidadOrganizacional = action.payload as any;
    },

    // ? SERIES AND SUBSERIES ACTIONS
    setSeriesSubseriesList: (state, action: PayloadAction<any[]>): any => {
      state.seriesSubseriesList = action.payload as any;
    },
    setCurrentSerieSubserie: (state, action: PayloadAction<any>): any => {
      state.currentSerieSubserie = action.payload as any;
    },

    // ? CONTROL ACCESO EXPEDIENTES ACTIONS
    setControlAccesoExpedientesList: (state, action: PayloadAction<any[]>): any => {
      state.controlAccesoExpedientesList = action.payload as any;
    }
    ,
    setCurrentControlAccesoExpedientes: (state, action: PayloadAction<any>): any => {
      state.currentControlAccesoExpedientes = action.payload as any;
    }
    ,


    // ? modulo autorizaciones generales
    setVerModuloAutorizacioneGenerales: (state, action: PayloadAction<boolean>): any => {
      state.verModuloAutorizacioneGenerales = action.payload as any;
    },

    //! modo configuración, parte inicial de decisión del módulo
    set_mood_module : (state, action: PayloadAction<any>): any => {
      state.moodConfig = action.payload as any;
    },

    // ? ----------------- actions del caso # 1 --------------------
setTipoDeClasificacion: (state, action: PayloadAction<any>): any => {
  state.tipoDeClasificacion = action.payload as any;
},

    // ? ----------------- actions del caso # 2 --------------------

    // ? ---- RESET ALL THE STATES IN THIS SLICE -----
    resetStatesCtrlAccesoExp: (state) => {
       state.ccdsBusquedaCtrlAccesoExp = [];
      state.currentCcdCtrlAccesoExp = null;
      state.unidadesOrganizacionales = [];
      state.currentUnidadOrganizacional = null;
      state.seriesSubseriesList = [];
      state.currentSerieSubserie = null;
      state.moodConfig = null;
      state.tipoDeClasificacion = null;
      state.verModuloAutorizacioneGenerales = false;
      state.controlAccesoExpedientesList = [];
      state.currentControlAccesoExpedientes = null;
      // y los que se vayan añadiendo ...
    },
  },
});

export const {
  // ! ----- ACCIONES SOBRE LOS CCD'S -----
  setCcdsBusquedaCtrlAccesoExp,
  setCcdCurrentBusquedaCtrlAccesoExp,

  // ! ACCIONES SOBRE LAS UNIDADES ORGANIZACIONALES ---
  setUnidadesOrganizacionales,
  setCurrentUnidadOrganizacional,

  // ! ACCIONES SOBRE LAS SERIES Y SUBSERIES ---
  setSeriesSubseriesList,
  setCurrentSerieSubserie,

  // ! ACCIONES SOBRE EL CONTROL DE ACCESO EXPEDIENTES
  setControlAccesoExpedientesList,
  setCurrentControlAccesoExpedientes,

  // ! ACCIONES SOBRE EL MODULO DE AUTORIZACIONES GENERALES
  setVerModuloAutorizacioneGenerales,

  // ? configuracion inicial del módulo que permite tomar decisión sobre que se va a realizar dentro del módulo respectivamente
  set_mood_module,

  // ? ----------------- actions del caso # 1 --------------------
  setTipoDeClasificacion,

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
