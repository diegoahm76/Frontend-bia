export interface INursery {
  nurseries: IObjNursery[];
  current_nursery: IObjNursery;
  items_despacho: IObjItem[];
  current_bien: IObjItem;
  current_despacho: IDespacho;
  items_distribuidos: IObjDistribucion[];
}

export interface IList {
  value: string | number;
  label: string | number;
}

export interface IObjDistribucion {
  id_item_despacho_entrante?: number | null;
  id_vivero?: number | null;
  cantidad_asignada?: number | null;
  cod_etapa_lote_al_ingresar?: string | null;
  id_distribucion_item_despacho_entrante?: number | null;
  id_bien?: number | null;
  vivero_nombre?: string | null;
  unidad_medida?: string | null;
  codigo_bien?: string | null;
  nombre_bien?: string | null;
}

export interface IObjItem {
  id_item_despacho_entrante?: number | null;
  id_despacho_entrante?: number | null;
  id_bien?: number | null;
  id_entrada_alm_del_bien?: number | null;
  fecha_ingreso?: string | null;
  cantidad_entrante?: number | null;
  cantidad_distribuida?: number | null;
  observacion?: string | null;
  codigo_bien?: string | null;
  nombre_bien?: string | null;
  tipo_documento?: string | null;
  numero_documento?: string | number | null;
  unidad_medida?: string | null;
  cantidad_restante?: number | null;
  cod_tipo_elemento_vivero?: string | null;
  es_semilla_vivero?: boolean | null;
}

export interface IDespacho {
  id_despacho_entrante?: number | string | null;
  numero_despacho_consumo?: number | null;
  fecha_ingreso?: string | null;
  distribucion_confirmada?: boolean | null;
  fecha_confirmacion_distribucion?: string | null;
  observacion_distribucion?: string | null;
  id_despacho_consumo_alm?: number | null;
  id_persona_distribuye?: number | null;
  persona_distribuye?: string | null;
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
