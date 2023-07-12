import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  type IObjNursery,
  type INursery,
  type IObjItem,
  type IDespacho,
  type IObjDistribucion,
  type IObjViveristaActual,
  type IObjHistoricoViveristas,
  type IObjBuscarNuevoViverista,
  type IObjGenerarBaja,
  type IObjBienBaja,
  type IObjBien,
} from '../../interfaces/vivero';
import { type Persona } from '../../../../../interfaces/globalModels';

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
export const initial_state_despacho: IDespacho = {
  id_despacho_entrante: null,
  numero_despacho_consumo: null,
  fecha_ingreso: '',
  observacion_distribucion: '',
  persona_distribuye: '',
};

const initial_state_current_bien: IObjItem = {
  id_item_despacho_entrante: null,
  id_despacho_entrante: null,
  id_bien: null,
  id_entrada_alm_del_bien: null,
  fecha_ingreso: '',
  cantidad_entrante: null,
  cantidad_distribuida: null,
  observacion: '',
  codigo_bien: '',
  nombre_bien: '',
  tipo_documento: '',
  numero_documento: '',
  unidad_medida: '',
  cantidad_restante: null,
  cod_tipo_elemento_vivero: '',
  es_semilla_vivero: null,
};

export const initial_state_current_viverista_nuevo: IObjBuscarNuevoViverista = {
  tipo_persona: '',
  primer_nombre: '',
  segundo_nombre: '',
  primer_apellido: '',
  segundo_apellido: '',
  nombre_completo: '',
  razon_social: '',
  nombre_comercial: '',
  digito_verificacion: null,
  cod_naturaleza_empresa: null,
  tiene_usuario: true,
  tipo_documento: '',
  observacion_cambio: '',
  id_persona: null,
};

const initial_state_current_historico_viverista: IObjHistoricoViveristas = {
  id_histo_responsable_vivero: null,
  nombre_viverista: '',
  nombre_persona_cambia: '',
  tipo_documento: '',
  numero_documento: null,
  consec_asignacion: null,
  fecha_inicio_periodo: '',
  fecha_fin_periodo: '',
  observaciones: '',
  id_persona: null,
  id_persona_cambia: null,
};

export const initial_state_current_viverista_actual: IObjViveristaActual = {
  id_vivero: null,
  id_viverista_actual: null,
  nombre: '',
  tipo_documento: '',
  numero_documento: null,
  fecha_inicio_viverista_actual: '',
  observaciones: '',
};

const initial_state_current_bien_baja: IObjBienBaja = {
  id_item_baja_viveros: null,
  id_baja: null,
  id_bien: null,
  cantidad_baja: null,
  observaciones: '',
};
const initial_state_current_generar_baja: IObjGenerarBaja = {
  id_baja: null,
  tipo_baja: null,
  nro_baja_por_tipo: null,
  fecha_baja: new Date().toString(),
  baja_anulado: false,
  justificacion_anulacion: null,
  fecha_anulacion: null,
  id_persona_anula: null,
};

export const initial_state_current_insumo: IObjBien = {
  id_bien: null,
  codigo_bien: null,
  nombre: null,
  tipo_bien: null,
  saldo_disponible: null,
  unidad_medida: null,
};

const initial_state_person: Persona = {
  id_persona: null,
  tipo_persona: '',
  tipo_documento: '',
  numero_documento: '',
  primer_nombre: '',
  segundo_nombre: '',
  primer_apellido: '',
  segundo_apellido: '',
  nombre_completo: '',
  razon_social: '',
  nombre_comercial: '',
};

const initial_state: INursery = {
  nurseries: [],
  current_nursery: initial_state_current_nursery,
  items_despacho: [],
  current_bien: initial_state_current_bien,
  current_despacho: initial_state_despacho,
  items_distribuidos: [],
  viveristas: [],
  current_viverista: initial_state_current_viverista_actual,
  historicos_viveristas: [],
  current_historico_viverista: initial_state_current_historico_viverista,
  nuevos_viveristas: [],
  current_nuevo_viverista: initial_state_current_viverista_nuevo,
  genera_bajas: [],
  current_genera_baja: initial_state_current_generar_baja,
  bienes_bajas: [],
  current_bien_baja: initial_state_current_bien_baja,
  insumos: [],
  current_insumo: initial_state_current_insumo,
  persona: initial_state_person,
};

