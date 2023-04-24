import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  type IBien,
  type IMarcas,
  type IMedidas,
  type IPorcentajes
} from '../../interfaces/catalogodebienes';
import { type INodo } from "../../interfaces/Nodo";


export const initial_state_current_bien = {
  id_bien: null,
  codigo_bien: null,
  nro_elemento_bien: null,
  nombre: "",
  cod_tipo_bien: null,
  cod_tipo_activo: null,
  nivel_jerarquico: null,
  nombre_cientifico: null,
  descripcion: "",
  doc_identificador_nro: null,
  cod_metodo_valoracion: null,
  cod_tipo_depreciacion: null,
  cantidad_vida_util: null,
  valor_residual: null,
  stock_minimo: null,
  stock_maximo: null,
  solicitable_vivero: true,
  tiene_hoja_vida: false,
  maneja_hoja_vida: false,
  visible_solicitudes: false,
  id_marca: null,
  id_unidad_medida: null,
  id_porcentaje_iva: null,
  id_unidad_medida_vida_util: null,
  id_bien_padre: null,
};
const initial_state_data ={
  nombre: "",
  codigo: "",
  acciones: "",
  id_nodo: 0,
  crear: false,
  editar: false,
  eliminar: false,
  bien: initial_state_current_bien,
}

export const initial_state_current_nodo = {
  key: "",
  data: initial_state_data,
  children: []
}


const initial_state: IBien = {
  code_bien: "",
  nodo: [],
  current_nodo: initial_state_current_nodo,
  bienes: [],
  current_bien: initial_state_current_bien,
  marca: [],
  unidad_medida: [],
  porcentaje_iva: [],
  
};
export const bien_slice = createSlice({
  name: 'bien',
  initialState: initial_state,
  reducers: {

    get_bienes: (
      state: IBien,
      action: PayloadAction<INodo[]>
    ) => {
      state.nodo = action.payload;
    },
    current_bien: (
      state: IBien,
      action: PayloadAction<INodo>
    ) => {
      state.current_nodo= action.payload;
    },
    get_code_bien: (
      state: IBien,
      action: PayloadAction<string|null|undefined>
    ) => {
      state.code_bien = action.payload;
    },
    get_marks: (
      state: IBien,
      action: PayloadAction<IMarcas[]>
    ) => {
      state.marca = action.payload;
    },
    get_percentages: (
      state: IBien,
      action: PayloadAction<IPorcentajes[]>
    ) => {
      state.porcentaje_iva = action.payload;
    },
    get_unit_measurement: (
      state: IBien,
      action: PayloadAction<IMedidas[]>
    ) => {
      state.unidad_medida = action.payload;
    },
  },
});
export const {
  get_bienes,
  current_bien,
  get_code_bien,
  get_marks,
  get_percentages,
  get_unit_measurement,
} = bien_slice.actions;
