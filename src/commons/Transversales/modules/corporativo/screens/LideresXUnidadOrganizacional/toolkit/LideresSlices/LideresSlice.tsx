import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type LideresInterface } from './types/LideresSlice.types';

const initial_state: LideresInterface = {
  organigrama_lideres_current: null
};

export const lideres_slice = createSlice({
  name: 'lideres_slice',
  initialState: initial_state,
  reducers: {
    // ! set organigrama lideres current
    set_organigrama_lideres_current: (
      state: any,
      action: PayloadAction<any>
    ) => {
      state.organigrama_lideres_current = action.payload;
    }
  }
});

export const { set_organigrama_lideres_current } = lideres_slice.actions;
