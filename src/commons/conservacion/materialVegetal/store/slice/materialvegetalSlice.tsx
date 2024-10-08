import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  type IObjSeedLot,
  type IObjQuarantine,
  type IObjLifting,
  type IObjNursery,
  type IObjVegetalMaterial,
  type IObjGerminationBed,
  type IObjPlantingGoods,
  type IObjGoods,
  type IObjPlanting,
  type IMaterialVegetal,
  type IObjMortality,
} from '../../interfaces/materialvegetal';
import { type Persona } from '../../../../../interfaces/globalModels';

const fecha = new Date();
export const initial_state_planting: IObjPlanting = {
  id_siembra: null,
  nro_lote: null,
  fecha_siembra: fecha.toString(),
  agno_lote: null,
  id_vivero: null,
  cama_germinacion: [],
  id_bien_sembrado: null,
  distancia_entre_semillas: null,
  id_persona_siembra: null,
  observaciones: '',
  ruta_archivo_soporte: '',
};
export const initial_state_current_nursery = {
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
  tipo_persona: '',
  tipo_documento: null,
  numero_documento: '',
  primer_nombre: '',
  segundo_nombre: '',
  primer_apellido: '',
  segundo_apellido: '',
  nombre_completo: '',
  razon_social: '',
  nombre_comercial: '',
  tiene_usuario: true,
};

const initial_state_current_good: IObjGoods = {
  id_inventario_vivero: null,
  cantidad_entrante: null,
  id_vivero: null,
  id_bien: null,
  codigo_bien: '',
  nombre_bien: '',
  tipo_bien: null,
  cantidad_disponible_bien: null,
  unidad_disponible: null,
};

export const initial_satate_current_plant_seed_lot: IObjSeedLot = {
  id_inventario_vivero: null,
  id_vivero: null,
  id_bien: null,
  agno_lote: null,
  nro_lote: null,
  cod_etapa_lote: null,
  id_siembra_lote_germinacion: null,
  id_mezcla: null,
  saldo_disponible: null,
  codigo_bien: '',
  nombre_bien: '',
};

export const initial_satate_current_plant_quarantine: IObjQuarantine = {
  id_cuarentena_mat_vegetal: null,
  agno_lote: null,
  nro_lote: null,
  cod_etapa_lote: null,
  consec_cueren_por_lote_etapa: null,
  fecha_cuarentena: new Date().toString(),
  fecha_registro: null,
  cantidad_cuarentena: null,
  descrip_corta_diferenciable: '',
  motivo: '',
  cantidad_levantada: null,
  cantidad_bajas: null,
  cuarentena_abierta: true,
  cuarentena_anulada: false,
  justificacion_anulacion: '',
  fecha_anulacion: null,
  ruta_archivo_soporte: '',
  id_vivero: null,
  id_bien: null,
  id_persona_cuarentena: null,
  id_persona_anula: null,
};
fecha.setDate(fecha.getDate() + 1);
export const initial_satate_current_lifting: IObjLifting = {
  id_item_levanta_cuarentena: null,
  realizado_por: '',
  consec_levan_por_cuaren: null,
  fecha_levantamiento: new Date().toString(),
  fecha_registro: null,
  cantidad_a_levantar: null,
  observaciones: '',
  levantamiento_anulado: false,
  justificacion_anulacion: null,
  fecha_anulacion: null,
  id_cuarentena_mat_vegetal: null,
  id_persona_levanta: null,
  id_persona_anula: null,
};

const initial_state: IMaterialVegetal = {
  nurseries: [],
  current_nursery: initial_state_current_nursery,
  vegetal_materials: [],
  germination_beds: [],
  current_germination_beds: [],
  planting_goods: [],
  goods: [],
  goods_aux: [],
  current_good: initial_state_current_good,
  plantings: [],
  current_planting: initial_state_planting,
  persons: [],
  planting_person: initial_state_person,
  plant_seed_lots: [],
  current_plant_seed_lot: initial_satate_current_plant_seed_lot,
  plant_quarantines: [],
  current_plant_quarantine: initial_satate_current_plant_quarantine,
  plant_quarantine_lifting: [],
  current_lifting: initial_satate_current_lifting,
  plant_quarantine_mortalities: [],
};

