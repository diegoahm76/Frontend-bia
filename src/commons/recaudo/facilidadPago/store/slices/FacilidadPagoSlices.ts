import { createSlice  } from '@reduxjs/toolkit';

const initial_state = {
  obligaciones: [],
};

export const obligaciones_slice = createSlice({
  name: 'obligaciones',
  initialState: initial_state,
  reducers: {
    obligaciones_seleccionadas: (state, action) => {
      state.obligaciones = action.payload;
    },
  },
});

export const { obligaciones_seleccionadas } = obligaciones_slice.actions;
