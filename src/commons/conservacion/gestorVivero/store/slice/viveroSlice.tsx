import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
    type IObjNursery,
    type INursery,
    type IObjItem,
    type IDespacho
  } from '../../interfaces/vivero';

const initial_state_current_nursery = {
  id_vivero: null,
  nombre: '',
  cod_municipio: '',
  direccion: '',
  area_mt2: null,
  area_propagacion_mt2: null,
  tiene_area_produccion: false,
  tiene_areas_pep_sustrato: false,
  tiene_area_embolsado: false,
  cod_tipo_vivero: null,
  fecha_inicio_viverista_actual: null,
  cod_origen_recursos_vivero: null,
  fecha_creacion: null,
  en_funcionamiento: true,
  fecha_ultima_apertura: null,
  justificacion_apertura: '',
  fecha_cierre_actual: null,
  justificacion_cierre: null,
  vivero_en_cuarentena: false,
  fecha_inicio_cuarentena: null,
  justificacion_cuarentena: null,
  ruta_archivo_creacion: null,
  activo: true,
  item_ya_usado: true,
  id_viverista_actual: null,
  id_persona_crea: null,
  id_persona_abre: null,
  id_persona_cierra: null,
  id_persona_cuarentena: null,
};
const initial_state_despacho: IDespacho = {
  numero_despacho_consumo: null,
  fecha_ingreso: "",
  observacion_distribucion: "",
  persona_distribuye: "",
}

const initial_state: INursery = {
  nurseries: [],
  current_nursery: initial_state_current_nursery,
  items_despacho: [],
  current_despacho: initial_state_despacho
};
export const nursery_slice = createSlice({
  name: 'nursery',
  initialState: initial_state,
  reducers: {
    get_nurseries: (state: INursery, action: PayloadAction<IObjNursery[]>) => {
      state.nurseries = action.payload;
    },
    current_nursery: (state: INursery, action: PayloadAction<IObjNursery>) => {
      state.current_nursery = action.payload;
    },
    set_current_despacho: (state: INursery, action: PayloadAction<IDespacho>) => {
      state.current_despacho = action.payload;
    },
    get_nurseries_closing: (state: INursery, action: PayloadAction<IObjNursery[]>) => {
      state.nurseries = action.payload;
    },
    get_nurseries_quarantine: (state: INursery, action: PayloadAction<IObjNursery[]>) => {
      state.nurseries = action.payload;
    },
    get_items_despacho: (state: INursery, action: PayloadAction<IObjItem[]>) => {
      state.items_despacho = action.payload;
    },
  },
});
export const { get_nurseries, current_nursery, get_nurseries_closing, get_nurseries_quarantine, get_items_despacho, set_current_despacho } = nursery_slice.actions;
