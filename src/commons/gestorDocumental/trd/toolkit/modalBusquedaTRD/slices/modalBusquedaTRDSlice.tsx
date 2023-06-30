/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  searched_trd: any[];
  trd_current: any;
}

const initialState: IInitialState = {
  searched_trd: [],
  trd_current: null
};

export const searched_trd_slice = createSlice({
  name: 'searched_trd',
  initialState,
  reducers: {
    get_searched_list_trd: (state, action) => {
      state.searched_trd = action.payload;
    },
    get_trd_current: (state, action) => {
      state.trd_current = action.payload;
    }
  }
});

export const { get_searched_list_trd, get_trd_current } =
  searched_trd_slice.actions;

// export const historyMax = state => state.counter.historyMax;

// export default counterSlice.reducer;
