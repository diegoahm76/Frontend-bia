import { createSlice, type PayloadAction  } from '@reduxjs/toolkit';

interface TRD {
  trds: any[];
  trd_current: any;
}

const initial_state: TRD = {
  trds: [],
  trd_current: null,
};

export const trd_slice = createSlice({
  name: 'trd_slice',
  initialState: initial_state,
  reducers: {
    get_trds: (state: any, action: PayloadAction<any>) => {
      state.trds = action.payload;
    },
    get_trd_current: (
      state: any,
      action: PayloadAction<any | null>
    ) => {
      state.trd_current = action.payload;
    },
  },
});

export const { get_trds, get_trd_current } = trd_slice.actions;
