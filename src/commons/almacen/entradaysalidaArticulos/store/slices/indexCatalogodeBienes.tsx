import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
    type IObjBien,
    type IBien,
    type IList,
  } from '../../interfaces/catalogodebienes';

  const initial_state_current_bien = {
    id_bien: 0,
    codigo_bien: "",
    nro_elemento_bien: 0,
    nombre: "",
    cod_tipo_bien: "",
    cod_tipo_activo: "",
    nivel_jerarquico: 0,
    nombre_cientifico: "",
    descripcion: "",
    doc_identificador_nro: "",
    cod_metodo_valoracion: 0,
    cod_tipo_depreciacion: 0,
    cantidad_vida_util: 0,
    valor_residual: 0,
    stock_minimo: 0,
    stock_maximo: 0,
    solicitable_vivero: false,
    tiene_hoja_vida: false,
    maneja_hoja_vida: false,
    visible_solicitudes: false,
    id_marca: 0,
    id_unidad_medida: 0,
    id_porcentaje_iva: 0,
    id_unidad_medida_vida_util: 0,
    id_bien_padre: null,
};

const initial_state: IBien = {
    bienes: [],
    current_bien: initial_state_current_bien,
  };
  export const bien_slice = createSlice({
    name: 'bien',
    initialState: initial_state,
    reducers: {
    
      get_bienes: (
        state: IBien,
        action: PayloadAction<IObjBien[]>
      ) => {
        state.bienes = action.payload;
      },
      current_bien: (
        state: IBien,
        action: PayloadAction<IObjBien>
      ) => {
        state.current_bien = action.payload;
      },
    },
  });
  export const {
    get_bienes,
    current_bien,
  } = bien_slice.actions;
  