import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  type IObjBien,
  type IConfiguration,
  type IObjMixture,
  type IMedidas,
  type IObjGerminationBed,
  type IObjNursery,

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

export const initial_state_current_germination_bed = {
  id_cama_germinacion_vivero: null,
  nombre: "",
  nro_de_orden: null,
  observacion: "",
  item_activo: true,
  item_ya_usado: false,
  id_vivero: null
}
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

const initial_state: IConfiguration = {
  bienes: [],
  current_bien: initial_state_current_bien,
  mixtures: [],
  current_mixture: initial_state_current_mixture,
  unidad_medida: [],
  germination_beds: [],
  current_germination_bed: initial_state_current_germination_bed,
  nurseries:[],
  current_nursery: initial_state_current_nursery
};
export const configuracion_slice = createSlice({
  name: 'configuracion',
  initialState: initial_state,
  reducers: {
    get_nurseries: (state: IConfiguration, action: PayloadAction<IObjNursery[]>) => {
      state.nurseries = action.payload;
    },
    current_nursery: (state: IConfiguration, action: PayloadAction<IObjNursery>) => {
      state.current_nursery = action.payload;
    },
    get_germination_beds: (state: IConfiguration, action: PayloadAction<IObjGerminationBed[]>) => {
      state.germination_beds = action.payload;
    },
    current_germination_bed: (state: IConfiguration, action: PayloadAction<IObjGerminationBed>) => {
      state.current_germination_bed = action.payload;
    },
    get_bienes: (
      state: IConfiguration,
      action: PayloadAction<IObjBien[]>
    ) => {
      state.bienes = action.payload;
    },
    current_bien: (
      state: IConfiguration,
      action: PayloadAction<IObjBien>
    ) => {
      state.current_bien = action.payload;
    },
    get_mixtures: (
      state: IConfiguration,
      action: PayloadAction<IObjMixture[]>
    ) => {
      state.mixtures = action.payload;
    },
    current_mixture: (
      state: IConfiguration,
      action: PayloadAction<IObjMixture>
    ) => {
      state.current_mixture = action.payload;
    },
    get_unit_measurement: (
      state: IConfiguration,
      action: PayloadAction<IMedidas[]>
    ) => {
      state.unidad_medida = action.payload;
    },
  },
});
export const {
  get_germination_beds,
  get_nurseries,
  current_germination_bed,
  current_nursery,
  get_bienes,
  current_bien,
  get_mixtures,
  current_mixture,
  get_unit_measurement,
} = configuracion_slice.actions;
