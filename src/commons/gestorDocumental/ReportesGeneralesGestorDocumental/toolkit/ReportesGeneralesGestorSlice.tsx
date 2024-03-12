/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  currentBusquedaReporte: null,
};

export const ReportesGeneralesGestorSlice = createSlice({
  name: 'ReportesGeneralesGestorSlice',
  initialState,
  reducers: {
    setCurrentBusquedaReporte: (state, action: PayloadAction<any>) => {
      state.currentBusquedaReporte = action.payload;
    },
  },
});

export const {
  setCurrentBusquedaReporte,
} = ReportesGeneralesGestorSlice.actions;