export const nursery_slice = createSlice({
  name: 'nursery',
  initialState: initial_state,
  reducers: {
    reset_state: () => initial_state,
    get_nurseries: (state: INursery, action: PayloadAction<IObjNursery[]>) => {
      state.nurseries = action.payload;
    },
    current_nursery: (state: INursery, action: PayloadAction<IObjNursery>) => {
      state.current_nursery = action.payload;
    },
    set_current_despacho: (
      state: INursery,
      action: PayloadAction<IDespacho>
    ) => {
      state.current_despacho = action.payload;
    },
    get_nurseries_closing: (
      state: INursery,
      action: PayloadAction<IObjNursery[]>
    ) => {
      state.nurseries = action.payload;
    },
    get_nurseries_quarantine: (
      state: INursery,
      action: PayloadAction<IObjNursery[]>
    ) => {
      state.nurseries = action.payload;
    },
    get_items_despacho: (
      state: INursery,
      action: PayloadAction<IObjItem[]>
    ) => {
      state.items_despacho = action.payload;
    },
    set_current_bien: (state: INursery, action: PayloadAction<IObjItem>) => {
      state.current_bien = action.payload;
    },

    get_items_distribuidos: (
      state: INursery,
      action: PayloadAction<IObjDistribucion[]>
    ) => {
      state.items_distribuidos = action.payload;
    },
    set_viveristas: (
      state: INursery,
      action: PayloadAction<IObjViveristaActual[]>
    ) => {
      state.viveristas = action.payload;
    },
    set_current_viverista: (
      state: INursery,
      action: PayloadAction<IObjViveristaActual>
    ) => {
      state.current_viverista = action.payload;
    },
    set_historicos_viveristas: (
      state: INursery,
      action: PayloadAction<IObjHistoricoViveristas[]>
    ) => {
      state.historicos_viveristas = action.payload;
    },
    set_current_historico_viverista: (
      state: INursery,
      action: PayloadAction<IObjHistoricoViveristas>
    ) => {
      state.current_historico_viverista = action.payload;
    },
    set_nuevos_viveristas: (
      state: INursery,
      action: PayloadAction<IObjBuscarNuevoViverista[]>
    ) => {
      state.nuevos_viveristas = action.payload;
    },
    set_current_nuevo_viverista: (
      state: INursery,
      action: PayloadAction<IObjBuscarNuevoViverista>
    ) => {
      state.current_nuevo_viverista = action.payload;
    },
    set_genera_bajas: (
      state: INursery,
      action: PayloadAction<IObjGenerarBaja[]>
    ) => {
      state.genera_bajas = action.payload;
    },
    set_current_genera_baja: (
      state: INursery,
      action: PayloadAction<IObjGenerarBaja>
    ) => {
      state.current_genera_baja = action.payload;
    },
    set_bienes_bajas: (
      state: INursery,
      action: PayloadAction<IObjBienBaja[]>
    ) => {
      state.bienes_bajas = action.payload;
    },
    set_current_bien_baja: (
      state: INursery,
      action: PayloadAction<IObjBienBaja>
    ) => {
      state.current_bien_baja = action.payload;
    },
    set_insumos: (state: INursery, action: PayloadAction<IObjBien[]>) => {
      state.insumos = action.payload;
    },
    set_current_insumo: (state: INursery, action: PayloadAction<IObjBien>) => {
      state.current_insumo = action.payload;
    },
    set_current_nursery: (
      state: INursery,
      action: PayloadAction<IObjNursery>
    ) => {
      state.current_nursery = action.payload;
    },
    set_persona: (state: INursery, action: PayloadAction<Persona>) => {
      state.persona = action.payload;
    },
  },
});
export const {
  set_genera_bajas,
  set_current_genera_baja,
  set_bienes_bajas,
  set_current_bien_baja,
  set_viveristas,
  set_current_viverista,
  set_historicos_viveristas,
  set_current_historico_viverista,
  set_nuevos_viveristas,
  set_current_nuevo_viverista,
  set_current_bien,
  get_nurseries,
  current_nursery,
  get_nurseries_closing,
  get_nurseries_quarantine,
  get_items_despacho,
  get_items_distribuidos,
  set_current_despacho,
  set_insumos,
  set_current_insumo,
  set_current_nursery,
  set_persona,
  reset_state,
} = nursery_slice.actions;
