import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  type IObjNursery,
  type IObjTransferGoods,
  type IObjGoods,
  type IObjTransfer,
  type IDistribucion
} from '../../interfaces/distribucion';
import { type Persona } from "../../../../../interfaces/globalModels";



export const initial_state_transfer: IObjTransfer = {
  id_traslado: null,
  nro_traslado: null,
  fecha_traslado: (new Date().toString()),
  traslado_anulado: false,
  id_vivero_destino: null,
  id_vivero_origen: null,
  justificacion_anulacion: null,
  fecha_anulado: null,
  id_persona_traslada: null,
  id_persona_anula: null,
  observaciones: "",
  ruta_archivo_soporte: "",
}
const initial_state_current_nursery: IObjNursery = {
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
const initial_state_person: Persona = {
  id_persona: null,
  tipo_persona: "",
  tipo_documento: "",
  numero_documento: "",
  primer_nombre: "",
  segundo_nombre: "",
  primer_apellido: "",
  segundo_apellido: "",
  nombre_completo: "",
  razon_social: "",
  nombre_comercial: "",
  tiene_usuario: true,
}

const initial_state_current_good: IObjGoods = {
  id_inventario_vivero: null,
  id_bien: null,
  agno_lote: null,
  nro_lote: null,
  cod_etapa_lote: null,
  cantidad_entrante: null,
  cantidad_bajas: null,
  cantidad_traslados_lote_produccion_distribucion: null,
  cantidad_consumos_internos: null,
  cantidad_salidas: null,
  cantidad_lote_cuarentena: null,
  utlima_altura_lote: null,
  codigo_bien: "",
  nombre: "",
  es_semilla_vivero: null,
  cod_tipo_elemento_vivero: null,
  saldo_disponible: null,
}

const initial_state: IDistribucion = {
  nurseries: [],
  origin_nursery: initial_state_current_nursery,
  destination_nursery: initial_state_current_nursery,
  transfers_nurseries: [],
  current_transfer: initial_state_transfer,
  goods: [],
  current_good: initial_state_current_good,
  transfer_goods: [],
  persons: [],
  transfer_person: initial_state_person,
}


export const distribucion_slice = createSlice({
  name: 'distribucion',
  initialState: initial_state,
  reducers: {
    set_nurseries: (state: IDistribucion, action: PayloadAction<IObjNursery[]>) => {
      state.nurseries = action.payload;
    },
    set_origin_nursery: (state: IDistribucion, action: PayloadAction<IObjNursery>) => {
      state.origin_nursery = action.payload;
    },
    set_destination_nursery: (state: IDistribucion, action: PayloadAction<IObjNursery>) => {
      state.destination_nursery = action.payload;
    },

    set_transfer_goods: (state: IDistribucion, action: PayloadAction<IObjTransferGoods[]>) => {
      state.transfer_goods = action.payload;
    },

    set_goods: (state: IDistribucion, action: PayloadAction<IObjGoods[]>) => {
      state.goods = action.payload;
    },

    set_current_good: (state: IDistribucion, action: PayloadAction<IObjGoods>) => {
      state.current_good = action.payload;
    },

    set_transfers_nurseries: (state: IDistribucion, action: PayloadAction<IObjTransfer[]>) => {
      state.transfers_nurseries = action.payload;
    },

    set_current_transfer: (state: IDistribucion, action: PayloadAction<IObjTransfer>) => {
      state.current_transfer = action.payload;
    },
    set_persons: (state: IDistribucion, action: PayloadAction<Persona[]>) => {
      state.persons = action.payload;
    },

    set_transfer_person: (state: IDistribucion, action: PayloadAction<Persona>) => {
      state.transfer_person = action.payload;
    },
  },
});
export const { 
  set_persons, 
  set_current_good, 
  set_goods, 
  set_transfer_person, 
  set_origin_nursery, 
  set_destination_nursery, 
  set_nurseries,
  set_transfer_goods, 
  set_transfers_nurseries, 
  set_current_transfer } = distribucion_slice.actions;
