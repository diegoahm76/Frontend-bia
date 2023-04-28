export interface IConfiguration {
  bienes: IObjBien[];
  current_bien: IObjBien;
  mixtures: IObjMixture[];
  current_mixture: IObjMixture;
  unidad_medida: IMedidas[];
  nurseries: IObjNursery[];
  current_nursery: IObjNursery;
  germination_beds: IObjGerminationBed[];
  current_germination_bed: IObjGerminationBed;
}


export interface IObjGerminationBed {
  id_cama_germinacion_vivero: number|null;
  nombre: string
  nro_de_orden: number|null;
  observacion: string;
  item_activo: boolean|null;
  item_ya_usado: boolean|null;
  id_vivero: number|null;
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

export interface IList {
  value: string | number;
  label: string | number;
}

export interface IObjMixture {
  id_mezcla: number | null;
  unidad_medida: string | null;
  nombre: string | null;
  item_activo: boolean;
  item_ya_usado: boolean;
  id_unidad_medida: number | null;
}
export interface IObjBien {
  id_bien?: number | null;
  codigo_bien: string | null;
  nro_elemento_bien: number | null;
  nombre: string;
  cod_tipo_bien: string | null;
  cod_tipo_activo: string | null;
  nivel_jerarquico: number | null;
  nombre_cientifico: string | null;
  descripcion: string;
  es_semilla_vivero: boolean | null;
  cod_tipo_elemento_vivero: string | null;
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
}
export interface IMedidas {
  id_unidad_medida: number;
  nombre: string;
  abreviatura: string;
  id_magnitud: number | null;
  precargado: boolean;
  activo: boolean;
  item_ya_usado: boolean;
}
