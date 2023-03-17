import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type ISubSeries, type ISubSeriesObject } from '../../interfaces/ccd';

const initial_state: ISubSeries = {
  subseries_ccd: [],
  subseries_ccd_current: null,
};

export const subseries_slice = createSlice({
  name: 'subSeries',
  initialState: initial_state,
  reducers: {
    get_subseries_ccd: (
      state: ISubSeries,
      action: PayloadAction<ISubSeriesObject[]>
    ) => {
      state.subseries_ccd = action.payload;
    },
    get_subseries_ccd_current: (
      state: ISubSeries,
      action: PayloadAction<ISubSeriesObject | null>
    ) => {
      state.subseries_ccd_current = action.payload;
    },
  },
});

export const { get_subseries_ccd, get_subseries_ccd_current } =
  subseries_slice.actions;
