/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type SliceTypeInterface } from './types/UxE_slice.types';
const initialState: SliceTypeInterface = {


  //* --- asignacion de consulta de tabla temporal cuando trae información --- *//
  asignacionConsultaTablaTemporal: null,


  //* --- control mode traslado unidad x entidad --- *//

  // ? si causa algún error el cambio volver a este valor : modo_entrada_sin_validaciones
  controlModoTrasladoUnidadXEntidad: '',

  //* ---- validacion de fase de entrada --- *//
  controlFaseEntrada: 1,

  //* --- eleccion opcion traslado unidad x entidad --- *//
  eleccion_opcion_traslado_unidad_x_entidad: false,

  // ! --- almacenadores de data para las grid de los traslados -- //
  // ! --- grid actual a nuevo --- //
  gridActualANuevo: [],
  unidadesSeleccionadas: [],

  gridAnteriorAActual: [],
  unidadesSeleccionadasAnteriorAActual: [],


  // ! organigrama current
  organigrama_current: null,
  /*  gridActualANuevo: {
    data: [],
    dataSelectedUnidadNueva: []
  } */
};

export const u_x_e_slice = createSlice({
  name: 'u_x_e_slice',
  initialState,
  reducers: {
    //! set asignacion de consulta de tabla temporal cuando trae información
    setAsignacionConsultaTablaTemporal: (
      state: any,
      payloadAction: PayloadAction<any>
    ) => {
      state.asignacionConsultaTablaTemporal = payloadAction.payload;
    },

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
    setUnidadesSeleccionadas: (
      state: any,
      payloadAction: PayloadAction<any>
    ) => {
      state.unidadesSeleccionadas = payloadAction.payload;
    },

    //! --- set grid anterior a actual ---
    setGridAnteriorAActual: (state: any, payloadAction: PayloadAction<any>) => {
      state.gridAnteriorAActual = payloadAction.payload;
    },

    //! --- set unidades seleccionadas anterior a actual ---
    setUnidadesSeleccionadasAnteriorAActual: (
      state: any,
      payloadAction: PayloadAction<any>
    ) => {
      state.unidadesSeleccionadasAnteriorAActual = payloadAction.payload;
    },


    set_current_id_organigrama: (state: any, payloadAction: PayloadAction<any>) => {
      state.organigrama_current = payloadAction.payload;
    }

  }
});

export const {
  //* set asignación de tabla temporal
  setAsignacionConsultaTablaTemporal,

  setControlModoTrasladoUnidadXEntidad,
  setEleccionOpcionTrasladoUnidadXEntidad,
  setControlFaseEntrada,
  //* esta funcion se debe analizar su uso , ya que tambien va a ser importante al momento de que la T026 tenga datos, así que su ejecucion se va a dar en dos momentos diferentes,probablemente en el useEffect de la pantalla principal ya que en ese momento no se da la opciókn de elegir el modo de traslado, y ese useEffect se ejecuta en el componente procesoARealizar.
  setGridActualANuevo,
  setUnidadesSeleccionadas,

  setGridAnteriorAActual,
  setUnidadesSeleccionadasAnteriorAActual,


  //* asignar el id actual del organigrama para realizar el proceso de almacenamiento en la tabla temporal T026
  set_current_id_organigrama,
} = u_x_e_slice.actions;