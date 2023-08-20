/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  //* --- control mode traslado unidad x entidad --- *//
  control_mode_traslado_unidad_x_entidad: false
};

export const uxe_slice = createSlice({
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
    },
});

export const { setControlModeTrasladoUnidadXEntidad } = uxe_slice.actions;
