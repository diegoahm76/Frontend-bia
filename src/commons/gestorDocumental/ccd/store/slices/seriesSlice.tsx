import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type ISeries, type ISeriesObject } from '../../interfaces/ccd';

const initial_state: ISeries = {
  series_ccd: [],
  serie_ccd_current: null,
};

export const series_slice = createSlice({
  name: 'series',
  initialState: initial_state,
  reducers: {
    get_series_ccd: (
      state: ISeries,
      action: PayloadAction<ISeriesObject[]>
    ) => {
      // //  console.log('')('action.payload', action.payload);
      state.series_ccd = action.payload;
    },
    get_serie_ccd_current: (
      state: ISeries,
      action: PayloadAction<ISeriesObject | null>
    ) => {
      state.serie_ccd_current = action.payload;
    },
  },
});

export const { get_series_ccd, get_serie_ccd_current } = series_slice.actions;
