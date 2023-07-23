import { type Persona } from '../../../../interfaces/globalModels';

export interface IMaterialVegetal {
  // Siembra
  nurseries: IObjNursery[];
  current_nursery: IObjNursery;
  vegetal_materials: IObjVegetalMaterial[];
  germination_beds: IObjGerminationBed[];
  current_germination_beds: IObjGerminationBed[];
  planting_goods: IObjPlantingGoods[];
  goods: IObjGoods[];
  goods_aux: IObjGoods[];
  current_good: IObjGoods;
  plantings: IObjPlanting[];
  current_planting: IObjPlanting;
  persons: Persona[];
  planting_person: Persona;

  // cuarentena
  plant_seed_lots: IObjSeedLot[];
  current_plant_seed_lot: IObjSeedLot;
  plant_quarantines: IObjQuarantine[];
  current_plant_quarantine: IObjQuarantine;
  plant_quarantine_lifting: IObjLifting[];
  current_lifting: IObjLifting;
  plant_quarantine_mortalities: IObjMortality[];
}

export interface IObjSeedLot {
  id_inventario_vivero: number | null;
  id_vivero: number | null;
  id_bien: number | null;
  agno_lote: number | null;
  nro_lote: number | null;
  cod_etapa_lote: string | null;
  id_siembra_lote_germinacion: number | null;
  id_mezcla: number | null;
  saldo_disponible: number | null;
  codigo_bien: string | null;
  nombre_bien: string | null;
}

export interface IObjQuarantine {
  id_cuarentena_mat_vegetal?: number | null;
  agno_lote?: number | null;
  nro_lote?: number | null;
  cod_etapa_lote?: string | null;
  consec_cueren_por_lote_etapa?: number | null;
  fecha_cuarentena?: string | null;
  fecha_registro?: string | null;
  cantidad_cuarentena?: number | null;
  descrip_corta_diferenciable?: string | null;
  motivo?: string | null;
  cantidad_levantada?: number | null;
  cantidad_bajas?: number | null;
  cuarentena_abierta?: boolean | null;
  cuarentena_anulada?: boolean | null;
  justificacion_anulacion?: string | null;
  fecha_anulacion?: string | null;
  ruta_archivo_soporte?: string | null;
  id_vivero?: number | null;
  id_bien?: number | null;
  id_persona_cuarentena?: number | null;
  persona_cuarentena?: string | null;
  id_persona_anula?: number | null;
  codigo_bien?: string | null;
  nombre_bien?: string | null;
  saldo_disponible?: number | null;
}

export interface IObjLifting {
  id_item_levanta_cuarentena: number | null;
  realizado_por?: string | null;
  consec_levan_por_cuaren: string | null;
  fecha_levantamiento: string | null;
  fecha_registro: string | null;
  cantidad_a_levantar: string | null;
  observaciones: string | null;
  levantamiento_anulado: boolean | null;
  justificacion_anulacion: string | null;
  fecha_anulacion: string | null;
  id_cuarentena_mat_vegetal: number | null;
  id_persona_levanta: number | null;
  id_persona_anula: number | null;
  persona_anula?: string | null;
  cantidad_cuarentena?: number | null;
  cantidad_levantada?: number | null;
  cantidad_mortalidad?: number | null;
  cantidad_disponible?: number | null;
}

export interface IObjMortality {
  id_item_baja_viveros: number | null;
  consecutivo_mortalidad: number | null;
  fecha_mortalidad: string | null;
  cantidad_mortalidad: number | null;
  observaciones: string | null;
  realizado_por: string | null;
}

export interface IObjPlantingGoods {
  id_consumo_siembra: number | null;
  id_siembra: number | null;
  id_bien_consumido: number | null;
  cantidad: number | null;
  observaciones: string | null;
  id_mezcla_consumida: number | null;
  codigo_bien: string | null;
  nombre_bien: string | null;
  tipo_bien: string | null;
}

export interface IObjPlanting {
  id_siembra: number | null;
  nro_lote: number | null;
  fecha_siembra: string | null;
  agno_lote: number | null;
  id_vivero: number | null;
  cama_germinacion: number[] | null;
  id_bien_sembrado: number | null;
  distancia_entre_semillas: number | null;
  id_persona_siembra: string | number | null;
  observaciones: string | null;
  ruta_archivo_soporte: string | null;
  nombre_bien_sembrado?: string | null;
}

export interface IObjGoods {
  id_inventario_vivero: number | null;
  cantidad_entrante: number | null;
  id_vivero: number | null;
  id_bien: number | null;
  id_mezcla?: number | null;
  codigo_bien: string | null;
  nombre_bien: string | null;
  tipo_bien: string | null;
  cantidad_disponible_bien: number | null;
  unidad_disponible?: string | null;
}

export interface IObjGerminationBed {
  id_cama_germinacion_vivero: number | null;
  nombre: string;
  nro_de_orden: number | null;
  observacion: string;
  item_activo: boolean | null;
  item_ya_usado: boolean | null;
  id_vivero: number | null;
}

export interface IObjVegetalMaterial {
  id_bien?: number | null;
  codigo_bien: string | null;
  nro_elemento_bien: number | null;
  nombre: string;
  cod_tipo_bien?: string | null;
  cod_tipo_activo: string | null;
  nivel_jerarquico: number | null;
  nombre_cientifico: string | null;
  descripcion: string;
  doc_identificador_nro: string | null;
  cod_metodo_valoracion: number | null;
  cod_tipo_depreciacion: number | null;
  cantidad_vida_util: number | null;
  valor_residual: number | null;
  stock_minimo: number | null;
  stock_maximo: number | null;
  solicitable_vivero: boolean;
  tiene_hoja_vida: boolean;
  maneja_hoja_vida: boolean;
  visible_solicitudes: boolean;
  id_marca?: number | null;
  id_unidad_medida?: number | null;
  id_porcentaje_iva?: number | null;
  id_unidad_medida_vida_util?: number | null;
  id_bien_padre?: number | null;
  nombre_padre?: string | null;
}

export interface IObjNursery {
  id_vivero: number | null;
  nombre: string;
  cod_municipio: string | null;
  direccion: string | null;
  area_mt2: number | null;
  area_propagacion_mt2: number | null;
  tiene_area_produccion: boolean | null;
  tiene_areas_pep_sustrato: boolean | null;
  tiene_area_embolsado: boolean | null;
  cod_tipo_vivero: string | null;
  fecha_inicio_viverista_actual: string | null;
  cod_origen_recursos_vivero: string | null;
  fecha_creacion: string | Date | null;
  en_funcionamiento: boolean | null;
  fecha_ultima_apertura: string | Date | null;
  justificacion_apertura: string | null;
  fecha_cierre_actual: string | Date | null;
  justificacion_cierre: string | null;
  vivero_en_cuarentena: boolean | null;
  fecha_inicio_cuarentena: string | Date | null;
  justificacion_cuarentena: string | null;
  ruta_archivo_creacion: string | null;
  activo: boolean | null;
  item_ya_usado: boolean | null;
  id_viverista_actual: number | null;
  id_persona_crea: number | null;
  id_persona_abre: number | null;
  id_persona_cierra: number | null;
  id_persona_cuarentena: number | null;
}
