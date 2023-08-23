/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  //* --- control mode traslado unidad x entidad --- *//
  control_mode_traslado_unidad_x_entidad: false,

  //* --- eleccion opcion traslado unidad x entidad --- *//
  eleccion_opcion_traslado_unidad_x_entidad: false,
};

export const u_x_e_slice = createSlice({
  name: 'u_x_e_slice',
  initialState,
  reducers: {
      // ! --- set control mode traslado unidad x entidad ---
      setControlModeTrasladoUnidadXEntidad: (
        state: any,
        payloadAction: PayloadAction<boolean>
      ) => {
        state.controlModeTrasladoUnidadXEntidad = payloadAction.payload;
      },

      //* eleccion opcion traslado unidad x entidad
      setEleccionOpcionTrasladoUnidadXEntidad: (
        state: any,
        payloadAction: PayloadAction<boolean>
      ) => {
        state.eleccion_opcion_traslado_unidad_x_entidad =
          payloadAction.payload;
      }

    },
});

export const { setControlModeTrasladoUnidadXEntidad, setEleccionOpcionTrasladoUnidadXEntidad } = u_x_e_slice.actions;
