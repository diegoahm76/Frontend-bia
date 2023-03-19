import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
    type IMarcas,
    type IMarcaGet,
  
  } from '../../interfaces/marca';

  const initial_state_marca_seleccionada: IMarcas = {
 
  id_marca: null,
  nombre: "",
  activo: false,
  item_ya_usado: false,
};

const initial_state: IMarcaGet= {
    marca: [],
    marca_seleccionada: initial_state_marca_seleccionada,
  };
  export const marcas_slice = createSlice({
    name: 'marca',
    initialState: initial_state,
    reducers: {
    
      get_marca: (
        state: IMarcaGet,
        action: PayloadAction<IMarcas[]>
      ) => {
        state.marca = action.payload;
      },
      marca_seleccionada: (
        state:IMarcaGet,
        action: PayloadAction<IMarcas>
      ) => {
        state.marca_seleccionada = action.payload;
      },
    },
  });
  export const {
    get_marca,
    marca_seleccionada,
  } = marcas_slice.actions;
  