import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  type IAssignments,
  type IAssignmentsObject,
} from '../../interfaces/ccd';

const initial_state: IAssignments = {
  assignments_ccd: [],
  assignments_ccd_current: null,
};

export const assignments_slice = createSlice({
  name: 'assignments',
  initialState: initial_state,
  reducers: {
    get_assignments_ccd: (
      state: IAssignments,
      action: PayloadAction<IAssignmentsObject[]>
    ) => {
      state.assignments_ccd = action.payload;
    },
    get_assignments_ccd_current: (
      state: IAssignments,
      action: PayloadAction<IAssignmentsObject | null>
    ) => {
      state.assignments_ccd_current = action.payload;
    },
  },
});

export const { get_assignments_ccd, get_assignments_ccd_current } =
  assignments_slice.actions;
