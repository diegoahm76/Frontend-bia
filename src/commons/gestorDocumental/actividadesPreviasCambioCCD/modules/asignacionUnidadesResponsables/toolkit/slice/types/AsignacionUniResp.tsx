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
  // ? lsta de series sección seleccionada sin responsable
  seriesSeccionSeleccionadaSinResponsable: any;
  currentSeccionSeleccionadaSinResponsable: any;
  // ? lista de unidades del ccd asociado
  unidadCcdAsociado: any[];
  //* curent unidad asociada
  currentUnidadAsociada: any;
  //* listado de asignaciones
  listadoDeAsignaciones: any[];
}
const initialState: InitialState = {
  //! variable de estado para el ccd actual de la busqueda
  ccdOrganigramaCurrentBusqueda: null,
  // ? lista de secciones persistentes del ccd nuevo
  seccionesPersistentesCcdNuevo: [],
  // ? lista de secciones sin responsable establecido
  seccionesSinResponsable: {}, //* objeto que contiene el (id_ccd_nuevo, id_ccd_actual y las unidades halladas)
  seriesSeccionSeleccionadaSinResponsable: {},
  currentSeccionSeleccionadaSinResponsable: null,
  // ? lista de unidades del ccd asociado
  unidadCcdAsociado: [],
  //* curent unidad asociada
  currentUnidadAsociada: null,
  //* listado de asignaciones
  listadoDeAsignaciones: [],
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
    //* set lista de series de la seccion seleccionada sin responsable
    setSeriesSeccionSeleccionadaSinResponsable: (
      state,
      action: PayloadAction<any>
    ) => {
      state.seriesSeccionSeleccionadaSinResponsable = action.payload;
    },

    setCurrentSeccionSeleccionadaSinResponsable: (
      state,
      action: PayloadAction<any>
    ) => {
      state.currentSeccionSeleccionadaSinResponsable = action.payload;
    },

    setUnidadeCcdAsociado: (state, action: PayloadAction<any>) => {
      state.unidadCcdAsociado = action.payload;
    },

    //* curent unidad asociada
    setCurrentUnidadAsociada: (state, action: PayloadAction<any>) => {
      state.currentUnidadAsociada = action.payload;
    },

    //* listado de asignaciones
    setListadoDeAsignaciones: (state, action: PayloadAction<any>) => {
      state.listadoDeAsignaciones = action.payload;
    },

    // ? -- función para limpiar todos los estados que se encuentran en el slice y que se usan en el módulo
    resetStateUniResp: (state) => {
      state.ccdOrganigramaCurrentBusqueda = null;
      state.seccionesPersistentesCcdNuevo = [];
      state.seccionesSinResponsable = {};
      state.seriesSeccionSeleccionadaSinResponsable = {};
      state.currentSeccionSeleccionadaSinResponsable = null;
      state.unidadCcdAsociado = [];
      state.currentUnidadAsociada = null;
      state.listadoDeAsignaciones = [];
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
  //* acciones sobre las series de la seccion seleccionada sin responsable
  setCurrentSeccionSeleccionadaSinResponsable,
  // ? acciones sobre las series de la seccion seleccionada sin responsable
  // ? acciones sobre las unidades del ccd asociado
  setSeriesSeccionSeleccionadaSinResponsable,
  setUnidadeCcdAsociado,
  //* curent unidad asociada
  setCurrentUnidadAsociada,
  //* acciones sobre el listado de asignaciones
  setListadoDeAsignaciones,
  // ? reset states
  resetStateUniResp,
} = AsigUniRespSlice.actions;
