import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type ICCD, type ICCDObject } from '../../interfaces/ccd';

const initial_state: ICCD = {
  ccds: [],
  ccd_current: null,
};

export const ccd_slice = createSlice({
  name: 'ccd_slice',
  initialState: initial_state,
  reducers: {
    get_ccds: (state: ICCD, action: PayloadAction<ICCDObject[]>) => {
      state.ccds = action.payload;
    },
    get_ccd_current: (
      state: ICCD,
      action: PayloadAction<ICCDObject | null>
    ) => {
      state.ccd_current = action.payload;
    },
  },
});

export const { get_ccds, get_ccd_current } = ccd_slice.actions;
