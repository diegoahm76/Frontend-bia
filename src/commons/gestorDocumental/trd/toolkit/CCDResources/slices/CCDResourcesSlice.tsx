/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  ccd_finished: any[];
  current_ccd: any;
}

const initialState: IInitialState = {
  ccd_finished: [],
  current_ccd: null
};

export const finished_ccd_slice = createSlice({
  name: 'finished_ccd_slice',
  initialState,
  reducers: {
    get_finished_ccds: (state, action) => {
      state.ccd_finished = action.payload;
    },
    get_ccd_current: (state, action) => {
      state.current_ccd = action.payload;
    }
  }
});

export const { get_finished_ccds, get_ccd_current } =
  finished_ccd_slice.actions;

// export const historyMax = state => state.counter.historyMax;

// export default counterSlice.reducer;
