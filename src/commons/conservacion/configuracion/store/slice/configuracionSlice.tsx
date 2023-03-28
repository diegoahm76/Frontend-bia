import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  type IObjBien,
  type IBien,
  type IObjMixture,
  type IMedidas,

} from '../../interfaces/configuracion';

const initial_state_current_mixture = {
  id_mezcla: null,
  unidad_medida: "",
  nombre: "",
  item_activo: true,
  item_ya_usado: false,
  id_unidad_medida: null
}

const initial_state_current_bien = {
  id_bien: null,
  codigo_bien: null,
  nro_elemento_bien: null,
  nombre: "",
  cod_tipo_bien: null,
  cod_tipo_activo: null,
  nivel_jerarquico: null,
  nombre_cientifico: null,
  descripcion: "",
  es_semilla_vivero: null,
  cod_tipo_elemento_vivero: null,
  doc_identificador_nro: null,
  cod_metodo_valoracion: null,
  cod_tipo_depreciacion: null,
  cantidad_vida_util: null,
  valor_residual: null,
  stock_minimo: null,
  stock_maximo: null,
  solicitable_vivero: false,
  tiene_hoja_vida: false,
  maneja_hoja_vida: false,
  visible_solicitudes: false,
  id_marca: null,
  id_unidad_medida: null,
  id_porcentaje_iva: null,
  id_unidad_medida_vida_util: null,
  id_bien_padre: null,
};

const initial_state: IBien = {
  bienes: [],
  current_bien: initial_state_current_bien,
  mixtures: [],
  current_mixture: initial_state_current_mixture,
  unidad_medida: [],
};
export const configuracion_slice = createSlice({
  name: 'configuracion',
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
    get_mixtures: (
      state: IBien,
      action: PayloadAction<IObjMixture[]>
    ) => {
      state.mixtures = action.payload;
    },
    current_mixture: (
      state: IBien,
      action: PayloadAction<IObjMixture>
    ) => {
      state.current_mixture = action.payload;
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
  get_mixtures,
  current_mixture,
  get_unit_measurement,
} = configuracion_slice.actions;