export const material_vegetal_slice = createSlice({
  name: 'material_vegetal',
  initialState: initial_state,
  reducers: {
    reset_state: () => initial_state,
    set_nurseries: (
      state: IMaterialVegetal,
      action: PayloadAction<IObjNursery[]>
    ) => {
      state.nurseries = action.payload;
    },
    set_current_nursery: (
      state: IMaterialVegetal,
      action: PayloadAction<IObjNursery>
    ) => {
      state.current_nursery = action.payload;
    },
    set_vegetal_materials: (
      state: IMaterialVegetal,
      action: PayloadAction<IObjVegetalMaterial[]>
    ) => {
      state.vegetal_materials = action.payload;
    },

    set_germination_beds: (
      state: IMaterialVegetal,
      action: PayloadAction<IObjGerminationBed[]>
    ) => {
      state.germination_beds = action.payload;
    },

    set_current_germination_beds: (
      state: IMaterialVegetal,
      action: PayloadAction<IObjGerminationBed[]>
    ) => {
      state.current_germination_beds = action.payload;
    },

    set_planting_goods: (
      state: IMaterialVegetal,
      action: PayloadAction<IObjPlantingGoods[]>
    ) => {
      state.planting_goods = action.payload;
    },

    set_goods: (
      state: IMaterialVegetal,
      action: PayloadAction<IObjGoods[]>
    ) => {
      state.goods = action.payload;
    },
    set_goods_aux: (
      state: IMaterialVegetal,
      action: PayloadAction<IObjGoods[]>
    ) => {
      state.goods = action.payload;
    },

    set_current_good: (
      state: IMaterialVegetal,
      action: PayloadAction<IObjGoods>
    ) => {
      state.current_good = action.payload;
    },

    set_plantings: (
      state: IMaterialVegetal,
      action: PayloadAction<IObjPlanting[]>
    ) => {
      state.plantings = action.payload;
    },

    set_current_planting: (
      state: IMaterialVegetal,
      action: PayloadAction<IObjPlanting>
    ) => {
      state.current_planting = action.payload;
    },
    set_persons: (
      state: IMaterialVegetal,
      action: PayloadAction<Persona[]>
    ) => {
      state.persons = action.payload;
    },

    set_planting_person: (
      state: IMaterialVegetal,
      action: PayloadAction<Persona>
    ) => {
      state.planting_person = action.payload;
    },

    set_plant_seed_lots: (
      state: IMaterialVegetal,
      action: PayloadAction<IObjSeedLot[]>
    ) => {
      state.plant_seed_lots = action.payload;
    },

    set_current_plant_seed_lot: (
      state: IMaterialVegetal,
      action: PayloadAction<IObjSeedLot>
    ) => {
      state.current_plant_seed_lot = action.payload;
    },

    set_plant_quarantines: (
      state: IMaterialVegetal,
      action: PayloadAction<IObjQuarantine[]>
    ) => {
      state.plant_quarantines = action.payload;
    },

    set_current_plant_quarantine: (
      state: IMaterialVegetal,
      action: PayloadAction<IObjQuarantine>
    ) => {
      state.current_plant_quarantine = action.payload;
    },

    set_plant_quarantine_lifting: (
      state: IMaterialVegetal,
      action: PayloadAction<IObjLifting[]>
    ) => {
      state.plant_quarantine_lifting = action.payload;
    },

    set_current_lifting: (
      state: IMaterialVegetal,
      action: PayloadAction<IObjLifting>
    ) => {
      state.current_lifting = action.payload;
    },

    set_plant_quarantine_mortalities: (
      state: IMaterialVegetal,
      action: PayloadAction<IObjMortality[]>
    ) => {
      state.plant_quarantine_mortalities = action.payload;
    },
  },
});
export const {
  set_persons,
  set_current_good,
  set_goods,
  set_goods_aux,
  set_planting_person,
  set_current_nursery,
  set_nurseries,
  set_vegetal_materials,
  set_germination_beds,
  set_current_germination_beds,
  set_planting_goods,
  set_plantings,
  set_current_planting,
  set_plant_seed_lots,
  set_current_plant_seed_lot,
  set_plant_quarantines,
  set_current_plant_quarantine,
  set_plant_quarantine_lifting,
  set_current_lifting,
  set_plant_quarantine_mortalities,
  reset_state,
} = material_vegetal_slice.actions;
