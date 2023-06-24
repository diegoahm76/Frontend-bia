/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
// reducers/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  seriesAndSubseries: [],
};

export const seriesAndSubseriesSlice = createSlice({
  name: 'slice_series_and_subseries',
  initialState,
  reducers: {
    setUserSeriesAndSubseries: (state, action) => {
      state.seriesAndSubseries = action.payload;
    },
  },
});

export const { setUserSeriesAndSubseries } = seriesAndSubseriesSlice.actions;