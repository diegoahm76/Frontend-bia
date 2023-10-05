/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
// import { type Ipsd } from './types/slice.types';

const initialState: any | any = {
  //! TCA necesarios para el funcionamiento de la aplicación
  ccdOrganigramaCurrentBusqueda: null,
  // ? currentPersistenciaSeccionSubseccion
  currentPersistenciaSeccionSubseccion: null,

  // ? homologacion unidades
  homologacionUnidades: [],

  // ? unidades persistentes
  unidadesPersistentes: [],


  // ! agrupacion (serie - subserie) current ---- pendiente

  // ? homologacion serie - subserie
  homologacionAgrupacionesSerieSubserie: [],

  // ? serie - subserie persistentes (agrupaciones persistentes)
  agrupacionesPersistentesSerieSubserie: [],
};

export const HomologacionesSlice = createSlice({
  name: 'HomologacionesSlice',
  initialState,
  reducers: {
    //* ccd actual de la busqueda
    setCcdOrganigramaCurrent: (state, action: PayloadAction<any>) => {
      state.ccdOrganigramaCurrentBusqueda = action.payload;
    },

    //* current persistencia seccion - subseccion
    setCurrentPersistenciaSeccionSubseccion: (
      state,
      action: PayloadAction<any>
    ) => {
      state.currentPersistenciaSeccionSubseccion = action.payload;
    },

    // ? homologacion unidades
    setHomologacionUnidades: (state, action: PayloadAction<any>) => {
      state.homologacionUnidades = action.payload;
    },

    // ? unidades persistentes
    setUnidadesPersistentes: (state, action: PayloadAction<any>) => {
      state.unidadesPersistentes = action.payload;
    },

    // ? homologacion serie - subserie
    setHomologacionAgrupacionesSerieSubserie: (
      state,
      action: PayloadAction<any>
    ) => {
      state.homologacionAgrupacionesSerieSubserie = action.payload;
    },

    // ? serie - subserie persistentes (agrupaciones persistentes)
    setAgrupacionesPersistentesSerieSubserie: (
      state,
      action: PayloadAction<any>
    ) => {
      state.agrupacionesPersistentesSerieSubserie = action.payload;
    },

    // ? -- función para limpiar todos los estados que se encuentran en el slice y que se usan en el módulo
    reset_states: (state) => {
      state.ccdOrganigramaCurrentBusqueda = null;
      state.currentPersistenciaSeccionSubseccion = null;
      state.homologacionUnidades = [];
      state.unidadesPersistentes = [];
      state.homologacionAgrupacionesSerieSubserie = [];
      state.agrupacionesPersistentesSerieSubserie = [];
    },
  },
});

export const {
  // ! acciones sobre los ccd's y organigramas
  setCcdOrganigramaCurrent,
  // * current persistencia seccion - subseccion
  setCurrentPersistenciaSeccionSubseccion,

  // ? homologacion unidades
  setHomologacionUnidades,

  // ? unidades persistentes
  setUnidadesPersistentes,

  // ? homologacion serie - subserie
  setHomologacionAgrupacionesSerieSubserie,

  // ? serie - subserie persistentes (agrupaciones persistentes)
  setAgrupacionesPersistentesSerieSubserie,

  // ? reset states
} = HomologacionesSlice.actions;
