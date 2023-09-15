/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Ipsd } from './types/slice.types';

const initialState: Ipsd = {
  //! TCA necesarios para el funcionamiento de la aplicación
  ccdsBusqueda: [],
  ccd_current_busqueda: null,
  unidadesOrganizacionales: [],
  current_unidad_organizacional: null,
  listSeriesSubseries: [],
  currentSeriesSubseries: null,
  restriccionesParaTodasLasUnidadesOrganizacionales: null,
  restriccionesParaUnidadesDiferentesAlaSeccionOsubseccionActualResponsable:
    null,

  unidadActuales: [],
  unidadesActualesExternas: []
};

export const PsdSlice = createSlice({
  name: 'PsdSlice',
  initialState,
  reducers: {
    //* busqueda de ccd's
    set_busqueda_ccds_action: (state, action: PayloadAction<any>) => {
      state.ccdsBusqueda = action.payload;
    },
    //* ccd actual de la busqueda
    set_ccd_current_busqueda_action: (state, action: PayloadAction<any>) => {
      state.ccd_current_busqueda = action.payload;
    },

    //* unidades organizacionales
    set_unidades_organizacionales_action: (
      state,
      action: PayloadAction<any>
    ) => {
      state.unidadesOrganizacionales = action.payload;
    },
    set_current_unidad_organizacional_action: (
      state,
      action: PayloadAction<any>
    ) => {
      state.current_unidad_organizacional = action.payload;
    },

    // ! actions sobre series y subseries
    setListaSeriesSubseries: (state: any, action: PayloadAction<any>) => {
      state.listSeriesSubseries = action.payload;
    },

    setCurrentSerieSubserie: (state: any, action: PayloadAction<any>) => {
      state.currentSeriesSubseries = action.payload;
    },

    // ! acciones sobre las restricciones
    set_restricciones_para_todas_las_unidades_organizacionales_action: (
      state,
      action: PayloadAction<any>
    ) => {
      state.restriccionesParaTodasLasUnidadesOrganizacionales = action.payload;
    },

    set_restricciones_para_unidades_diferentes_al_a_seccion_o_subseccion_actual_responsable_action:
      (state, action: PayloadAction<any>) => {
        state.restriccionesParaUnidadesDiferentesAlaSeccionOsubseccionActualResponsable =
          action.payload;
      },

    // ! acciones sobre los permisos
    set_permisos_unidades_actuales_action: (
      state,
      action: PayloadAction<any>
    ) => {
      state.unidadActuales = action.payload;
    },

    set_permisos_unidades_actuales_externas_action: (
      state,
      action: PayloadAction<any>
    ) => {
      state.unidadesActualesExternas = action.payload;
    }
  }
});

export const {
  // ! acciones sobre los ccd's
  set_busqueda_ccds_action,
  set_ccd_current_busqueda_action,
  // ! acciones sobre las unidades organizacionales
  set_unidades_organizacionales_action,
  set_current_unidad_organizacional_action,
  // ! acciones sobre las series y subseries
  setListaSeriesSubseries,
  setCurrentSerieSubserie,

  // ! acciones sobre las restricciones
  set_restricciones_para_todas_las_unidades_organizacionales_action,
  set_restricciones_para_unidades_diferentes_al_a_seccion_o_subseccion_actual_responsable_action,

  // ! acciones sobre los permisos
  set_permisos_unidades_actuales_action,
  set_permisos_unidades_actuales_externas_action
} = PsdSlice.actions;

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
