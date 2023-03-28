import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
    type IMarcas,
    type IMarcaGet,
    type IPorcentajeGet,
    type IPorcentajes,
   type IMedidas,
   type IMedidasGet,
  
  } from '../../interfaces/MarcaMedidaPorcentaje';

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
  

// Porcentaje


  const initial_state_porcentaje_seleccionado: IPorcentajes = {
    id_porcentaje_iva: 0,
    porcentaje: 0,
    observacion: "",
    registro_precargado: false,
    activo: false,
    item_ya_usado: false
  }

 
  const initial_state_porcentaje: IPorcentajeGet= {

    porcentaje: [],
    porcentaje_seleccionado: initial_state_porcentaje_seleccionado,
     
    };
    export const porcentajes_slice = createSlice({
      name: 'porcentaje',
      initialState: initial_state_porcentaje,
      reducers: {
      
        get_porcentaje: (
          state: IPorcentajeGet,
          action: PayloadAction<IPorcentajes[]>
        ) => {
          state.porcentaje = action.payload;
        },
        porcentaje_seleccionado: (
          state:IPorcentajeGet,
          action: PayloadAction<IPorcentajes>
        ) => {
          state.porcentaje_seleccionado = action.payload;
        },
      },
    });
    export const {
      get_porcentaje,
      porcentaje_seleccionado,
    } = porcentajes_slice.actions;
    

    // Medida

    
  const initial_state_medida_seleccionada: IMedidas = {
    id_unidad_medida: 0,
    nombre: "",
    abreviatura: "",
    id_magnitud: null,
    precargado: false,
    activo: false,
    item_ya_usado: false
  }
 
  const initial_state_medida: IMedidasGet= {
    medida: [],
    medida_seleccionada: initial_state_medida_seleccionada,
     
    };
    export const medida_slice = createSlice({
      name: 'medida',
      initialState: initial_state_medida,
      reducers: {
      
        get_medida: (
          state: IMedidasGet,
          action: PayloadAction<IMedidas[]>
        ) => {
          state.medida = action.payload;
        },
        medida_seleccionada: (
          state:IMedidasGet,
          action: PayloadAction<IMedidas>
        ) => {
          state.medida_seleccionada = action.payload;
        },
      },
    });
    export const {
      get_medida,
      medida_seleccionada,
    } = medida_slice.actions;
 