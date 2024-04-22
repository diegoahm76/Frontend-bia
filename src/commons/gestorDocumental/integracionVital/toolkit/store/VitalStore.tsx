/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  listaElementosPqrsfTramitesUotros: [],
  listaComplementosRequerimientosOtros: [],
};

export const VitalSlice = createSlice({
  name: 'VitalSlice',
  initialState,
  reducers: {
    // ? ------------------------
    // ? ------------------------

    // ? set pqrsdf tras búsqueda
    setListaElementosPqrsfTramitesUotrosBusqueda: (
      state,
      action: PayloadAction<any>
    ) => {
      state.listaElementosPqrsfTramitesUotros = action.payload;
    },

    setListaElementosComplementosRequerimientosOtros: (
      state,
      action: PayloadAction<any>
    ) => {
      state.listaComplementosRequerimientosOtros = action.payload;
    },

    setCurrentElementPqrsdComplementoTramitesYotros: (
      state,
      action: PayloadAction<any>
    ) => {
      state.currentElementPqrsdComplementoTramitesYotros = action.payload;
    },
    // ? -- función para limpiar todos los estados que se encuentran en el slice y que se usan en el módulo
    resetPanelVentanillaFull: (state) => {
      state.currentElementPqrsdComplementoTramitesYotros = null;
      state.listaElementosPqrsfTramitesUotros = [];
      state.listaComplementosRequerimientosOtros = [];
      state.listaHistoricoSolicitudes = [];
    },
    resetParcial: (state) => {
      state.currentElementPqrsdComplementoTramitesYotros = null;
      state.listaElementosPqrsfTramitesUotros = [];
      state.listaComplementosRequerimientosOtros = [];
    },
  },
});

export const {
  // ? acciones sobre lista de elementos de pqrsdf, trámites y servicios y otros
  setListaElementosPqrsfTramitesUotrosBusqueda,
  // ? acciones sobre lista de complementos, derequerimientos y otros
  setListaElementosComplementosRequerimientosOtros,
  // ? listar historico de solicitudes pqr y complementos
  setCurrentElementPqrsdComplementoTramitesYotros,
  // ? reset de todos los estados del slice
  resetPanelVentanillaFull,
  resetParcial,
} = VitalSlice.actions;
